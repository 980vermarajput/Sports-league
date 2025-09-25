# Sports Leagues App

A React application displaying sports leagues with search and filtering capabilities. Built as part of an online bookmaker platform simulation.

## 🚀 Features

- **League Display**: Fetch and display leagues from TheSportsDB API
- **Search & Filter**: Real-time search by league name and sport type filtering
- **Interactive Cards**: Click league cards to load season badges
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Caching**: Optimized API calls with TanStack Query caching

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **TanStack Query** for API state management
- **Tailwind CSS** for styling
- **TheSportsDB API** for sports data

## 🎯 Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 🤖 AI Tools & Design Decisions

### **GitHub Copilot Usage**

- **Primary UI Generation**: Copilot was extensively used for generating React component structures, Tailwind CSS classes, and responsive layouts
- **API Integration**: Assisted in writing TypeScript interfaces and React Query hooks
- **Styling Patterns**: Generated consistent grey/white theme classes and responsive grid layouts

### **Key Design Decisions**

- **Component Architecture**: Modular design with separate components for search, filter, and league display
- **State Management**: React Query for server state, local useState for UI state (search/filter)
- **Styling Approach**: Utility-first with Tailwind, grey/white theme for professional look
- **Performance**: Lazy badge loading only on card click, aggressive caching with React Query

### **API Strategy**

- **Caching**: 5-minute stale time, 10-minute garbage collection time
- **Error Handling**: Graceful fallbacks with user-friendly messages
- **Loading States**: Skeleton loaders and spinners for better UX

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── LeaguesList.tsx # Main container
│   ├── LeagueCard.tsx  # Individual league display
│   ├── SearchBar.tsx   # Search input
│   └── SportFilter.tsx # Sport dropdown
├── types/              # TypeScript interfaces
└── App.tsx            # Root component with providers
```
