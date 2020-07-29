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
      </q-toolbar>
    </q-header>

    <q-drawer flat show-if-above v-model="left" side="left">
      <q-list bordered separator v-if="items && items.length > 0">
        <br>
        <q-item-section>
           <div class="col-4" align="center">
         <q-avatar size="180px"> 
            <img :src="this.auth.userPhoto" />
          </q-avatar>
           </div>
        </q-item-section>
        <br />
        <q-item v-for="(item, i) of items" :to="item.url" clickable v-ripple :key="i">
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
            <q-item-label v-if="item.description" caption>{{ item.description }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="logout()" :key="'hola'">
          <q-item-section>
            <q-item-label>Cerrar sesion</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
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

@Component
export default class AdminLayout extends Vue {
  menu: boolean = false;
  auth = getModule(AuthStoreModule, this.$store);
  global = getModule(GlobalStoreModule, this.$store);
  app = APP;
  languages = languages;
  icon = ICON;
  left?: boolean = false;

  @Prop({ type: Array, required: false }) items!: Array<any>;
  created() {
    this.global.setLanguage(this.global.lang);
  }
  logout() {
    this.auth.logout();
    localStorage.clear();
    // @ts-ignore
    this.$router.push('/');
  }
  changeLang(lang: LanguagesActives) {
    this.global.setLanguage(lang);
  }
}
</script>

<style lang="scss" scope></style>
