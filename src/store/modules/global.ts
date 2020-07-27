import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Store from '../index';
import Vue from 'vue';
import { setLanguage, LanguagesActives } from '../../boot/i18n';

@Module({
	name: 'GlobalStoreModule',
	namespaced: true
})
export class GlobalStoreModule extends VuexModule {
	public lang: LanguagesActives = 'es';
	public color: string = 'primary';
	public dark: boolean = false;
	@Mutation
	SET_COLOR(color: string) {
		this.color = color;
	}
	@Mutation
	SET_DARK_MODE() {
		this.dark = !this.dark;
	}
	@Mutation
	SET_LANG(lang: LanguagesActives) {
		this.lang = lang;
	}
	@Action
	public setLanguage(lang: LanguagesActives) {
		this.context.commit('SET_LANG', lang)
		setLanguage(lang)
	}
}
