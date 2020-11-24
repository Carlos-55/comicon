<template>
  <div id="Publications">
	 <q-page-sticky position="top-right" :offset="[3, 18]">
			 <FormPublication v-model="dialogNewPublication"></FormPublication>
     </q-page-sticky>
	 <br>
	<div class="q-pa-md" align="center" v-for="(item, index) of this.publication" :key="index">
		<q-card style="max-width: 300px">
		<q-item>
			<q-item-section avatar>
				<div v-if="item.user.images[0] == null">
					<q-avatar>
						<q-img src="../../assets/profile.jpg"  style="height: 100%; width: 100%;"></q-img>
					</q-avatar>
				</div>
				<div v-else>
					<div v-if="item.user.images[0].category == 'Perfil'">
						<q-avatar>
							<q-img :src="item.user.images[0].photo" style="height: 100%; width: 100%;"></q-img>
						</q-avatar>
					</div>
				</div>
			</q-item-section>

			<q-item-section>
			<q-item-label>
				<p type="text">{{item.user.name}}</p>
			</q-item-label>
			<q-item-label caption>
				<p type="text">{{item.description}}</p>
			</q-item-label>
			</q-item-section>
		</q-item>
		<!-- <q-skeleton height="200px" square /> -->
		<q-img :src="item.evidencie"></q-img>
		<q-card-actions align="right" class="q-gutter-md">
			<q-btn flat icon="thumb_up"/>
			<q-btn  flat  icon="message"/>
		</q-card-actions>
		</q-card>
   </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Table from 'components/Table.vue';
import Delete from 'components/Delete.vue';
import FormUsers from 'components/Admin/FormUsers.vue';
import Modal from '../../components/ModalPublication.vue';
import FormPublication from '../../components/Publication/FormPublication.vue';
import { PublicationStoreModule } from '../../store/modules/Publications';
import { getModule } from 'vuex-module-decorators';
import { IPublication } from '../../models/publications';
@Component({
  components: {
    Table,
    FormUsers,
	Delete,
	Modal,
	FormPublication
  }
})
export default class Publications extends Vue {
  publicationsStore = getModule(PublicationStoreModule, this.$store);
  dialog = false;
  dialogDelete = false;
  model = {};
  publication = [];
  dialogNewPublication: boolean = false;
  publications: any;
 	async mounted() {
		   this.publication = Object.assign({},  await this.publicationsStore.getAll());
	}
}
</script>

<style lang="scss" scope></style>
