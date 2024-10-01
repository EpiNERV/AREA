import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Button } from "@/components/ui/button.tsx";
// import { Carousel } from "@/components/ui/carousel.tsx";
import { useState } from "react";

export default function ProfilePage() {
	const [selectedMenu, setSelectedMenu] = useState("account-info");

	return (
		<aside className="w-[75%] h-[95vh] p-4 absolute right-0 mx-5 flex flex-col justify-between rounded-lg"
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

			<div className="flex items-center justify-center">
				<div className="w-[80%] ml-8">

					{/* Account */}
					{selectedMenu === "account-info" && (
						<div className="p-6 grid grid-cols-3 grid-rows-2 gap-6">

							{/* Profile Picture */}
							<div className="flex flex-col items-center col-span-3">
								<img
									src="/icons/Navbar/adrien.lachambre@epitech.eu.JPG"
									alt="Profile"
									className="w-40 h-40 rounded-xl mb-4 border-2 p-1 object-cover"
								/>
								<Button variant="ghost">Change Profile Picture</Button>
							</div>

							{/* Username Form */}
							<div className="p-6 rounded-lg shadow-md col-span-1">
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
							<div className="p-6 rounded-lg shadow-md col-span-1">
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
							<div className="p-6 rounded-lg shadow-md col-span-1">
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
				</div>
			</div>

			{/* Integrations */}
			{/*	{selectedMenu === "account-integration" && (*/}
			{/*		<div className="p-6 bg-white rounded-lg shadow-md grid grid-cols-4 gap-4">*/}
			{/*			/!* Row 1 *!/*/}
			{/*			<Carousel>*/}
			{/*				<img src="/icons/twitter.png" alt="Twitter" className="w-20 h-20"/>*/}
			{/*				<Button variant="primary">Connect</Button>*/}
			{/*			</Carousel>*/}
			{/*			<Carousel>*/}
			{/*				<img src="/icons/discord.png" alt="Discord" className="w-20 h-20"/>*/}
			{/*				<Button variant="primary">Connect</Button>*/}
			{/*			</Carousel>*/}
			{/*			<Carousel>*/}
			{/*				<img src="/icons/reddit.png" alt="Reddit" className="w-20 h-20"/>*/}
			{/*				<Button variant="primary">Connect</Button>*/}
			{/*			</Carousel>*/}
			{/*			<Carousel>*/}
			{/*				<img src="/icons/telegram.png" alt="Telegram" className="w-20 h-20"/>*/}
			{/*				<Button variant="primary">Connect</Button>*/}
			{/*			</Carousel>*/}

			{/*			/!* Row 2 *!/*/}
			{/*			<Carousel>*/}
			{/*				<img src="/icons/youtube.png" alt="Youtube" className="w-20 h-20"/>*/}
			{/*				<Button variant="primary">Connect</Button>*/}
			{/*			</Carousel>*/}
			{/*			<Carousel>*/}
			{/*				<img src="/icons/google-drive.png" alt="Google Drive" className="w-20 h-20"/>*/}
			{/*				<Button variant="primary">Connect</Button>*/}
			{/*			</Carousel>*/}
			{/*			<Carousel>*/}
			{/*				<img src="/icons/microsoft-mail.png" alt="Microsoft Mail" className="w-20 h-20"/>*/}
			{/*				<Button variant="primary">Connect</Button>*/}
			{/*			</Carousel>*/}
			{/*			<Carousel>*/}
			{/*				<img src="/icons/spotify.png" alt="Spotify" className="w-20 h-20"/>*/}
			{/*				<Button variant="primary">Connect</Button>*/}
			{/*			</Carousel>*/}
			{/*		</div>*/}
			{/*	)}*/}
			{/*</div>*/}
		</aside>
	);
}