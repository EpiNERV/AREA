import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/components/ThemeProvider/useTheme";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { EyeOff } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Accessibility = () => {
	const { themeMode, setThemeMode, themeColor, setThemeColor, colorBlindnessMode, setColorBlindnessMode } = useTheme();
	const { i18n, t } = useTranslation();

	type ColorBlindOption = {
		name: string;
		value: "regular" | "deuteranopia" | "protanopia" | "tritanopia" | "monochromacy";
		iconColors: string[];
	};

	type ColorOption = {
		name: string;
		value: "zinc" | "slate" | "stone" | "gray" | "neutral" | "red" | "rose" | "orange" | "green" | "blue" | "yellow" | "violet";
		colorClass: string;
	};

	const colorBlindOptions: ColorBlindOption[] = [
		{ name: "Regular vision", value: "regular", iconColors: ["text-gray-500"] },
		{ name: "Deuteranopia", value: "deuteranopia", iconColors: ["text-green-500"] },
		{ name: "Protanopia", value: "protanopia", iconColors: ["text-red-500"] },
		{ name: "Tritanopia", value: "tritanopia", iconColors: ["text-blue-500"] },
		{ name: "Monochromacy", value: "monochromacy", iconColors: ["text-gray-500"] },
	];

	const colorOptions: ColorOption[] = [
		{ name: "Zinc", value: "zinc", colorClass: "bg-gray-400" },
		{ name: "Slate", value: "slate", colorClass: "bg-gray-600" },
		{ name: "Stone", value: "stone", colorClass: "bg-gray-300" },
		{ name: "Gray", value: "gray", colorClass: "bg-gray-500" },
		{ name: "Neutral", value: "neutral", colorClass: "bg-gray-700" },
		{ name: "Red", value: "red", colorClass: "bg-red-500" },
		{ name: "Rose", value: "rose", colorClass: "bg-rose-500" },
		{ name: "Orange", value: "orange", colorClass: "bg-orange-500" },
		{ name: "Green", value: "green", colorClass: "bg-green-500" },
		{ name: "Blue", value: "blue", colorClass: "bg-blue-500" },
		{ name: "Yellow", value: "yellow", colorClass: "bg-yellow-500" },
		{ name: "Violet", value: "violet", colorClass: "bg-purple-500" },
	];

	const isColorSelectionDisabled =
		colorBlindnessMode === "monochromacy";

	useEffect(() => {
		if (colorBlindnessMode === "monochromacy") {
			setThemeColor("neutral");
		}
	}, [colorBlindnessMode, setThemeColor]);

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
		<div className="flex items-center justify-center min-h-screen"> {/* Conteneur flex centré */}
			<Card className="w-full max-w-4xl mx-auto"> {/* Augmentation de la largeur maximale */}
				<CardContent>
					<div className="flex flex-col items-center justify-center w-full h-full space-y-8">
						<h2 className="text-2xl font-semibold">{t('Accessibility.Customize')}</h2>
						<p className="text-center">{t('Accessibility.Description')}</p>

						{/* Conteneur principal avec deux colonnes */}
						<div className="flex flex-col md:flex-row w-full space-y-8 md:space-y-0 md:space-x-8">
							{/* Colonne de gauche */}
							<div className="flex-1 space-y-6">
								{/* Color Blindness */}
								<div className="space-y-2">
									<label className="block text-lg font-medium">{t('Accessibility.ColorBlindness')}</label>
									<div className="grid grid-cols-3 gap-2">
										{colorBlindOptions.slice(0, 3).map((option) => (
											<Button
												key={option.value}
												variant={colorBlindnessMode === option.value ? "outline" : "default"}
												onClick={() => setColorBlindnessMode(option.value)}
												className="flex items-center space-x-2"
											>
												{option.iconColors.map((iconColor) => (
													<EyeOff key={iconColor} className={`w-5 h-5 ${iconColor}`} />
												))}
												<span>{t(`Accessibility.${option.name}`)}</span>
											</Button>
										))}
									</div>
									<div className="grid grid-cols-2 gap-2">
										{colorBlindOptions.slice(3).map((option) => (
											<Button
												key={option.value}
												variant={colorBlindnessMode === option.value ? "outline" : "default"}
												onClick={() => setColorBlindnessMode(option.value)}
												className="flex items-center space-x-2"
											>
												{option.iconColors.map((iconColor) => (
													<EyeOff key={iconColor} className={`w-5 h-5 ${iconColor}`} />
												))}
												<span>{t(`Accessibility.${option.name}`)}</span>
											</Button>
										))}
									</div>
								</div>

								{/* Color Theme */}
								<div className="space-y-2">
									<label className="block text-lg font-medium">{t('Accessibility.ColorTheme')}</label>
									<div className="grid grid-cols-3 gap-2">
										{colorOptions.map((color) => (
											<Button
												key={color.value}
												variant={themeColor === color.value ? "outline" : "default"}
												onClick={() => setThemeColor(color.value)}
												className="flex items-center space-x-2"
												disabled={isColorSelectionDisabled}
											>
												<span className={`w-4 h-4 rounded-full ${color.colorClass}`}></span>
												<span>{t(`Accessibility.${color.name}`)}</span>
											</Button>
										))}
									</div>
								</div>

								{/* Mode Theme */}
								<div className="space-y-2">
									<label className="block text-lg font-medium">{t('Accessibility.ModeTheme')}</label>
									<div className="flex space-x-2">
										<Button
											variant={themeMode === "light" ? "outline" : "default"}
											onClick={() => setThemeMode("light")}
										>
											{t('Accessibility.Light')}
										</Button>
										<Button
											variant={themeMode === "dark" ? "outline" : "default"}
											onClick={() => setThemeMode("dark")}
										>
											{t('Accessibility.Dark')}
										</Button>
										<Button
											variant={themeMode === "system" ? "outline" : "default"}
											onClick={() => setThemeMode("system")}
										>
											{t('Accessibility.System')}
										</Button>
									</div>
								</div>
							</div>

							{/* Séparateur */}
							<Separator orientation="vertical" className="hidden md:block" /> {/* Vertical pour les écrans moyens et plus */}

							{/* Colonne de droite */}
							<div className="flex-1 space-y-2">
								<label className="block text-lg font-medium">{t('Accessibility.Language')}</label>
								<div className="grid grid-cols-3 gap-2">
									<Button
										variant={i18n.language === "fr" ? "outline" : "default"}
										onClick={() => handleLanguageChange("fr")}
									>
										{t('Accessibility.French')}
									</Button>
									<Button
										variant={i18n.language === "en" ? "outline" : "default"}
										onClick={() => handleLanguageChange("en")}
									>
										{t('Accessibility.English')}
									</Button>
									<Button
										variant={i18n.language === "de" ? "outline" : "default"}
										onClick={() => handleLanguageChange("de")}
									>
										{t('Accessibility.German')}
									</Button>
									<Button
										variant={i18n.language === "es" ? "outline" : "default"}
										onClick={() => handleLanguageChange("es")}
									>
										{t('Accessibility.Spanish')}
									</Button>
									<Button
										variant={i18n.language === "it" ? "outline" : "default"}
										onClick={() => handleLanguageChange("it")}
									>
										{t('Accessibility.Italian')}
									</Button>
									<Button
										variant={i18n.language === "ru" ? "outline" : "default"}
										onClick={() => handleLanguageChange("ru")}
									>
										{t('Accessibility.Russian')}
									</Button>
									<Button
										variant={i18n.language === "zh" ? "outline" : "default"}
										onClick={() => handleLanguageChange("zh")}
									>
										{t('Accessibility.Chinese')}
									</Button>
									<Button
										variant={i18n.language === "ja" ? "outline" : "default"}
										onClick={() => handleLanguageChange("ja")}
									>
										{t('Accessibility.Japanese')}
									</Button>
									<Button
										variant={i18n.language === "ko" ? "outline" : "default"}
										onClick={() => handleLanguageChange("ko")}
									>
										{t('Accessibility.Korean')}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Accessibility;