import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button.tsx";
import { SiSpotify, SiYoutube, SiTelegram, SiReddit, SiGithub, SiDiscord, SiGmail } from 'react-icons/si';
import { FaTwitter } from 'react-icons/fa';

interface Service {
  name: string;
  icon: React.FC<React.ComponentProps<'svg'>>;
  key: string;
}

export default function ProfilePage() {
  const [selectedMenu, setSelectedMenu] = useState<string>("account-info");
  const [services, setServices] = useState<Service[]>([]);
  const [connections, setConnections] = useState<Record<string, boolean>>({});

  useEffect(() => {
  const placeholderServices: Service[] = [
    { name: "Gmail", icon: SiGmail, key: "google" },
    { name: "Spotify", icon: SiSpotify, key: "spotify" },
    { name: "YouTube", icon: SiYoutube, key: "youtube" },
    { name: "Telegram", icon: SiTelegram, key: "telegram" },
    { name: "Reddit", icon: SiReddit, key: "reddit" },
    { name: "GitHub", icon: SiGithub, key: "github" },
    { name: "Discord", icon: SiDiscord, key: "discord" },
    { name: "Twitter", icon: FaTwitter, key: "twitter" },
  ];
	setServices(placeholderServices);

	// Initialize connections state
	const initialConnections = placeholderServices.reduce(
		(acc, service) => ({ ...acc, [service.key]: false }),
		{} as Record<string, boolean>
	);
	setConnections(initialConnections);
  }, []);
  
  const toggleConnection = (serviceKey: string) => {
    setConnections((prev) => ({
      ...prev,
      [serviceKey]: !prev[serviceKey],
    }));
  };

  return (
    <aside
      className="w-[75%] h-[95vh] p-4 absolute right-0 mx-5 flex flex-col rounded-lg"
      style={{ top: "19px", boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.3)" }}
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
              className={
                selectedMenu === "account-integration" ? "active-tab" : ""
              }
            >
              Integrations
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="w-[100%]">
          {/* Account Info */}
          {selectedMenu === "account-info" && (
            <div>
              {/* Your account info form code here */}
            </div>
          )}

          {/* Integrations */}
          {selectedMenu === "account-integration" && (
            <div className="p-6 grid grid-cols-4 gap-4">
              {services.map((service) => (
                <div
                  key={service.key}
                  className="flex flex-col items-center mb-4"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <service.icon fontSize={64} />
                      </CardContent>
                    </Card>
                  </div>
                  <Button
                    variant="default"
                    className={`${
                      connections[service.key] ? "bg-red-500" : "bg-blue-500"
                    } mt-4 text-white`}
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
