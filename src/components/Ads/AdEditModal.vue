<template>
  <div class="text-center">
    <v-dialog v-model="modal" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="warning mr-3" text v-bind="attrs" v-on="on">Edit</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline orange lighten-2" primary-title>Edit Ad</v-card-title>

        <v-card-text>
          <v-text-field label="Title" name="title" type="text" v-model="editedTitle"></v-text-field>
          <v-textarea
            label="Description"
            name="description"
            type="text"
            v-model="editedDescription"
          ></v-textarea>
        </v-card-text>

        <v-divider class="mt-5"></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onCancel">Cancel</v-btn>
          <v-btn class="success" text @click="onSave">Save</v-btn>
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
      editedTitle: this.ad.title,
      editedDescription: this.ad.description
    };
  },
  methods: {
    onCancel() {
      this.editedTitle = this.ad.title;
      this.editedDescription = this.ad.description;
      this.modal = false;
    },
    onSave() {
      if (this.editedDescription !== "" && this.editedTitle !== "") {
        this.$store.dispatch("updateAd", {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        });
        this.modal = false;
      }
    }
  }
};
</script>