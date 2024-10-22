import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "@/components/ThemeProvider"
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

const Accessibility = () => {
	const { themeMode, setThemeMode, themeColor, setThemeColor } = useTheme();
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

						<TableRow>
							<TableCell className="font-medium">{t('Mode')}</TableCell>
							<TableCell>
								<RadioGroup value={themeMode} onValueChange={setThemeMode}>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="light" id="theme-light" />
										<Label htmlFor="theme-light">{t('Clair')}</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="dark" id="theme-dark" />
										<Label htmlFor="theme-dark">{t('Sombre')}</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="system" id="theme-system" />
										<Label htmlFor="theme-system">{t('Système')}</Label>
									</div>
								</RadioGroup>
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-medium">{t('Couleur')}</TableCell>
							<TableCell>
								<Select value={themeColor} onValueChange={setThemeColor}>
									<SelectTrigger className="w-[200px]">
										<SelectValue placeholder={t('Sélectionner la couleur du thème')} />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="zync">{t('Zync')}</SelectItem>
										<SelectItem value="slate">{t('Ardoise')}</SelectItem>
										<SelectItem value="stone">{t('Pierre')}</SelectItem>
										<SelectItem value="gray">{t('Gris')}</SelectItem>
										<SelectItem value="neutral">{t('Neutre')}</SelectItem>
										<SelectItem value="red">{t('Rouge')}</SelectItem>
										<SelectItem value="rose">{t('Rose')}</SelectItem>
										<SelectItem value="orange">{t('Orange')}</SelectItem>
										<SelectItem value="green">{t('Vert')}</SelectItem>
										<SelectItem value="blue">{t('Bleu')}</SelectItem>
										<SelectItem value="yellow">{t('Jaune')}</SelectItem>
										<SelectItem value="violet">{t('Violet')}</SelectItem>
									</SelectContent>
								</Select>
							</TableCell>
						</TableRow>

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