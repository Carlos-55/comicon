<template>
  <Modal
    :btnTitle="''"
    :title="user.id ? 'titles.updated' : 'titles.creation'"
    @onConfirm="onSubmit"
    v-model="dialog"
    @onCancel="onCancel"
    :loader="usersState.loader"
    :btnProps="{ dense: true, fab: true, color: 'primary', icon: 'add' }"
  >
    <FormFlex
      :fields="fields"
      :loader="usersState.loader"
      :model="user"
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
  usersState = getModule(UserStoreModule, this.$store);
  user: IUser = {};

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
    this.user = Object.assign({}, this.usersState.selectedUser);
  }
  @Watch('usersState.selectedUser')
  onSelectedUser(status: any, newStatus: IUser) {
    this.user = Object.assign({}, status);
  }

  async onSubmit() {
    if (!this.formValid) {
      return;
    }
    if (this.user.id) {
      const res = await this.usersState.update(this.user);
      this.onCancel();
    } else {
      const res = await this.usersState.create({ ...this.user });
      this.onCancel();
    }
  }
  fields = [
    {
      type: 'text',
      label: 'forms.users.name',
      key: 'name',
      field: { class: 'col-12 col-md-6 q-px-sm q-py-sm' },
      props: {},
      rules: [...ValidationsForm.reqAndTree]
    },
    {
      type: 'text',
      label: 'forms.users.last_name',
      key: 'lastName',
      field: {
        class: 'col-12 col-md-6 q-px-sm q-py-sm'
      },
      rules: [...ValidationsForm.reqAndTree],
      props: {}
    },
    {
      type: 'text',
      label: 'forms.users.email',
      key: 'email',
      field: {
        class: 'col-12 col-md-6 q-px-sm q-py-sm'
      },
      rules: [],
      props: {
        type: 'email'
      }
    },
    {
      type: 'file',
      label: 'forms.users.photo',
      key: 'photo',
      field: {
        class: 'col-12 col-md-6 q-px-sm q-py-sm'
      },
      props: {}
    },
    {
      type: 'multi-form',
      label: 'forms.users.address',
      key: 'codes',
      field: {
        class: 'col-12 col-md-6 q-px-sm q-my-sm q-py-sm'
      },
      fields: [
        {
          type: 'text',
          label: 'forms.users.cp',
          key: 'cp',
          field: {
            class: 'col-12 col-md-6 q-px-sm q-py-sm'
          },
          rules: [],
          props: {}
        },
        {
          type: 'text',
          label: 'forms.users.street',
          key: 'street',
          field: {
            class: 'col-12 col-md-6 q-px-sm q-py-sm'
          },
          rules: [],
          props: {}
        }
        // {
        //   type: 'text',
        //   label: 'forms.users.name',
        //   key: 'name',
        //   field: {
        //     class: 'col-12 col-md-6 q-px-sm q-py-sm'
        //   },
        //   rules: [],
        //   props: {}
        // }
      ]
    }
    // {
    //   type: 'form',
    //   label: 'forms.users.address',
    //   key: 'address',
    //   fields: [
    //     {
    //       type: 'text',
    //       label: 'forms.users.cp',
    //       key: 'cp',
    //       field: {
    //         class: 'col-12 col-md-6 q-px-sm q-py-sm'
    //       },
    //       rules: [],
    //       props: {}
    //     },
    //     {
    //       type: 'text',
    //       label: 'forms.users.street',
    //       key: 'street',
    //       field: {
    //         class: 'col-12 col-md-6 q-px-sm q-py-sm'
    //       },
    //       rules: [],
    //       props: {}
    //     },
    //     {
    //       type: 'text',
    //       label: 'forms.users.name',
    //       key: 'name',
    //       field: {
    //         class: 'col-12 col-md-6 q-px-sm q-py-sm'
    //       },
    //       rules: [],
    //       props: {}
    //     }
    //   ],
    //   field: {
    //     class: 'col-12  q-px-sm q-py-sm'
    //   }
    // }
  ];
}
</script>

<style lang="scss" scope></style>
