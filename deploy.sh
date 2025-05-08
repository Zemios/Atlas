#!/bin/bash

ng build

if [ ! -d "dist/zemios/browser" ]; then
  echo "El directorio dist/zemios/browser no existe. Asegúrate de que el build se realizó correctamente."
  exit 1
fi

cd dist/zemios/browser

if [ ! -d ".git" ]; then
  echo "Inicializando el repositorio Git..."
  git init
  git remote add origin ssh://zemios@zemios.com/~/zemios.com.git
else
  echo "Repositorio Git ya inicializado."
fi

git fetch origin main
git reset --soft origin/main

git add .
git commit -m "Actualización del build"
git push -u origin main

ssh zemios.com << 'EOF'
  if [ ! -d "/home/zemios/zemios.com" ]; then
    git clone /home/zemios/zemios.com.git /home/zemios/zemios.com
  fi
  cd /home/zemios/zemios.com
  git pull origin
EOF