<template>
  <div class="home">
    <Panel />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Panel from '@/components/home/Panel.vue';

  @Component({
    components: {
      Panel,
    },
  })
  export default class Home extends Vue {}
</script>

<style scoped>
  .home {
    max-width: 1180px;
    margin: 125px auto;
    padding: 0px 10px;
  }
</style>