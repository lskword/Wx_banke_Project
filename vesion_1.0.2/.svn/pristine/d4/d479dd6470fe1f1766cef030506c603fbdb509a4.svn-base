//获取应用实例
const app = getApp()
const url = app.globalData.url

// 课程进度
var myCourse = function(that){
    wx.request({
        url: url + "/apiMy/myCourseSchedule",
        data:{
            orderId: that.data.orderId
        },
        success:res=>{
            console.log(res.data.data)
            that.setData({
                code: res.data.data.code,
                courseName: res.data.data.courseName,
                campusAddress: res.data.data.campusAddress,
                courseStatus: res.data.data.courseStatus,
                longitude: res.data.data.schoolLongitude,
                latitude: res.data.data.schoolLatitude
            })
        }
    })
}
// 签到记录
var mySign = function(that){
    wx.request({
        url: url + "/apiSignIn/myCourse",
        data:{
            courseId: that.data.courseId
        },
        success:res=>{
            console.log(res.data.data)
            var mySign = []
            for(let i=0;i<res.data.data.length;i++){
                mySign.push(res.data.data[i])
            }
            that.setData({
                count:res.data.data.length,
                mySign: mySign
            })
        }
    })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          orderId: options.orderId,
          courseId: options.courseId
      })
      myCourse(this)
      mySign(this)
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