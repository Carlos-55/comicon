<template>
  <Modal
    :btnTitle="''"
    :title="publication.id ? 'publications.updated' : 'Agregar publicacion'"
    @onConfirm="onSubmit"
    v-model="dialog"
    @onCancel="onCancel"
    :loader="publicationState.loader"
    :btnProps="{ dense: true, fab: true, color: 'primary', icon: 'add', size:'xs'}"
  >
    <FormFlex
      :fields="fields"
      :loader="publicationState.loader"
      :model="publication"
      @onValidation="formValid = $event"
      @onSubmit="onSubmit"
    />
  </Modal>
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
import FormFlex from '../../components/FormFlex.vue';
import Modal from '../../components/Modal.vue';
import { getModule } from 'vuex-module-decorators';
import { UserStoreModule } from '../../store/modules/user';
import { IUser } from '../../models/user';
import { ValidationsForm } from '../../helpers/validations';
import { PublicationStoreModule } from '../../store/modules/Publications';
import { IPublication } from '../../models/publications';
import { generateFormData, generateFormDataAny } from '../../helpers/helpers';
import * as moment from 'moment';
@Component({
  components: {
    FormFlex,
    Modal
  }
})
export default class FormUsers extends Vue {
  @Prop({ type: Boolean, required: true }) value!: boolean;
  dialog = false;
  formValid: boolean = false;
  publicationState = getModule(PublicationStoreModule, this.$store);
  publication: IPublication = {};
  day = moment().format();
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
    this.dialog = this.value;
	this.publication = Object.assign({}, this.publicationState.selectedPublication);

  }
  @Watch('publicationState.selectedPublication')
  onSelectedUser(status: any, newStatus: IUser) {
    this.publication = Object.assign({}, status);
  }

  async onSubmit() {
    if (!this.formValid) {
      return;
	}
    if (this.publication.id) {
      const res = await this.publicationState.update({ ...this.publication, datePublic: this.day});
      this.onCancel();
    } else {
      const res = await this.publicationState.create({ ...this.publication, datePublic: this.day});
      this.onCancel();
    }
  }
  fields = [
    // {
    //   type: 'text',
    //   label: 'publications.name',
    //   key: 'name',
    //   field: { class: 'col-12 col-md-6 q-px-sm q-py-sm' },
    //   props: {},
    //   rules: [...ValidationsForm.reqAndTree]
    // },
    // {
    //   type: 'text',
    //   label: 'publications.createdAt',
    //   key: 'datePublic',
    //   field: {
    //     class: 'col-12 col-md-6 q-px-sm q-py-sm'
    //   },
    //   rules: [...ValidationsForm.reqAndTree],
    //   props: {}
    // },
    {
      type: 'textArea',
      label: 'publications.description',
      key: 'description',
      field: {
        class: 'col-12 col-md-6 q-px-sm q-py-sm'
      },
      rules: [],
      props: {
      }
    },
    // {
    //   type: 'file',
    //   label: 'forms.users.category',
    //   key: 'category',
    //   field: {
    //     class: 'col-12 col-md-6 q-px-sm q-py-sm'
    //   },
    //   props: {}
    // },
    {
      type: 'file',
      label: 'publications.image',
      key: 'evidencie',
      field: {
        class: 'col-12 col-md-6 q-px-sm q-py-sm'
      },
      rules: [],
      props: {
		  filled: true
      }
    },
  ];
}
</script>

<style lang="scss" scope></style>
