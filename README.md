# Tempo News UI

**Tempo News UI** is a modern frontend application built with React and Vite.

## Prerequisites

- **Node.js**: v23.6.1
- **Package Manager**: npm, yarn, or pnpm

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/sholehbaktiabadi/tempo-news-ui.git
   cd tempo-news-ui
   ```

2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
   or
   ```sh
   pnpm install
   ```

## Running the App

### Development Mode

Start the development server with hot-reloading:
```sh
npm run dev
```
or
```sh
yarn dev
```
or
```sh
pnpm dev
```

The app will be available at **http://localhost:5173** (default Vite port).

### Production Mode

1. Build the project:
   ```sh
   npm run build
   ```
   or
   ```sh
   yarn build
   ```
   or
   ```sh
   pnpm build
   ```

2. Serve the built files:
   ```sh
   npm run preview
   ```
   or
   ```sh
   yarn preview
   ```
   or
   ```sh
   pnpm preview
   ```

The app will be available at **http://localhost:4173** (default Vite preview port).

## Project Structure
```
tempo-news-ui/
├── src/          # Source code
├── public/       # Static assets
├── .env          # Environment variables
├── package.json  # Project dependencies and scripts
├── vite.config.ts # Vite configuration
└── README.md     # Project documentation
```