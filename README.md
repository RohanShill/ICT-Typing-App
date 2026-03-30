# 💻 ICT Typing Master

An advanced, interactive Typing Practice Web Application designed specifically for Information and Communication Technology (ICT) students. Built with React and Tailwind CSS, this platform helps students improve their typing speed and accuracy through various structured challenges (words, sentences, and paragraphs) with immersive real-time feedback.

---

## ✨ Features

### 👨‍🎓 **Student Typing App**
* **Immersive Terminal Interface**: The typing sandbox looks and feels like a real coding environment with glowing neon-green correct inputs and an authentic command-line layout.
* **Real-time Live Metrics**: Dynamic tracking of your Words per Minute (WPM), Accuracy percentage, and Mistakes count as you type.
* **Flexible Durations**: 15s, 30s, 60s, 120s, and 5-minute endurance challenges.
* **Live Error Handling**: Precision highlighting system prevents typing errors from polluting the interface while keeping track of missed strokes.

### 🛡️ **Admin Panel**
* **Protected Dashboard**: A secure local-storage based administration portal.
* **Content Management System**: Easily **Add, Edit, and Delete** practice contents (words, sentences, paragraphs). 
* **Dynamic Content Filtering**: Instantly sort contents based on difficulty (Beginner, Intermediate, Advanced) and content type.
* **Pre-bundled Data**: Pre-loaded default ICT terms and phrases for an instant deployment experience.

### 🎨 **UI / UX Upgrades**
* Fully Responsive Design (Mobile & Desktop).
* **Dark Mode** toggle available globally in a beautiful Glassmorphism navigation bar.
* Smooth, buttery transition animations built into page navigation.

---

## 🛠️ Technology Stack

* **Frontend Framework**: [React 18](https://react.dev/) (Vite scaffolding)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Routing**: React Router DOM (v6)
* **Icons**: [Lucide React](https://lucide.dev/)
* **State & Persistence**: React Hooks (`useState`, `useEffect`, `useMemo`) combined with Browser `localStorage`.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need `Node.js` installed on your system.
* Check if Node.js is installed by running: `node -v`

### Installation

1. **Clone the repository** (if you aren't already locally installed):
   ```bash
   git clone https://github.com/YourUsername/ict-typing-master.git
   ```

2. **Navigate to the directory**:
   ```bash
   cd "ICT Typing App"
   ```

3. **Install exact dependencies**:
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the localhost port provided in the terminal (usually `http://localhost:5173`).

---

## 🔐 Default Admin Credentials

To verify your custom sentences, words, and modify tests dynamically, log in at the `/admin` page.

* **Username:** `admin`
* **Password:** `1234`

---

## 📂 Project Structure Overview

```text
📦 ICT Typing App
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 ContentForm.jsx       # Modal for modifying tests
 ┃ ┃ ┗ 📜 Navbar.jsx            # Top app navigation
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 AdminDashboard.jsx    # Table of current database
 ┃ ┃ ┣ 📜 AdminLogin.jsx        # Credentials portal
 ┃ ┃ ┣ 📜 Home.jsx              # Student Start Area
 ┃ ┃ ┣ 📜 Result.jsx            # Summary Screen (WPM/Accuracy)
 ┃ ┃ ┗ 📜 TypingTest.jsx        # Terminal Typing Sandbox 
 ┃ ┣ 📂 utils
 ┃ ┃ ┗ 📜 storage.js            # LocalStorage handlers
 ┃ ┣ 📜 App.jsx                 # Routing logic
 ┃ ┣ 📜 index.css               # Tech Grid & Glow utilities
 ┃ ┗ 📜 main.jsx                # React Entry point
 ┣ 📜 index.html
 ┣ 📜 package.json
 ┗ 📜 vite.config.js
```

---

<p align="center">
  <i>Developed to enhance typing literacy for the next generation of coders.</i>
</p>
