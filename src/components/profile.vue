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
            <div class="py-3">
              <b-button variant="primary" v-if="imageData!=null" @click="onUpload">Upload Pic</b-button>
            </div>
          </div>
          <b-row class="justify-content-lg-center py-3 mt-3 border shadow">
            <b-col lg="5" md="5" class="d-flex justify-content-center">
              <div>
                <div>
                  <img class="preview img-fluid" :src="picture" width="200" height="200" />
                </div>
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
      userEmail: localStorage.email,
      picture: localStorage.photoUrl
      //   pictures:""
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
      this.profilePic = this.imageData.name;
    },
    editImage(event) {
      this.editImageData = event.target.files[0];
    },
    onUpload() {
      this.picture = "";
      var storageRef = firebase.storage().ref();
      var imagesRef = storageRef
        .child(`${localStorage.uid}/${this.imageData.name}`)
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
        .child(`${localStorage.uid}/${this.editImageData.name}`)
        .put(this.editImageData);
      imagesRef.snapshot.ref.getDownloadURL().then(url => {
        localStorage.photoUrl = url;
        this.picture = localStorage.photoUrl;
        this.editImageData = null;
        //eslint-disable-next-line
        console.log(url);
      });
    }
  },
  mounted() {
    var storage = firebase.storage();
    var pathReference = storage.ref(`${localStorage.uid}/profile.png`);
    pathReference
      .getDownloadURL()
      .then(function(url) {
        //eslint-disable-next-line
        console.log(url);
      })
      .catch(function(error) {
        //eslint-disable-next-line
        console.log(error);
      });
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