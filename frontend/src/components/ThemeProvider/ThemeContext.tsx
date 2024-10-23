import { createContext } from "react";

export type ThemeMode = "dark" | "light" | "system";
export type ThemeColor =
	| "zinc"
	| "slate"
	| "stone"
	| "gray"
	| "neutral"
	| "red"
	| "rose"
	| "orange"
	| "green"
	| "blue"
	| "yellow"
	| "violet";
export type ColorBlindnessMode =
	| "regular"
	| "deuteranopia"
	| "protanopia"
	| "tritanopia"
	| "monochromacy";

export type ThemeProviderState = {
	themeMode: ThemeMode;
	setThemeMode: (mode: ThemeMode) => void;
	themeColor: ThemeColor;
	setThemeColor: (color: ThemeColor) => void;
	colorBlindnessMode: ColorBlindnessMode;
	setColorBlindnessMode: (mode: ColorBlindnessMode) => void;
};

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined);

export default ThemeContext;