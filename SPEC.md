# Markdown Editor & Reader

## Project Overview
- **Project Name**: Markdown Editor & Reader
- **Type**: Web-based desktop-style application (single HTML file)
- **Core Feature**: A markdown file viewer with split-pane editing capability
- **Target Users**: Writers, developers, and anyone working with markdown files

## Visual Specification

### Layout Structure
- **Header Bar**: Fixed top bar with app title, file controls, and mode toggle
- **Main Content Area**:
  - Reading Mode: Centered content display with max-width
  - Edit Mode: Split-pane layout (50/50 horizontal split)
    - Left Pane: Markdown source editor
    - Right Pane: Live preview

### Color Palette
- **Background**: #1e1e2e (deep purple-gray)
- **Surface**: #2a2a3c (slightly lighter)
- **Primary Accent**: #89b4fa (soft blue)
- **Text Primary**: #cdd6f4 (light gray)
- **Text Secondary**: #a6adc8 (muted gray)
- **Border**: #45475a (subtle border)

### Typography
- **Font Stack**:
  - UI: "Segoe UI", system-ui, sans-serif
  - Editor: "Cascadia Code", "Fira Code", "Consolas", monospace
  - Preview: "Segoe UI", system-ui, sans-serif
- **Base Size**: 14px

### Spacing System
- **Base Unit**: 8px
- **Content Padding**: 24px (3 units)
- **Component Gap**: 16px (2 units)

## Functionality Specification

### Core Features

1. **File Operations**
   - Open markdown file from local filesystem
   - Save markdown file to local filesystem
   - Auto-detect file changes

2. **Reading Mode (Default)**
   - Rendered markdown display
   - Scroll-based navigation
   - Clean, distraction-free reading experience

3. **Edit Mode**
   - Syntax-highlighted markdown textarea
   - Live preview update as user types
   - Real-time rendering with debounce (150ms)

4. **Mode Toggle**
   - Keyboard shortcut: Ctrl+E to toggle
   - Visual indicator of current mode
   - Smooth transition between modes

### User Interactions
- **File Open**: Click button or Ctrl+O
- **File Save**: Click button or Ctrl+S
- **Toggle Mode**: Click toggle or Ctrl+E
- **Text Editing**: Standard text editing in textarea

### Markdown Support
- Headers (h1-h6)
- Bold, italic, strikethrough
- Links and images
- Code blocks with syntax highlighting (basic)
- Blockquotes
- Lists (ordered and unordered)
- Horizontal rules
- Tables

## Acceptance Criteria

1. ✓ Application loads with empty state showing "Open a file to begin"
2. ✓ Can open .md files via button or Ctrl+O
3. ✓ Reading mode displays formatted markdown content
4. ✓ Edit mode shows split view with editor and preview
5. ✓ Preview updates in real-time when typing in edit mode
6. ✓ Can save modified content via button or Ctrl+S
7. ✓ Ctrl+E toggles between reading and edit modes
8. ✓ Visual style matches dark theme specification
9. ✓ Responsive layout adapts to window size
