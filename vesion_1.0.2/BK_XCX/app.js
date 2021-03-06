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
//   验证用户信息
  grantuserinfo:function(app){
      wx.getUserInfo({
          success: res => {
              app.globalData.userInfo = res.userInfo
              // 将用户信息存储到本地
              // wx.setStorage({
              //   key: 'userInfo',
              //   data: res.userInfo,
              // })
              console.log(app.globalData.userInfo)
          },
          fail: res => {
              wx.showModal({
                  title: '授权提示',
                  showCancel: true,
                  confirmColor: '#FFA500',
                  content: '若不授权伴课小程序获取用户信息，则可能无法正常使用全部功能；点击确定则可以正常使用',
                  success: res => {
                      if (res.confirm) {
                          wx.openSetting({
                              success: res => {
                                  if (res.authSetting['scope.userInfo']) {
                                      wx.getUserInfo({
                                          success: res => {
                                              app.globalData.userInfo = res.userInfo
                                              console.log(res)
                                          }
                                      })
                                  }
                                  if (res.authSetting['scope.userLocation']) {
                                      wx.getLocation({
                                          success: function (res) {
                                              app.globalData.userLocation = res
                                              console.log(res)
                                          },
                                      })
                                  }
                              }
                          })
                      } else if (res.cancel) {
                          console.log("取消授权");
                      }
                  }
              })
          }
      })
  },
//   验证位置信息
  grantlocation:function(app){
      wx.getLocation({
          success: res => {
              app.globalData.userLocation = res
              console.log(app.globalData.userLocation)
          },
          fail: res => {
              console.log("用户不予位置授权")
          }
      })
  },
  globalData: {
    userInfo: null,
    userLocation:null,
    openId:null,
    url:"http://192.168.1.222:8080"
  }
})