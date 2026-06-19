# Dinesh B — React Portfolio

A modern, responsive React portfolio built from the supplied resume. It includes dedicated files/sections for Home, About, Skills, Projects, LeetCode, Education and Contact, plus full project detail pages for FetchMate and the Telegram Group Music Bot.

## Features

- React + Vite single-page app
- Firebase Hosting ready (`firebase.json` included)
- Responsive dark glassmorphism UI
- Dedicated project detail pages:
  - `/projects/fetchmate`
  - `/projects/telegram-music-bot`
- LeetCode stats section with daily cache and refresh button
- Resume download from `/public/Dinesh-Resume.pdf`
- Contact form that opens the user's email client with a prepared message

## Project structure

```txt
src/
  App.jsx
  main.jsx
  styles.css
  components/
    Footer.jsx
    MetricRing.jsx
    Navbar.jsx
    ProjectCard.jsx
    SectionHeader.jsx
  data/
    profile.js
  pages/
    About.jsx
    Contact.jsx
    Education.jsx
    Home.jsx
    LeetCode.jsx
    ProjectDetail.jsx
    Projects.jsx
    Skills.jsx
  services/
    leetcode.js
```

## Configure LeetCode username

The LeetCode section reads the username from `VITE_LEETCODE_USERNAME`.

1. Copy `.env.example` to `.env`.
2. The default username is already set to `dineshu_u`; change it only if needed.

```bash
cp .env.example .env
# edit .env
VITE_LEETCODE_USERNAME=dineshu_u
```

The website fetches stats from public LeetCode stat providers, stores the result in `localStorage` using today's date, and automatically fetches fresh stats on the next day.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# choose your Firebase project, set public directory to dist, configure as SPA: Yes
npm run deploy
```

A `firebase.json` is already included with SPA rewrites, so if Firebase asks to overwrite it, choose **No** unless you want to recreate the config.
