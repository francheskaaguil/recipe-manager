# Recipe Manager

A recipe management application built with React, TypeScript, Tailwind CSS, and DaisyUI. Search recipes using TheMealDB, save your favorites, and manage your personal recipe collection.

## Features

- Search recipes from TheMealDB API.
- Display recipe names, categories, images, and ingredients.
- Save recipes to your personal collection.
- Edit recipe details and personal notes.
- Mark and unmark favorite recipes.
- Delete saved recipes.
- Filter saved recipes by category.
- Display total recipes and favorite counts.
- Store saved recipes using JSON Server.
- Fetch and cache data using TanStack React Query.

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- DaisyUI
- Axios
- TanStack React Query
- TheMealDB API
- JSON Server

## Getting Started

### 1. Clone the repository

git clone https://github.com/francheskaaguil/recipe-manager.git
cd recipe-manager

### 2. Install dependencies

npm install

### 3. Configure environment variables

Copy the example environment file:

For Windows PowerShell:

Copy-Item .env.example .env

The environment file contains:

env
VITE_MEALDB_URL=https://www.themealdb.com/api/json/v1/1
VITE_API_URL=http://localhost:3001

### 4. Start JSON Server

Open a terminal and run:

npm run api

JSON Server runs at:

http://localhost:3001

### 5. Start the development server

Open another terminal and run:

npm run dev

Open the local URL displayed in your terminal.

## Available Commands

| Command | Description |
|---|---|
| npm run dev | Start the development server |
| npm run api | Start JSON Server |
| npm run build | Build the application for production |
| npm run preview | Preview the production build |

## Project Structure

text
recipe-manager/
├── src/
│   ├── components/
│   ├── features/
│   │   ├── meals/
│   │   └── recipes/
│   ├── lib/
│   ├── App.tsx
│   └── main.tsx
├── db.json
├── .env.example
├── .gitignore
├── package.json
└── README.md

## API Sources

- TheMealDB: https://www.themealdb.com/api.php
- JSON Server: https://github.com/typicode/json-server

## Notes

- TheMealDB provides the external recipe search data.
- JSON Server stores saved recipes locally in db.json.
- Create your own .env file using .env.example.
- Never commit your actual .env file.

## Author

Francheska Nicole Aguil

BS Information Technology