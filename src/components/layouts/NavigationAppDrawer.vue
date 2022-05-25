<template>
    <v-navigation-drawer clipped app permanent color="primary" width="300" dark>

      <v-list dense nav>
        <v-list-item class="mt-2 mb-2" to="/home" v-if="isSuperAdmin">
          <v-list-item-icon>
            <icon-manage/>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title  class="menu-title"
              >Manage agencies</v-list-item-title
            >
          </v-list-item-content>

          <v-list-item-action>
                <v-icon x-small
                >fa fa-angle-right</v-icon>
            </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="mt-2 mb-2" to="/reported-issues">
          <v-list-item-icon>
            <icon-report/>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title  class="menu-title"
              >Reported issues</v-list-item-title
            >
          </v-list-item-content>

          <v-list-item-action>
                <v-icon x-small
                >fa fa-angle-right</v-icon>
            </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="mt-2 mb-2" to="/manage-kids">
          <v-list-item-icon>
            <icon-kid/>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title  class="menu-title"
              >Manage kids</v-list-item-title
            >
          </v-list-item-content>

          <v-list-item-action>
                <v-icon x-small
                >fa fa-angle-right</v-icon>
            </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="mt-2 mb-2" to="/manage-ressources">
          <v-list-item-icon>
            <icon-manage-ressource/>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title  class="menu-title"
              >Manage ressources</v-list-item-title
            >
          </v-list-item-content>

          <v-list-item-action>
                <v-icon x-small
                >fa fa-angle-right</v-icon>
            </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="mt-2 mb-2" to="/alerts">
          <v-list-item-icon>
            <icon-alert/>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title  class="menu-title"
              >Alerts</v-list-item-title
            >
          </v-list-item-content>

          <v-list-item-action>
                <v-icon x-small
                >fa fa-angle-right</v-icon>
            </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="mt-2 mb-2" to="/reporting">
          <v-list-item-icon>
            <icon-reporting/>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title  class="menu-title"
              >Reporting</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-action>
                <v-icon x-small
                >fa fa-angle-right</v-icon>
            </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="mt-2 mb-2" @click="logout()">

          <v-list-item-icon>
            <icon-logout/>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title  class="menu-title"
              >
                Log out</v-list-item-title
            >
          </v-list-item-content>

          <v-list-item-action>
                <v-icon x-small
                >fa fa-angle-right</v-icon>
            </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import IconManage from "../icons/IconManage.vue";
import IconManageRessource from "../icons/IconManageRessource.vue";
import IconReport from "../icons/IconReport.vue";
import IconReporting from "../icons/IconReporting.vue";
import IconKid from "../icons/IconKid.vue";
import IconAlert from "../icons/IconAlert.vue";
import IconLogout from "../icons/IconLogout.vue";

export default Vue.extend({
  name: "NavigationAppDrawer",

  data: () => ({}),
  components: {
    IconManage,
    IconReport,
    IconReporting,
    IconKid,
    IconManageRessource,
    IconAlert,
    IconLogout
  },

  computed: {
      auth () {
          return localStorage.getItem('infinite_user')
      },

      isSuperAdmin () { return this.auth.is_superadmin },
      isKid () { return this.auth.is_kid },
      isFamily () { return this.auth.is_family },
      isAgencyAdmin () { return this.auth.is_agency_admin },
  },

  methods: {
      logout () {
          localStorage.clear();
          this.$router.push({ name: 'login' })
      }
  }
});
</script>
