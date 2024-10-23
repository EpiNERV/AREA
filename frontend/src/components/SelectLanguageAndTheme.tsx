import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { useTheme } from "@/components/ThemeProvider/useTheme";
import { useTranslation } from 'react-i18next';

export function SelectLanguageAndTheme() {
	const { themeMode, setThemeMode } = useTheme();
	const { t, i18n } = useTranslation();

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
		<div className="absolute top-4 right-4 flex space-x-4">
			<Select value={themeMode} onValueChange={setThemeMode}>
				<SelectTrigger className="w-[120px]">
					<SelectValue placeholder={t('Accessibility.ModeTheme')}/>
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
	);
}