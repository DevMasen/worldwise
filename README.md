# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Get Started with Vite :

### 1. run: `npm create vite@<version>`

### 2. Choose `<projectName>`

### 3. Choose `React`

### 4. Choose `JavaScript`

### 5. run:

```powershell
cd <projectName>
npm install
npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev
```

### 6. go to `<projectName>/.eslintrc.json` and add :

```json
{
	"extends": "react-app"
}
```

### 7. go to `<projectName>/vite.config.js` and add :

```js
import eslint from 'vite-plugin-eslint';
export default defineConfig({
	plugins: [react(), eslint()],
});
```

### 8. run: `npm run dev`
