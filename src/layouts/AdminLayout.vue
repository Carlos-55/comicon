<template>
  <q-layout view="hHr lpR lFr">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          <!-- <q-avatar>
            <img :src="icon" />
          </q-avatar> -->
          <!-- {{ app }} -->
        </q-toolbar-title>
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

    <q-drawer show-if-above v-model="left" side="left" elevated>
      <q-list bordered separator v-if="items && items.length > 0">
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

    <q-footer bordered height="10px">
      <q-toolbar height="10px">
        <!-- <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>Title
        </q-toolbar-title>-->
      </q-toolbar>
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
    // @ts-ignore
    this.$router.push('/');
  }
  changeLang(lang: LanguagesActives) {
    this.global.setLanguage(lang);
  }
}
</script>

<style lang="scss" scope></style>
