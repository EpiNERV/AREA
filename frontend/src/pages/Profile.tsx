import { useState } from "react";
import { GoogleIcon, SpotifyIcon, YoutubeIcon, TelegramIcon, RedditIcon, GithubIcon, DiscordIcon, TwitterIcon } from "@/components/IntegrationsCarouselIcons.tsx";
import { Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button.tsx";

type ServiceKey = 'google' | 'spotify' | 'youtube' | 'telegram' | 'reddit' | 'github' | 'discord' | 'twitter';

interface Service {
	name: string;
	icon: string;
	key: ServiceKey;
}

export default function ProfilePage() {
	const [selectedMenu, setSelectedMenu] = useState("account-info");

	const [connections, setConnections] = useState<Record<ServiceKey, boolean>>({
		google: false,
		spotify: false,
		youtube: false,
		telegram: false,
		reddit: false,
		github: false,
		discord: false,
		twitter: false,
	});

	const toggleConnection = (service: ServiceKey) => {
		setConnections((prev) => ({
			...prev,
			[service]: !prev[service],
		}));
	};

	const services: Service[] = [
		{ name: "Google", icon: "/icons/google-drive.png", key: "google" },
		{ name: "Spotify", icon: "/icons/spotify.png", key: "spotify" },
		{ name: "YouTube", icon: "/icons/youtube.png", key: "youtube" },
		{ name: "Telegram", icon: "/icons/telegram.png", key: "telegram" },
		{ name: "Reddit", icon: "/icons/reddit.png", key: "reddit" },
		{ name: "GitHub", icon: "/icons/github.png", key: "github" },
		{ name: "Discord", icon: "/icons/discord.png", key: "discord" },
		{ name: "Twitter", icon: "/icons/twitter.png", key: "twitter" },
	];

	return (
		<aside className="w-[75%] h-[95vh] p-4 absolute right-0 mx-5 flex flex-col  rounded-lg"
		       style={{top: '19px', boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.3)'}}
		>
			<div className="flex items-center justify-center">
				<Tabs defaultValue="account-info">
					<TabsList className="flex">
						<TabsTrigger
							value="account-info"
							onClick={() => setSelectedMenu("account-info")}
							className={selectedMenu === "account-info" ? "active-tab" : ""}
						>
							Profile information
						</TabsTrigger>
						<TabsTrigger
							value="account-integration"
							onClick={() => setSelectedMenu("account-integration")}
							className={selectedMenu === "account-integration" ? "active-tab" : ""}
						>
							Integrations
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>

			<div className="flex flex-col items-center justify-center">
				<div className="w-[100%]">

					{/* Account */}
					{selectedMenu === "account-info" && (
						<div className="p-6 grid grid-cols-3 grid-rows-2 gap-6">

							{/* Profile Picture */}
							<div className="flex flex-col items-center col-span-3">
								<img
									src="/icons/Navbar/adrien.lachambre@epitech.eu.jpg"
									alt="Profile"
									className="w-40 h-40 rounded-xl mb-4 border-2 p-1 object-cover"
								/>
								<Button variant="ghost">Change Profile Picture</Button>
							</div>

							{/* Username Form */}
							<div className="p-6 rounded-lg col-span-1" style={{ boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.3)' }}>
								<form className="space-y-4">
									<div>
										<label htmlFor="current-username" className="block text-sm font-medium">Current Username</label>
										<input
											type="text"
											id="current-username"
											className="input w-full border border-gray-300 p-3 rounded"
											placeholder="Old Username"
											disabled
										/>
									</div>
									<div>
										<label htmlFor="new-username" className="block text-sm font-medium">New Username</label>
										<input
											type="text"
											id="new-username"
											className="input w-full border border-gray-300 p-3 rounded"
											placeholder="Enter new username"
										/>
									</div>
									<Button type="submit" variant="ghost">
										Change Username
									</Button>
								</form>
							</div>

							{/* Email Form */}
							<div className="p-6 rounded-lg col-span-1" style={{ boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.3)' }}>
								<form className="space-y-4">
									<div>
										<label htmlFor="current-email" className="block text-sm font-medium">Current Email</label>
										<input
											type="email"
											id="current-email"
											className="input w-full border border-gray-300 p-3 rounded"
											placeholder="Enter current email"
										/>
									</div>
									<div>
										<label htmlFor="new-email" className="block text-sm font-medium">New Email</label>
										<input
											type="email"
											id="new-email"
											className="input w-full border border-gray-300 p-3 rounded"
											placeholder="Enter new email"
										/>
									</div>
									<Button type="submit" variant="ghost">
										Change Email
									</Button>
								</form>
							</div>

							{/* Password Form */}
							<div className="p-6 rounded-lg col-span-1" style={{ boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.3)' }}>
								<form className="space-y-4">
									<div>
										<label htmlFor="current-password" className="block text-sm font-medium">Current Password</label>
										<input
											type="password"
											id="current-password"
											className="input w-full border border-gray-300 p-3 rounded"
											placeholder="Enter current password"
										/>
									</div>
									<div>
										<label htmlFor="new-password" className="block text-sm font-medium">New Password</label>
										<input
											type="password"
											id="new-password"
											className="input w-full border border-gray-300 p-3 rounded"
											placeholder="Enter new password"
										/>
									</div>
									<Button type="submit" variant="ghost">
										Change Password
									</Button>
								</form>
							</div>
						</div>
					)}

					{/* Integrations */}
					{selectedMenu === "account-integration" && (
						<div className="p-6 grid grid-cols-4 gap-4">
							{services.map((service) => (
								<div key={service.key} className="flex flex-col items-center mb-4">
									<Carousel className="w-full max-w-xs">
										<CarouselContent>
											<CarouselItem>
												<div className="p-1">
													<Card>
														<CardContent className="flex aspect-square items-center justify-center p-6">
															{service.key === 'google' ? (
																<GoogleIcon style={{width: '80px', height: '80px', marginBottom: '16px'}}/>
															) : service.key === 'spotify' ? (
																<SpotifyIcon style={{width: '80px', height: '80px', marginBottom: '16px'}}/>
															) : service.key === 'youtube' ? (
																<YoutubeIcon style={{width: '80px', height: '80px', marginBottom: '16px'}}/>
															) : service.key === 'telegram' ? (
																<TelegramIcon style={{width: '80px', height: '80px', marginBottom: '16px'}}/>
															) : service.key === 'reddit' ? (
																<RedditIcon style={{width: '80px', height: '80px', marginBottom: '16px'}}/>
															) : service.key === 'github' ? (
																<GithubIcon style={{width: '80px', height: '80px', marginBottom: '16px'}}/>
															) : service.key === 'discord' ? (
																<DiscordIcon style={{width: '80px', height: '80px', marginBottom: '16px'}}/>
															) : service.key === 'twitter' ? (
																<TwitterIcon style={{width: '80px', height: '80px', marginBottom: '16px'}}/>
															) : (
																<div/>
															)}
														</CardContent>
													</Card>
												</div>
											</CarouselItem>
										</CarouselContent>
									</Carousel>

									<Button
										variant="default"
										className={`${connections[service.key] ? "bg-red-500" : "bg-blue-500"} mt-4`}
										onClick={() => toggleConnection(service.key)}
									>
										{connections[service.key] ? "Sign out" : "Sign in"}
									</Button>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</aside>
	);
}