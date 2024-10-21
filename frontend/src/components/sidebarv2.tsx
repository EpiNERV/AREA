import { useAuth } from '@/lib/auth/AuthContext';
import { ChevronUp, HelpingHandIcon, Home, Search, Settings, UserIcon, BadgeCheck, LogOut } from "lucide-react";
import { useTranslation } from 'react-i18next';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarHeader,
	SidebarFooter,
} from "@/components/ui/sidebar";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppSidebar() {
	const { logout } = useAuth();
	const { t } = useTranslation();

	const AreaList = [
		{
			key: 'home',
			title: t('Home'),
			url: "/home",
			icon: Home,
		},
		{
			key: 'documentation',
			title: t('Documentation'),
			url: "/documentation",
			icon: Search,
		},
	];

	const AdminList = [
		{
			key: 'backendSettings',
			title: t('Backend settings'),
			url: "/backend-settings",
			icon: Settings,
		},
		{
			key: 'userManagement',
			title: t('User management'),
			url: "/user-management",
			icon: UserIcon,
		},
	];

	const UserMenu = [
		{
			key: 'profileInformation',
			title: t('Profile information'),
			url: "/user/profile_informations",
			icon: Settings,
		},
		{
			key: 'profileServices',
			title: t('Profile services'),
			url: "/user/profile_services",
			icon: BadgeCheck,
		},
		{
			key: 'logout',
			title: t('Log out'),
			icon: LogOut,
			onClick: () => {
				logout();
			},
			className: 'text-red-500'
		},
	];

	return (
		<Sidebar variant="sidebar" collapsible="icon">
			<SidebarHeader>{t('Area')}</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>{t('Area')}</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{AreaList.map((item) => (
								<SidebarMenuItem key={item.key}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
					<SidebarGroupLabel>{t('Admin')}</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{AdminList.map((item) => (
								<SidebarMenuItem key={item.key}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarGroupLabel>{t('User')}</SidebarGroupLabel>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="/accessibility">
								<HelpingHandIcon />
								<span>{t('Accessibility')}</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<UserIcon /> {t('Username')}
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width]"
							>
								<SidebarMenu>
									{UserMenu.map((item) => (
										<SidebarMenuItem key={item.key}>
											{item.url ? (
												<SidebarMenuButton asChild>
													<a href={item.url} className={item.className ? item.className : ''}>
														<item.icon />
														<span>{item.title}</span>
													</a>
												</SidebarMenuButton>
											) : (
												<SidebarMenuButton onClick={item.onClick} className={item.className ? item.className : ''}>
													<item.icon />
													<span>{item.title}</span>
												</SidebarMenuButton>
											)}
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}