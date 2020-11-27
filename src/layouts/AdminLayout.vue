<template>
<q-layout view="hHr lpR lFr">
    <q-header elevated class="bg-primary text-white">
        <q-toolbar>
            <q-btn flat round icon="menu" @click="left = !left" />
            <q-toolbar-title>
            </q-toolbar-title>
            <q-btn icon="chat" flat @click="dialog=true">
                <q-badge floating align="top" color="green">oa</q-badge>
            </q-btn>
            <q-btn flat icon="settings" dense>
                <q-menu>
                    <div class="row no-wrap q-pa-md">
                        <div >

						</div>
                        <!-- <q-separator vertical inset class="q-mx-lg" /> -->

                        <div class="column items-center">
                            <q-avatar size="72px">
                                <img :src="this.usuario.images[0].photo">
                            </q-avatar>

                            <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                            <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
							<br>
							 <q-btn-toggle v-model="model"  toggle-color="primary" :options="[
        						 { icon: 'brightness_low', value: 'light', click: DarkMode()},
       							 {icon: 'nights_stay', value: 'dark'},
		 					]" />
                        </div>
                    </div>
                </q-menu>
            </q-btn>
            <q-dialog v-model="dialog" persistent :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down">
                <q-card class="bg-primary text-white">
                    <q-layout view="lHr lpR lfr" id="chat" container class="bg-white">
                        <q-header class="bg-primary">
                            <q-toolbar>
                                <q-btn dense flat round icon="menu" @click="right = !right">
                                    <q-tooltip content-class="bg-blue-10 text-white">Ver usuarios</q-tooltip>
                                </q-btn>
                                <q-toolbar-title>Nombre</q-toolbar-title>
                                <q-btn flat @click="dialog=false" round dense icon="close">
                                    <q-tooltip content-class="bg-blue-10 text-white">Cerrar</q-tooltip>
                                </q-btn>
                            </q-toolbar>
                        </q-header>
                        <q-drawer show-if-above v-model="right" side="right" elevated>
                            <q-list bordered padding class="rounded-borders" style="max-width: 350px">
                                <q-item-label header>Chats</q-item-label>

                                <q-item clickable v-ripple v-for="(user, i) of messagesStore.users" :key="i" @click="goConversation(user)">
                                    <q-item-section avatar top>
                                        <q-avatar icon="face" color="red" text-color="white" />
                                    </q-item-section>

                                    <q-item-section>
                                        <q-item-label lines="1" caption>
                                            <!-- <p style="color:blue"> -->
                                            {{user.name}}
                                            <!-- </p> -->
                                        </q-item-label>
                                    </q-item-section>

                                    <q-item-section side>
                                        <q-icon name="sms" color="green" />
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-drawer>

                        <q-page-container sc>
                            <q-page padding>
                                <q-chat-message v-for="(message, i) of messagesStore.selectedConversation.messages" :key="i" :text="[message.message]" :stamp="message.createdAt|ago" :sent="auth.userLogged.id==message.fromId" />
                            </q-page>
                        </q-page-container>
                        <q-footer elevated class="bg-white text-white q-pa-sm">
                            <q-input outlined bottom-slots v-model="text" label="Escribe un mensaje" counter @keypress="sendMessageEnter($event)" maxlength="200" dense>
                                <template v-slot:append>
                                    <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
                                </template>

                                <template v-slot:hint>Mensaje</template>

                                <template v-slot:after>
                                    <q-btn v-if="text.length>0" round dense flat icon="send" @click="sendMessage" />
                                </template>
                            </q-input>
                        </q-footer>
                    </q-layout>
                </q-card>
            </q-dialog>
        </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" elevated>
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
            <q-list bordered separator v-if="items && items.length > 0">
                <br>
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
                    <img :src="this.usuario.images[0].photo">
                </q-avatar>
                <div class="text-weight-bold">{{this.auth.userLogged.name}} {{this.auth.userLogged.paternsurname}}</div>
                <div>{{this.auth.userLogged.email}}</div>
            </div>
        </q-img>
    </q-drawer>
    <q-page-container>
        <q-page padding>
            <slot></slot>
            <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <Chat/>
            </q-page-sticky> -->
        </q-page>
    </q-page-container>

    <q-footer elevated style="height: 40px;">
    </q-footer>
