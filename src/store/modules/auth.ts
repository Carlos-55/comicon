import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Store from '../index';
import Vue from 'vue';
import { IUser } from '../../models/user';
import { ILogin } from '../../models/login';

@Module({
	name: 'AuthStoreModule',
	namespaced: true,
})
export class AuthStoreModule extends VuexModule {
	public token: string = '';
	public userLogged: IUser = {};

	@Mutation
	LOGIN(token: string) {
		this.token = token;
	}
	@Mutation
	LOGOUT() {
		this.token = '';
	}
	@Mutation
	SET(user: IUser) {
		this.userLogged = user;
	}

	@Action
	async login(auth: ILogin) {
		const res = await Vue.prototype.$axios.post('auth/login', auth);

		if (res && res.token) {
			this.context.commit('LOGIN', res.token);
			this.context.commit('SET', res.user);
		}
		return res.token || null
	}
	@Action
	logout() {
		localStorage.clear();
		this.context.commit('LOGOUT');
	}
	get isAuth() {
		return this.token != ''
	}


	get userPhoto() {
		if (!this.token) return '';
		return this.userLogged ? this.userLogged.photo : '';
	}
	get userEmail() {
		if (!this.token) return '';
		return this.userLogged ? this.userLogged.email : '';
	}
	get userName() {
		if (!this.token) return '';
		return this.userLogged ? this.userLogged.name : '';
	}
}
