// pages/phoneLogin/phoneLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statu : 1,
    time : 60
  },
//   手机号正则
  checkMobile:phone=>{
      if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))){
        return false
      }  
  },
//   倒计时
  countdown:function(that){
      var time = that.data.time
      if(time == 0){
          console.log('0000')
      }else{
          setTimeout(function(){
              that.setData({
                  time : time -1
              })
              countdown(that)
          },1000)
      }
  },
  getVerificationCode:function(){
    var that = this
    that.setData({
        statu : 3
    })
    var time = that.data.time
    if(time == 0){
        console.log('000000')
    }else{
        var timer = setTimeout(function(){
            that.setData({
                time : time - 1
            })
            timer
            console.log(timer)
        },1000)
    }
  },
//   获取验证码
  phonenum:function(e){
    if(this.checkMobile(e.detail.value) == false){
        console.log("手机号码错误")
        this.setData({
            statu:1
        })
    }else{
        this.setData({
            statu : 2
        })

    }
  },
  VerificationCode:function(e){
    if(e.detail.value == "" || e.detail.value == null){
        console.log("验证码不正确")
    }else{
        //验证验证码
    }
  },
  onLogin:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    
  }
})