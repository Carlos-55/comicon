<template>
  <div id="Table">
    <q-table
      card-class="bg-primary text-white"
      :data="data"
      :columns="tranlateHeaders()"
      grid
      :row-key="keyProp"
      :dense="$q.screen.lt.md"
      :loading="loading"
      :filter="filter"
      :no-data-label="$t('tables.no_data')"
      :no-results-label="$t('tables.no_result')"
      hide-header
    >
      <template v-slot:top>
        <div class="row fit">
          <div class="col-11">
            <span class="text-h5">{{ $t(title) }}</span>
          </div>
          <div class="col-1 nana">
            <slot></slot>
          </div>
        </div>
        <div class="row fit">
          <div class="col-12">
            <q-input dense v-model="filter" :placeholder="$t('tables.find')">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-primary q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>{{$t('tables.bad')}} {{ $t(message) }}</span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
      <template v-slot:body-cell-active="props">
        <q-td :props="props">
          <div>
            <q-badge
              :color="props.value ? 'green' : 'red'"
              :label="props.value ? 'Activo' : 'Inactivo'"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-options="props">
        <q-td :props="props">
          <q-btn
            icon="edit"
            size="sm"
            dense
            color="warning"
            @click="onActionListUpdate(props.row)"
          />&nbsp;
          <q-btn icon="delete" size="sm" dense color="red" @click="onActionListDelete(props.row)" />
        </q-td>
      </template>
      <template v-slot:body-col-options="props">
        <!-- <q-menu></q-menu> -->
        <q-btn icon="edit" size="sm" dense color="warning" @click="onActionListUpdate(props.row)" />&nbsp;
        <q-btn icon="delete" size="sm" dense color="red" @click="onActionListDelete(props.row)" />
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component({
  components: {
    // QTable
  }
})
export default class Table extends Vue {
  /*
   * name. string
   * required. boolean
   * align. 'center'|'left'|''
   * field. (row)=>row.name | 'name'
   * format. (val)=> format any things
   */
  filter: string = '';
  @Prop({ required: true, type: Array }) headers!: Array<Object>;
  @Prop({ required: true, type: Array }) data!: Array<Object>;
  @Prop({ required: true, type: String }) title!: string;
  @Prop({ required: false, type: String, default: 'id' }) keyProp!: string;
  @Prop({ required: false, type: Boolean, default: false }) loading!: boolean;

  @Emit('onUpdate')
  onActionListUpdate(item: any) {
    return item;
  }

  tranlateHeaders() {
    return this.headers.map(header => {
      return {
        ...header,
        // @ts-ignore
        label: this.$t(header.label)
      };
    });
  }

  @Emit('onDelete')
  onActionListDelete(item: any) {
    return item;
  }
}
</script>

<style lang="scss" scope>
.nana {
  display: grid;
  justify-content: end;
  align-items: flex-end;
  align-self: flex-end;
  align-content: flex-end;
}
</style>
