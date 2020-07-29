<template>
	<AdminLayout :items="items">
		<router-view></router-view>
	</AdminLayout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AdminLayout from '../layouts/AdminLayout.vue';
import { Action } from 'vuex-module-decorators';
import { getModule } from 'vuex-module-decorators';
import { ModuleOptions } from 'vuex-module-decorators/dist/types/moduleoptions';

@Component({
	components: {
		AdminLayout,
	},
})
export default class Index extends Vue {
	items = [
		{
			title: 'Inicio',
			description: 'Muestra el inicio',
			url: '/admin',
		},
		{
			title: 'Categorias',
			description: 'Comics por categoria',
			url: '/admin/usuarios',
		},
		// {
		// 	title: 'Roles',
		// 	description: 'Muestra los usuarios',
		// 	url: '/admin/roles',
		// },
		{
			title: 'Configuracion',
			description: 'Configuracion de datos',
			url: '/admin/configuration'
		}
	];
}
</script>

<style lang="scss" scope></style>
