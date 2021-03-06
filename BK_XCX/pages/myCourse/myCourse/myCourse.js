var sliderWidth = 50; // 需要设置slider的宽度，用于计算中间位置

// 获取用户实例
const app = getApp()
const url = app.globalData.url

// 获取进行中数据
var showlist = function (that) {
    wx.request({
        url: url +"/apiMy/myCourse",
        data:{
            type:that.data.type
        },
        success:res=>{
            console.log(res.data)
            if(res.data.data==null){
                that.setData({
                    isnull: true
                })
            }else{
                var courselist = []
                for (let i = 0; i < res.data.data.myCourseList.length; i++) {
                    courselist.push(res.data.data.myCourseList[i])
                }
                that.setData({
                    courselist: courselist,
                    isnull: false
                })
            }
        }
    })
}
Page({
  /**
   * 页面的初始数据
   */
    data: {
        // tab切换相关参数
        tabs: ["进行中", "已完结"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        // 课程状态 1为进行中 2为已完结
        type:1,
        // 课程列表 状态 1:正常 2:已逾期 3:已学完4:已取消
        courselist:[],
        // 列表是否为空
        isnull:false
    },
    // 现在去学习
    gostudy:function(){
        wx.switchTab({
            url: '/pages/index/index/index',
            success:res=>{
                console.log(res)
            },
            fail:res=>{
                console.log(res)
            }
        })
    },
    onLoad: function () {
        var that = this;
        // 获取数据
        showlist(this)
        // tab切换
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    // tab切换
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
        if(this.data.activeIndex == 0){
            this.setData({
                type:1
            })
            // 获取数据
            showlist(this)
        }else{
            this.setData({
                type: 2
            })
            // 获取数据
            showlist(this)
        }
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