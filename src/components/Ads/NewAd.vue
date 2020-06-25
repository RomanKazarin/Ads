<template>
  <v-main>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <h1 class="text--secondary mb-3">Create new ad</h1>
          <v-form ref="form" v-model="valid" validation>
            <v-text-field
              name="title"
              label="Ad title"
              type="text"
              v-model="title"
              :rules="[v => !!v || 'Title is required']"
            ></v-text-field>
            <v-textarea
              name="description"
              label="Ad description"
              type="text"
              v-model="description"
              :rules="[v => !!v || 'Description is required']"
              clearable
            ></v-textarea>
          </v-form>
          <v-container>
            <v-btn color="blue-grey" class="white--text" @click="triggerUpload">
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display:none"
              accept="image/*"
              @change="onFileChange"
            />
          </v-container>
          <v-container>
            <v-img contain :src="imageSrc" height="150" max-width="500" v-if="imageSrc" />
          </v-container>
          <v-container>
            <v-switch color="orange darken-2" v-model="promo" label="Add to promo?"></v-switch>

            <v-btn
              :loading="loading"
              :disabled="!valid || !image || loading"
              class="success mt-2"
              @click="createAd"
            >Create Ad</v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      promo: false,
      valid: false,
      image: null,
      imageSrc: ""
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate() && this.image) {
        // logic
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        };

        this.$store
          .dispatch("createAd", ad)
          .then(() => {
            this.$router.push("/list");
          })
          .catch(err => console.log(err));
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      // eslint-disable-next-line no-unused-vars
      reader.onload = e => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    }
  }
};
</script>

<style>
</style>