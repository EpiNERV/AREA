import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar.tsx"
import { useLocation } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const noNavBarLocations = ['/', '/login', '/register', '/password_forgotten', '/auth_verification', '/password_changed'];
	const showNavBar = !noNavBarLocations.includes(location.pathname);

	return (
		<SidebarProvider>
			<div className="flex flex-1">
				{showNavBar && <AppSidebar />}
				<main className="flex-1 flex flex-col">
					{showNavBar && <SidebarTrigger />}
					{children}
				</main>
			</div>
		</SidebarProvider>
	);
}