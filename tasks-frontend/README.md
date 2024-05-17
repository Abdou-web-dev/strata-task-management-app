This is a Task management application built with React, TypeScript, and Vite , Express...

Prerequisites
Before running this project locally, ensure you have the following installed on your machine:

Node.js (v14.x or later)
npm (v6.x or later)

Getting Started
Follow the steps below to run the Todo app locally:

1. Clone the Repository

   # git clone https://github.com/Abdou-web-dev/strata-task-management-app.git

2. Navigate to the front Project Directory

   # cd tasks-frontend

3. Install Dependencies

   # npm install

4. Start the Development Server

   # npm run dev

<!-- IMPORTANT !!! -->

<!-- create a ".env" file in the api folder , then copy/paste this inside :
            PORT=5000
            MONGODB_URI=mongodb://127.0.0.1:27017/task_manager
            ACCESS_TOKEN_SECRET=W9XUoP41GDOOAV6RhVfbLU37PmZ2z5dGhhsildh0mI2hGYWy5UhRwKJbUYcyt4iq 
-->
<!-- you can replace 'W9XUoP41GDOOAV6RhVfbLU37PmZ2z5dGhhsildh0mI2hGYWy5UhRwKJbUYcyt4iq" with a token of your choosing -->

2. Navigate to the backend Project Directory

   # cd .. ===> cd api

3. Install Dependencies

   # npm install

4. Start the Development Server

   # npm run dev

This will start the development server and open the app in your default web browser. If it doesn't open automatically, you can access the app by navigating to http://localhost:5173/ in your browser.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
