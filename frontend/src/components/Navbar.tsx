import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav
			className={`bg-navbar_background h-[95vh] p-4 absolute left-0 mx-5 flex flex-col justify-between transition-all duration-300 rounded-lg ${
				isOpen ? 'w-64' : 'w-20'
			}`}
			style={{
				top: '19px',
				boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.3)',
			}}
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			{/* Header */}
			<div>
				<div className="flex items-center space-x-2 mb-10 text-navbar_Text">
					<img
						src="/icons/Navbar/NERV.png"
						alt="Logo"
						className="h-10 w-10"
					/>
					<span
						className={`text-2xl font-bold transition-opacity duration-300 ${
							isOpen ? 'opacity-100' : 'opacity-0'
						} whitespace-nowrap`}
					>
            Area
          </span>
				</div>

				{/* Profile Section */}
				<div className="relative mb-20">
					<img
						src="/icons/Navbar/adrien.lachambre@epitech.eu.JPG"
						alt="Profile"
						className="h-10 w-10 rounded-lg object-cover flex-shrink-0 z-10 relative"
					/>

					<div
						className={`absolute top-0 left-0 h-full transition-all duration-300 ease-in-out bg-navbar_profile_background text-navbar_background rounded-lg flex items-center pl-14 ${
							isOpen ? 'w-48 opacity-100' : 'w-0 opacity-0'
						} overflow-hidden`}
						style={{
							boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.3)',
						}}
					>
						<div
							className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'} whitespace-nowrap`}
						>
							<div className="font-semibold text-navbar_profile_Text">Adrien Lachambre</div>
							<div className="text-sm text-navbar_profile_Text">adrien.lachambre@epitech.eu</div>
						</div>
					</div>
				</div>


				{/* Redirection middle page avec espace */}
				<ul className="space-y-6">
					<li className="flex items-center justify-center lg:justify-start">
						<Link
							to="/"
							className="flex items-center justify-center lg:justify-start w-full space-x-2"
						>
							<img
								src="/icons/Navbar/home.png"
								alt="Home"
								className="h-6 w-6"
							/>
							<span
								className={`transition-opacity duration-300 text-navbar_Text ${
									isOpen ? 'opacity-100' : 'opacity-0'
								} whitespace-nowrap`}
							>
                Home
              </span>
						</Link>
					</li>
					<li className="flex items-center justify-center lg:justify-start">
						<Link
							to="/backend-settings"
							className="flex items-center justify-center lg:justify-start w-full space-x-2"
						>
							<img
								src="/icons/Navbar/settings.png"
								alt="Backend Settings"
								className="h-6 w-6"
							/>
							<span
								className={`transition-opacity duration-300 text-navbar_Text ${
									isOpen ? 'opacity-100' : 'opacity-0'
								} whitespace-nowrap`}
							>
                Backend Settings
              </span>
						</Link>
					</li>
					<li className="flex items-center justify-center lg:justify-start">
						<Link
							to="/user-management"
							className="flex items-center justify-center lg:justify-start w-full space-x-2"
						>
							<img
								src="/icons/Navbar/user-management.png"
								alt="User Management"
								className="h-6 w-6"
							/>
							<span
								className={`transition-opacity duration-300 text-navbar_Text ${
									isOpen ? 'opacity-100' : 'opacity-0'
								} whitespace-nowrap`}
							>
                User Management
              </span>
						</Link>
					</li>
				</ul>
			</div>

			{/* Footer */}
			<div className="space-y-4">
				<Link
					to="/settings"
					className="flex items-center justify-center lg:justify-start w-full space-x-2"
				>
					<img
						src="/icons/Navbar/settings.png"
						alt="Settings"
						className="h-6 w-6"
					/>
					<span
						className={`transition-opacity duration-300 text-navbar_Text ${
							isOpen ? 'opacity-100' : 'opacity-0'
						} whitespace-nowrap`}
					>
            Settings
          </span>
				</Link>
				<Link
					to="/documentation"
					className="flex items-center justify-center lg:justify-start w-full space-x-2"
				>
					<img
						src="/icons/Navbar/documentation.png"
						alt="Documentation"
						className="h-6 w-6"
					/>
					<span
						className={`transition-opacity duration-300 text-navbar_Text ${
							isOpen ? 'opacity-100' : 'opacity-0'
						} whitespace-nowrap`}
					>
            Documentation
          </span>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;