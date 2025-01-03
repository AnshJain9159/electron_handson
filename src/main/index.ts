/* eslint-disable prettier/prettier */

import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { createNote, deleteNote, getNotes, readNote, writeNote } from './lib'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'

let mainWindow: BrowserWindow | null = null; 

function createWindow(): void {
  if (mainWindow) return; // Prevent multiple windows

   mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    center: true,
    frame: true,
    ...(process.platform === 'win32'
      ? { backgroundColor: '#00000000', transparent: true }
      : { vibrancy: 'under-window', visualEffectState: 'active' }),
    trafficLightPosition: { x: 15, y: 10 },
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null; 
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  //yaha se sare features invoke honge application ke
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.handle('getNotes',(_,...args: Parameters<GetNotes>)=>getNotes(...args))
  ipcMain.handle('readNote',(_,...args: Parameters<ReadNote>)=>readNote(...args))
  createWindow()
  ipcMain.handle('writeNote',(_,...args: Parameters<WriteNote>)=>writeNote(...args))
  createWindow()
  ipcMain.handle('createNote',(_,...args: Parameters<CreateNote>)=>createNote(...args))
  createWindow()
  ipcMain.handle('deleteNote',(_,...args: Parameters<DeleteNote>)=>deleteNote(...args))
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
