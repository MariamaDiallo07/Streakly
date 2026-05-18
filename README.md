# Streakly

A habit tracking web application built with React and Supabase.

## Live Demo
[streakly-xxx.vercel.app](streakly-nine.vercel.app)

## Features
- User authentication (signup, login, logout)
- Create and delete habits
- Check off habits daily with streak tracking
- Completion rate per habit
- XP and level system
- Analytics dashboard with streak leaderboard
- Protected routes — only logged in users can access the app

## Tech Stack
- **Frontend:** React, React Router, Vite
- **Backend:** Supabase (Auth, PostgreSQL database)
- **Deployment:** Vercel
- **Styling:** CSS with custom properties

## Database Schema
- `profiles` — stores username, XP, and level per user
- `habits` — stores habit name, color, streak, and rate per user
- `completions` — stores daily habit completions
