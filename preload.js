const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('open-file'),
    saveFile: (content) => ipcRenderer.invoke('save-file', content),
    saveFileAs: (content) => ipcRenderer.invoke('save-file-as', content),
    getFilePath: () => ipcRenderer.invoke('get-file-path'),
    onFileOpened: (callback) => ipcRenderer.on('file-opened', (event, data) => callback(data))
});
