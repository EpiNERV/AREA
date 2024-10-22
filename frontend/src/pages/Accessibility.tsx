import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "@/components/ThemeProvider"
import { useTranslation } from 'react-i18next';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

const Accessibility = () => {
	const { setTheme, theme } = useTheme();
	const { i18n, t } = useTranslation();

	const handleLanguageChange = (language: string) => {
		i18n.changeLanguage(language)
			.then(() => {
				localStorage.setItem('language', language);
			})
			.catch((error) => {
				console.error("Failed to change language:", error);
			});
	};

	return (
		<div className="flex flex-1 items-center justify-center w-full h-full">
			<div className="overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[400px]">{t('Accessibility')}</TableHead>
							<TableHead>{t('Status')}</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{/* Colorblind Mode */}
						<TableRow>
							<TableCell className="font-medium">{t('Colorblind mode')}</TableCell>
							<TableCell>
								<RadioGroup defaultValue="off">
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="on" id="colorblind-on" />
										<Label htmlFor="colorblind-on">{t('On')}</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="off" id="colorblind-off" />
										<Label htmlFor="colorblind-off">{t('Off')}</Label>
									</div>
								</RadioGroup>
							</TableCell>
						</TableRow>

						{/* Theme */}
						<TableRow>
							<TableCell className="font-medium">{t('Theme')}</TableCell>
							<TableCell>
								<RadioGroup value={theme} onValueChange={setTheme}>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="light" id="theme-light" />
										<Label htmlFor="theme-light">{t('Light')}</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="dark" id="theme-dark" />
										<Label htmlFor="theme-dark">{t('Dark')}</Label>
									</div>
								</RadioGroup>
							</TableCell>
						</TableRow>

						{/* Text Size Adjustment */}
						<TableRow>
							<TableCell className="font-medium">{t('Text size adjustment')}</TableCell>
							<TableCell>
								<RadioGroup defaultValue="medium">
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="small" id="text-size-small" />
										<Label htmlFor="text-size-small">{t('Small')}</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="medium" id="text-size-medium" />
										<Label htmlFor="text-size-medium">{t('Medium')}</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="large" id="text-size-large" />
										<Label htmlFor="text-size-large">{t('Large')}</Label>
									</div>
								</RadioGroup>
							</TableCell>
						</TableRow>

						{/* Language */}
						<TableRow>
							<TableCell className="font-medium">{t('Language')}</TableCell>
							<TableCell>
								<RadioGroup value={i18n.language} onValueChange={handleLanguageChange}>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="fr" id="language-fr" />
										<Label htmlFor="language-fr">{t('French')}</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="en" id="language-en" />
										<Label htmlFor="language-en">{t('English')}</Label>
									</div>
								</RadioGroup>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default Accessibility;