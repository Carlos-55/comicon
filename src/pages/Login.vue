<template>
	<div id="Login">
	   <!-- <div class="fondo"></div> -->
		<div class="row fit justify-center items-center">
			<div class="col-10 col-sm-5 col-md-3 col-lg-2">
						<div class="abajo">
							<FormFlex
								:fields="fields"
								:loader="authState.loader"
								@onValidation="changeValidation"
								:model="auth"
								@onSubmit="onSubmit"
							/>
							<div class="q-px-sm" align="center">
								<q-btn
									class="width q-my-sm"
									@click="onSubmit"
									outline 
									text-color="blue-10"
									>Iniciar Sesión</q-btn
								>-
								<q-btn
								@click="register()"
								class=" q-my-sm"
								outline 
								color="light-blue-1"
								>Registrate</q-btn>
							</div>

							<!-- <div align="center"> -->
							<!-- </div> -->
						</div>
		
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FormFlex from 'components/FormFlex.vue';
import { getModule } from 'vuex-module-decorators';
import { AuthStoreModule } from '../store/modules/auth';
import { ValidationsForm } from '../helpers/validations';
import { DialogPersonal } from '../helpers/messages';
// import { MsgError } from '../helpers/messages';

@Component({
	components: {
		FormFlex,
	},
})
export default class Login extends Vue {
	authState = getModule(AuthStoreModule, this.$store);
	formValid: boolean = false;
	auth = {};
	async onSubmit() {
		// return;
		if (!this.formValid)
			return DialogPersonal(
				'Info',
				'Verifica los datos de tu formulario'
			);
		await this.authState.login(this.auth);
		if (this.authState.isAuth) {
			this.$router.push('/admin');
		}
	}
	
	async register() {
    	this.$router.push('/registro');
	}
	
	changeValidation(isValid: boolean) {
		if (this.formValid != isValid) {
			this.formValid = isValid;
		}
	}
	fields = [
		{
			type: 'inicio',
			label: 'Usuario',
			key: 'user',
			field: {
				class: 'col-12 q-px-sm q-py-sm',
			},
			props: {
				dark: true,
			},
			rules: [...ValidationsForm.reqEmail],
		},
		{
			type: 'password',
			label: 'Contraseña',
			key: 'password',
			isPassword: true,
			field: {
				class: 'col-12 q-px-sm q-py-sm'
			},
			props: {
				type: 'password',
				dark: true,
			},
			rules: [...ValidationsForm.req],
		},
	];
}
</script>

<style lang="scss">
#Login {
   height: 100vh;
   width: 100%;
   position: absolute;
   background-image:  url('../assets/camp.jpg');
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

.propiedades{
	  .q-field--dark:not(.q-field--focused) .q-field__label,
  .q-field--dark .q-field__marginal,
  .q-field--dark .q-field__bottom {
    color: rgb(255, 255, 255);
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
    color: rgb(255, 253, 253);
  }
}
.abajo{
	//margin: 430px 0 0 0px;
	 position: fixed;
	 bottom: 50px;
	 left:10%;
	 margin-left: -30px;
	//position: absolute;
    //background-size: cover;
}
}

</style>
