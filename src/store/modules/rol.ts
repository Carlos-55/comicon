import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Store from '../index';
import Vue from 'vue';
import { IUser } from '../../models/user';

@Module({
	dynamic: true,
	name: 'rol',
	namespaced: true,
	store: Store
})
export default class RolStoreModule extends VuexModule {
	public token: string = '';
	public isRol: boolean = false;

	@Mutation
	public LOGIN(token: string) {
		this.token = token;
	}
	@Mutation
	public LOGOUT() {
		this.token = '';
	}

	@Action
	public async login(user: IUser) {
		const res = await Vue.prototype.$axios.post('auth/login', user);
		this.context.commit('LOGIN', res.data.token);
	}
	@Action
	public logout() {
		this.context.commit('LOGOUT');
	}

	get userEmail() {
		if (!this.isRol) return '';
		return this.user ? this.user.email : '';
	}
	get userName() {
		if (!this.isRol) return '';
		return this.user ? this.user.name : '';
	}
	get user(): IUser | null {
		if (!this.token) return null;
		const payload = this.token.split('.')[1];
		return JSON.parse(atob(payload));
	}
}
