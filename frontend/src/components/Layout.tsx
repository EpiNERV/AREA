import { ReactNode } from 'react';
import Sidebar from './sidebar';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="flex">
			<Sidebar />
			<main className="flex-1">
				{children}
			</main>
		</div>
	);
};

export default Layout;