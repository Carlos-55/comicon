<template>
    <div>
        <TableTwo/>
    </div>
   
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import TableTwo from 'components/Skeleton.vue';

@Component({
    components: {
        TableTwo
    }
})
export default class Configuration extends Vue{}
</script>

