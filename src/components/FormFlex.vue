<template>
  <q-form ref="formComplete" @submit="onSubmit" @reset="onCancel" class="q-gutter-md">
    <div class="row">
      <div v-for="(item, i) of fields" :key="i" v-bind="item.field">
        <template v-if="item.type == 'select'">
          <q-select
            :options="item.options"
            dense
            lazy-rules
            transition-show="flip-up"
            transition-hide="flip-down"
            :option-value="item.keyLabel"
            :option-label="item.nameLabel"
            option-disable="inactive"
            v-model="model[item.key]"
            :rules="item.rules"
            @change="onValidation"
            :label="$t(item.label)"
            v-bind="item.props"
          ></q-select>
        </template>
        <template v-else-if="item.type == 'selectMulti'">
          <q-select
            :options="item.options"
            transition-show="flip-up"
            dense
            lazy-rules
            transition-hide="flip-down"
            :option-value="item.keyLabel"
            :option-label="item.nameLabel"
            option-disable="inactive"
            v-model="model[item.key]"
            :label="$t(item.label)"
            :rules="item.rules"
            v-bind="item.props"
            @change="onValidation"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section>
                  <q-item-label v-html="scope.opt.label"></q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle v-model="model" :val="scope.opt.value" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </template>
        <template v-else-if="item.type == 'toggle'">
          <q-toggle
            v-model="model[item.key]"
            lazy-rules
            dense
            :rules="item.rules"
            :label="$t(item.label)"
            v-bind="item.props"
            @change="onValidation"
          />
        </template>
        <template v-else-if="item.type == 'slide'">
          <!-- <q-slider v-model="model[item.key]" dense v-bind="item.props"  \> -->
        </template>
		<template v-else-if="item.type == 'textArea'">
			<div class="q-pa-md" style="max-width: 100%">
				<q-input
				dense
				lazy-rules
				:rules="item.rules"
				v-model="model[item.key]"
				:label="$t(item.label)"
				@change="onValidation"
				v-bind="item.props"
				type="textarea"
				/>
			</div>
		</template>
        <template v-else-if="item.type == 'multi-form'">
          <h5>{{$t(item.label)}}</h5>
          <q-btn size="sm" flat @click="model[item.key].push({})">+</q-btn>
          <q-card v-for="(contentItem, p) of model[item.key]" :key="p+'_cont'" v-bind="item.field">
            <div class="row">
              <div class="col-12">
                <q-btn size="sm" flat @click="model[item.key].splice(p,1)">-</q-btn>
              </div>
              <div v-for="(subItem,j) of item.fields" :key="j+'_subsub'" v-bind="subItem.field">
                <template v-if="subItem.type == 'select'">
                  <q-select
                    :options="subItem.options"
                    dense
                    lazy-rules
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :option-value="subItem.keyLabel"
                    :option-label="subItem.nameLabel"
                    option-disable="inactive"
                    v-model="model[item.key][p][subItem.key]"
                    :rules="subItem.rules"
                    @change="onValidation"
                    :label="$t(subItem.label)"
                    v-bind="subItem.props"
                  ></q-select>
                </template>
                <template v-else-if="subItem.type == 'selectMulti'">
                  <q-select
                    :options="subItem.options"
                    transition-show="flip-up"
                    dense
                    lazy-rules
                    transition-hide="flip-down"
                    :option-value="subItem.keyLabel"
                    :option-label="subItem.nameLabel"
                    option-disable="inactive"
                    v-model="model[item.key][p][subItem.key]"
                    :label="$t(subItem.label)"
                    :rules="subItem.rules"
                    v-bind="subItem.props"
                    @change="onValidation"
                  >
                    <template v-slot:option="scope">
                      <q-subItem v-bind="scope.subItemProps" v-on="scope.subItemEvents">
                        <q-subItem-section>
                          <q-subItem-label v-html="scope.opt.label"></q-subItem-label>
                        </q-subItem-section>
                        <q-subItem-section side>
                          <q-toggle v-model="model" :val="scope.opt.value" />
                        </q-subItem-section>
                      </q-subItem>
                    </template>
                  </q-select>
                </template>
                <template v-else-if="subItem.type == 'toggle'">
                  <q-toggle
                    v-model="model[item.key][p][subItem.key]"
                    lazy-rules
                    dense
                    :rules="subItem.rules"
                    :label="$t(subItem.label)"
                    v-bind="subItem.props"
                    @change="onValidation"
                  />
                </template>
                <template v-else-if="subItem.type == 'slide'">
                  <!-- <q-slider v-model="model[item.key][p][subItem.key]" dense v-bind="subItem.props"  \> -->
                </template>
                <template v-else-if="subItem.type == 'form'"></template>
                <template v-else-if="subItem.type == 'file'">
                  <q-file
                    v-model="model[item.key][p][subItem.key]"
                    :label="$t(subItem.label)"
                    lazy-rules
                    dense
                    v-bind="subItem.props"
                    :rules="subItem.rules"
                    @change="onValidation"
                  />
                </template>
                <template v-else-if="subItem.type == 'time'">
                  <q-input
                    filled
                    lazy-rules
                    v-model="model[item.key][p][subItem.key]"
                    dense
                    @change="onValidation"
                    :label="$t(subItem.label)"
                    v-bind="subItem.props"
                    mask="time"
                    :rules="[...rules||'time']"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                          <q-time v-model="model[item.key][p][subItem.key]" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </template>
                <template v-else-if="subItem.type == 'date'"></template>
                <template v-else-if="subItem.type == 'editor'">
                  <q-editor
                    @change="onValidation"
                    v-model="model[item.key][p][subItem.key]"
                    lazy-rules
                    dense
                    :rules="subItem.rules"
                    v-bind="subItem.props"
                    min-height="5rem"
                  />
                </template>
                <template v-else-if="subItem.type == 'password'">
                  <q-input
                    dense
                    lazy-rules
                    :type="subItem.isPassword?'password':'text'"
                    v-model="model[item.key][p][subItem.key]"
                    :label="$t(subItem.label)"
                    :rules="subItem.rules"
                    v-bind="subItem.props"
                    @change="onValidation"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="subItem.isPassword ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="subItem.isPassword = !subItem.isPassword"
                      />
                    </template>
                  </q-input>
                </template>
                <template v-else>
                  <q-input
                    dense
                    lazy-rules
                    :rules="subItem.rules"
                    v-model="model[item.key][p][subItem.key]"
                    :label="$t(subItem.label)"
                    @change="onValidation"
                    v-bind="subItem.props"
                  />
                </template>
              </div>
            </div>
          </q-card>
        </template>
        <template v-else-if="item.type == 'form'">
          <div class="row">
            <div class="col-12">
              <h5>{{$t(item.label)}}</h5>
            </div>
            <div v-for="(subItem,j) of item.fields" :key="j+'_sub'" v-bind="subItem.field">
              <template v-if="subItem.type == 'select'">
                <q-select
                  :options="subItem.options"
                  dense
                  lazy-rules
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :option-value="subItem.keyLabel"
                  :option-label="subItem.nameLabel"
                  option-disable="inactive"
                  v-model="model[item.key][subItem.key]"
                  :rules="subItem.rules"
                  @change="onValidation"
                  :label="$t(subItem.label)"
                  v-bind="subItem.props"
                ></q-select>
              </template>
              <template v-else-if="subItem.type == 'selectMulti'">
                <q-select
                  :options="subItem.options"
                  transition-show="flip-up"
                  dense
                  lazy-rules
                  transition-hide="flip-down"
                  :option-value="subItem.keyLabel"
                  :option-label="subItem.nameLabel"
                  option-disable="inactive"
                  v-model="model[item.key][subItem.key]"
                  :label="$t(subItem.label)"
                  :rules="subItem.rules"
                  v-bind="subItem.props"
                  @change="onValidation"
                >
                  <template v-slot:option="scope">
                    <q-subItem v-bind="scope.subItemProps" v-on="scope.subItemEvents">
                      <q-subItem-section>
                        <q-subItem-label v-html="scope.opt.label"></q-subItem-label>
                      </q-subItem-section>
                      <q-subItem-section side>
                        <q-toggle v-model="model" :val="scope.opt.value" />
                      </q-subItem-section>
                    </q-subItem>
                  </template>
                </q-select>
              </template>
              <template v-else-if="subItem.type == 'toggle'">
                <q-toggle
                  v-model="model[item.key][subItem.key]"
                  lazy-rules
                  dense
                  :rules="subItem.rules"
                  :label="$t(subItem.label)"
                  v-bind="subItem.props"
                  @change="onValidation"
                />
              </template>
              <template v-else-if="subItem.type == 'slide'">
                <!-- <q-slider v-model="model[item.key][subItem.key]" dense v-bind="subItem.props"  \> -->
              </template>
              <template v-else-if="subItem.type == 'form'"></template>
              <template v-else-if="subItem.type == 'file'">
                <q-file
                  v-model="model[item.key][subItem.key]"
                  :label="$t(subItem.label)"
                  lazy-rules
                  dense
                  v-bind="subItem.props"
                  :rules="subItem.rules"
                  @change="onValidation"
                />
              </template>
              <template v-else-if="subItem.type == 'time'">
                <q-input
                  filled
                  lazy-rules
                  v-model="model[item.key][subItem.key]"
                  dense
                  @change="onValidation"
                  :label="$t(subItem.label)"
                  v-bind="subItem.props"
                  mask="time"
                  :rules="[...rules||'time']"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                        <q-time v-model="model[item.key][subItem.key]" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </template>
              <template v-else-if="subItem.type == 'date'"></template>
              <template v-else-if="subItem.type == 'editor'">
                <q-editor
                  @change="onValidation"
                  v-model="model[item.key][subItem.key]"
                  lazy-rules
                  dense
                  :rules="subItem.rules"
                  v-bind="subItem.props"
                  min-height="5rem"
                />
              </template>
              <template v-else-if="subItem.type == 'password'">
                <q-input
                  dense
                  lazy-rules
                  :type="subItem.isPassword?'password':'text'"

                  v-model="model[item.key][subItem.key]"
                  :label="$t(subItem.label)"
                  :rules="subItem.rules"
                  v-bind="subItem.props"
                  @change="onValidation"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="subItem.isPassword ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="subItem.isPassword = !subItem.isPassword"
                    />
                  </template>
                </q-input>
              </template>
              <template v-else>
                <q-input
                  dense
                  lazy-rules
                  :rules="subItem.rules"
                  v-model="model[item.key][subItem.key]"
                  :label="$t(subItem.label)"
                  @change="onValidation"
                  v-bind="subItem.props"
                />
              </template>
            </div>
          </div>
        </template>
        <template v-else-if="item.type == 'file'">
          <q-file
            v-model="model[item.key]"
            :label="$t(item.label)"
            lazy-rules
            dense
            v-bind="item.props"
            :rules="item.rules"
            @change="onValidation"
          />
        </template>
        <template v-else-if="item.type == 'time'">
          <q-input
            filled
            lazy-rules
            v-model="model[item.key]"
            dense
            @change="onValidation"
            :label="$t(item.label)"
            v-bind="item.props"
            mask="time"
            :rules="[...rules||'time']"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                  <q-time v-model="model[item.key]" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </template>
        <template v-else-if="item.type == 'dateNew'">
          <q-input
            dense
            filled
            @change="onValidation"
            v-model="model[item.key]"
            :label="$t(item.label)"
            mask="date"
            v-bind="item.props"
            lazy-rules
            :rules="[...item.rules,'date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy :ref="`proxy_${i}`" transition-show="scale" transition-hide="scale">
                  <q-date v-model="model[item.key]" @input="cosas(i)" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </template>
        <template v-else-if="item.type == 'editor'">
          <q-editor
            @change="onValidation"
            v-model="model[item.key]"
            lazy-rules
            dense
            :rules="item.rules"
            v-bind="item.props"
            min-height="5rem"
          />
        </template>
        <template v-else-if="item.type == 'password'">
          <q-input
            dense
            lazy-rules
            :type="item.isPassword?'password':'text'"
             label-color="grey-1"
            v-model="model[item.key]"
            :label="$t(item.label)"
            :rules="item.rules"
            v-bind="item.props"
            @change="onValidation"
          >
            <template v-slot:append>
              <q-icon
                color="grey-1"
                :name="item.isPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="item.isPassword = !item.isPassword"

              />
            </template>
            <template v-slot:prepend>
            <q-avatar>
              <img src="../assets/key-variant.png">
            </q-avatar>
          </template>
          </q-input>
        </template>
                <template v-else-if="item.type == 'password2'">
          <q-input
            dense
            lazy-rules
            :type="item.isPassword?'password':'text'"
            v-model="model[item.key]"
            :label="$t(item.label)"
            :rules="item.rules"
            v-bind="item.props"
            @change="onValidation"
          >
            <template v-slot:append>
              <q-icon
                :name="item.isPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="item.isPassword = !item.isPassword"

              />
            </template>
            <template v-slot:prepend>
            <q-avatar>
              <img src="../assets/key-variant.png">
            </q-avatar>
          </template>
          </q-input>
        </template>
         <template v-else-if="item.type == 'img'">
         <div class="col-4" align="center">
        <q-img
          :src="model[item.key]"
          :ratio="9/9"
        />
      </div>
        </template>
        <template v-else-if="item.type == 'textoNormal'">
          <q-input
            dense
            filled
            lazy-rules
            :rules="item.rules"
            v-model="model[item.key]"
            :label="$t(item.label)"
            @change="onValidation"
            v-bind="item.props"
          />
        </template>
        <template v-else-if="item.type == 'textoNormalNu'">
          <q-input
            dense
            filled
            lazy-rules
            :rules="item.rules"
            v-model="model[item.key]"
            :label="$t(item.label)"
            @change="onValidation"
            v-bind="item.props"
          />
        </template>
        <template v-else-if="item.type == 'inicio'">
          <q-input
            dense
            rounded
            label-color="grey-1"
            lazy-rules
            :rules="item.rules"
            v-model="model[item.key]"
            :label="$t(item.label)"
            @change="onValidation"
            v-bind="item.props"
          >
          <template v-slot:prepend>
            <q-icon name="person" color="grey-1"/>
          </template>
          </q-input>
        </template>
        <template v-else>
          <q-input
            dense
            lazy-rules
            :rules="item.rules"
            v-model="model[item.key]"
            :label="$t(item.label)"
            @change="onValidation"
            v-bind="item.props"
          >
          </q-input>
        </template>
      </div>
      <!-- <div class="col-12">
        <q-btn type="submit">dfdfs</q-btn>
      </div>-->
    </div>
  </q-form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class FormFlex extends Vue {
  @Prop({ required: true, type: Array }) fields!: Array<any>;
  @Prop({ required: true, type: Object }) model!: Object;
  @Prop({ type: Boolean, default: false, required: false })
  btnCancel!: boolean;
  @Prop({ type: Boolean, default: false, required: false }) loading!: boolean;

  @Prop({ type: String, default: 'Guardar', required: false })
  textBtn!: string;

  @Emit('onCancel')
  async onCancel() {}

  @Emit('onValidation')
  async onValidation() {
    // @ts-ignore
    return await this.$refs.formComplete.validate();
  }
  @Emit('onSubmit')
  async onSubmit() {
    // @ts-ignore
    return [false, {}];
  }

      cosas(i: any) {
    // console.log(i, this.$refs[`proxy_${i}`][0].hide());

    // @ts-ignore
    this.$refs[`proxy_${i}`][0].hide();
  }
}
</script>

<style lang="scss" scope></style>
