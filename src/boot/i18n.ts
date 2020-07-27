import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from 'src/i18n';
import { getModule } from 'vuex-module-decorators';
import { GlobalStoreModule } from '../store/modules/global';
import store from '../store';

Vue.use(VueI18n);

export const languages = [
	{
		lang: 'es',
		name: 'español',
	},
	{
		lang: 'en',
		name: 'Ingles',
	}
]

const i18n = new VueI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages
});

export default ({ app }: any) => {
	// Set i18n instance on app
	app.i18n = i18n;
};


export type LanguagesActives = 'es' | 'en'
export function translateMessage(message: string) {
	return i18n.t(message).toString()
}
export function setLanguage(lang: LanguagesActives) {
	i18n.locale = lang
	document.querySelector('html')?.setAttribute('lang', lang)
}
export { i18n };
