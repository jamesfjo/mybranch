# VSL Market Website - Codespaces Development Environment

This repository is configured for GitHub Codespaces, allowing you to easily edit and preview your website in the cloud.

## Getting Started with Codespaces

1. Click the green "Code" button on the GitHub repository
2. Select the "Codespaces" tab
3. Click "Create codespace on [branch-name]"
4. Wait for the codespace to build (first time may take a few minutes)

## Running the Development Server

Once your codespace is ready, you have several options to run a local development server:

### Option 1: Live Server (Recommended)
```bash
npm start
```
This will start a development server on port 3000 with live reload.

### Option 2: Live Server with Watch
```bash
npm run dev
```
Same as above, but explicitly watches all files for changes.

### Option 3: Simple Python Server
```bash
npm run serve
```
This starts a simple Python HTTP server on port 8000.

### Option 4: VS Code Live Server Extension
- Right-click on `index.html` in the file explorer
- Select "Open with Live Server"

## Editing Your Website

All website files are in the root directory:
- `index.html` - Main landing page
- `indexx.html` - Alternative page
- `css/styles.css` - Stylesheet
- `js/main.js` - JavaScript functionality
- `assets/`, `images/` - Media files

Simply edit any file and save. If you're using a development server, your changes will automatically reload in the browser.

## Ports

The following ports are configured and will be automatically forwarded:
- **Port 3000**: Live Server / npm start
- **Port 8000**: Python HTTP server
- **Port 5500**: VS Code Live Server extension

When a server starts, you'll see a notification with a button to open it in your browser.

## VS Code Extensions

The following extensions are automatically installed:
- **Live Server**: Quick development server with live reload
- **Prettier**: Code formatting
- **ESLint**: JavaScript linting
- **Auto Rename Tag**: Automatically rename paired HTML tags
- **Tailwind CSS IntelliSense**: CSS utility suggestions

## Making Changes

1. Edit files in the VS Code editor
2. Save your changes (Cmd+S / Ctrl+S)
3. Preview in the browser (refresh if not using live reload)
4. Commit and push changes when ready

## Tips

- Use the integrated terminal (Ctrl+`) to run commands
- The workspace is automatically formatted on save
- All your changes are automatically saved to your branch
- You can create multiple codespaces for different branches
