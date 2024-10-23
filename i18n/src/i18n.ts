import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from './translations/ENtranslation.json';
import translationFR from './translations/FRtranslation.json';
import translationES from './translations/EStranslation.json';
import translationDE from './translations/DEtranslation.json';
import translationIT from './translations/ITtranslation.json';
import translationRU from './translations/RUtranslation.json';
import translationZH from './translations/ZHtranslation.json';
import translationJA from './translations/JAtranslation.json';
import translationKO from './translations/KRtranslation.json';

const resources = {
	en: {
		translation: translationEN,
	},
	fr: {
		translation: translationFR,
	},
	es: {
		translation: translationES,
	},
	de: {
		translation: translationDE,
	},
	it: {
		translation: translationIT,
	},
	ru: {
		translation: translationRU,
	},
	zh: {
		translation: translationZH,
	},
	ja: {
		translation: translationJA,
	},
	ko: {
		translation: translationKO,
	}
};

const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

const getSavedLanguage = async (): Promise<string> => {
	if (!isReactNative && typeof window !== 'undefined' && window.localStorage) {
		return window.localStorage.getItem('language') || 'en';
	}
	if (isReactNative) {
		try {
			const { default: AsyncStorage } = await import('@react-native-async-storage/async-storage');
			const savedLanguage = await AsyncStorage.getItem('language');
			return savedLanguage || 'en';
		} catch (error) {
			console.error('Error getting saved language:', error);
			return 'en';
		}
	}
	return 'en';
};

const initializeI18n = async () => {
	if (!i18n.isInitialized) {
		const savedLanguage = await getSavedLanguage();

		await i18n
			.use(initReactI18next)
			.init({
				resources,
				lng: savedLanguage,
				fallbackLng: 'en',
				interpolation: {
					escapeValue: false,
				},
			});
	}
};

const changeLanguage = async (lng: string) => {
	await i18n.changeLanguage(lng);

	if (!isReactNative && typeof window !== 'undefined' && window.localStorage) {
		window.localStorage.setItem('language', lng);
	} else if (isReactNative) {
		try {
			const { default: AsyncStorage } = await import('@react-native-async-storage/async-storage');
			await AsyncStorage.setItem('language', lng);
		} catch (error) {
			console.error('Error setting language:', error);
		}
	}
};

export { initializeI18n, changeLanguage };
export default i18n;
