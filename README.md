# Sinsi usa la plantilla de nextjs con tailwindcss 

Sinsi es un asistente petulante que adquiere vida propia, buscando una carcasa reconocible 


## usage

1. Clone this repo
2. npm install
3. npm run dev

## notes

**styles/main.css**
The styles/main.css files includes tailwindcss imports and also supports global styles. It is processed by postcss and with postcss-preset-env supports nesting and other cool stuff.

**postcss.config.js**
The configuration file for postcss.

**tailwind.config.js**
You should know that file, its the default config generated with `npx tailwindcss init`. It's where your tailwindcss config goes.

**pages/\_app.js**
Here we integrate `styles/main.css` into the app.
