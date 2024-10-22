// ThemeProvider.tsx

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeMode = "dark" | "light" | "system";
type ThemeColor =
	| "zync"
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

type ThemeProviderProps = {
	children: React.ReactNode;
};

type ThemeProviderState = {
	themeMode: ThemeMode;
	setThemeMode: (mode: ThemeMode) => void;
	themeColor: ThemeColor;
	setThemeColor: (color: ThemeColor) => void;
};

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [themeMode, setThemeModeState] = useState<ThemeMode>(
		() => (localStorage.getItem("theme-mode") as ThemeMode) || "system"
	);
	const [themeColor, setThemeColorState] = useState<ThemeColor>(
		() => (localStorage.getItem("theme-color") as ThemeColor) || "zync"
	);

	useEffect(() => {
		const root = window.document.documentElement;

		// Gérer le mode (clair/sombre)
		let mode = themeMode;
		if (themeMode === "system") {
			mode = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		root.classList.remove("light", "dark");
		root.classList.add(mode);

		// Gérer la couleur du thème
		root.classList.remove(
			"theme-zync",
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
	}, [themeMode, themeColor]);

	const value = useMemo(
		() => ({
			themeMode,
			setThemeMode: (mode: ThemeMode) => {
				localStorage.setItem("theme-mode", mode);
				setThemeModeState(mode);
			},
			themeColor,
			setThemeColor: (color: ThemeColor) => {
				localStorage.setItem("theme-color", color);
				setThemeColorState(color);
			},
		}),
		[themeMode, themeColor]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
}