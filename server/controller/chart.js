var express = require('express');
var router = express.Router();
const getDynamicData = require("../mockData/chart/dynamicData.js");
router.ws("/socketTest", function (ws, req) {
  if (ws.readyState == ws.OPEN) {
    ws.send(JSON.stringify(getDynamicData()));
  }
  var sockedInterval = setInterval(() => {
    if (ws.readyState !== ws.OPEN) {
      clearInterval(sockedInterval);
    } else {
      ws.send(JSON.stringify(getDynamicData()));
    }
  }, 4000);

  ws.on("message", function (msg) {
    // 业务代码
    console.log("hahahah");
  });
});
module.exports = router;