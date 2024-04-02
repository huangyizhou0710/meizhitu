const axios = require('axios');
const {HttpsProxyAgent} = require("https-proxy-agent");

// 隧道域名和端口
let tunnelHost = 'a614.kdltps.com'
let tunnelPort = '15818'

// 配置用户名和密码
let username = 't11206769975756'
let password = 'k3vkg983'

// 创建一个axios实例
module.exports = axios.create({
  httpAgent: new HttpsProxyAgent(`http://${username}:${password}@${tunnelHost}:${tunnelPort}`),
  httpsAgent: new HttpsProxyAgent(`http://${username}:${password}@${tunnelHost}:${tunnelPort}`),
});
