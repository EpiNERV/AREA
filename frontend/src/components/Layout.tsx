import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom'; // Import du hook useLocation
import Sidebar from './sidebar';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const location = useLocation(); // Obtenir la route actuelle

	return (
		<div className="flex">
			{location.pathname !== '/' && <Sidebar />}
			<main className="flex-1">
				{children}
			</main>
		</div>
	);
};

export default Layout;
