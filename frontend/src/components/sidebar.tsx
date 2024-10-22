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
			title: t('Sidebar.HomeSidebar'),
			url: "/home",
			icon: Home,
		},
		{
			key: 'documentation',
			title: t('Sidebar.Documentation'),
			url: "/documentation",
			icon: Search,
		},
	];

	const AdminList = [
		{
			key: 'backendSettings',
			title: t('Sidebar.BackendSettings'),
			url: "/backend-settings",
			icon: Settings,
		},
		{
			key: 'usersManagement',
			title: t('Sidebar.UsersManagement'),
			url: "/users-management",
			icon: UserIcon,
		},
	];

	const UserMenu = [
		{
			key: 'profileInformation',
			title: t('Sidebar.ProfileInformations'),
			url: "/user/profile_informations",
			icon: Settings,
			className: ''
		},
		{
			key: 'profileServices',
			title: t('Sidebar.ProfileServices'),
			url: "/user/profile_services",
			icon: BadgeCheck,
			className: ''
		},
		{
			key: 'logout',
			title: t('Sidebar.LogOut'),
			icon: LogOut,
			onClick: () => {
				logout();
			},
			className: 'text-red-500'
		},
	];

	return (
		<Sidebar variant="sidebar" collapsible="icon">
			<SidebarHeader>{t('Sidebar.Area')}</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>{t('Sidebar.User')}</SidebarGroupLabel>
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
					<SidebarGroupLabel>{t('Sidebar.Admin')}</SidebarGroupLabel>
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
				<SidebarGroupLabel>{t('Sidebar.User')}</SidebarGroupLabel>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<a href="/accessibility">
								<HelpingHandIcon />
								<span>{t('Sidebar.AccessibilitySidebar')}</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<UserIcon /> {t('Sidebar.Username')}
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