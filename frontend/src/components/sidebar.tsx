import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/ThemeProvider"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons"

export default function Sidebar() {
	const { setTheme, theme } = useTheme();
	const [language, setLanguage] = useState("en");

	const handleThemeChange = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	const handleLanguageChange = (value: string)  => {
		setLanguage(value);
		localStorage.setItem("selectedLanguage", value);
	};

	useEffect(() => {
		const savedLanguage = localStorage.getItem("selectedLanguage");
		if (savedLanguage) {
			setLanguage(savedLanguage);
		}
	}, []);

	return (
		<aside className="h-[95vh] p-4 absolute left-0 mx-5 flex flex-col justify-between rounded-lg"
		       style={{
							top: '19px',
							boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.3)',
						}}
		>
			{/* Header */}
			<div className="flex items-center space-x-2">
				<div className="rounded-xl border-2 p-1">
					<img src="/icons/Navbar/NERV.png" alt="User Profile"  className="w-10 h-10 rounded-lg"/>
				</div>
				<span className="text-2xl font-bold">AREA</span>
			</div>

			{/* User Profile */}
			<div className="mt-8 flex items-center space-x-4">
				<div className="rounded-xl border-2 p-1">
					<img src="/icons/Navbar/adrien.lachambre@epitech.eu.JPG" alt="User Profile" className="w-10 h-10 rounded-lg"/>
				</div>
				<div>
					<h2 className="font-semibold">Adrien LACHAMBRE</h2>
					<p className="text-sm">adrien.lachambre@epitech.eu</p>
				</div>
			</div>

			<Separator className="my-4"/>
			{/* Pages */}
			<nav className="space-y-2">
				<Link to="/" className="text-xl flex items-center space-x-2 visited:text-inherit">
					<svg width="20" height="20" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
					</svg>
					<span>Home</span>
				</Link>
				<Link to="/backend-settings" className="text-xl flex items-center space-x-2 visited:text-inherit">
					<svg width="20" height="20" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M304 256 A48 48 0 0 1 256 304 A48 48 0 0 1 208 256 A48 48 0 0 1 304 256 z" />
						<path d="M470.39 300l-.47-.38-31.56-24.75a16.11 16.11 0 01-6.1-13.33v-11.56a16 16 0 016.11-13.22L469.92 212l.47-.38a26.68 26.68 0 005.9-34.06l-42.71-73.9a1.59 1.59 0 01-.13-.22A26.86 26.86 0 00401 92.14l-.35.13-37.1 14.93a15.94 15.94 0 01-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 01-8.19-11.82l-5.59-39.59-.12-.72A27.22 27.22 0 00298.76 26h-85.52a26.92 26.92 0 00-26.45 22.39l-.09.56-5.57 39.67a16 16 0 01-8.13 11.82 175.21 175.21 0 00-10 5.82 15.92 15.92 0 01-14.43 1.27l-37.13-15-.35-.14a26.87 26.87 0 00-32.48 11.34l-.13.22-42.77 73.95a26.71 26.71 0 005.9 34.1l.47.38 31.56 24.75a16.11 16.11 0 016.1 13.33v11.56a16 16 0 01-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 00-5.9 34.06l42.71 73.9a1.59 1.59 0 01.13.22 26.86 26.86 0 0032.45 11.3l.35-.13 37.07-14.93a15.94 15.94 0 0114.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 018.19 11.82l5.56 39.59.12.72A27.22 27.22 0 00213.24 486h85.52a26.92 26.92 0 0026.45-22.39l.09-.56 5.57-39.67a16 16 0 018.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0114.43-1.27l37.13 14.95.35.14a26.85 26.85 0 0032.48-11.34 2.53 2.53 0 01.13-.22l42.71-73.89a26.7 26.7 0 00-5.89-34.11zm-134.48-40.24a80 80 0 11-83.66-83.67 80.21 80.21 0 0183.66 83.67z" />
					</svg>
					<span>Backend Settings</span>
				</Link>
				<Link to="/user-management" className="text-xl flex items-center space-x-2 visited:text-inherit">
					<svg width="20" height="20" viewBox="0 -100 640 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M224 256c-70.7 0-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128-57.3 128-128 128zm-45.7 48h91.4c11.8 0 23.4 1.2 34.5 3.3-2.1 18.5 7.4 35.6 21.8 44.8-16.6 10.6-26.7 31.6-20 53.3 4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3 0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8 10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4 7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1.7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4L546.3 442c-6.9 5.1-14.3 9.4-22.3 12.8v30.6c0 7-4.5 13.3-11.3 14.8-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8v-30.6c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3.7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2 3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9v-30.4zm92.1 133.5c0-26.5-21.5-48-48.1-48s-48.1 21.5-48.1 48 21.5 48 48.1 48 48.1-21.5 48.1-48z" />
					</svg>
					<span>User Management</span>
				</Link>
			</nav>

			{/* Footer: Settings Accordion */}
			<div className="mt-auto">
				<Accordion type="single" collapsible>
					<AccordionItem value="settings" showBorder={false}>
						<AccordionTrigger className="text-xl flex items-center justify-between w-full visited:text-inherit" showChevron={false}>
							<div className="flex items-center space-x-2">
								<svg width="20" height="20" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path d="M304 256 A48 48 0 0 1 256 304 A48 48 0 0 1 208 256 A48 48 0 0 1 304 256 z"/>
									<path
										d="M470.39 300l-.47-.38-31.56-24.75a16.11 16.11 0 01-6.1-13.33v-11.56a16 16 0 016.11-13.22L469.92 212l.47-.38a26.68 26.68 0 005.9-34.06l-42.71-73.9a1.59 1.59 0 01-.13-.22A26.86 26.86 0 00401 92.14l-.35.13-37.1 14.93a15.94 15.94 0 01-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 01-8.19-11.82l-5.59-39.59-.12-.72A27.22 27.22 0 00298.76 26h-85.52a26.92 26.92 0 00-26.45 22.39l-.09.56-5.57 39.67a16 16 0 01-8.13 11.82 175.21 175.21 0 00-10 5.82 15.92 15.92 0 01-14.43 1.27l-37.13-15-.35-.14a26.87 26.87 0 00-32.48 11.34l-.13.22-42.77 73.95a26.71 26.71 0 005.9 34.1l.47.38 31.56 24.75a16.11 16.11 0 016.1 13.33v11.56a16 16 0 01-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 00-5.9 34.06l42.71 73.9a1.59 1.59 0 01.13.22 26.86 26.86 0 0032.45 11.3l.35-.13 37.07-14.93a15.94 15.94 0 0114.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 018.19 11.82l5.56 39.59.12.72A27.22 27.22 0 00213.24 486h85.52a26.92 26.92 0 0026.45-22.39l.09-.56 5.57-39.67a16 16 0 018.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0114.43-1.27l37.13 14.95.35.14a26.85 26.85 0 0032.48-11.34 2.53 2.53 0 01.13-.22l42.71-73.89a26.7 26.7 0 00-5.89-34.11zm-134.48-40.24a80 80 0 11-83.66-83.67 80.21 80.21 0 0183.66 83.67z"
									/>
								</svg>
								<span>Settings</span>
							</div>
							<ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
						</AccordionTrigger>

						<AccordionContent>
							{/* Theme Switch */}
							<div className="flex justify-between items-center py-2">
								<span>Theme</span>
								<Switch
									checked={theme === "dark"}
									onCheckedChange={handleThemeChange}
								/>
							</div>

							{/* Language Select */}
							<div className="py-2">
								<Select onValueChange={handleLanguageChange} value={language}>
									<SelectTrigger id="language">
										{language === "en" ? "English" : language === "fr" ? "French" : ""}
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="en">English</SelectItem>
										<SelectItem value="fr">French</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Accessibility Option */}
							<div className="py-2">
								<span>Accessibility</span>
							</div>

							{/* Delete Account Button */}
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button variant="destructive">Delete Account</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Are you sure?</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This will permanently delete your account.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<Button variant="default">Cancel</Button>
										<Button variant="destructive">Delete</Button>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<nav className="space-y-2">
					<Link to="/documentation" className="text-xl flex items-center space-x-2 visited:text-inherit">
						<svg width="20" height="20" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path d="M307.94 248L216 154.52V242a6 6 0 006 6z" />
							<path d="M184 268V144H60a12 12 0 00-12 12v328a12 12 0 0012 12h248a12 12 0 0012-12V280H196a12 12 0 01-12-12zM366 120h85.94L360 26.52V114a6 6 0 006 6z" />
							<path d="M340 152a12 12 0 01-12-12V16H172a12 12 0 00-12 12v84h42.12A40.81 40.81 0 01231 124.14l109.16 111a41.11 41.11 0 0111.83 29V400H452a12 12 0 0012-12V152z" />
						</svg>
						<span>Documentation</span>
					</Link>
				</nav>
			</div>
		</aside>
	);
}