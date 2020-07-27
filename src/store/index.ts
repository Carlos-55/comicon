import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
// import example from './module-example'
import { DATASTORAGE } from '../helpers/configs';
import { AuthStoreModule } from "./modules/auth";
import { UserStoreModule } from "./modules/user";
import { GlobalStoreModule } from "./modules/global";

Vue.use(Vuex);
const vuexLocal = new VuexPersistence<any>({
	storage: window.localStorage,
	key: DATASTORAGE
});

export default new Vuex.Store({
	modules: {
		AuthStoreModule,
		UserStoreModule,
		GlobalStoreModule
	},

	// @ts-ignore
	strict: process.env.DEV === 'true',
	plugins: [vuexLocal.plugin]
});
