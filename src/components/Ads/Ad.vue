<template>
  <v-main v-if="!loading">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <h1 class="text--secondary mb-3">Ad</h1>
          <v-card class="elevation-10 mb-5">
            <v-img :src="ad.imageSrc" height="250"></v-img>

            <v-card-title>{{ ad.title }}</v-card-title>
            <v-card-text>{{ ad.description }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <appAdEditModal :ad="ad"></appAdEditModal>
              <app-buy-modal :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <v-main v-else>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <div class="text-center ma-12">
            <v-progress-circular indeterminate size="200" width="15" color="orange darken-3">Loading</v-progress-circular>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import AdEditModal from "./AdEditModal";

export default {
  props: ["id"],
  computed: {
    ad() {
      const id = this.id;
      return this.$store.getters.adById(id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isOwner() {
      return this.ad.ownerID === this.$store.getters.user.id;
    }
  },
  components: {
    appAdEditModal: AdEditModal
  }
};
</script>

<style>
</style>