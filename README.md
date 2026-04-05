# 💻 ICT Typing Master

An advanced, interactive Typing Practice Application designed specifically for Information and Communication Technology (ICT) students. Built with **React** and **Tailwind CSS** for the web, and packaged powerfully with **Electron** and **Squirrel** for a seamless, installable native Windows Desktop experience!

---

## ✨ Features

### 👨‍🎓 **Student Typing Engine**
* **Immersive Terminal Interface**: The typing sandbox looks and feels like a real coding environment with glowing neon-green correct inputs and an authentic command-line layout.
* **Real-time Metrics**: Dynamic tracking of your Words per Minute (WPM), Accuracy percentage, and Mistakes count as you type using an exact elapsed-time engine.
* **Flexible Durations**: 15s, 30s, 60s, 120s, and a brutal 5-minute endurance challenge.

### 💼 **Native Windows Desktop Application**
* **Installer Setup**: Seamless 1-click silent installer (`Setup.exe`) powered by Squirrel that instantly registers the app to your Desktop and Start Menu natively.
* **Offline Execution**: Fully compiled with Electron to run entirely independently of a web browser.
* **Hardware Integration**: Hooks directly into the system for a fully polished, distraction-free fullscreen typing environment.

### 🛡️ **Admin Panel**
* **Content Management System**: Securely **Add, Edit, and Delete** practice contents (words, sentences, paragraphs) dynamically.
* **Filtering**: Instantly sort contents based on difficulty (Beginner, Intermediate, Advanced) and content type.

---

## 🛠️ Technology Stack

* **Core Engine**: [React 18](https://react.dev/) (Vite scaffolding)
* **Desktop Wrapper**: [Electron v41](https://www.electronjs.org/)
* **Packaging Tool**: `electron-packager` & `electron-winstaller`
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **State & Persistence**: React Hooks combined with local storage arrays.

---

## 🚀 Building the Windows Installer (`.exe`)

Want to compile the true native Desktop application yourself? We completely bypassed tricky Windows Defender code-signing blocks by using raw standalone compression pipelines!

### 1. Requirements
Make sure you have `Node.js` installed.
```bash
git clone https://github.com/RohanShill/ICT-Typing-App.git
cd "ICT Typing App"
npm install
```

### 2. Generate the Standalone Executable
You can build the underlying portable executable folder first:
```bash
npm run build
npx electron-packager . "ICT Typing Master" --platform=win32 --arch=x64 --out=release --overwrite
```

### 3. Generate the 1-Click Installer
Once the portable app is generated, you can run our custom script to compress it into a professional Squirrel Setup File (`Setup.exe`):
```bash
node makeInstaller.cjs
```
Your final shareable installer will automatically appear in:
`release/Installer/ICT-Typing-Master-Setup.exe`!

---

## 🌐 Running as a Web App

If you prefer to run it strictly in your browser (development mode):
```bash
npm run dev
```

---

## 🔐 Default Admin Credentials

To verify your custom sentences, words, and modify tests dynamically via the web GUI or Desktop GUI:

* **Username:** `admin`
* **Password:** `1234`

---

<p align="center">
  <i>Built with ❤️ by <a href="https://github.com/RohanShill">Rohan Shill</a></i>
</p>
