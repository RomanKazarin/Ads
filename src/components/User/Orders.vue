<template>
  <v-main v-if="loading">
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
  <v-main v-else-if="loading && orders.length !== 0">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <h1 class="text--secondary mb-3">Orders</h1>
          <v-list two-line flat>
            <v-list-item v-for="order of orders" :key="order.id">
              <v-list-item-action>
                <v-checkbox
                  color="orange darken-2"
                  :input-value="order.done"
                  @click="markDone(order)"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ order.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn :to="'/ad/' + order.adId" color="orange darken-2" dark>Open</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <v-main v-else>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <div class="text-center ma-12">
            <h1 class="text--secondary">You have no Orders</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    orders() {
      return this.$store.getters.orders;
    }
  },
  methods: {
    markDone(order) {
      this.$store
        .dispatch("markOrderDone", order.id)
        .then(() => {
          order.done = true;
        })
        .catch(() => {});
    }
  },
  created() {
    this.$store.dispatch("fetchOrders");
  }
};
</script>

<style>
</style>