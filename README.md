# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Get Start with Vite :

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

# Get Start with React Router:

### 1. run: `npm i react-router-dom@<version>`

### 2. go to `<projectName>/src/App.jsx` and add :

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './pages/Page';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="<pageRouteName>" element={<Page />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
```

### 3. link the pages with `<Link to="/<pageName>"/>` or `<NavLink to="/<pageName>"/>`

### 4. if we wanna use a route as a default route we can use `index` attribute for `<Route/>`

### 5. the `<Outlet/>` Component from React Router allow us to place a nested Route in Parent Route

### 6. We can use the params and query string as states from url with this react router custom hooks :

```jsx
// Params
const params = useParams();
const paramsVar = params.paramsVar;

// QueryString
const [searchParams, setSearchParams] = useSearchParams();
const queryVar = searchParams.get('queryVar');
const setSearchParams({queryVar:newValue});
```

### 7. We can navigate the routes with custom hook below:

```jsx
const navigate = useNavigate();
function loadForm() {
	navigate('form');
}
function goBack() {
	navigate(-1);
}
```
