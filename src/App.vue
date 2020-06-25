<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list flat>
        <v-list-item color="orange darken-1" v-for="link of links" :key="link.title" :to="link.url">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item color="orange darken-1" @click="onLogout" v-if="isUserLoggedIn">
          <v-list-item-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="'Logout'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="orange darken-2" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <router-link to="/" tag="span" class="pointer">
        <h2>I want a job</h2>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="link of links" :key="link.title" :to="link.url" text>
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn text @click="onLogout" v-if="isUserLoggedIn">
          <v-icon left>exit_to_app</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <router-view></router-view>

    <!-- <template v-if="error">
      <v-snackbar color="error" timeout="5000" :multi-line="true" @input="closeError" :value="true">
        {{ error }}
        <v-btn dark text @click.native="closeError">Close</v-btn>
      </v-snackbar>
    </template>-->

    <!-- <template>
      <div class="text-center">
        <v-snackbar :multi-line="true" timeout="5000" @input="closeError" :value="true">
          {{ error }}
          <template>
            <v-btn color="red" text @click.native="closeError">Close</v-btn>
          </template>
        </v-snackbar>
      </div>
    </template>-->

    <!-- <template>
      <v-snackbar
        :timeout="50000"
        :multi-line="true"
        color="error"
        @input="closeError"
        :value="true"
      >
        gsdgsdgsd
        <v-btn text dark @click.native="closeError">Close</v-btn>
      </v-snackbar>
    </template>-->
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Orders", icon: "bookmark_border", url: "/orders" },
          { title: "New Ad", icon: "note_add", url: "/new" },
          { title: "My Ads", icon: "list", url: "/list" }
        ];
      }
      return [
        { title: "Login", icon: "lock", url: "/login" },
        { title: "Registration", icon: "face", url: "/registration" }
      ];
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
