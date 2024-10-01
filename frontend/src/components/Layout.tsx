import { ReactNode } from 'react';
import Navbar from './Navbar'; // Assurez-vous que le chemin est correct

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="flex">
			<Navbar />
			<main className="flex-1 bg-page_background">
				{children}
			</main>
		</div>
	);
};

export default Layout;