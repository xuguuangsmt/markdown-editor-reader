const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let currentFilePath = null;

function createWindow(filePath = null) {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        backgroundColor: '#1e1e2e',
        show: false
    });

    mainWindow.loadFile('index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        if (filePath) {
            openFileFromPath(filePath);
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function openFileFromPath(filePath) {
    if (filePath && fs.existsSync(filePath)) {
        const ext = path.extname(filePath).toLowerCase();
        if (ext === '.md' || ext === '.markdown' || ext === '.txt') {
            const content = fs.readFileSync(filePath, 'utf-8');
            currentFilePath = filePath;
            mainWindow.webContents.send('file-opened', { filePath, content });
        }
    }
}

function getFilePathFromArgs() {
    const args = process.argv.slice(1);
    for (const arg of args) {
        if (arg && !arg.startsWith('-') && !arg.startsWith('--')) {
            const ext = path.extname(arg).toLowerCase();
            if (ext === '.md' || ext === '.markdown') {
                return arg;
            }
        }
    }
    return null;
}

app.whenReady().then(() => {
    const filePath = getFilePathFromArgs();
    createWindow(filePath);
});

app.on('second-instance', (event, commandLine) => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
        for (const arg of commandLine) {
            const ext = path.extname(arg).toLowerCase();
            if (ext === '.md' || ext === '.markdown') {
                openFileFromPath(arg);
                break;
            }
        }
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
}

ipcMain.handle('open-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Markdown Files', extensions: ['md', 'markdown', 'txt'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });

    if (!result.canceled && result.filePaths.length > 0) {
        const filePath = result.filePaths[0];
        const content = fs.readFileSync(filePath, 'utf-8');
        currentFilePath = filePath;
        return { filePath, content };
    }
    return null;
});

ipcMain.handle('save-file', async (event, content) => {
    if (currentFilePath) {
        fs.writeFileSync(currentFilePath, content, 'utf-8');
        return currentFilePath;
    } else {
        const result = await dialog.showSaveDialog(mainWindow, {
            filters: [
                { name: 'Markdown Files', extensions: ['md'] },
                { name: 'All Files', extensions: ['*'] }
            ],
            defaultPath: 'untitled.md'
        });

        if (!result.canceled && result.filePath) {
            fs.writeFileSync(result.filePath, content, 'utf-8');
            currentFilePath = result.filePath;
            return result.filePath;
        }
    }
    return null;
});

ipcMain.handle('save-file-as', async (event, content) => {
    const result = await dialog.showSaveDialog(mainWindow, {
        filters: [
            { name: 'Markdown Files', extensions: ['md'] },
            { name: 'All Files', extensions: ['*'] }
        ],
        defaultPath: currentFilePath || 'untitled.md'
    });

    if (!result.canceled && result.filePath) {
        fs.writeFileSync(result.filePath, content, 'utf-8');
        currentFilePath = result.filePath;
        return result.filePath;
    }
    return null;
});

ipcMain.handle('get-file-path', () => {
    return currentFilePath;
});
