# Markdown Editor & Reader

一个功能强大的 Markdown 编辑器和阅读器桌面应用，支持实时预览和文件关联。

## 功能特性

### 阅读模式
- 默认以阅读模式打开 Markdown 文件
- 优雅的深色主题界面 (Catppuccin 风格)
- 居中显示，最大宽度 800px，专注阅读体验

### 编辑模式
- 左右分栏布局（50/50）：左侧编辑，右侧实时预览
- 150ms 防抖实时渲染
- 支持多种 Markdown 语法：标题、粗体、斜体、代码块、引用、列表、表格、删除线等

### 文件操作
- 支持打开 `.md`、`.markdown`、`.txt` 文件
- 支持保存和另存为
- 安装后自动关联 `.md` 文件，双击即可打开
- 单实例锁定，重复打开文件会聚焦到已有窗口

### 快捷键
- `Ctrl + O` — 打开文件
- `Ctrl + S` — 保存文件
- `Ctrl + E` — 切换阅读/编辑模式

## 安装方法

### Windows 安装包

下载最新版本的安装包：

1. 下载 `Markdown Editor Setup 1.0.0.exe`
2. 双击运行安装程序
3. 按照向导完成安装

安装完成后：
- `.md` 文件会自动关联到本应用
- 双击 `.md` 文件即可用本应用打开
- 桌面和开始菜单会创建快捷方式

### 便携版本

也可使用便携版本，无需安装：
- 运行 `npm run build:dir` 构建
- 在 `installer/` 目录下找到免安装版本
- 直接运行即可

## 使用说明

### 打开文件
1. 点击工具栏的「打开」按钮
2. 或者使用快捷键 `Ctrl + O`
3. 选择要打开的 Markdown 文件

### 编辑模式
1. 点击工具栏的「编辑」按钮切换到编辑模式
2. 在左侧编辑区域输入 Markdown 内容
3. 右侧会实时显示渲染效果
4. 使用 `Ctrl + E` 快速切换模式

### 保存文件
1. 点击工具栏的「保存」按钮
2. 或者使用快捷键 `Ctrl + S`
3. 如果是新文件，会提示选择保存位置

## 技术栈

- **框架**: Electron
- **语言**: JavaScript (ES6+)
- **样式**: CSS3 (CSS 自定义属性实现深色主题)
- **Markdown 解析**: 自定义正则解析器（无外部依赖）
- **构建工具**: electron-builder (NSIS 安装包)

## 开发

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

如果下载 Electron 较慢，可使用国内镜像：

```bash
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/" npm install
```

### 开发模式

```bash
npm start
```

### 构建

```bash
# 构建目录版本（免安装）
npm run build:dir

# 构建 NSIS 安装包
npm run build
```

构建产物输出到 `installer/` 目录。

## 项目结构

```
markdown/
├── main.js                   # Electron 主进程（窗口管理、文件 I/O、IPC）
├── preload.js                # 预加载脚本（安全的 contextBridge）
├── 直接打开用.html           # 渲染进程界面（也可在浏览器中独立运行）
├── 开发过程记录.md            # 开发过程与技术选型记录
├── SPEC.md                   # 功能规格说明
├── package.json              # 项目配置与构建脚本
├── CLAUDE.md                 # Claude Code 项目指南
└── installer/                # 构建输出目录
```

### 安全架构

- `contextIsolation: true`，渲染进程无法直接访问 Node.js API
- 主进程通过 `ipcMain.handle` 暴露文件操作
- 预加载脚本通过 `contextBridge.exposeInMainWorld` 桥接 API

## 支持的 Markdown 语法

- 标题：`#` 到 `######`
- 粗体：`**文本**`
- 斜体：`*文本*`
- 删除线：`~~文本~~`
- 代码块：`` ```代码``` ``
- 行内代码：`` `代码` ``
- 链接：`[文本](URL)`
- 图片：`![替代文本](URL)`
- 引用：`> 引用内容`
- 无序列表：`-` 或 `*`
- 有序列表：`1.` `2.`
- 表格：Markdown 表格语法
- 分隔线：`---`

## 许可证

MIT License
