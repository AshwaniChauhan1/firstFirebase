<template>
  <div>
    <div class="p-5 bg-secondary text-white text-center">
      <h1>PROFILE</h1>
    </div>
    <b-container>
      <b-row class="justify-content-lg-center">
        <b-col lg="8">
          <div v-if="picture ===''" class="py-3">
            <div class="file btn btn-primary fileBrowseBtn">
              Choose Profile Pic
              <input
                class="fileBrowseInput"
                type="file"
                name="myFile"
                @change="previewImage"
                accept="image/*"
              />
            </div>
            <div v-if="imageData!=null" class="py-3">
              <b-progress class="mb-3" :value="uploadValue" :max="max" show-progress animated></b-progress>
              <b-button variant="primary" @click="onUpload">Upload Pic</b-button>
            </div>
          </div>
          <b-row class="justify-content-lg-center py-3 mt-3 border shadow">
            <b-col lg="5" md="5" class="d-flex justify-content-center">
              <div>
                <div class="pb-3">
                  <img :src="picture" width="200" height="200" />
                </div>
                <b-progress
                  v-if="picture !=='' && editImageData!=null"
                  :value="changedPicValue"
                  :max="max"
                  show-progress
                  animated
                ></b-progress>
                <div class="d-flex justify-content-center pt-3">
                  <div
                    class="file btn btn-primary fileBrowseBtn"
                    v-if="picture !=='' && editImageData ==null"
                  >
                    Change Profile
                    <input
                      class="fileBrowseInput"
                      type="file"
                      name="myFile"
                      @change="editImage"
                      accept="image/*"
                    />
                  </div>
                  <div class="py-3">
                    <b-button
                      variant="primary"
                      v-if="picture !=='' && editImageData!=null"
                      @click="onEdit"
                    >Apply Changes</b-button>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col lg="7" md="7" class="py-3">
              <p class="text-center">Email : {{userEmail}}</p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";
export default {
  name: "",
  data() {
    return {
      imageData: null,
      editImageData: null,
      uploadValue: 0,
      changedPicValue: 0,
      userEmail: localStorage.email,
      picture: localStorage.photoUrl,
      max: 100
    };
  },
  computed: {
    ...mapState("loginData", ["user"])
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = "";
      this.imageData = event.target.files[0];
    },
    editImage(event) {
      this.changedPicValue = 0;
      this.editImageData = event.target.files[0];
    },
    onUpload() {
      this.picture = "";
      var storageRef = firebase.storage().ref();
      var imagesRef = storageRef
        .child(`${localStorage.email}/profile.jpg`)
        .put(this.imageData);
      imagesRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          //eslint-disable-next-line
          console.log(error.message);
        },
        () => {
          imagesRef.snapshot.ref.getDownloadURL().then(url => {
            localStorage.photoUrl = url;
            this.picture = localStorage.photoUrl;
          });
        }
      );
    },
    onEdit() {
      var storageRef = firebase.storage().ref();
      var imagesRef = storageRef
        .child(`${localStorage.email}/profile.jpg`)
        .put(this.editImageData);
      imagesRef.on(`state_changed`, snapshot => {
        this.changedPicValue =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //eslint-disable-next-line
        console.log(this.changedPicValue);
        imagesRef.snapshot.ref.getDownloadURL().then(url => {
          localStorage.photoUrl = url;
          this.picture = localStorage.photoUrl;
          if (this.changedPicValue === this.max) {
            this.editImageData = null;
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.fileBrowseInput {
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.fileBrowseBtn {
  position: relative;
  overflow: hidden;
}
</style>