import { Card,  CardContent,  CardDescription,  CardFooter,  CardHeader,  CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ProfileInfos = () => {
	return (
		<div className="flex flex-1 items-center justify-center w-full h-full">
			<div className="overflow-hidden">
				<div className="p-6 grid grid-cols-3 gap-6">
					{/* Username Form */}
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>Change username</CardTitle>
							<CardDescription>Change your username within this card.</CardDescription>
						</CardHeader>
						<CardContent>
							<form>
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="name">Current username</Label>
										<Input id="name" disabled placeholder="user current username"/>
									</div>
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="name">New username</Label>
										<Input id="name" placeholder="user new username"/>
									</div>
								</div>
							</form>
						</CardContent>
						<CardFooter className="flex justify-center">
							<Button>Change</Button>
						</CardFooter>
					</Card>

					{/* Email Form */}
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>Change your email</CardTitle>
							<CardDescription>Change your email within this card.</CardDescription>
						</CardHeader>
						<CardContent>
							<form>
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="name">Current email</Label>
										<Input id="name" placeholder="Enter your current email"/>
									</div>
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="name">New email</Label>
										<Input id="name" placeholder="Enter your new email"/>
									</div>
								</div>
							</form>
						</CardContent>
						<CardFooter className="flex justify-center">
							<Button>Change</Button>
						</CardFooter>
					</Card>

					{/* Password Form */}
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>Change your password</CardTitle>
							<CardDescription>Change your password within this card.</CardDescription>
						</CardHeader>
						<CardContent>
							<form>
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="name">Password</Label>
										<Input id="name"  placeholder="Enter your current password"/>
									</div>
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="name">New password</Label>
										<Input id="name" placeholder="Enter your new password"/>
									</div>
								</div>
							</form>
						</CardContent>
						<CardFooter className="flex justify-center">
							<Button>Change</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfos;