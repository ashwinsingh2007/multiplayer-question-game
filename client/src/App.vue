<template src="./templates/app.html">
  
</template>

<script>
import api from "@/services/Api";
import store from "./store";
export default {
  name: "App",
  components: {},
  data() {
    return {
      searchString: "",
      dialog: false,
      name: "",
      word: "",
      registerModal: false,
      username: "",
      password: "",
      token: this.$localStorage.get("token"),
      alertText:'',
      alert:false
    };
  },
  methods: {
    createGameChannel() {
      if(this.word.trim() === '' || this.name.trim() === '') {
        this.alert = true;
        this.alertText = `Word field or Name field can't be empty`;
        return;
      }
      this.dialog = false;
      api
        .createChannel({
          title: this.name,
          word: this.word,
          username: this.$localStorage.get("token")
        })
        .then(response => {
          api.getListOfChannels().then(data => {
            store.commit("getChannelList", data);
          });
        })
        .catch(error => {
          console.log(error);
        });
      this.name = '';
      this.word = '';
      this.$router.push("/");
    },
    register() {
      api
        .registerUser({
          username: this.username,
          password: this.password
        })
        .then(response => {
          if (response.error) {
            window.alert(response.error);
            return;
          }
          this.$localStorage.set("token", this.username);
          this.token = this.username;
          this.registerModal = false;
          window.alert("user created. You are logged in now");
        });
    },
    login() {
      api
        .loginUser({
          username: this.username,
          password: this.password
        })
        .then(response => {
          if (response.error) {
            window.alert(response.error);
            return;
          }
          this.$localStorage.set("token", this.username);
          this.token = this.username;
          this.registerModal = false;
          window.alert("user created. You are logged in now");
        });
    },
    logout() {
      this.token = "";
      this.$localStorage.remove("token");
      this.$router.push("/");
    },
    openModal() {
      if(!this.$localStorage.get("token")) {
        this.alert = true;
        this.alertText = `You need to register/login first before posting here!`;
        this.registerModal = true;
        return;
      }
      this.dialog = true;
    },
    openRegister() {
      this.registerModal = true;
    }
  },
  computed: {
    dataAvailable() {
      return this.searchString !== null && this.searchString !== "";
    }
  }
};
</script>
