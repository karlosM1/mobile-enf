# 📱 AI-nforcer Mobile App

An intelligent mobile companion for motorcycle riders, powered by smart detection systems. This app notifies users if they've been flagged for violations such as **not wearing a helmet**, and provides helpful tools like **Google Maps integration**, **weather updates**, and **safety tips** before, during, and after rides.

Designed to promote road safety and give riders more control and awareness over their driving behavior.

---

## 🚀 Tech Stack

- **React Native (TypeScript)** – Cross-platform mobile development
- **NativeWind CSS** – Utility-first styling with Tailwind syntax for React Native
- **Zustand** – Lightweight and scalable state management

---

## ⚙️ Features

### 🔐 Authentication
- **Sign In / Sign Up** with secure credential management
- Persistent login sessions using async storage

### 🚨 Violation Notifications
- Get notified if detected without a helmet
- View violation history and related details

### 🗺️ Google Maps Integration
- Interactive map showing locations of violations
- Navigate through traffic and check nearby checkpoints

### 🌦️ Weather Teller
- Displays real-time weather updates based on your location
- Helps riders plan better for their trips

### 🛡️ Safety Tips
- Curated safety checklists and advice:
  - Before the ride (gear checks, condition checks)
  - During the ride (safe riding practices)
  - After the ride (parking, security, maintenance)

---

## 📦 Installation

> Requires Node.js, Yarn/NPM, and Expo CLI

```bash
# Clone the repo
git clone https://github.com/your-username/ai-nforcer-mobile.git
cd ai-nforcer-mobile

# Install dependencies
npm install

# Start the development server
npx expo start
```
## 📁 Project Structure
```bash
.
├── src/
│   ├── screens/          # App screens (SignIn, Home, Violations, Map, etc.)
│   ├── components/       # Reusable UI components
│   ├── store/            # Zustand state management
│   ├── lib/              # Utility functions and API helpers
│   └── assets/           # Images, icons, and fonts
```
## 🤝 Contributing
Pull requests are welcome. For major feature suggestions or changes, please open an issue first to discuss your idea.
