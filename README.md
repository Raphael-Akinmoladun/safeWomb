# 🤰 SafeWomb

[![Expo](https://img.shields.io/badge/Maintained%20with-Expo-000020.svg?style=flat&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat&logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**SafeWomb** is a specialized mobile application built to empower expectant mothers with the tools, tracking, and information they need for a healthy pregnancy. Developed using React Native and Expo, the app provides a high-performance, cross-platform experience with a focus on security and ease of use.

---

## 📖 Table of Contents
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Available Scripts](#-available-scripts)
* [Environment Variables](#-environment-variables)
* [Contributing](#-contributing)
* [License](#-license)

---

## ✨ Features

* **Pregnancy Progress Tracker:** Visual milestones and weekly updates on fetal development.
* **Health Metrics Logging:** Securely record weight, blood pressure, and daily symptoms.
* **Appointment Reminders:** Never miss a prenatal checkup with built-in scheduling.
* **Resource Library:** Expert-backed articles and tips for maternal wellness and nutrition.
* **Native Performance:** Fully optimized for both iOS and Android via Expo Prebuild.

---

## 🛠️ Tech Stack

* **Framework:** [React Native](https://reactnative.dev/)
* **Platform:** [Expo](https://expo.dev/) (Managed Workflow / Prebuild)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/)
* **Bundler:** [Metro](https://metrobundler.dev/)
* **Development:** [EAS (Expo Application Services)](https://expo.dev/eas)

---

## 📁 Project Structure

```text
├── .expo/                # Expo configuration and cache
├── android/              # Native Android project (generated)
├── ios/                  # Native iOS project (generated)
├── app/                  # Main application routes and screens
├── app-example/          # Reference implementation and boilerplate
├── assets/               # Local images, fonts, and splash screens
├── node_modules/         # Project dependencies
└── .gitignore            # Git exclusion rules
```

### 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

* **Node.js**: [Download and install Node.js](https://nodejs.org/) (LTS version recommended).
* **Git**: [Install Git](https://git-scm.com/) if you haven't already.
* **Expo Go**: Download the app on your [iOS](https://apps.apple.com/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) device to test the app.

### Installation & Setup

Copy and paste the following commands into your terminal:

```bash
# 1. Clone the repository
git clone [https://github.com/Raphael-Akinmoladun/safeWomb.git](https://github.com/Raphael-Akinmoladun/safeWomb.git)

# 2. Navigate into the project directory
cd safeWomb

# 3. Install the dependencies
npm install

# 4. Start the development server
npx expo start
```
---

## ⚙️ Available Scripts

In the project directory, you can run the following commands to develop, test, and build your application:

### Development
* **`npx expo start`**: Starts the Metro bundler. This is your primary command to begin development.
* **`npx expo start --tunnel`**: Starts the dev server using a tunnel (useful if your phone and computer are on different Wi-Fi networks).

### Native Execution
* **`npx expo run:android`**: Compiles and runs your app on a connected Android device or emulator.
* **`npx expo run:ios`**: Compiles and runs your app on an iOS simulator (requires macOS and Xcode).

### Production & Build
* **`eas build --platform android`**: Starts a production build for Android using Expo Application Services.
* **`eas build --platform ios`**: Starts a production build for iOS.
* **`npx expo export`**: Exports the static files for your application (useful for web hosting or self-hosting updates).

### Maintenance
* **`npx expo install --check`**: Checks your project's dependencies for compatibility with your current Expo version.

---
##API Configuration
EXPO_PUBLIC_API_URL=https://your-api-endpoint.com

### Storage/Database Configuration
EXPO_PUBLIC_STORAGE_BUCKET=your_bucket_id

#### Optional: Feature Flags
EXPO_PUBLIC_ENABLE_ANALYTICS=false

---

##🔐 Environment Variables
Create a .env file in the root directory to store your API keys and configuration:

Code snippet
EXPO_PUBLIC_API_URL=[https://your-api-endpoint.com](https://your-api-endpoint.com)
EXPO_PUBLIC_STORAGE_BUCKET=your_bucket_id

---

##🤝 Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create.

Fork the Project.

Create your Feature Branch (git checkout -b feature/AmazingFeature).

Commit your Changes (git commit -m 'Add some AmazingFeature').

Push to the Branch (git push origin feature/AmazingFeature).

Open a Pull Request.

---

##📄 License
Distributed under the MIT License. See LICENSE for more information.

📫 Contact
Raphael Akinmoladun GitHub: @Raphael-Akinmoladun

Project Link: https://github.com/Raphael-Akinmoladun/safeWomb

---


# 🤰 safeWomb Backend API & Voice AI

The backbone of the **safeWomb** platform. This server manages health data analysis via REST endpoints and provides a real-time **AI Voice Assistant** using WebSockets and Google Gemini.

---

## 🚀 Overview

This backend is a hybrid server that integrates traditional HTTP requests with high-speed WebSockets. It acts as the bridge between the expectant mother's mobile interface and advanced AI diagnostics.



### 核心 Core Features
* **Gemini-Powered Voice Assistant:** Real-time audio-to-audio communication using `gemini-2.5-flash`.
* **Health Data Analysis:** Dedicated routes for processing and storing pregnancy-related data.
* **Dual-Protocol Server:** Runs Express (REST) and WS (WebSockets) simultaneously on a single port.
* **Database Persistence:** Robust document storage using MongoDB and Mongoose.

---

## 🛠️ Tech Stack

* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **AI Engine:** [Google Generative AI (Gemini)](https://ai.google.dev/)
* **Real-time:** [ws (WebSockets)](https://github.com/websockets/ws)
* **Database:** [MongoDB](https://www.mongodb.com/) via Mongoose
* **Security:** CORS & Dotenv

---

## 📁 Repository Structure

```text
├── controllers/          # Business logic for data analysis
├── routes/               # API endpoint definitions (REST)
├── .env                  # Environment secrets (ignored by Git)
├── server.js             # Main entry point (the code you sent)
└── package.json          # Dependencies and scripts
```

---


## 🚥 API Endpoints
REST APIMethodEndpointDescriptionGET/api/healthCheck if the server is live.USE/api/*Access analysis routes and controllers.WebSocket (Voice)ProtocolConnection URLModalityWSws://localhost:5000Audio stream in / Audio stream out

---

## ⚙️ Installation & Setup
### Clone the repository
Bash
git clone [https://github.com/Raphael-Akinmoladun/safeWomb.git](https://github.com/Raphael-Akinmoladun/safeWomb.git)

### Install dependencies
Bash
npm install
### Configure Environment Variables
Create a .env file in the root directory:Code snippetPORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
### Run the Server
Bash
Development mode
npm run dev
Production mode
node server.js
🎤 How the Voice AI Works
#### Connection: The React/Expo frontend opens a WebSocket connection to the server.
#### Audio Input: The client sends raw audio chunks (mp3) through the socket.
#### Gemini Processing: The server converts the buffer to Base64 and sends it to the gemini-2.5-flash model with instructions to "Reply with a spoken response."
#### Audio Output: The server receives the AI's spoken response and pipes it back to the frontend as a Buffer for immediate playback.

---

## 🤝 Contributing
Please ensure that any new routes follow the controller-service pattern currently implemented in analysisRoutes.

---

## 📄 License
This project is licensed under the MIT License.
