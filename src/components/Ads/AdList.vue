<template>
  <v-main>
    <v-container v-if="!loading && myAds.length !== 0">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <h1 class="text--secondary mb-3">AdList</h1>
          <v-card max-width="600" class="mb-5" elevation="10" v-for="ad of myAds" :key="ad.id">
            <div class="d-flex flex-wrap">
              <v-avatar class="ma-3" size="150" tile>
                <v-img :src="ad.imageSrc"></v-img>
              </v-avatar>
              <div>
                <v-card-title class="headline">{{ ad.title }}</v-card-title>
                <v-card-subtitle>{{ ad.description }}</v-card-subtitle>
              </div>
            </div>
            <div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="info" :to="'/ad/' + ad.id">Open</v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else-if="!loading && myAds.length === 0">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <h1 class="text--primary">You have no ads</h1>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid v-else>
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
export default {
  computed: {
    myAds() {
      return this.$store.getters.myAds;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style>
</style>