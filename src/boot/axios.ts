import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import { URL_SERVER } from '../helpers/configs';
import { NotifyPersonal } from '../helpers/messages';
import store from '../store';
import { AuthStoreModule } from '../store/modules/auth';
import { GlobalStoreModule } from '../store/modules/global';

Vue.prototype.$axios = axios.create({
	baseURL: URL_SERVER
});
Vue.prototype.$axios.interceptors.request.use((request: AxiosRequestConfig) => {
	request.headers['Authorization'] = `Bearer ${getModule(AuthStoreModule, store).token}`;
	request.headers['Accept-Language'] = `${getModule(GlobalStoreModule, store).lang}`;
	return request;
});
Vue.prototype.$axios.interceptors.response.use(
	function (response: AxiosResponse) {
		if (response && response.data && response.data.message && response.data.message != '') {
			NotifyPersonal('Success', response.data.message, false)
		}
		return response.data.data || response.data || response;
	},
	function (error: AxiosError) {
		if (error && error.response && error.response.data) {
			if (error.response.data.code == 401 && getModule(AuthStoreModule, store).isAuth) {
				getModule(AuthStoreModule, store).logout()
				window.location.reload()
			}
			NotifyPersonal('Error', error.response.data.message, false);
			return Promise.reject(error.response.data);
		} else {
			NotifyPersonal('Error', 'messages.error.internal_server');
			return Promise.reject(error);
		}
	}
);
