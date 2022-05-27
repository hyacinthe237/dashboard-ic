<template>
  <div class="main-content">
    <alert-item />
    <v-divider/>
    <alert-item />
    <v-divider/>
    <alert-item />
    <v-divider/>
    <alert-item />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AlertItem from "./AlertItem.vue";

export default Vue.extend({
  name: "list-alert",

  // data: () => ({}),
  components: {
    AlertItem,
  },
});
</script>

<style scoped>
.main-content {
  height: 100%;
  width: 100%;
  background: url("../../assets/img/fam2.png") no-repeat center center;
  background-size: contain;
  position: relative;
  width: 100%;
  padding: 50px;
}
</style>
