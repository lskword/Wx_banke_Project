// pages/verification/verification.js
var app = getApp();
var url = app.globalData.url

var appInstance = getApp();
var globalData = appInstance.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //  hidden:true
  },
  iscontains: function (str, substr) {
      return str.indexOf(substr) >= 0;
  },
  getPhoneNumber: function (e) {
      console.log(e.detail.errMsg)
      console.log(e.detail.iv)
      console.log(e.detail.encryptedData)
      console.log(app.globalData.sessionKey)
      wx.request({
          url: url + "/apiSysApiUser/getWXUserInfo",
          data:{
              encryptedData: e.detail.encryptedData,
              sessionKey: app.globalData.sessionKey,
              iv: e.detail.iv
          },
          method:"post",
          header:{
              "Content-Type":"application/x-www-form-urlencoded"
          },
          success:res=>{
              console.log(res)
          }
      })
  },
    //   var iv = e.detail.iv;
    //   if (iv == null) {
    //       wx.navigateTo({
    //           url: "/pages/index/phoneLogin/phoneLogin"
    //       })
    //       return;
    //   }
    //   var encryptedData = e.detail.encryptedData
    //   console.log(encryptedData.phoneNumber)
    //   globalData.getPhone = true;
    //   var encryptedData = e.detail.encryptedData;
    //   console.log(encryptedData)
    //   var phoneNumber = encryptedData.phoneNumber;
    //   console.log(phoneNumber)
      //加密解密 电话号码

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })

    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  confirm:function(){
    
  }, 
  iscontains:function(str,substr){
    return str.indexOf(substr)>=0;
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
      
    var iv = e.detail.iv;
    if(iv==null){
      wx.navigateTo({
        url: "/pages/phoneLogin/phoneLogin"
      }) 
      return;
    }   
    globalData.getPhone=true; 
    var encryptedData = e.detail.encryptedData;
    console.log(encryptedData)
    var phoneNumber = encryptedData.phoneNumber;
    console.log(phoneNumber)
    //加密解密 电话号码

    wx.showModal({
      title: '提示',
      showCancel: false,
      confirmColor: '#FFA500',
      content: '非常抱歉!您之前登陆时微信账户下绑定的手机号现已发生变更，请使用“手机号快捷登录”方式登录，谢谢！',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: "/pages/phoneLogin/phoneLogin"
          })
        }
      }
    })
    if(phoneNumber=='18827052411'){
      

    }
    //alert('222')
  }
})