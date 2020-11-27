<template>
<div id="Publications">
    <div class="q-ma-md">
        <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle" class="scrollQ">
            <div class="q-pa-md centrar" align="center" v-for="(item, index) of this.publication" :key="index">
                <q-card class="my-card cardsPublics">
                    <q-item>
                        <q-item-section avatar>
                            <div v-if="item.user.images[0] == null">
                                <q-avatar>
                                    <q-img src="../../assets/profile.jpg" style="height: 100%; width: 100%;"></q-img>
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
                            <q-item-label align="left">
                                <b class="userName">{{item.user.name}}</b>
                            </q-item-label>
                        </q-item-section>
                    </q-item>
					 <q-item-label  align="left" class="q-pa-md">{{item.description}}</q-item-label>
                    <q-img :src="item.evidencie" height="100%"></q-img>
                    <q-card-actions align="right" class="q-gutter-md">
						<div v-for="(item2, index2) in action" :key="index2">
							<div v-if="item2.id == item.id">
								<!-- <q-badge transparent align="middle" > -->
									{{item2.quantity}}
								<!-- </q-badge> -->
							</div>
						</div>
                        <q-btn flat icon="thumb_up" @click="like(item)"/>
                        <q-btn flat icon="message" />
                    </q-card-actions>
                </q-card>
            </div>
        </q-scroll-area>
    </div>
	<q-page-sticky position="top-right" :offset="[3, 18]">
        <FormPublication v-model="dialogNewPublication"></FormPublication>
    </q-page-sticky>
</div>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue,
    Watch
} from 'vue-property-decorator';
import Table from 'components/Table.vue';
import Delete from 'components/Delete.vue';
import FormUsers from 'components/Admin/FormUsers.vue';
import Modal from '../../components/ModalPublication.vue';
import FormPublication from '../../components/Publication/FormPublication.vue';
import {
    PublicationStoreModule
} from '../../store/modules/Publications';
import {
    getModule
} from 'vuex-module-decorators';
import {
    IPublication
} from '../../models/publications';
import { addTocardOrLiked } from '../../helpers/helpers';
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
    thumbStyle: any = {};
	barStyle: any = {};
	lickClick = 1;
	count: any;
	action: any = [];
    async mounted() {
        this.publication = Object.assign({}, await this.publicationsStore.getAll());
        this.thumbStyle = {
            right: '4px',
            borderRadius: '5px',
            backgroundColor: '#027be3',
            width: '5px',
            opacity: 0.75
        };

        this.barStyle = {
            right: '2px',
            borderRadius: '9px',
            backgroundColor: '#027be3',
            width: '9px',
            opacity: 0.2
        };
	}
 	async like(item:any){
		let quantity = 1;
		var busqueda = this.action.find((element: any) =>  element.id == item.id)
		//LIKE
		if(typeof busqueda != 'object'){
				this.action.push({...item, quantity:quantity})
		}
		//DISLIKE
		else if(typeof busqueda == 'object'){
				var index = this.action.indexOf( busqueda)
			if(this.action[index].quantity==1){
				this.action.splice(index, 1);
			}
		}
	}
}
</script>

<style lang="scss">
.cardsPublics {
    width: 100%;
}
.scrollQ {
    height: 48em;
    width: 100%;
}
.centrar{
	position: center;
}
.userName{
	font-size: 2em;

}
#Publications{
	padding: 0;
	margin: 0;
}
</style>
