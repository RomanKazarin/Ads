<template>
  <div class="text-center">
    <v-dialog v-model="modal" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="primary mr-3" text v-bind="attrs" v-on="on">Buy</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline orange lighten-2" primary-title>Do u wanna buy it?</v-card-title>

        <v-card-text>
          <v-text-field label="Your name" name="name" type="text" v-model="name"></v-text-field>
          <v-text-field label="Yor phone" name="phone" type="text" v-model="phone"></v-text-field>
        </v-card-text>

        <v-divider class="mt-5"></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onCancel" :disabled="localLoading">Close</v-btn>
          <v-btn
            class="success"
            text
            @click="onSave"
            :disabled="localLoading"
            :loading="localLoading"
          >Buy it!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["ad"],
  data() {
    return {
      modal: false,
      name: "",
      phone: "",
      localLoading: false
    };
  },
  methods: {
    onCancel() {
      this.name = "";
      this.phone = "";
      this.modal = false;
    },
    onSave() {
      if (this.name !== "" && this.phone !== "") {
        this.localLoading = true;
        this.$store
          .dispatch("createOrder", {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerId
          })
          .finally(() => {
            this.name = "";
            this.phone = "";
            this.localLoading = false;
            this.modal = false;
          });
      }
    }
  }
};
</script>