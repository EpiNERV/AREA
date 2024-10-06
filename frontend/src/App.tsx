import AppRoutes from './routes';
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
	return (
		<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
			<AppRoutes />
		</ThemeProvider>
	);
}

export default App;
