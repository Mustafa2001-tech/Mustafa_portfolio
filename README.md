# Mustafa Abdelrahman — Engineering Portfolio

[![Portfolio Live](https://img.shields.io/badge/Live-mustafa--portfolio--sage.vercel.app-00FFB2?style=for-the-badge&logo=vercel&logoColor=black)](https://mustafa-portfolio-sage.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

[![Portfolio Screenshot](https://github.com/Mustafa2001-tech/Mustafa_portfolio/blob/main/Screenshot%202026-05-08%20124820.png)](https://mustafa-portfolio-sage.vercel.app)

---

## Overview

A hyper-modern, fully responsive personal portfolio built with **Next.js 14** and deployed on **Vercel**. Designed with an Industrial-Minimalist aesthetic and Glassmorphism UI, featuring dual theming, interactive simulations, and a headless CMS pattern driven entirely by JSON files.

Built by a Computer Engineering student at **King Abdulaziz University** specializing in VLSI design and data-driven systems.

---

## Features

| Feature | Description |
| --- | --- |
| 🌗 **Dual Theme** | Cyber-Dark and Minimal-Paper themes with system preference detection and persistence via `localStorage` |
| 🌳 **Interactive Skill Tree** | SVG node map with animated edges representing academic and project milestones |
| 💼 **Experience Page** | Tabbed layout for Internships, Volunteer Work, and Research Projects |
| 📂 **Projects Page** | Card-based showcase with tags, status badges, and GitHub/demo links |
| 📚 **Digital Library** | Categorized grid of 100+ curated developer resources and tools |
| ⚡ **Logic Gate Simulator** | Real-time CMOS gate simulation — AND, OR, NAND, NOR, XOR, XNOR, NOT, BUFFER |
| 🖥️ **Git Command Simulator** | Interactive terminal with 6 guided challenges teaching real Git workflows |
| ⌨️ **Command Palette** | `Cmd+K` keyboard-driven navigation across all pages |
| 🖱️ **Custom Cursor** | SVG cursor with lagging ring trail on desktop |
| 📱 **Fully Responsive** | Mobile-first layout that works on all screen sizes |
| ✉️ **Contact Form** | Real email delivery via Formspree |

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 14 (App Router) |
| **Language** | JavaScript / JSX |
| **Styling** | Pure CSS with CSS Custom Properties |
| **Fonts** | Syne · Space Mono · JetBrains Mono |
| **Deployment** | Vercel |
| **Email** | Formspree |
| **Content** | JSON files — content.json, assets.json, experience.json |

---

## Project Structure

```text
├── app/
│   ├── page.js               Homepage — Bento grid layout
│   ├── skilltree/            Interactive SVG skill tree
│   ├── experience/           Tabbed experience page
│   ├── projects/             Projects showcase
│   ├── library/              Digital resource library
│   ├── playground/           Logic gate + Git simulators
│   └── contact/              Contact form with Formspree
├── components/
│   ├── Layout.jsx            Global layout wrapper
│   ├── NavOrb.jsx            Floating nav + command palette
│   ├── ThemeProvider.jsx     Theme context with localStorage
│   ├── Cursor.jsx            Custom cursor with trail
│   ├── SkillTree.jsx         SVG skill tree component
│   ├── GateSimulator.jsx     Logic gate simulator
│   └── GitSimulator.jsx      Git command simulator
├── data/
│   ├── content.json          Profile, projects, skill tree
│   ├── assets.json           Digital library resources
│   └── experience.json       Internships, volunteer, research
└── styles/
    └── globals.css           CSS variables, themes, grids
```
