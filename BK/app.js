//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
        success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            // const host = 'http://192.168.1.74:8080'
            // if (res.code) {
            //     wx.request({
            //         url: host + '/apiSysApiUser/wxOpenId',
            //         data: {
            //             'jsCode': res.code
            //         },
            //         method: 'post',
            //         header: {
            //             "Content-Type": "application/x-www-form-urlencoded"
            //         },
            //         success: res => {
            //             this.globalData.openId = res.data.data.openid
                        
            //         },
            //         fail: res => {
            //             console.log(res)
            //         }
            //     })
            // }
        }
    })
  },
  globalData: {
    userInfo: null,
    userLocation:null,
    openId:null,
    url:"http://192.168.1.222:80"
  }
})