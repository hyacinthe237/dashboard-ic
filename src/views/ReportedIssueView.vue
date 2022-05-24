<template>
  <v-app>
    <AppBarLogged title="Monitoring / Reporting" />

    <navigation-app-drawer />
    <v-content>
      <div class="main-content">
        <v-list-group active no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold pl-0"
                >Issue Title 1</v-list-item-title
              >
            </v-list-item-content>
          </template>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Content</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <icon-horizontal-divider style="width: 100%" />
        <v-list-group active no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold"
                >Issue Title 2</v-list-item-title
              >
            </v-list-item-content>
          </template>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Content</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <icon-horizontal-divider style="width: 100%" />
        <v-list-group v-model="activate" active-class="title" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold"
                style="color: #28a7e3 !important"
                >Issue Title 3</v-list-item-title
              >
            </v-list-item-content>
          </template>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-card elevation="2" class="px-5 mx-1 mb-1">
                  <v-card-title>
                    <v-list-item class="mt-2 mb-2">
                      <v-img
                        alt="Infinite connection"
                        class="shrink"
                        contain
                        src="@/assets/img/profile.png"
                        transition="scale-transition"
                        max-height="100%"
                        width="60"
                      />

                      <v-list-item-content>
                        <v-list-item-title class="font-weight-bold"
                          >Nelson Nakimi
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-title>
                  <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu lacus eleifend, luctus purus ullamcorper, dignissim
                    nulla. Quisque at leo non nulla consectetur semper id in
                    dui. Curabitur venenatis leo nibh, id viverra est venenatis
                    eget. Donec sed vehicula quam, rhoncus hendrerit diam.
                  </v-card-text>
                </v-card>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </div>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import IconHorizontalDivider from "@/components/icons/IconHorizontalDivider.vue";
import Vue from "vue";
import AppBarLogged from "../components/layouts/AppBarLogged.vue";
import NavigationAppDrawer from "../components/layouts/NavigationAppDrawer.vue";

export default Vue.extend({
  name: "ReportedIssueView",
  data: () => ({
    activate: true,
  }),
  components: {
    AppBarLogged,
    NavigationAppDrawer,
    IconHorizontalDivider,
  },
});
</script>

<style scoped>
.main-content {
  height: 100%;
  width: 100%;
  background: url("../assets/img/fam2.png") no-repeat center center;
  background-size: contain;
  position: relative;
  width: 100%;
  padding: 100px 200px 200px 200px;
}

.v-application--is-ltr
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding-left: 2px;
}
</style>

