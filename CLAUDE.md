# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quick Five is a React + TypeScript mobile scoring app for tracking game scores. It runs as a web app (deployed to GitHub Pages) and as an Android app via Capacitor.

## Commands

- `yarn dev` — start Vite dev server
- `yarn build` — TypeScript check + Vite production build
- `yarn lint` — TypeScript type check (`tsc --noEmit`)
- `yarn format` — format with Prettier
- `yarn format:check` — check formatting without writing

There are no tests configured yet.

## Architecture

**State management:** The app uses React's `useReducer` in `src/App.tsx` with a `GameAction` union type defined in `src/types/game.ts`. Game state (players, scores, history) is persisted to localStorage via `src/hooks/useLocalStorage.ts`.

**UI:** Built with Chakra UI 3.x. Theme toggling (dark/light) uses next-themes, configured in `src/components/ui/provider.tsx`.

**Mobile:** Capacitor wraps the web app for Android. `yarn cap:sync` builds and syncs to the Android project. The Vite base path is `/quick-five/` for GitHub Pages deployment.

**CI:** GitHub Actions runs `format:check`, `lint`, and `build` on PRs. Pushes to main also deploy to GitHub Pages. Release management uses release-please.
