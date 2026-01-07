# Task Management Application

A modern task management application built with React, TypeScript, Redux Toolkit, and Material UI.

## Features

- ✅ Add new tasks with title and description
- ✅ View all tasks in a list view
- ✅ Mark tasks as completed
- ✅ Filter tasks by completion status (all, active, completed)
- ✅ Drag-and-drop to reorder tasks
- ✅ Beautiful Material UI design

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Material UI** - UI components and styling
- **@dnd-kit** - Drag-and-drop functionality
- **Vite** - Build tool and dev server

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── AddTaskForm.tsx # Form to add new tasks
│   ├── TaskFilter.tsx  # Filter component
│   ├── TaskItem.tsx    # Individual task item
│   └── TaskList.tsx    # List of tasks with drag-and-drop
├── store/              # Redux store configuration
│   ├── store.ts        # Redux store setup
│   ├── taskSlice.ts    # Task slice with actions
│   └── hooks.ts        # Typed Redux hooks
├── types/              # TypeScript type definitions
│   └── task.ts         # Task and filter types
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Deployment

### Deploy to Vercel

1. Push your code to a Git repository (GitLab, GitHub, etc.)

2. Go to [Vercel](https://vercel.com) and sign in

3. Click "New Project" and import your repository

4. Vercel will automatically detect Vite and configure the build settings:
   - **Build Command**: `pnpm build` (or `npm run build`)
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install` (or `npm install`)

5. Click "Deploy" and wait for the build to complete

6. Your app will be live at `https://your-project.vercel.app`

### Manual Deployment

```bash
# Build the project
pnpm build

# The dist folder contains the production build
# Upload the contents of dist/ to your hosting provider
```

## Development

The app uses:
- **Redux Toolkit** for state management with a task slice containing:
  - `addTask` - Add a new task
  - `toggleTask` - Toggle task completion status
  - `reorderTasks` - Reorder tasks via drag-and-drop
  - `setFilter` - Filter tasks by status

- **@dnd-kit** for drag-and-drop functionality with keyboard and pointer support

- **Material UI** for a modern, responsive design

## License

MIT
