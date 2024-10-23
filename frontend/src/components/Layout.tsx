import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar.tsx"
import { useLocation } from "react-router-dom";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	const location = useLocation();
	const noSideBarLocations = ['/', '/login', '/register', '/password_forgotten', '/auth_verification', '/password_changed'];
	const showSideBade = !noSideBarLocations.includes(location.pathname);

	return (
		<SidebarProvider>
			<div className="flex flex-1">
				{showSideBade && <AppSidebar />}
				<main className="flex-1 flex flex-col">
					{showSideBade && <SidebarTrigger />}
					{children}
				</main>
			</div>
		</SidebarProvider>
	);
}