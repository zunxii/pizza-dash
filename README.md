
# 🍕 Pizza Dash – Order Management Dashboard

![GitHub repo size](https://img.shields.io/github/repo-size/zunxii/pizza-dash?color=blue&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/zunxii/pizza-dash?style=flat-square&color=success)
![Next.js](https://img.shields.io/badge/Next.js-000?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)

---

> Developed by **Junaid** zunxii.2210@gmail.com

## 📌 Overview

**Pizza Dash** is a sleek and modern admin dashboard built to manage pizza orders with ease. Designed for speed and security, it includes authentication using Google OAuth via NextAuth.js. This dashboard is perfect for managing users, orders, and other business activities, with a fully responsive and accessible UI using **Shadcn** components.

![Pizza Dash Screenshot Placeholder](https://raw.githubusercontent.com/zunxii/pizza-dash/main/public/dashboard.png)

---

## 🧩 Tech Stack

- ⚡ **Next.js** – Framework for server-side rendering and static site generation
- 🔐 **NextAuth.js** – Seamless authentication with providers like Google
- 🎨 **Tailwind CSS** – Utility-first styling for modern UIs
- 🟦 **TypeScript** – Strong typing for scalable development
- 🧱 **Shadcn/UI** – Beautifully styled component library
- 🌐 **Google OAuth** – Secure login via Google accounts

---

## 🛠️ Setup Instructions

### 🔧 1. Clone the Repo

```bash
git clone https://github.com/zunxii/pizza-dash.git
cd pizza-dash
```

### 📦 2. Install Dependencies
```bash
npm install
# or
yarn install
```
### 🧪 3. Configure Environment Variables
#### Create a .env.local file in the root directory with the following keys:

```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000
```

### 🔐 Google OAuth Setup Guide
#### To enable Google login using NextAuth:

  1. Go to the Google Cloud Console.

  2. Navigate to APIs & Services → Credentials.

  3. Click "Create Credentials" → "OAuth 2.0 Client ID".

  4. Choose Web Application.

#### Under Authorized redirect URIs, add:

```bash
http://localhost:3000/api/auth/callback/google
```
#### Copy your Client ID and Client Secret and place them in .env.local:

```bash
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
Generate a secure NEXTAUTH_SECRET using:
```
```bash
openssl rand -base64 32
▶️ Run the App
```
```bash
npm run dev
# or
yarn dev
```

### Open your browser at http://localhost:3000

## Crafted with ❤️ by Junaid 
