<template>
  <div id="Login" >
    <div class="fondo"></div>
    <div class="row fit justify-center items-center"> 
      <div class="col-11 col-sm-8 col-md-86 col-lg-6" style="color: withe;"> 
             <q-card>
                <q-stepper
                    v-model="step"
                    ref="stepper"
                    title=""
                    alternative-labels
                    color="primary"
                    animated
                    >
                    <q-step
                        :name="1"
                        icon="settings"
                        title=""
                        :done="step > 1"
                    >
                            <FormFlex
                            :fields="fields"
                            :loader="usersState.loader"
                            :model="user"
                            @onValidation="formValid = $event"
                            @onSubmit="onSubmit"
                        />
                    </q-step>

                    <q-step
                        :name="2"
                        title=""
                        icon="create_new_folder"
                        :done="step > 2"
                    >
                         <FormFlex
                            :fields="fieldsTwo"
                            :loader="usersState.loader"
                            :model="user"
                            @onValidation="formValid = $event"
                            @onSubmit="onSubmit"
                        />
                    </q-step>

                    <!-- <q-step
                        :name="3"
                        icon="add_comment"
                    >
                        Try out different ad text to see what brings in the most customers, and learn how to
                        enhance your ads using features like ad extensions. If you run into any problems with
                        your ads, find out how to tell if they're running and how to resolve approval issues.
                    </q-step> -->

                    <template v-slot:navigation>
                       <q-stepper-navigation>
                        <center>
                        <!-- <q-btn-group> -->
                          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Regresar" class="" push/>
                          <q-btn  @click="onSubmit" color="primary" v-if="step === 2" :label="'Registrase'" />
                          <q-btn size="md" @click="$refs.stepper.next()" color="primary" v-else-if="step < 3" :label="'Continuar'"/> <br><br>
                          <q-btn  color="white" @click="goLogin()" no-caps text-color="color: black;">Login</q-btn>
                        <!-- </q-btn-group> -->
                        </center>
                        </q-stepper-navigation>
                    </template>
                    </q-stepper>
                </q-card>
            </div>
        </div>
    </div>
  <!-- </div> -->
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
  Emit,
  PropSync,
  Model
} from 'vue-property-decorator';
import FormFlex from '../components/FormFlex.vue';
import Modal from '../../components/Modal.vue';
import { getModule } from 'vuex-module-decorators';
import { ValidationsForm } from '../helpers/validations';
import { UserStoreModule } from '../store/modules/user';
import { IUser } from '../models/user';

@Component({
  components: {
    FormFlex
  }
})
export default class FormUsers extends Vue {
 // @Prop({ type: Boolean, required: true }) value!: boolean;
  dialog = false;
  formValid: boolean = false;
  usersState = getModule(UserStoreModule, this.$store);
  user: IUser = {};
  birthdate="";
  cellphone=null;
  step: number = 1

    async goLogin() {
    this.$router.push('/');
  }

  async onSubmit() {
    if (!this.formValid) {
      return;
    }
    console.log(this.user);
      const res = await this.usersState.create({ ...this.user, rol: 2 });
      this.$router.push('/');
  }
  fields = [
    {
      type: 'textoNormal',
      label: 'Nombre',
      key: 'name',
      field: { class: 'col-12 col-md-6 q-px-sm q-py-sm' },
      props: {},
      rules: [...ValidationsForm.reqAndTree]
    },
    {
      type: 'textoNormal',
      label: 'Apellido paterno',
      key: 'paternSurname',
      field: {
        class: 'col-12 col-md-6 q-px-sm q-py-sm'
      },
      rules: [...ValidationsForm.reqAndTree],
      props: {}
    },
    {
      type: 'textoNormal',
      label: 'Apellido materno',
      key: 'maternSurname',
      field: {
        class: 'col-12 col-md-6 q-px-sm q-py-sm'
      },
      rules: [...ValidationsForm.reqAndTree],
      props: {}
    },
     {
      type: 'dateNew',
      label:'Fecha de nacimiento',
      key:'birthdate',
      field: {
        class: 'col-12 col-md-6 q-px-sm q-py-sm'
      },
        rules: [...ValidationsForm.reqAndTree],
        props: { 
        }
    } ,
  ];

  fieldsTwo = [
        {
            type: 'textoNormal',
            label: 'Nombre de usuario',
            key: 'user',
            field: {
                class: 'col-12 q-px-sm q-py-sm'
            },
            rules: [...ValidationsForm.req],
            props: {
            }
        },
        {
        type: 'textoNormalNu',
        label: 'Numero de telefono',
        key: 'cellphone',
        field: {
            class: 'col-12 q-px-sm q-py-sm'
        },
        rules: [...ValidationsForm.reqAndTree],
        props: {
            type:'number'
        }
        },
        {
            type: 'textoNormalNu',
            label: 'Correo electronico',
            key: 'email',
            field: {
                class: 'col-12 q-px-sm q-py-sm'
            },
            rules: [...ValidationsForm.reqEmail],
            props: {
                type:'email'
            }
            },
        {
            type: 'password2',
            label: 'Contraseña',
            key: 'password',
            isPassword: true,
            field: {
                class: 'col-12 q-px-sm q-py-sm'
            },
            props: {
                type: 'password',
                dark: true
            },
            rules: [...ValidationsForm.req]
            }
  ];
}
</script>

<style lang="scss">
#Login {
   height: 100vh;
   width: 100%;
   position: absolute;
  background-image: url('../assets/camp.jpg');
  background-size: cover;
// .fondo{
	
//   height: 100vh;
//   width: 100%;
// position: absolute;
//     background: rgba($color: #fdfafa, $alpha: 1)
//      url('../assets/camp.jpg') no-repeat center center;
//     filter: blur(2px);
//     // -webkit-filter: blur(-3px);
//     background-size: cover;
// }


  .q-field--dark:not(.q-field--focused) .q-field__label,
  .q-field--dark .q-field__marginal,
  .q-field--dark .q-field__bottom {
    color: rgb(0, 0, 0);
    font-weight: bold;
    // background-color: grey;
  }
  .q-field--filled.q-field--dark .q-field__control,
  .q-field--filled.q-field--dark .q-field__control:before {
    background: rgb(190, 186, 186);
  }
  .q-field--dark .q-field__native,
  .q-field--dark .q-field__prefix,
  .q-field--dark .q-field__suffix,
  .q-field--dark .q-field__input {
    color: #000;
  }

}

scroll{
  overflow-y:hidden;
    overflow-x:hidden;
}
</style>