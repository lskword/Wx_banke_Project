
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: [],
    showModel:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取 存储用户信息
    var UserInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: UserInfo
    })

  },
  partialPayment: function () {
    console.log(1)
    wx.reLaunch({
      url: '/pages/playMent/partialPayment/partialPayment'
    })
  },
  finished: function () {
    wx.reLaunch({
      url: '/pages/myCourse/myCourse/myCourse',
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
  /* 用户拨打电话*/
  call: function () {
    wx.makePhoneCall({
      phoneNumber: '400-444-333',
    })
  },
  /*关闭电话框*/
  closeModel: function () {
    this.setData({
      showModel: false
    })
  },
  /*打开电话框*/
  callModel: function() {
    this.setData({
      showModel:true
    })
  }
})