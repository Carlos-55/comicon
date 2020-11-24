import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Store from '../index';
import Vue from 'vue';
import { IPublication } from '../../models/publications';
import { oflineItems, generateFormDataAny } from '../../helpers/helpers';
import { NotifyPersonal } from 'src/helpers/messages';

@Module({
	name: 'PublicationStoreModule',
	namespaced: true,
})
export class PublicationStoreModule extends VuexModule {
	public selectedPublication: IPublication = {};
	public publications: IPublication[] = [];
	public loader: boolean = false;
	@Mutation
	LIST(publications: IPublication[]) {
		this.publications = [...publications];
	}
	@Mutation
	ADD(user: IPublication) {
		this.publications = [...this.publications, user];
	}
	@Mutation
	LOADER(loader: boolean) {
		this.loader = loader;
	}
	@Mutation
	UPDATE(user: IPublication) {
		const newUsers = this.publications.filter(s => s.id !== user.id);
		this.publications = [...newUsers, user];
	}
	@Mutation
	REMOVE(user: IPublication) {
		this.publications = this.publications.filter(s => s.id !== user.id);
	}
	@Mutation
	SET(user?: IPublication) {
		// @ts-ignore
		this.selectedPublication = Object.assign({}, user ? { ...user } : { address: {}, codes: [{}] });
	}
	@Action
	async getAll() {
		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.get('publication');
				this.context.commit('LIST', res);
				return res
			}
		} finally {
			this.context.commit('SET');
			this.context.commit('LOADER', false);
		}
	}
	@Action
	async getById(item: IPublication) {
		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.get(`publication/${item.id}`);
				this.context.commit('SET', res);
			}
		} finally {
			this.context.commit('LOADER', false);
		}
	}
	@Action
	async create(item: IPublication) {

		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.post('publication', await generateFormDataAny(item));
				this.context.commit('ADD', res);
			} else {
				oflineItems(`publication`, 'post', item);
			}
			this.context.commit('SET');
		} finally {
			this.context.commit('LOADER', false);
		}
	}
	@Action
	async update(item: IPublication) {
		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.put(
					`publication/${item.id}`,
					await generateFormDataAny(item)
				);
				this.context.commit('UPDATE', res);
			} else {
				oflineItems(`publication/${item.id}`, 'put', generateFormDataAny(item));
			}
			this.context.commit('SET');
		} finally {
			this.context.commit('LOADER', false);
		}
	}
	@Action
	async delete(item: IPublication) {
		this.context.commit('LOADER', true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.delete(
					`publication/${item.id}`
				);
				this.context.commit('REMOVE', item);
			} else {
				oflineItems(`publication/${item.id}`, 'delete', null);
			}
			this.context.commit('SET');
		} finally {
			this.context.commit('LOADER', false);
		}
	}
}
