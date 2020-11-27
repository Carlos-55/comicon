<template>
   <q-card-section>
        <div v-for="(item, index) in this.usuario.publication" :key="index">
			<br>
            <q-card>
                <q-card-section>
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar>
                                <q-img :src="item.user.images[0].photo" style="height: 100%; width: 100%;"></q-img>
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>
                                {{item.user.name}}
                            </q-item-label>
                            <q-item-label caption>
                                {{item.description}}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-img :src="item.evidencie"></q-img>
                </q-card-section>
                <q-card-actions align="right" class="q-gutter-md">
                    <q-btn flat icon="thumb_up" />
                    <q-btn flat icon="message" />
                </q-card-actions>
            </q-card>
        </div>
    </q-card-section>
</template>

<script lang="ts">
import { IUser } from '../../models/user';
import { Component, Vue, Prop, Watch, Emit, PropSync, Model} from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import { UserStoreModule } from '../../store/modules/user';
import { AuthStoreModule } from 'src/store/modules/auth';
@Component({components: {}})
export default class PublicationsComponents extends Vue{
 dialog : boolean = false;
 authState = getModule(AuthStoreModule, this.$store);
 userState = getModule(UserStoreModule, this.$store);
 usuario = {};
  @Emit('input')
  async onCancel() {
    this.dialog = false;
    return false;
  }
  @Watch('value')
  onChange(state: boolean, newStatus: boolean) {
    this.dialog = state;
  }

  async mounted() {
	  this.usuario = Object.assign({}, await this.userState.getById(this.authState.userLogged))
  }
}
</script>

<style>

</style>
