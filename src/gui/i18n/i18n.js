import i18next from 'i18next';
import en from './translations/en.json';

const i18n = i18next.init({
    lng: navigator.language.split('-')[0],
    interpolation: {
        escapeValue: false
    },
    resources: { en },
    fallbackLng: 'en'
});

export default i18n;
