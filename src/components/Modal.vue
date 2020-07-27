<template>
  <div id="Modal">
    <q-btn
      :label="btnTitle"
      :disabled="loader"
      v-bind="btnProps"
      v-if="hasBtn"
      @click="$emit('input',true)"
    />
    <q-dialog
      v-model="value"
      persistent
      :maximized="$q.screen.lt.md"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-layout v-if="$q.screen.lt.md" view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-btn flat :disabled="loader" @click="onCancel()" round dense icon="close" />
            <q-toolbar-title>{{ title }}</q-toolbar-title>

            <q-btn flat :disabled="loader" @click="onConfirm()" dense>{{$t('modals.confirm')}}</q-btn>
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page padding>
            <slot></slot>
          </q-page>
        </q-page-container>
      </q-layout>
      <q-card v-else style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h5">{{ $t(title) }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <slot></slot>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            flat
            @click="onCancel()"
            :disabled="loader"
            :label="$t('modals.cancel')"
            color="primary"
          />
          <q-btn
            flat
            @click="onConfirm()"
            :disabled="loader"
            :label="$t('modals.confirm')"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  @Prop({ type: String, required: false, default: 'BTN' }) btnTitle!: string;
  @Prop({ type: Object }) btnProps!: Object;

  @Prop({ type: String, required: false, default: 'Modal' }) title!: string;
  @Prop({ type: Boolean, required: true }) value!: boolean;
  @Prop({ type: Boolean, required: false, default: true }) hasBtn!: boolean;
  @Prop({ type: Boolean, required: false, default: false }) loader!: boolean;

  @Emit('onConfirm')
  onConfirm() {
    return true;
  }
  @Emit('onCancel')
  onCancel() {
    return false;
  }
}
</script>

<style lang="scss" scope>
.modal-btn {
  display: flex;
  justify-content: end;
  align-content: flex-end;
}
</style>