</q-layout>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from 'vue-property-decorator';
import {
    APP,
    ICON
} from '../helpers/configs';
import {
    AuthStoreModule
} from '../store/modules/auth';
import {
    getModule
} from 'vuex-module-decorators';
import {
    GlobalStoreModule
} from '../store/modules/global';
import {
    languages,
    LanguagesActives
} from '../boot/i18n';
import {
    UserStoreModule
} from '../store/modules/user';
import {
    IUser
} from '../models/user';
import Chat from '../components/Chat.vue';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import {
    SOCKET
} from '../helpers/configs';
import {
    ConversationStoreModule
} from '../store/modules/conversations';
import {
    IMessage
} from 'src/models/message';
@Component({
    components: {
        Chat
    },
    filters: {
        ago(value: string) {
            return moment(value).fromNow();
        }
    }
})
export default class AdminLayout extends Vue {
    menu: boolean = false;
    auth = getModule(AuthStoreModule, this.$store);
    userState = getModule(UserStoreModule, this.$store);
    global = getModule(GlobalStoreModule, this.$store);
    messagesStore = getModule(ConversationStoreModule, this.$store);
    idioma: any = moment.locale('es');
    fecha_actual: {} = moment().format('LL');
    app = APP;
    languages = languages;
    right: boolean = false;
    icon = ICON;
    left ? : boolean = false;
    usuario: IUser = {};
    mobileData: boolean = true;
    darkMode: boolean = false;
    photoProfile: string = '';
    alert: boolean = false;
    dialog: boolean = false;
    maximizedToggle: boolean = true;
    name: any = '';
    text: string = '';
    loading6 = false
    model = 'light';
    //@ts-ignore
    io: any = io(SOCKET, {
        secure: false
    });
    defaultPhoto = '../assets/profile.jpg';
    async mounted() {
        this.usuario = Object.assign({}, await this.userState.getById(this.auth.userLogged));
        this.messagesStore.getUsers();
        this.io.on(`new/${this.auth.userLogged.id}`, this.listenMessages);
    }

    @Prop({
        type: Array,
        required: false
    }) items!: Array < any > ;
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

    listenMessages(data: any) {
        this.messagesStore.context.commit('ADD_MESSAGE', data);
        this.goDown();
    }
    goDown() {
        let chat: any = document.getElementById('chat');
        chat.children[0].children[0].scrollTop =
            chat.children[0].children[0].scrollHeight;
    }

    async goConversation(user: IMessage) {
        await this.messagesStore.getConversation(user.id);
        await this.messagesStore.isReadStatusUpdate();
        this.goDown();
    }

    async sendMessage() {
        await this.messagesStore.create({
            fromId: this.auth.userLogged.id,
            message: this.text
        });
        this.text = '';
        this.messagesStore.getUsers();
    }
    async sendMessageEnter(event: any) {
        if (event.charCode == 13) {
            await this.messagesStore.create({
                fromId: this.auth.userLogged.id,
                message: this.text
            });
            this.text = '';
            this.messagesStore.getUsers();
        }
    }

    async DarkMode() {
        if(this.model == 'light'){
        return this.$q.dark.set(false)
        }else{
        this.$q.dark.set(true)
        }
    }
    simulateProgress(number: number) {
        // we set loading state
        this.loading6 = true
        // simulate a delay
        setTimeout(() => {
            // we're done, we reset loading state
            this.loading6 = false
        }, 3000)
    }
}
</script>

<style lang="scss">
.imagen {
    width: 280px;
    height: 200px;
}
</style>
