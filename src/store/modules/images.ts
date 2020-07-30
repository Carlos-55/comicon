import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Store from '../index';
import Vue from 'vue';
import { IImages } from '../../models/images';
import { oflineItems, generateFormDataAny } from '../../helpers/helpers';
import { NotifyPersonal } from 'src/helpers/messages';

@Module({
	name: 'UserStoreModule',
	namespaced: true,
})
export class UserStoreModule extends VuexModule {
	public selectedUser: IImages = {};
	public users: IImages[] = [];
	public loader: boolean = false;
	@Mutation
	LIST(users: IImages[]) {
		this.users = [...users];
	}
	@Mutation
	ADD(user: IImages) {
		this.users = [...this.users, user];
	}
	@Mutation
	LOADER(loader: boolean) {
		this.loader = loader;
	}
	@Mutation
	UPDATE(user: IImages) {
		const newUsers = this.users.filter(s => s.id !== user.id);
		this.users = [...newUsers, user];
	}
	@Mutation
	REMOVE(user: IImages) {
		this.users = this.users.filter(s => s.id !== user.id);
	}
	@Mutation
	SET(user?: IImages) {
		// @ts-ignore
		this.selectedUser = Object.assign({}, user ? { ...user } : { address: {}, codes: [{}] });
	}
	@Action
	async getAll() {
		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.get('images');
				this.context.commit('LIST', res);
			}
		} finally {
			this.context.commit('SET');
			this.context.commit('LOADER', false);
		}
	}
	@Action
	async getById(item: IImages) {
		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.get(`images/${item.id}`);
				this.context.commit('SET', res);
			}
		} finally {
			this.context.commit('LOADER', false);
		}
	}
	@Action
	async create(item: IImages) {
		console.log(item);

		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.post('images', item);
				this.context.commit('ADD', res);
			} else {
				oflineItems(`images`, 'post', item);
			}
			this.context.commit('SET');
		} finally {
			this.context.commit('LOADER', false);
		}
	}
	@Action
	async update(item: IImages) {
		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.put(
					`images/${item.id}`,
					generateFormDataAny(item)
				);
				this.context.commit('UPDATE', res);
			} else {
				oflineItems(`images/${item.id}`, 'put', item);
			}
			this.context.commit('SET');
		} finally {
			this.context.commit('LOADER', false);
		}
	}
	@Action
	async delete(item: IImages) {
		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.delete(
					`images/${item.id}`
				);
				this.context.commit('REMOVE', item);
			} else {
				oflineItems(`images/${item.id}`, 'delete', null);
			}
			this.context.commit('SET');
		} finally {
			this.context.commit('LOADER', false);
		}
	}
}
