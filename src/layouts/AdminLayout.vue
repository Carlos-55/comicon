<template>
  <q-layout view="hHr lpR lFr">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn  flat round icon="menu" @click="left = !left" />
        <!-- <q-btn-dropdown v-model="menu" class="glossy q-ml-lg" color="red" label="Idiomas">
          <q-list>
            <q-item
              clickable
              v-close-popup
              v-for="(lang,i) in languages"
              @click="changeLang(lang.lang)"
              :key="i"
            >
              <q-item-section>
                <q-item-label>{{lang.name}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown> -->
		<q-toolbar-title>
		</q-toolbar-title>
		 <q-btn flat round dense icon="more_vert">
			  <q-menu>
				<div class="row no-wrap q-pa-md">
				<div class="column">
					<div class="text-h6 q-mb-md">Settings</div>
					<q-toggle v-model="mobileData" label="Use Mobile Data" />
					<q-toggle v-model="bluetooth" label="Bluetooth" />
				</div>

				<q-separator vertical inset class="q-mx-lg" />

				<div class="column items-center">
					<q-avatar size="5em">
						<q-img src="../assets/profile.jpg" style="height: 100%; width: 100%;"/>
					</q-avatar>

					<div class="text-subtitle1 q-mt-md q-mb-xs">
					{{this.usuario.name}}
					</div>

					<q-btn
					color="primary"
					label="Logout"
					push
					size="sm"
					v-close-popup
					/>
				</div>
				</div>
			</q-menu>
		 </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" elevated>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list bordered separator v-if="items && items.length > 0">
        <br>
        <!-- <q-item-section>
           <div class="col-4" align="center"> -->
         <!-- <q-avatar square  size="180px">  -->
            <!-- <img src="../assets/comicon.jpg" class="imagen"/> -->
          <!-- </q-avatar> -->
           <!-- </div>
        </q-item-section> -->
        <br />
        <q-item v-for="(item, i) of items" :to="item.url" clickable v-ripple :key="i">
          <q-item-section>
            <div class>
              <div class="row">
                <div class="col-3">
                  <span class="material-icons icon">{{ item.icon }}</span>
                </div>
                <div class="col-7">
                  <q-item-label>{{ item.title }}</q-item-label>
                </div>
              </div>
            </div>
            <q-item-label v-if="item.description" caption>{{ item.description }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="logout()" :key="'hola'">
          <q-item-section>
            <div class>
              <div class="row">
                <div class="col-3">
                  <span class="material-icons icon">exit_to_app</span>
                </div>
                <div class="col-7">
                  <q-item-label>Cerrar sesion</q-item-label>
                </div>
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      </q-scroll-area>
      <q-img class="absolute-top" src="../assets/batman.jpg" style="height: 180px">
                <div class="absolute-bottom bg-transparent">
                  <q-avatar size="56px" class="q-mb-sm">
                    <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
                  </q-avatar>
                  <div class="text-weight-bold">{{this.auth.userLogged.name}} {{this.auth.userLogged.paternsurname}}</div>
                  <div>{{this.auth.userLogged.email}}</div>
                </div>
              </q-img>
            </q-drawer>
    <q-page-container>
      <q-page padding>
        <slot></slot>
      </q-page>
    </q-page-container>

    <q-footer elevated style="height: 40px;">

    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { APP, ICON } from '../helpers/configs';
import { AuthStoreModule } from '../store/modules/auth';
import { getModule } from 'vuex-module-decorators';
import { GlobalStoreModule } from '../store/modules/global';
import { languages, LanguagesActives } from '../boot/i18n';
import { UserStoreModule } from '../store/modules/user';
import { IUser } from '../models/user';
@Component
export default class AdminLayout extends Vue {
  menu: boolean = false;
  auth = getModule(AuthStoreModule, this.$store);
  userState = getModule(UserStoreModule, this.$store);
  global = getModule(GlobalStoreModule, this.$store);
  app = APP;
  languages = languages;
  icon = ICON;
  left?: boolean = false;
  usuario: IUser = {};
  mobileData: boolean = true;
  bluetooth: boolean = false;
  photoProfile: string = '';
  defaultPhoto = '../assets/profile.jpg';
  async mounted(){
		this.usuario = Object.assign({}, await this.userState.getById(this.auth.userLogged));
		for(let image = 0 ; image < this.usuario.images.length; image++){
			let element = this.usuario.images[image];
			if(element.category == 'Perfil'){
				this.photoProfile = element.photo;
				return this.photoProfile
			}
		}
	}


  @Prop({ type: Array, required: false }) items!: Array<any>;
  created() {
    this.global.setLanguage(this.global.lang);
  }
  logout() {
    this.auth.logout();
    localStorage.clear();
    this.$router.push('/');
  }
  changeLang(lang: LanguagesActives) {
    this.global.setLanguage(lang);
  }
}
</script>

<style lang="scss" scope>
.imagen{
  width: 280px;
  height: 200px;
}
</style>
