import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translations
import translationEN from '../../../i18n/ENtranslation.json';
import translationFR from '../../../i18n/FRtranslation.json';

const resources = {
	en: {
		translation: translationEN,
	},
	fr: {
		translation: translationFR,
	},
};

// Detect the user's language preference or default to English
const savedLanguage = localStorage.getItem('language') || 'en';

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: savedLanguage,
		fallbackLng: 'en', // Use English if the selected language is not available
		interpolation: {
			escapeValue: false, // React already protects from XSS
		},
	});

export default i18n;