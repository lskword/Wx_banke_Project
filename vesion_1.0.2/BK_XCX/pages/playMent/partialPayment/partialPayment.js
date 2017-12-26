
var app = getApp(),
    URL = app.globalData.url,
    utils = require('../../../utils/util.js')
    
Page({
  data: {
    /**
        * 页面配置
        */
    //窗口宽高
    winWidth: 0,
    winHeight: 0,
    //进行中数据高度 205
    listHeight: 225,
    // 进行中数据
    onGoList: [],
    // 已完成数据
    completedList: [],
    // tab切换
    currentTab: 0,
    // 进行中数据长度
    onGoListNum: null,
    // 已完成数据长度
    completedListNum: null,
    // 标题
    title: ['进行中', '已完成'],
    // 支付 预期
    playStatus: ['待支付', '已逾期', '逾期批次', '剩余时间', '立即补交', '立即付款','已取消','已完成'],
    //
    URL: URL,
    maxtime: [],
    // 时间转换
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    //输出时间
    outPutTime:null,
    // // 显示天/时间开关
    // changeTime
    //用户令牌
    token: null,
    //版本号
    version: null
  },

  // 详情页面跳转
  orderDetails: function (item) {
    console.log(item)
  },
  // 付款按钮事件
  playMentPlay: function () {
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
      success: function () {
        console.log('支付成功')
      },
      fail: function () {
        console.log('支付失败')
      }
    })
  },
  //事件处理函数  
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    // 请求分批付用户数据
    wx.request({
      url: URL + '/apiBatach/myBatchList',
      // data: {
      //   version: that.data.version, 
      //   token: that.data.token
      // },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        // console.log(res)
        if (res.data.code === '2002' || '0') {
          // 进行中存储
          var A = [],
          // 已完成数据存储
              B = [];
          for(var i =0 ; i< res.data.data.length ; i++) {
            (function(i) {
              if (res.data.data[i].orderStatus <= 1) {
                  A.push(res.data.data[i])
                  // console.log(res.data.data[i])
              }else {
                  B.push(res.data.data[i])
              }
            }(i));
          }
          that.setData({
            onGoList: A,
            onGoListNum: A.length,
            completedList: B,
            completedListNum: B.length
          })
          // console.log(that.data.onGoList)
          // 绑定列表的高度
          var listLength = 
            that.data.onGoListNum  >
            that.data.completedListNum ?
            that.data.onGoListNum  :
            that.data.completedListNum 
            
          wx.getSystemInfo({
            success: function (res) {
              that.setData({
                winWidth: res.windowWidth,
                winHeight: listLength * that.data.listHeight
              });
            }
          });
        } else {
          console.log('数据请求失败')
        }
      }
    })

  },
  /**
     * 滑动切换tab
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    //总剩余时间
    
    var totalSecond = that.data.maxtime;
    var interval = setInterval(function () {
      // 秒数  
      clearInterval(interval);
      var second = totalSecond;
      // 天数位  
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '' + dayStr;
      // 小时位  
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
      // 分钟位  
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
      // 秒位  
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      if (day > 0) {
        this.setData({
          outPutTime: dayStr + '天'
        })
      } else {
        //时间拼接
        var A = hrStr + ":" + minStr + ":" + secStr
        that.setData({
          outPutTime: A
        });
      }
      totalSecond--;
      if (totalSecond < 0) {
      //   clearInterval(interval);
      //   // 订单时间为0的时候执行的事情
      //   that.setData({
      //     countDownHour: '0',
      //     countDownMinute: '0',
      //     countDownSecond: '0',
      //   });
      }
    }.bind(this), 1000);
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
      wx.showNavigationBarLoading() //在标题栏中显示加载
      setTimeout(() => {
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }, 2000)
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

