import React, { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const AuthVerification = () => {
	const { themeMode, setThemeMode } = useTheme();
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();

	const [otpValue, setOtpValue] = useState<string>('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('OTP submitted:', otpValue);
		navigate('/home', { replace: true });
	};

	const handleLanguageChange = (language: string) => {
		i18n
			.changeLanguage(language)
			.then(() => {
				localStorage.setItem('language', language);
			})
			.catch((error) => {
				console.error('Failed to change language:', error);
			});
	};

	return (
		<div className="flex h-screen">
			<div className="absolute top-4 right-4 flex space-x-4">
				<Select value={themeMode} onValueChange={setThemeMode}>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder={t('Accessibility.Theme')}/>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">{t('Accessibility.Light')}</SelectItem>
						<SelectItem value="dark">{t('Accessibility.Dark')}</SelectItem>
						<SelectItem value="system">{t('Accessibility.System')}</SelectItem>
					</SelectContent>
				</Select>

				<Select
					value={i18n.language}
					onValueChange={(value) => handleLanguageChange(value)}
				>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder={t('Accessibility.Language')}/>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="en">{t('Accessibility.English')}</SelectItem>
						<SelectItem value="fr">{t('Accessibility.French')}</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="w-full flex items-center justify-center">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl font-bold mb-4 text-center">
							{t('AuthVerification.title')}
						</CardTitle>
						<CardDescription className="mb-6 text-center text-gray-600">
							{t('AuthVerification.description')}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit}>
							<div className="flex justify-center mb-6">
								<InputOTP
									maxLength={6}
									pattern="^[0-9]+$"
									onChange={(value) => setOtpValue(value)}
									autoFocus
								>
									<InputOTPGroup>
										{[...Array(6)].map((_, index) => (
											<InputOTPSlot key={index} index={index}/>
										))}
									</InputOTPGroup>
								</InputOTP>
							</div>

							<Button type="submit" className="w-full">
								{t('AuthVerification.verify')}
							</Button>
						</form>

						<div className="mt-4 text-center">
							<p className="text-sm text-gray-600">
							{t('AuthVerification.didNotReceive')}{' '}
								<button
									onClick={() => {
										console.log('Resend OTP');
									}}
									className="text-blue-500 hover:underline"
								>
									{t('AuthVerification.resend')}
								</button>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default AuthVerification;