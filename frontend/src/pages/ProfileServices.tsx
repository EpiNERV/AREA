import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button.tsx";
import { SiDiscord, SiSpotify, SiTelegram, SiGithub, SiGmail } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { PiImageBroken } from "react-icons/pi";
import AxiosInstance from "@/lib/auth/axiosInstance";

// Define the Service interface
interface Service {
	name: string;
	key: string;
	connected: boolean;
	token: string | null;
	connectedAt: Date;
	icon: React.FC<React.ComponentProps<"svg">>;
}

type ServiceArray = Service[];

// Icon mapping for services
const iconMapping: Record<string, React.FC<React.ComponentProps<"svg">>> = {
	discord: SiDiscord,
	twitter: FaTwitter,
	spotify: SiSpotify,
	telegram: SiTelegram,
	github: SiGithub,
	gmail: SiGmail
};

interface UserServiceConnectResponse {
	status: string;
	url: string;
	user_id: string;
}

const mockServices: Service[] = [
	{
		name: "Discord",
		key: "discord",
		connected: false,
		token: null,
		connectedAt: new Date(),
		icon: iconMapping["discord"],
	},
	{
		name: "Twitter",
		key: "twitter",
		connected: false,
		token: null,
		connectedAt: new Date(),
		icon: iconMapping["twitter"],
	},
	{
		name: "Spotify",
		key: "spotify",
		connected: false,
		token: null,
		connectedAt: new Date(),
		icon: iconMapping["spotify"],
	},
	{
		name: "Telegram",
		key: "telegram",
		connected: false,
		token: null,
		connectedAt: new Date(),
		icon: iconMapping["telegram"],
	},
	{
		name: "GitHub",
		key: "github",
		connected: false,
		token: null,
		connectedAt: new Date(),
		icon: iconMapping["github"],
	},
	{
		name: "Gmail",
		key: "gmail",
		connected: false,
		token: null,
		connectedAt: new Date(),
		icon: iconMapping["gmail"],
	},
];

const ProfileServices = () => {
	const [services, setServices] = useState<Service[]>([]);
	const [connections, setConnections] = useState<Record<string, boolean>>({});

	// Fetch services
	useEffect(() => {
		const fetchServices = async () => {
			try {
				const isMock = true;
				let initialConnections = {};

				if (isMock) {
					// use mock services for development
					setServices(mockServices);
					initialConnections = mockServices.reduce(
						(acc, service) => ({...acc, [service.key]: service.connected}),
						{} as Record<string, boolean>
					);
				} else {
					// get services from the backend
					const response = await AxiosInstance.get<ServiceArray>("/user/services");
					const servicesData = response.data.map((service: Service) => ({
						...service,
						icon: iconMapping[service.key],
					}));
					setServices(servicesData);
					initialConnections = servicesData.reduce(
						(acc, service) => ({...acc, [service.key]: service.connected}),
						{} as Record<string, boolean>
					);
				}

				setConnections(initialConnections);
			} catch (err) {
				console.error("Failed to fetch services:", err);
			}
		};

		void fetchServices();
	}, []);

	// Connect to a service or disconnect from it
	const toggleConnection = async (service_name: string) => {
		if (!connections[service_name]) {
			// Connect logic
			try {
				const response = await AxiosInstance.get<UserServiceConnectResponse>(`user/services/connect/${service_name}`);

				console.log(response.data);
				const { url, user_id } = response.data;

				const width = 600;
				const height = 1000;
				const left = window.screen.width / 2 - width / 2;
				const top = window.screen.height / 2 - height / 2;

				const popup = window.open(
					`${url}?user_id=${user_id}`,
					"OAuth2 Login",
					`width=${width},height=${height},top=${top},left=${left},toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no`
				);

				const popupCheckInterval = setInterval(() => {
					if (popup?.closed) {
						clearInterval(popupCheckInterval);
					}
				}, 500);

			} catch (err) {

				console.error(err);

				alert(`Failed to automatically connect to ${service_name}.`);
				return;
			}
		} else {
			// Disconnect logic
			// try {
			//   setConnections((prev) => ({ ...prev, [service_name]: false }));
			//   alert(`Disconnected from ${service_name}.`);
			// } catch (err) {
			//   console.error(err);
			//   alert(`Failed to disconnect from ${service_name}.`);
			// }
		}
	};

	// Listen for the message from the popup
	const receiveMessage = (event: MessageEvent) => {
		console.log(`Received message from ${event.origin}: ${event.data}`);
	};

	window.addEventListener("message", receiveMessage);

	return (
		<div className="flex flex-1 items-center justify-center w-full h-full">
			<div className="overflow-hidden">
				<div className="p-6 grid grid-cols-3 gap-6">
					{services.map((service) => (
						<Card key={service.key} className="w-[350px]">
							<CardHeader className="flex items-center justify-center">
								<CardTitle>{service.name}</CardTitle>
							</CardHeader>
							<CardContent className="flex justify-center">
								{service.icon ? (
									<service.icon size={64} />
								) : (
									<PiImageBroken size={64} />
								)}
							</CardContent>
							<CardFooter className="flex justify-center">
								<Button
									variant="default"
									className={`${
										connections[service.key] ? "bg-red-500" : "bg-blue-500"
									} text-white`}
									onClick={() => toggleConnection(service.key)}
								>
									{connections[service.key] ? "Sign out" : "Sign in"}
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProfileServices;