<template>
  <div class="iframe-container">
    <meta charset="utf-8">
    <link type="text/css" rel="stylesheet" href="https://source.zoom.us/1.7.9/css/bootstrap.css" />
    <link type="text/css" rel="stylesheet" href="https://source.zoom.us/1.7.9/css/react-select.css" />

    <meta name="format-detection" content="telephone=no">
  </div>
</template>
<script>
import { ZoomMtg } from "../../../../node_modules/@zoomus/websdk";

console.log("checkSystemRequirements");
console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// CDN version default
ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.10/lib', '/av'); 

ZoomMtg.preLoadWasm();

ZoomMtg.prepareJssdk();

var API_KEY = '1iCLwRGGRQKC0Ls7R4gFHw';

var API_SECRET = 'rezQ1tJjUszEibQPVddDclat7dyVdRd5tqdG';

export default {
  name: "ZoomFrame",
  data: function() {
    return {
      src: "",
      meetConfig: {},
      signature: {}
    };
  },
  props: {
    nickname: String,
    meetingId: String,
    password: String
  },
  created: function() {
    // Meeting config object
    this.meetConfig = {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      meetingNumber: this.meetingId,
      userName: this.nickname,
      passWord: this.password,
      leaveUrl: "https://zoom.us",
      role: 0
    };

    // Generate Signature function
    this.signature = ZoomMtg.generateSignature({
      meetingNumber: this.meetConfig.meetingNumber,
      apiKey: this.meetConfig.apiKey,
      apiSecret: this.meetConfig.apiSecret,
      role: this.meetConfig.role,
      success: function(res) {
        // eslint-disable-next-line
        console.log("success signature: " + res.result);
      }
    });

    // join function
    ZoomMtg.init({
      leaveUrl: "http://www.zoom.us",
      isSupportAV: true,
      success: () => {
        ZoomMtg.join({
          meetingNumber: this.meetConfig.meetingNumber,
          userName: this.meetConfig.userName,
          signature: this.signature,
          apiKey: this.meetConfig.apiKey,
          userEmail: "email@gmail.com",
          passWord: this.meetConfig.passWord,
          success: function(res) {
            // eslint-disable-next-line
            console.log("join meeting success");
          },
          error: function(res) {
            // eslint-disable-next-line
            console.log(res);
          }
        });
      },
      error: function(res) {
        // eslint-disable-next-line
        console.log(res);
      }
    });
  },
  mounted: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
