<template>
  <div class="main-content">
    <ticket-item />
    <v-divider/>
    <ticket-item />
    <v-divider/>
    <ticket-item />
    <v-divider/>
    <ticket-item />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TicketItem from "./TicketItem.vue";

export default Vue.extend({
  name: "list-ticket",

  data: () => ({}),
  components: {
    TicketItem,
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
