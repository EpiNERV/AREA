import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from 'react-i18next';

const ProfileInfos = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-1 items-center justify-center w-full h-full">
			<div className="overflow-hidden">
				<div className="p-6 grid grid-cols-3 gap-6">
					{/* Username Form */}
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>{t('ProfileInfos.changeUsername')}</CardTitle>
							<CardDescription>{t('ProfileInfos.changeUsernameDescription')}</CardDescription>
						</CardHeader>
						<CardContent>
							<form>
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="current-username">{t('ProfileInfos.currentUsername')}</Label>
										<Input id="current-username" disabled placeholder={t('ProfileInfos.currentUsername')} />
									</div>
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="new-username">{t('ProfileInfos.newUsername')}</Label>
										<Input id="new-username" placeholder={t('ProfileInfos.newUsername')} />
									</div>
								</div>
							</form>
						</CardContent>
						<CardFooter className="flex justify-center">
							<Button>{t('ProfileInfos.change')}</Button>
						</CardFooter>
					</Card>

					{/* Email Form */}
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>{t('ProfileInfos.changeEmail')}</CardTitle>
							<CardDescription>{t('ProfileInfos.changeEmailDescription')}</CardDescription>
						</CardHeader>
						<CardContent>
							<form>
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="current-email">{t('ProfileInfos.currentEmail')}</Label>
										<Input id="current-email" placeholder={t('ProfileInfos.currentEmail')} />
									</div>
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="new-email">{t('ProfileInfos.newEmail')}</Label>
										<Input id="new-email" placeholder={t('ProfileInfos.newEmail')} />
									</div>
								</div>
							</form>
						</CardContent>
						<CardFooter className="flex justify-center">
							<Button>{t('ProfileInfos.change')}</Button>
						</CardFooter>
					</Card>

					{/* Password Form */}
					<Card className="w-[350px]">
						<CardHeader>
							<CardTitle>{t('ProfileInfos.changePassword')}</CardTitle>
							<CardDescription>{t('ProfileInfos.changePasswordDescription')}</CardDescription>
						</CardHeader>
						<CardContent>
							<form>
								<div className="grid w-full items-center gap-4">
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="current-password">{t('ProfileInfos.currentPassword')}</Label>
										<Input id="current-password" placeholder={t('ProfileInfos.currentPassword')} />
									</div>
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor="new-password">{t('ProfileInfos.newPassword')}</Label>
										<Input id="new-password" placeholder={t('ProfileInfos.newPassword')} />
									</div>
								</div>
							</form>
						</CardContent>
						<CardFooter className="flex justify-center">
							<Button>{t('ProfileInfos.change')}</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfos;