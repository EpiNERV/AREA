import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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

const savedLanguage = localStorage.getItem('language') ?? 'en';

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: savedLanguage,
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});