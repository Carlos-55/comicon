<template>
<div>
    <div align="center">
        <!-- <q-dialog v-model="card"> -->
        <q-avatar size="100px" v-for="(item, index) in this.usuario.images" :key="index">
            <q-img :src="item.photo" :ratio="9/9" />
        </q-avatar>
        <!-- </q-dialog> -->
        <br>
        <!-- <q-btn label="Bottom" icon="keyboard_arrow_down" color="primary" @click="open('bottom')" /> -->
        <q-btn flat rounded @click="open('bottom')">
            <q-icon name="camera_alt" @click="uploadAuto(autState.userLogged)" />
        </q-btn>
        <q-dialog v-model="upload" persistent :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down">
            <q-card class="bg-blue-1 text-white">
                <q-bar>
                    <q-space />

                    <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                        <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
                    </q-btn>
                    <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                        <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
                    </q-btn>
                    <q-btn dense flat icon="close" v-close-popup>
                        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                </q-bar>

                <q-card-section>
                    <div class="text-h6 heading">Subir foto de perfil</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <center>
                        <q-uploader :factory="saveFiles" label="Nuevos Archivos" v-model="usuario" auto-upload batch style="max-width: 300px" />
                    </center>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>

    <div align="center" class="text-h5">{{autState.userLogged.name}} {{autState.userLogged.paternsurname}}</div>
    <q-separator color="blue-8" inset />
    <q-btn icon="more_horiz" label="Datos personales" flat @click="bar2 = true" no-caps /> <br>
    <q-btn icon="image" label="Fotos" flat @click="bar2 = true" no-caps />

    <q-separator color="blue-8" inset /><br>

    <div align="center">
        <q-dialog :maximized="maximizedToggle" v-model="bar2" persistent transition-show="slide-up" transition-hide="slide-down">
            <q-card class="bg-blue-1 text-white">
                <q-bar>
                    <div class="heading">{{this.fecha_actual}}</div>

                    <q-space />

                    <q-btn dense flat icon="close" v-close-popup>
                        <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>
                    </q-btn>
                </q-bar>
                <q-card-section>
                    <div class="text-h6 heading">Actualizar</div>
                </q-card-section>

                <q-card-section class="q-pt-none" align="center">
                    <FormFlex :fields="fields" :loader="autState.users" :model="usuario" @onValidation="formValid = $event" @onSubmit="onSubmit" />
                    <div class="col-4" align="center">
                        <q-img :src="this.autState.userPhoto" style="height: 140px; max-width: 150px" />
                    </div>
                    <br>
                    <center>
                        <q-btn align="center" color="blue-10" @click="onSubmit" label="Guardar" />
                    </center>
                </q-card-section>
            </q-card>
        </q-dialog>

    </div>
	<div align="center">
		<PublicationUser></PublicationUser>
	</div>
</div>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue,
    Watch
} from 'vue-property-decorator';
import TableTwo from 'components/Skeleton.vue';
import FormFlex from 'components/Formflex.vue';
import {
    AuthStoreModule
} from '../../store/modules/auth';
import {
    getModule
} from 'vuex-module-decorators';
import {
    UserStoreModule
} from '../../store/modules/user';
import {
    ValidationsForm
} from '../../helpers/validations';
import * as moment from 'moment';
import {
    NotifyPersonal
} from '../../helpers/messages';
import {
    generateFormDataAny
} from '../../helpers/helpers';
import PublicationUser from '../../components/Publications/PublicationComponent.vue';
@Component({
    components: {
        TableTwo,
		FormFlex,
		PublicationUser
    }
})
export default class Configuration extends Vue {
    autState = getModule(AuthStoreModule, this.$store);
    userState = getModule(UserStoreModule, this.$store);
    usuario = {};
    formValid: boolean = true;
    disable: boolean = false;
    bar2: boolean = false;
    idioma: any = moment.locale('es');
    fecha_actual: {} = moment().format('LL');
    bar: boolean = false;
    dialog: boolean = false;
    position: any = 'top';
    maximizedToggle: boolean = true;
    upload: boolean = false;
    card: boolean = false;
    forImage = {};
    @Watch('userState.selectedUser')
    onSelectedPatient(status: any) {
        this.usuario = Object.assign({}, status);
    }

    async mounted() {
        this.usuario = Object.assign({}, await this.userState.getById(this.autState.userLogged));
        this.forImage = this.usuario;
    }

    async created() {

    }

    async onSubmit() {
        if (!this.formValid) {
            return;
        }
        const res = await this.userState.update(this.usuario);
        this.bar2 = false;
    }

    /** save files in localstore */
    async saveFiles(files: any, item: any) {
        let ant: any = await localStorage.getItem('doc');
        let docs = JSON.parse(ant);
        let items = {
            photo: files,
            id_user: docs.id,
            category: 'Perfil'
        };
		//@ts-ignore
        let img = await Vue.prototype.$axios.put('images/'+this.usuario.images[0].id,
            await generateFormDataAny({
                ...this.usuario,
                photo: items.photo,
                id_user: items.id_user,
                category: items.category,
                dateImage: moment().format('LL')
            })
        );
        await this.userState.getById(this.usuario);
        localStorage.removeItem('doc');
        this.upload = false;
    }

    async uploadAuto(item: any) {
        localStorage.setItem('doc', JSON.stringify(item));
        this.upload = true;
    }
    submitting: boolean = false
    simulateSubmit() {
        this.submitting = true
        setTimeout(() => {
            this.submitting = false
        }, 3000)
    }

    fields = [{
            type: 'text',
            label: 'forms.users.name',
            hint: 'Nombre',
            key: 'name',
            field: {
                class: 'col-12 col-md-12 q-px-sm q-py-sm',
                color: 'white'
            },
            rules: [...ValidationsForm.reqAndTree],
            props: {}
        },
        {
            type: 'text',
            label: 'forms.users.last_name',
            hint: 'Nombre',
            key: 'paternSurname',
            field: {
                class: 'col-6 col-md-6 q-px-sm q-py-sm',
            },
            rules: [...ValidationsForm.reqAndTree],
            props: {}
        },
        {
            type: 'text',
            label: 'forms.users.second_lastname',
            hint: 'Nombre',
            key: 'maternSurname',
            field: {
                class: 'col-6 col-md-6 q-px-sm q-py-sm',
            },
            rules: [...ValidationsForm.reqAndTree],
            props: {}
        },
        {
            type: 'dateNew',
            label: 'forms.users.birtDate',
            key: 'birthdate',
            field: {
                class: 'col-12 col-md-12 q-px-sm q-py-sm',
            },
            rules: [...ValidationsForm.reqAndTree],
            props: {}
        },
        //    {
        //     type: 'img',
        //     key: 'photo',
        //     field: {
        //         class: 'col-6 col-md-6 q-px-sm q-py-sm',
        //     },
        //     rules: [...ValidationsForm.reqAndTree],
        //     props: {
        //     }
        //    },
    ];
    //@ts-ignore
    open(position) {
        this.position = position
        this.dialog = true
    }
}
</script>

<style scoped>
.heading {
    color: #000000;
}
</style>
