import AppRoutes from './routes';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';

function App() {
	return (
		<ThemeProvider>
			<AppRoutes />
		</ThemeProvider>
	);
}

export default App;