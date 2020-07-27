<template>
    <div>
        <div align="center" class="text-h5">Template</div>
            <div>
                    <div class="q-pa-md">
                        <q-card style="max-width: 300px">
                        <q-item>
                            <q-item-section avatar>
                            <q-skeleton type="QAvatar" />
                            </q-item-section>

                            <q-item-section>
                            <q-item-label>
                                <q-skeleton type="text" />
                            </q-item-label>
                            <q-item-label caption>
                                <q-skeleton type="text" />
                            </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-skeleton height="200px" square />

                        <q-card-actions align="right" class="q-gutter-md">
                            <q-skeleton type="QBtn" />
                            <q-skeleton type="QBtn" />
                        </q-card-actions>
                        </q-card>
                    </div>
            </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component({
  components: {
    // QTable
  }
})
export default class TableTwo extends Vue {
  /*
   * name. string
   * required. boolean
   * align. 'center'|'left'|''
   * field. (row)=>row.name | 'name'
   * format. (val)=> format any things
   */
//   filter: string = '';
//   @Prop({ required: true, type: Array }) headers!: Array<Object>;
//   @Prop({ required: true, type: Array }) data!: Array<Object>;
//   @Prop({ required: true, type: String }) title!: string;
//   @Prop({ required: false, type: String, default: 'id' }) keyProp!: string;
//   @Prop({ required: false, type: Boolean, default: false }) loading!: boolean;

//   @Emit('onUpdate')
//   onActionListUpdate(item: any) {
//     return item;
//   }

//   tranlateHeaders() {
//     return this.headers.map(header => {
//       return {
//         ...header,
//         // @ts-ignore
//         label: this.$t(header.label)
//       };
//     });
//   }

//   @Emit('onDelete')
//   onActionListDelete(item: any) {
//     return item;
//   }
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