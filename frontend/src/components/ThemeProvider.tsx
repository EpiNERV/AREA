import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeMode = "dark" | "light" | "system";
type ThemeColor =
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
type ColorBlindnessMode =
	| "regular"
	| "deuteranopia"
	| "protanopia"
	| "tritanopia"
	| "monochromacy";

type ThemeProviderProps = {
	children: React.ReactNode;
};

type ThemeProviderState = {
	themeMode: ThemeMode;
	setThemeMode: (mode: ThemeMode) => void;
	themeColor: ThemeColor;
	setThemeColor: (color: ThemeColor) => void;
	colorBlindnessMode: ColorBlindnessMode;
	setColorBlindnessMode: (mode: ColorBlindnessMode) => void;
};

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({ children }: Readonly<ThemeProviderProps>) {
	const [themeMode, setThemeMode] = useState<ThemeMode>(
		() => (localStorage.getItem("theme-mode") as ThemeMode) || "system"
	);
	const [themeColor, setThemeColor] = useState<ThemeColor>(
		() => (localStorage.getItem("theme-color") as ThemeColor) || "zinc"
	);
	const [colorBlindnessMode, setColorBlindnessMode] = useState<ColorBlindnessMode>(
		() => (localStorage.getItem("color-blindness-mode") as ColorBlindnessMode) || "regular"
	);

	useEffect(() => {
		const root = window.document.documentElement;

		let mode = themeMode;
		if (themeMode === "system") {
			mode = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		root.classList.remove("light", "dark");
		root.classList.add(mode);

		root.classList.remove(
			"theme-zinc",
			"theme-slate",
			"theme-stone",
			"theme-gray",
			"theme-neutral",
			"theme-red",
			"theme-rose",
			"theme-orange",
			"theme-green",
			"theme-blue",
			"theme-yellow",
			"theme-violet"
		);
		root.classList.add(`theme-${themeColor}`);

		root.classList.remove(
			"colorblind-deuteranopia",
			"colorblind-protanopia",
			"colorblind-tritanopia",
			"colorblind-monochromacy"
		);
		if (colorBlindnessMode !== "regular") {
			root.classList.add(`colorblind-${colorBlindnessMode}`);
		}

		if (colorBlindnessMode === "monochromacy") {
			root.classList.remove(
				"theme-zinc",
				"theme-slate",
				"theme-stone",
				"theme-gray",
				"theme-neutral",
				"theme-red",
				"theme-rose",
				"theme-orange",
				"theme-green",
				"theme-blue",
				"theme-yellow",
				"theme-violet"
			);
			root.classList.add(`theme-neutral`);
		}
	}, [themeMode, themeColor, colorBlindnessMode]);

	const value = useMemo(
		() => ({
			themeMode,
			setThemeMode: (mode: ThemeMode) => {
				localStorage.setItem("theme-mode", mode);
				setThemeMode(mode);
			},
			themeColor,
			setThemeColor: (color: ThemeColor) => {
				localStorage.setItem("theme-color", color);
				setThemeColor(color);
			},
			colorBlindnessMode,
			setColorBlindnessMode: (mode: ColorBlindnessMode) => {
				localStorage.setItem("color-blindness-mode", mode);
				setColorBlindnessMode(mode);
			},
		}),
		[themeMode, themeColor, colorBlindnessMode]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
}