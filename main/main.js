const electron = require('electron');
const path = require('path');

const { app, BrowserWindow } = require('electron');

const isDevMode = process.execPath.match(/[\\/]electron/);

function createWindow() {
    // Create the browser window.
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
    win = new BrowserWindow({ width, height, minWidth: 965, minHeight: 800 });
    win.loadURL(isDevMode ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    // Open the DevTools.
    if (isDevMode) {
        win.webContents.openDevTools();
    }

    //open urls in default browser
    win.webContents.on('new-window', (e, url) => {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
