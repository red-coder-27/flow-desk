# FlowDesk 🚀

A **production-quality, fully working all-in-one productivity app** built with React 18, Vite, and localStorage. Zero backend, zero authentication, 100% offline. No TODOs. No placeholders.

![FlowDesk](https://img.shields.io/badge/version-1.0.0-purple)
![React](https://img.shields.io/badge/react-18.x-61dafb)
![Vite](https://img.shields.io/badge/vite-5.x-646cff)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 📊 Dashboard
- **Real-time statistics**: Today's habits, focus time, tasks completed, current streak
- **Weekly analytics**: Beautiful charts showing productivity trends
- **Habit ring**: Visual representation of your daily habit completion
- **Timer status**: Quick view of your current Pomodoro session
- **Motivational quotes**: Daily rotating inspirational quotes
- **Task summary**: Quick overview of upcoming tasks

### 🎯 Habits
- **84-day heatmap**: GitHub-style contribution grid with color-coded intensity
- **Streak tracking**: Automatic streak calculation with visual badges
- **Habit customization**: Add emojis, colors, and set frequency (daily/weekdays/weekends)
- **Daily completion**: One-click habit marking with confetti celebration on 100% completion
- **Archive system**: Archive habits to keep your dashboard clean
- **Swipe to delete**: Mobile-friendly gesture controls

### ⏱️ Focus Timer (Pomodoro)
- **Customizable durations**: Work (5-60min), short break (1-15min), long break (5-30min)
- **Smart scheduling**: Auto-transition between work/break sessions
- **Visual countdown**: SVG ring animation with progress tracking
- **Audio feedback**: 3-tone ascending chime for work completion, soft bell for breaks
- **Session logging**: Track all your focus sessions with duration and timestamps
- **Statistics**: Calculate total focus time per day/week/month
- **Keyboard shortcuts**: Space (play/pause), R (reset), S (skip)

### 📋 Kanban Board
- **Drag & drop**: Fully functional dnd-kit implementation
- **3 columns**: To-Do, In Progress, Done with custom emojis
- **Priority filtering**: Filter by high/medium/low priority
- **Advanced search**: Search tasks by title and description
- **Task creation**: Add title, description, priority, due date, and column
- **Inline deletion**: Quick delete buttons with visual feedback
- **Responsive layout**: Works seamlessly on mobile and desktop

### 🌙 Theme System
- **Three themes**: Dark (default), Light, System
- **Smooth transitions**: CSS variable animations on theme changes
- **System preference detection**: Respects system color scheme
- **Per-session persistence**: Theme preference saved in localStorage
- **Glassmorphism design**: Modern frosted glass UI elements

### ⚙️ Settings
- **Data export**: Download all habits, tasks, and settings as JSON
- **Data import**: Restore from backup file (with validation)
- **Selective clearing**: Clear habits, tasks, or all data independently
- **About section**: Version info and GitHub repository link

### 📱 Mobile Support
- **Responsive design**: Optimized for phones, tablets, and desktops
- **Bottom navigation**: Mobile-exclusive navigation bar on screens < 768px
- **Touch-optimized**: 48px+ touch targets, swipe gestures
- **PWA capability**: Install as app on home screen, works offline

### 🎮 Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `D` | Dashboard |
| `H` | Habits |
| `F` | Focus Timer |
| `T` | Tasks/Kanban |
| `Space` | Play/Pause Timer |
| `R` | Reset Timer |
| `S` | Skip to next session |
| `?` | Show shortcuts modal |

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16.x or higher
- **npm** 8.x or higher

### Installation

```bash
# Clone or extract the project
cd FlowDesk

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:5173` with hot module reloading (HMR).

## 📦 Tech Stack

### Core
- **React 18.3.1**: UI library with hooks
- **Vite 5.x**: Lightning-fast build tool
- **React Router DOM 6.x**: Client-side routing

### State Management & Persistence
- **localStorage API**: Zero-server persistence (all data lives locally)
- **React Context API**: Global state for theme and timer
- **Custom hooks**: `useHabits`, `useTasks`, `useTheme`

### UI & Styling
- **Aesthetic Glassmorphism**: High-blur frosted glass UI (`blur(24px)`) with edge-lighting and drop shadows
- **Fluid Backgrounds**: 15s animated mesh gradient backgrounds that breathe and shift dynamically
- **Premium Typography**: Uses the 'Outfit' geometric sans-serif font for a state-of-the-art SaaS feel
- **Responsive Grid**: Mobile-first layouts with smooth micro-interactions and hover elevations
- **CSS Variables**: Instant dark/light/system theme switching

### Data Visualization
- **Recharts 2.x**: Line charts for weekly analytics
- **SVG Canvas**: Custom 84-day heatmap and timer ring

### Interactions
- **@dnd-kit**: Headless drag-and-drop system
- **Lucide React**: 200+ consistent icons
- **React Hot Toast**: Toast notifications
- **Canvas Confetti**: Celebration effects on habit completion

### PWA & Offline
- **Vite Plugin PWA**: Progressive web app capabilities
- **Service Workers**: Offline functionality and caching
- **Web Audio API**: Native browser sounds (no external files)

### Performance
- **Code splitting**: Lazy-loaded pages (Timer, Tasks)
- **Tree-shaking**: Unused code elimination
- **Minification**: Production builds optimized for size

## 📁 Project Structure

```
FlowDesk/
├── src/
│   ├── utils/
│   │   ├── storage.js           # localStorage wrapper
│   │   ├── dateUtils.js         # Date calculations & formatting
│   │   └── quotes.js            # Daily motivational quotes
│   ├── contexts/
│   │   ├── ThemeContext.jsx     # Theme state & system detection
│   │   └── TimerContext.jsx     # Global timer state & audio
│   ├── hooks/
│   │   ├── useHabits.js         # Habit CRUD & streak logic
│   │   ├── useTasks.js          # Task CRUD & kanban logic
│   │   └── useTheme.js          # Theme hook (if custom)
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Sidebar.jsx      # Left navigation
│   │   │   ├── TopNav.jsx       # Header with shortcuts modal
│   │   │   └── BottomNav.jsx    # Mobile navigation
│   │   ├── Dashboard/
│   │   │   ├── DashboardHome.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── WeeklyChart.jsx
│   │   │   └── QuoteCard.jsx
│   │   ├── Habits/
│   │   │   ├── HabitList.jsx
│   │   │   ├── HeatMap.jsx
│   │   │   ├── HabitCard.jsx
│   │   │   └── AddHabitModal.jsx
│   │   ├── Timer/
│   │   │   ├── TimerCircle.jsx
│   │   │   ├── TimerControls.jsx
│   │   │   ├── TimerSettings.jsx
│   │   │   └── SessionLog.jsx
│   │   ├── Tasks/
│   │   │   ├── KanbanBoard.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskColumn.jsx
│   │   │   └── AddTaskModal.jsx
│   │   ├── Settings/
│   │   │   └── SettingsPage.jsx
│   │   └── common/
│   │       ├── ErrorBoundary.jsx
│   │       └── Toast.jsx
│   ├── pages/
│   │   └── TimerPage.jsx        # Lazy-loaded timer page
│   ├── App.jsx                  # Root component with routing
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles & animations
├── public/
│   └── vite.svg
├── vite.config.js               # PWA & build config
├── package.json
├── package-lock.json
└── README.md
```

## 🎯 Storage Schema

All data is stored in **localStorage** with these keys:

```javascript
// Habits: Array of habit objects
localStorage['HABITS'] = [
  {
    id: 'uuid',
    name: 'Morning Meditation',
    emoji: '🧘',
    color: 'purple',
    frequency: 'daily',
    completedDates: ['2024-01-15', '2024-01-16'],
    archived: false,
    createdAt: timestamp
  }
]

// Tasks: Array of task objects
localStorage['TASKS'] = [
  {
    id: 'uuid',
    title: 'Complete proposal',
    description: 'Finish Q1 proposal',
    priority: 'high',
    column: 'in-progress',
    dueDate: '2024-01-20',
    createdAt: timestamp
  }
]

// Timer Sessions: Array of session objects
localStorage['TIMER_SESSIONS'] = [
  {
    id: 'uuid',
    type: 'work',
    duration: 1500,
    completedAt: '2024-01-15T14:30:00Z'
  }
]

// Timer Settings: Configuration object
localStorage['TIMER_SETTINGS'] = {
  workDuration: 1500,
  shortBreakDuration: 300,
  longBreakDuration: 900,
  longBreakInterval: 4,
  autoBreak: true,
  autoPomodoro: true,
  soundEnabled: true,
  tickSoundEnabled: false
}

// Theme: Theme preference
localStorage['THEME'] = 'dark' // or 'light', 'system'
```

## 🔧 Development Commands

```bash
# Start dev server with HMR
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview

# Build PWA manifest and service worker
npm run build  # PWA handled by vite.config.js
```

## 📋 Verification Checklist

- ✅ Dashboard displays real-time stats (habits, focus time, tasks, streak)
- ✅ Weekly chart shows 7-day productivity trend
- ✅ Habits page shows 84-day heatmap with color intensity
- ✅ Add habit modal with emoji picker and color selector
- ✅ Habit cards show 7-day mini completion indicators
- ✅ Streak badges visible on habits (e.g., "7 day streak")
- ✅ Timer circle animates with progress ring
- ✅ Timer plays audio (3-tone chime + bell) on completion
- ✅ Timer settings allow customization of all durations
- ✅ Session log shows last 20 sessions with stats
- ✅ Kanban board has 3 draggable columns: To-Do, In Progress, Done
- ✅ Task cards show priority, due date, description
- ✅ Search and filter pills working on tasks
- ✅ Dark/light/system theme switching
- ✅ All themes persist on reload
- ✅ Settings page allows export/import of all data
- ✅ Keyboard shortcuts working (D/H/F/T, Space/R/S, ?)
- ✅ Mobile responsive (sidebar hidden, bottom nav shown on <768px)
- ✅ PWA installable (works offline after install)
- ✅ No backend API calls (100% localStorage)
- ✅ No placeholder code or TODOs remaining
- ✅ All interactions smooth with animations

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI (one time)
npm i -g vercel

# Deploy from project root
vercel
```

Follow the prompts and your app will be live at a unique `.vercel.app` domain.

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

1. Update `vite.config.js` with base path
2. Run `npm run build`
3. Deploy `dist/` folder

## 🔒 Privacy & Security

- **No data collection**: 100% of data stays on your device
- **No backend**: No servers, no databases, no analytics
- **No tracking**: No cookies, no beacons, no external requests (except fonts)
- **Local first**: All computations happen in your browser
- **Exportable**: Download your data anytime as JSON

## 💾 Backup & Recovery

Regular backups are essential. Use the Settings page to:
1. Export all data (creates JSON file download)
2. Import previous backups (restores everything)
3. Clear data selectively (habits, tasks, or all)

## 🎨 Customization

### Colors & Theming

Edit the CSS variables in [src/index.css](src/index.css):

```css
:root {
  --accent: #c4b5fd;  /* Change primary color */
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  /* ... more variables */
}
```

### Pomodoro Defaults

Edit [src/contexts/TimerContext.jsx](src/contexts/TimerContext.jsx) to change default durations:

```javascript
DEFAULT_SETTINGS = {
  workDuration: 1500,      // 25 minutes
  shortBreakDuration: 300, // 5 minutes
  longBreakDuration: 900,  // 15 minutes
  longBreakInterval: 4,    // Long break every 4 pomodoros
  autoBreak: true,
  autoPomodoro: true,
```

### Habits, Tasks, Columns

All data is 100% customizable via the UI. No config files needed.

## 🐛 Troubleshooting

### Browser Storage Full?
- Most browsers allow 5-10MB for localStorage
- Use Settings → Clear Data to free space
- Export data before clearing with Settings → Export

### Data Not Saving?
- Check browser localStorage is enabled
- Private/Incognito mode doesn't persist storage
- Try a regular browsing session

### Offline Not Working?
- Refresh page after installing PWA
- Ensure app was fully loaded before going offline
- Service worker caches on first visit

### Timer Audio Not Playing?
- Check browser audio permissions
- Unmute browser tab (click speaker icon)
- Ensure "Sound Enabled" is on in Settings

## 📝 License

MIT License - Feel free to fork, modify, and deploy!

## 🙏 Credits

Built with ❤️ using:
- React - UI library
- Vite - Next-gen bundler
- Recharts - Data visualization
- @dnd-kit - Drag & drop
- Lucide Icons - Icon library
- All inspired by the amazing open-source community


