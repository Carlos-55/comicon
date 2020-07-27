<template>
  <div id="Users">
    <Delete
      :headers="headers"
      v-model="dialogDelete"
      :item="usersStore.selectedUser"
      @onConfirm="onConfirmDelete"
    />
    <Table
      :headers="headers"
      :loading="usersStore.loader"
      :data="usersStore.users"
      @onUpdate="onUpdate"
      @onDelete="onDelete"
      title="titles.users"
    >
      <FormUsers v-model="dialog" />
    </Table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Table from 'components/Table.vue';
import Delete from 'components/Delete.vue';
import FormUsers from 'components/Admin/FormUsers.vue';
import { UserStoreModule } from '../../store/modules/user';
import { getModule } from 'vuex-module-decorators';
@Component({
  components: {
    Table,
    FormUsers,
    Delete
  }
})
export default class Users extends Vue {
  usersStore = getModule(UserStoreModule, this.$store);
  dialog = false;
  dialogDelete = false;
  model = {};

  headers = [
    {
      name: 'id',
      label: 'headers.users.no',
      sortable: true,
      required: true,
      align: 'center',
      field: 'id'
    },
    {
      name: 'name',
      label: 'headers.users.name',
      sortable: true,
      required: true,
      align: 'center',
      field: 'name'
    },
    {
      name: 'email',
      label: 'headers.users.email',
      sortable: true,
      required: true,
      align: 'center',
      field: 'email'
    },
    {
      name: 'active',
      label: 'headers.users.state',
      sortable: true,
      required: true,
      align: 'center',
      field: 'active'
    },
    {
      name: 'rol',
      label: 'headers.users.rol',
      sortable: true,
      required: true,
      align: 'center',
      field: 'rol'
    },
    {
      name: 'options',
      label: 'headers.users.options',
      sortable: false,
      required: false,
      align: 'center',
      field: 'options'
    }
  ];
  onUpdate(item: any) {
    this.usersStore.context.commit('SET', item);
    this.dialog = true;
  }
  onDelete(item: any) {
    this.dialogDelete = true;
    this.usersStore.context.commit('SET', item);
  }
  @Watch('dialogDelete')
  onDialogDelete(status: any, newStatus: boolean) {
    if (!status) {
      this.usersStore.context.commit('SET');
    }
  }
  @Watch('dialog')
  onDialog(status: any, newStatus: boolean) {
    if (!status) {
      this.usersStore.context.commit('SET');
    }
  }
  async onConfirmDelete() {
    await this.usersStore.delete(this.usersStore.selectedUser);
    this.dialogDelete = false;
  }

  async created() {
    await this.usersStore.getAll();
  }
}
</script>

<style lang="scss" scope></style>
