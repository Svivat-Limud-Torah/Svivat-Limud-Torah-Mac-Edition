const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  showSaveDialog: (args) => ipcRenderer.invoke('show-save-dialog', args),
  showDirectoryPicker: () => ipcRenderer.invoke('show-directory-picker'),
  closeApp: () => ipcRenderer.invoke('close-app'),
  showPromptDialog: (args) => ipcRenderer.invoke('show-prompt-dialog', args),
  // Add other IPC channels here if needed in the future
});

// Override the global prompt function to use our custom implementation
window.prompt = async function(message, defaultValue) {
  try {
    const result = await window.electronAPI.showPromptDialog({
      message: message,
      defaultValue: defaultValue || ''
    });
    
    if (result.cancelled) {
      return null;
    }
    
    if (result.shouldUseModal) {
      // Return a promise that will be resolved by a custom modal
      return new Promise((resolve) => {
        // Create a custom modal dialog
        const modal = document.createElement('div');
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          font-family: Arial, sans-serif;
        `;
        
        modal.innerHTML = `
          <div style="background: white; padding: 20px; border-radius: 8px; min-width: 300px; text-align: center; direction: rtl;">
            <p style="margin-bottom: 15px; color: #333;">${message}</p>
            <input type="text" id="promptInput" value="${defaultValue || ''}" style="width: 100%; padding: 8px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; text-align: right;" />
            <div>
              <button id="promptOk" style="padding: 8px 16px; margin: 5px; background: #007cba; color: white; border: none; border-radius: 4px; cursor: pointer;">אישור</button>
              <button id="promptCancel" style="padding: 8px 16px; margin: 5px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer;">ביטול</button>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        const input = modal.querySelector('#promptInput');
        const okBtn = modal.querySelector('#promptOk');
        const cancelBtn = modal.querySelector('#promptCancel');
        
        input.focus();
        input.select();
        
        const cleanup = () => {
          document.body.removeChild(modal);
        };
        
        okBtn.onclick = () => {
          const value = input.value;
          cleanup();
          resolve(value);
        };
        
        cancelBtn.onclick = () => {
          cleanup();
          resolve(null);
        };
        
        input.onkeydown = (e) => {
          if (e.key === 'Enter') {
            okBtn.click();
          } else if (e.key === 'Escape') {
            cancelBtn.click();
          }
        };
      });
    }
    
    return result.value || null;
  } catch (error) {
    console.error('Error in custom prompt:', error);
    return null;
  }
};
