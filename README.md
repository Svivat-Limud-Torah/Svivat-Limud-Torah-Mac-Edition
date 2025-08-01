
# Torah Study Environment - Mac Edition

![Torah IDE](https://img.shields.io/badge/Torah-IDE-blue) ![macOS](https://img.shields.io/badge/macOS-Compatible-green) ![English](https://img.shields.io/badge/Language-English-blue)

## Overview

**Torah Study Environment** is an advanced application designed for Torah study and research, combining cutting-edge technological tools with authentic Jewish sources. The application enables smart search, text organization, and efficient work with Torah sources in an advanced and effective manner.

---

## Mac System Requirements

### Minimum Requirements:
- **Operating System**: macOS 10.15 (Catalina) and above
- **Memory**: 4GB RAM (8GB+ recommended)
- **Storage**: 500MB free space
- **Processor**: Intel or Apple Silicon (M1/M2/M3)
- **Internet Connection**: Required for search and updates

### Required Software:
- **Node.js**: Version 18.0 and above
- **Browser**: Safari, Chrome, Firefox, or Edge

---

## Download and Installation

### Step 1: Download Node.js

1. Visit [nodejs.org](https://nodejs.org)
2. Download the LTS (Long Term Support) version for macOS
3. Run the downloaded file (.pkg)
4. Follow the installation instructions
5. Verify installation by opening Terminal and running:
   ```bash
   node --version
   ```

### Step 2: Download Torah Study Environment

1. Download the project from GitHub or extract the compressed file
2. Open Terminal (find it in Applications > Utilities)
3. Navigate to the project directory:
   ```bash
   cd /path/to/Torah-IDE-Mac-Edition
   ```

### Step 3: Install Dependencies

1. Within the project directory, navigate to the backend folder:
   ```bash
   cd torah-ide/backend
   npm install
   ```

2. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   npm install
   ```

### Step 4: Initial Launch

1. Open two Terminal windows
2. **In the first window** - start the backend server:
   ```bash
   cd torah-ide/backend
   npm start
   ```

3. **In the second window** - start the frontend interface:
   ```bash
   cd torah-ide/frontend
   npm run dev
   ```

4. The browser will automatically open to `http://localhost:3000`

---

## User Guide

### Main Features

#### 🔍 Smart Search
- Advanced search in Torah texts
- Search by keywords, roots, or phrases
- Combined search across multiple sources simultaneously

#### 📚 Text Management
- Import and organize Torah texts
- Create custom categories and tags
- Save favorites and bookmarks

#### ✏️ Editing Tools
- Advanced text editor with Hebrew support
- Text highlighting and important marking
- Add personal notes and commentary

#### 📊 Analysis and Statistics
- Word frequency analysis
- Charts and learning progress metrics
- Detailed reports on study activity

### Basic Operations

1. **Create New Project**: 
   - Click "New Project" on the home page
   - Name the project and choose a category

2. **Import Texts**:
   - Drag PDF or TXT files to the upload area
   - The application will automatically detect Hebrew text

3. **Advanced Search**:
   - Use the top search bar
   - Add filters by source, date, or topic

4. **Save Work**:
   - Work is saved automatically with every change
   - Can export to various formats (PDF, Word)

---

## Common Issues Troubleshooting

### 🔧 Installation Issues

**Error: "command not found: node"**
```bash
# Check if Node.js is installed:
which node

# If not installed, download from the official website
```

**Error: "permission denied"**
```bash
# Give execution permissions to files:
chmod +x torah-ide/setup_files/Torah-IDE.sh
```

**Port Busy**
```bash
# If port 3000 is busy, change in settings file:
# Edit frontend/vite.config.js
```

### 🌐 Browser Issues

- **Page not loading**: Ensure the server is running and not closed
- **Text not displaying correctly**: Check that the browser supports Hebrew
- **Slowness**: Clear browser cache or use private mode

### 📱 Performance Issues

- **High memory usage**: Close other applications during use
- **Slowness**: Ensure minimum 4GB free memory
- **Freezing**: Update Node.js to the latest version

---

## Updates and Maintenance

### Update Project
```bash
# Navigate to project directory
cd Torah-IDE-Mac-Edition

# Update code
git pull origin main

# Update dependencies
cd torah-ide/backend && npm update
cd ../frontend && npm update
```

### Data Backup
- Personal settings saved in: `~/Library/Application Support/Torah-IDE/`
- Projects saved in: `~/Documents/Torah-IDE-Projects/`
- Recommended to backup these folders regularly

---

## Support and Help

### Contact Methods

📧 **Email**: svivat-limud-torah@gmail.com  
🐙 **GitHub Issues**: Open an issue on the project page  
📚 **Documentation**: Find additional information in the `docs/` folder

### Frequently Asked Questions

**Is there English support?**  
The application is primarily adapted for Hebrew, but English support can be added.

**How to add new sources?**  
Use the "Import Sources" tool or contact us to add new sources.

**Is data saved in the cloud?**  
Currently local storage only. Cloud feature will be added in the future.

---

## License and Copyright

The project is distributed under MIT license. You may use, modify, and distribute freely with source attribution.

**Developed by**: Torah Study Environment Team  
**Current Version**: 1.0.0  
**Last Update**: August 2025

---

## Contributing to the Project

We welcome community contributions! Ways to contribute:

1. **Bug Reports**: Open an Issue on GitHub
2. **Improvement Suggestions**: Send email or open Discussion
3. **Translations**: Help translate to additional languages  
4. **Code**: Send Pull Request with improvements

Thank you for choosing Torah Study Environment! 🙏

---

*"Torah study is equivalent to all of them"* - Mishnah Peah 1:1

**Node.js**  
- Windows: Node.js v22.15.0 (x64) or the appropriate version for your PC  
- macOS: Latest stable Node.js from the official site

**Operating Systems**  
- Windows 10 or newer (64‑bit)  
- macOS 10.15 (Catalina) or newer

**Hardware**  
- 4 GB RAM minimum (8 GB+ recommended)  
- 200 MB free disk space

---

## 3. INSTALLATION INSTRUCTIONS

### 3.1 WINDOWS EDITION

**Level 1 – Node.js Install**  
- Download `node-v22.15.0-x64.msi` from the official Node.js site.  
- Run the MSI and follow the wizard.

**Level 2 – Dependencies Setup**  
- Open **Command Prompt** and navigate to the Torah‑IDE root folder.  
- Run:
  ```bat
  Torah-IDE-Setup.bat
  ```
- This installs all required npm packages.

**Level 3 – First Launch**  
- A window will open displaying a URL.  
- Click the link to start the IDE in your default browser.  
- **Important**: Do **NOT** close this Command Prompt window—it’s running the server for the IDE.

**Subsequent Launches**  
- Double-click the **Torah‑IDE** desktop shortcut.  
- The IDE will start; **do NOT close the original terminal window** or the IDE server will shut down.

### 3.2 MACOS EDITION

**Level 1 – Node.js Install**  
- Visit [nodejs.org](https://nodejs.org) and download the macOS installer.  
- Run the installer and complete setup.

**Level 2 – Dependencies Setup**  
- Open **Terminal** and `cd` into the `setup_files` directory.  
- Execute:
  ```sh
  ./Torah-IDE.sh
  ```
- This installs dependencies and opens a browser with the IDE link.

**Level 3 – First & Future Launches**  
- **First Time**: Click the link to start the IDE.  
- **Subsequent**: Use the desktop shortcut in **Applications** or your custom alias.  
- **Important**: Do **NOT** close the Terminal window running the script—it’s the IDE server.

---

## 4. VERIFICATION & TROUBLESHOOTING

**Check Node Version**:
```bash
node -v
```
Should return v22.15.0 (or your installed version).

**Log Files**:  
- Windows: `%USERPROFILE%\Torah-IDE\logs\`  
- macOS: `~/Torah-IDE/logs/`

**Common Issues**:
- **“Command not found”**: Ensure `.sh` is executable (`chmod +x Torah-IDE.sh`).  
- **Port already in use**: Change default port in `config.json`.

---

## 5. GLOSSARY & NOTES

- **Torah‑IDE**: A Bible-based, ultra-fast code editor.  
- **Support**: Raise issues on the GitHub Issues page if you hit roadblocks.

---

*End of SRS Document*
