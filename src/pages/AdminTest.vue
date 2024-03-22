<template>
  <div>
    <div id="main-content" class="container">
      <div class="row">
        <div class="col-md-6">
          <form class="form-inline">
            <div class="form-group">
              <label for="connect">WebSocket connection:</label>
              <button id="connect" class="btn btn-default" type="submit" :disabled="connected === true"
                      @click.prevent="connect">Connect
              </button>
              <button id="disconnect" class="btn btn-default" type="submit" :disabled="connected === false"
                      @click.prevent="disconnect">Disconnect
              </button>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <form class="form-inline">
            <div class="form-group">
              <label for="name">What is your name?</label>
              <input type="text" id="name" class="form-control" v-model="send_message" placeholder="Your name here...">
            </div>
            <button id="send" class="btn btn-default" type="submit" @click.prevent="send">Send</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table id="conversation" class="table table-striped">
            <thead>
            <tr>
              <th>Greetings</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in received_messages" :key="item">
              <td>{{ item }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from "webstomp-client";

export default {
  name: "adminTest",
  data() {
    return {
      received_messages: [],
      send_message: null,
      connected: false
    };
  },
  methods: {
    send() {
      console.log("Send message:" + this.send_message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = {chatId: "UCT17706927965552189", chatType: 0, message: this.send_message};
        this.stompClient.send("/socket/message/send", JSON.stringify(msg), {token: "777"});
      }
    },
    connect() {
      this.socket = new SockJS("http://localhost:8000/yui/chat-websocket/socketAuthNoError?User-Token=" + "logintoken");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
          {},
          frame => {
            this.connected = true;
            console.log(frame);
            this.stompClient.subscribe("/user/" + "logintoken" + "/message/receive", tick => {
              console.log(tick);
              this.received_messages.push(tick.body);
            });
            this.stompClient.subscribe("/announcement/receive", tick => {
              console.log(tick);
              this.received_messages.push(tick.body);
            });
          },
          error => {
            console.log(error);
            this.connected = false;
          }
      );
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    }
  },
};
</script>

<style scoped>

</style>