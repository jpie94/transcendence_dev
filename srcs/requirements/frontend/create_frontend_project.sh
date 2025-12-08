#!/bin/sh

# 1. Créer le projet
npm create vite@latest app -- --template vanilla-ts

cd ./app

# 2. Ajouter Tailwind
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# 3. Ajouter les fichiers de config (déjà générés automatiquement)
#    - tailwind.config.js
#    - postcss.config.js
#    - vite.config.ts
#    - tsconfig.json

# 4. Lancer le serveur de dev
# npm run dev
