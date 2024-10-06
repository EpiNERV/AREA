import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom'; // Import du hook useLocation
import Sidebar from './sidebar';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const location = useLocation(); // Obtenir la route actuelle
	const noNavBarLocations = ['/', '/login', '/register', '/password_forgotten', '/auth_verification', '/password_changed'];
  	const showNavBar = !noNavBarLocations.includes(location.pathname);


	return (
		<div className="flex h-screen">
			{showNavBar && (
				<div className="min-w-fit w-auto h-full">
					<Sidebar />
				</div>
			)}

			<div className="flex-1 h-full">
				<main className="p-4">{children}</main>
			</div>
		</div>
	);
};

export default Layout;
