import { RouteConfig } from 'vue-router';
import Register from '../pages/Register.vue';
import Configuration from '../pages/Admin/Configuration.vue';
const routes: RouteConfig[] = [
	{
		path: '/',
		meta: { requiresNoAuth: true, },
		component: () => import('pages/Login.vue')
	},
	{
		path: '/admin',
		component: () => import('pages/Admin.vue'),
		meta: { requiresAuth: true, },
		children: [
			{ path: '', component: () => import('pages/Admin/Index.vue') },
			{ path: 'usuarios', component: () => import('pages/Admin/Catalogue.vue') },
			{ path: 'roles', component: () => import('pages/Admin/Rols.vue') },
			{ path: 'configuration', component: Configuration }
		]
	},
	{
		path: '/registro',
		meta: {requiresNoAuth: true},
		component: Register,
	}
];

// Always leave this as last one
// @ts-ignore
if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: () => import('pages/Error404.vue')
	});
}

export default routes;
