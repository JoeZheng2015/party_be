const qcloud = require('qcloud-weapp-server-sdk')

qcloud.config({
    ServerHost: "28718514.qcloud.la",
    AuthServerUrl: "http://119.29.245.39/mina_auth/",
    TunnelServerUrl: "https://28718514.ws.qcloud.la",
    TunnelSignatureKey: "0492d12ff9aacbca9b432dfd7b800efe",
})

qcloud.config.setNetworkTimeout(30000)