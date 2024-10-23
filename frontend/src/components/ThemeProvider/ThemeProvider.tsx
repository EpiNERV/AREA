import React, { useEffect, useMemo, useState } from "react";
import ThemeContext, { ThemeProviderState, ThemeMode, ThemeColor, ColorBlindnessMode } from "./ThemeContext";

type ThemeProviderProps = {
	children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
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

		let mode: ThemeMode = themeMode;
		if (themeMode === "system") {
			mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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

	// Memoize the context value to optimize performance
	const value: ThemeProviderState = useMemo(
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
};