import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button.tsx";
import { SiDiscord } from "react-icons/si";
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
};

interface UserServiceConnectResponse {
  status: string;
  url: string;
  user_id: string;
}

export default function ProfilePage(): JSX.Element {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>("account-info");
  const [connections, setConnections] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      // setLoading(true);
      try {
        const response = await AxiosInstance.get<ServiceArray>("/user/services");

        const servicesData = response.data.map((service: Service) => ({
          ...service,
          icon: iconMapping[service.key],
        }));

        setServices(servicesData);

        // Initialize connections state
        const initialConnections = servicesData.reduce(
          (acc, service) => ({ ...acc, [service.key]: service.connected }),
          {} as Record<string, boolean>
        );
        setConnections(initialConnections);
        // setLoading(false);
      } catch (err) {
        setError(`Failed to fetch services: ${err}`);
        // setLoading(false);
      }
    };

    fetchServices();
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
          if (popup && popup.closed) {
            clearInterval(popupCheckInterval);
          }
        }, 500);

      } catch (err) {

        console.error(err);

        alert(`Failed to automatically connect to ${service_name}.`);
        return; // TODO: Handle error better
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
          {selectedMenu === "account-info" && <div>{/* TODO */}</div>}

          {/* Integrations */}
          {selectedMenu === "account-integration" && (
            <>{error && 
              <div className="flex items-center justify-center h-screen">
		        	  <div className="text-center">
		        	  	<h1 className="text-4xl font-bold">Error</h1>
		        	  	<p className="mt-4 text-lg text-red-500">{error}</p>
		        	  </div>
              </div>
            }
            <div className="p-6 grid grid-cols-4 gap-4">
                {
                  // Service Cards  
                  services.map((service) => (
                    <div key={service.key} className="flex flex-col items-center mb-4">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            {service.icon ? <service.icon fontSize={64} /> : <PiImageBroken fontSize={64} />}
                          </CardContent>
                        </Card>
                      </div>
                      <Button
                        variant="default"
                        className={`${connections[service.key] ? "bg-red-500" : "bg-blue-500"} mt-4 text-white`}
                        onClick={() => toggleConnection(service.key)}
                      >
                        {connections[service.key] ? "Sign out" : "Sign in"}
                      </Button>
                    </div>
                  ))}
              </div></>
          )}
        </div>
      </div>
    </aside>
  );
}
