<template>
  <v-main v-if="!loading">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-carousel>
            <v-carousel-item
              v-for="ad of promoAds"
              :key="ad.id"
              :src="ad.imageSrc"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <div class="carousel-link">
                <v-btn class="error" :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col v-for="ad of ads" :key="ad.id">
          <v-card class="mx-auto" max-width="344">
            <v-img :src="ad.imageSrc" height="200px"></v-img>

            <v-card-title>{{ ad.title }}</v-card-title>

            <v-card-subtitle>{{ ad.description }}</v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text :to="'/ad/' + ad.id">Open</v-btn>
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
export default {
  computed: {
    promoAds() {
      return this.$store.getters.promoAds;
    },
    ads() {
      return this.$store.getters.ads;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style scoped>
.carousel-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 10px 20px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>