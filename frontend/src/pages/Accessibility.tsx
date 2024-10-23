import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/components/ThemeProvider/useTheme";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { EyeOff } from "lucide-react";

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
		<Card className="w-full items-center justify-center max-w-lg mx-auto">
			<CardContent>
				<div className="flex flex-col items-center justify-center w-full h-full space-y-8">
					<h2 className="text-2xl font-semibold">{t('Accessibility.Customize')}</h2>
					<p className="text-center">{t('Accessibility.Description')}</p>

					<div className="space-y-2 w-full">
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

					<div className="space-y-2 w-full">
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

					<div className="space-y-2 w-full">
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

					<div className="space-y-2 w-full">
						<label className="block text-lg font-medium">{t('Accessibility.Language')}</label>
						<div className="flex space-x-2">
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
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default Accessibility;