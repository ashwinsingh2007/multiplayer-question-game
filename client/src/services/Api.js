import axios from "axios";

export default {
  createChannel: data => {
    const { title, word, username } = data;
    return axios
      .post("/create-channel", {
        title,
        word,
        username
      })
      .then(response => response.data);
  },

  registerUser: data => {
    const { username, password } = data;
    return axios
      .post("/register", {
        username,
        password
      })
      .then(response => response.data);
  },

  loginUser: data => {
    const { username, password } = data;
    return axios
      .post("/login", {
        username,
        password
      })
      .then(response => response.data);
  },

  getListOfChannels: () => {
    return axios.get("/channels").then(res => res.data);
  },

  createChannelUser: data => {
    return axios.post("/create-channel-user", data).then(res => res.data);
  }
};
