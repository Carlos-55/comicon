<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss" scope>

</style>