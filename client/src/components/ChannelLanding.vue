<template src=".././templates/channel-landing.html">

</template>



<script>
import api from "@/services/Api";
import io from "socket.io-client";
import { mapGetters, mapActions } from "vuex";
import store from ".././store";

export default {
  props: ["id"],
  data: () => ({
    user: "",
    message: "",
    messages: [],
    by: "",
    listen: null,
    send: null,
    socket: io("localhost:9000"),
    channelUserId: null,
    userAnswer: null,
    block: false,
    alertText: "",
    multiLine: true,
    alert: false,
    sendAnswer: null,
    attemptLeft: 20,
  }),
  computed: { channelList: () => store.state.channelList },
  mounted() {
    if (!this.$localStorage.get("token")) {
      this.$router.push("/");
    }
    api
      .createChannelUser({
        channelsId: this.id,
        username: this.$localStorage.get("token")
      })
      .then(result => {
        this.listen = result.listen;
        this.send = result.send;
        this.channelUserId = result.channelUserId;
        this.messages = result.messages;
        this.block = result.replied;
        this.sendAnswer = result.answerStatus;
        this.attemptLeft = result.attemptLeft;
        this.socket.on(this.listen, data => {
          this.block = false;
          if (this.send !== null) {
            console.log('--data---', data.attemptLeft);
            if (data.answerStatus === "limit") {
              this.alertText = "Your 20 question limit reached";
              this.alert = true;
              this.sendAnswer = data.answerStatus;
            } else if (data.answerStatus === true) {
              this.alertText = "Congrates You guessed it right";
              this.alert = true;
              this.sendAnswer = data.answerStatus;
            } else if (data.answerStatus === false) {
              this.alertText = "Sorry Its wrong guess";
              this.alert = true;
            }
          }
          if (!data.answerChecked && this.sendAnswer !== "limit") {
            this.messages = [...this.messages, data];
          }
        });
      });
  },
  methods: {
    show() {
      alert(this.channelName);
    },
    sendQuestion() {
      this.messages = [
        ...this.messages,
        {
          username: this.$localStorage.get("token"),
          message: this.message
        }
      ];
      this.socket.emit("MESSAGE", {
        username: this.$localStorage.get("token"),
        message: this.message,
        channelsId: this.id,
        token: this.listen,
        send: this.send,
        channelUserId: this.channelUserId
      });
      this.message = "";
      this.block = true;
      this.attemptLeft--
    },
    sendAnswerByPlayer() {
      this.socket.emit("MESSAGE", {
        username: this.$localStorage.get("token"),
        message: this.message,
        channelsId: this.id,
        token: this.listen,
        send: this.send,
        channelUserId: this.channelUserId,
        userAnswer: this.userAnswer
      });
      this.message = "";
      this.attemptLeft--
    },
    sendAnswerByCreator(answer, data) {
      data.replied = true;
      const message = this.messages;
      message.forEach(msg => {
        if (msg.messageId === data.messageId) {
          msg.replied = true;
        }
      });
      this.messages = [...this.messages];
      this.socket.emit("MESSAGE", {
        username: this.$localStorage.get("token"),
        originalMessage: data.message,
        message: answer,
        channelsId: data.id,
        send: data.token,
        receiver: data.username,
        channelUserId: data.channelUserId,
        answer,
        messageId: data.messageId
      });
    }
  }
};
</script>

<style src=".././styles/channel.css"/>
