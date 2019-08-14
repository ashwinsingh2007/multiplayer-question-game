<template src=".././templates/dashboard.html">
 
</template>



<script>
import api from "@/services/Api";
import io from "socket.io-client";
import { mapGetters, mapActions } from 'vuex';
import store from '.././store';

export default {
  data: () => ({
    user: "",
    message: "",
    messages: [],
    socket: io("localhost:9000"),
    alertText:'',
    alert:false
  }),
  computed: { channelList: () => store.state.channelList },
  mounted() {
    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
    });
    api.getListOfChannels().then(data => {
      store.commit('getChannelList', data)
    }).catch(e => console.log('error', e))

  },
  methods: {
    show() {
      alert(this.channelName);
    },
    navigateChannel(id) {
      if(!this.$localStorage.get("token")) {
        this.alert = true;
        this.alertText = `You can't join unless you register/login here`;
        return;
      }
      this.$router.push("/channel/" + id);
    },
    sendQuestion(e) {
      e.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        user: this.user,
        message: this.message
      });
      this.message = "";
    }
  },
};
</script>

<style src=".././styles/index.css"/>
