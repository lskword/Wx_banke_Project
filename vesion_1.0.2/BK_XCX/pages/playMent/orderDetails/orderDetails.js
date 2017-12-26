var app = getApp(),
  URL = app.globalData.url
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //时间转换变量
    windowHeight: 654,
    maxtime: null,
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    //用户课程ID
    orderId: null,
    //子定单数据
    orderBatchList: [],
    //子订单长度
    orderBatchListNum: null,
    //子订单状态
    orderBatchListStatus: [
      '待支付',
      '已逾期',
      '已支付',
      '已取消',
    ],
    //温馨提示语
    reminderText: [
      "1. 每批次分批款的支付截止日期为当天的23:59:59为止",
      "2. 若超过分批款支付截止日期仍未付款，订单状态会标记为“已逾期”，您需要及时补交, 否则您的课程将会面临停课处理!"
    ],
    //提示框状态
    reminderModel: true,
    // 订单详情数据
    orderDetailsList:[],
    // 订单状态
    orderStatus: [
      // (未付首款)
      '待支付', 
      // (已付首款)
      '待支付',
      '已逾期',
      '支付完成',
      // (手动)
      '已取消',
      // (超时自动取消)
      '已取消'
    ],
    status: null,
    //取消订单模态框的状态
    paymentModel: true,
    //一次性付款值
    remainingPayment: null,
    // 立即支付值
    forthwithPayment: null,
    // 数据丢失模态框
    errModel: true,
    // 用户地址
    getlocation: null,
    // 倒计时
    outPutTime: null
  },
    //事件处理函数  
    bindViewTap: function() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    // 取消订单模态框事件
    cancellationOrder: function () {
      this.setData({
        paymentModel: false
      })
    },
    // 确定取消订单模态框
    determinePayment: function  (){
      var that = this;
      wx.request({
        url: URL + '/apiOrder/cancelOrder',
        data: {
          // version: that.data.version,
          // token: that.data.token,
          orderId: that.data.orderId
        },
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log(res)
          if (res.data.code === '0') {
            that.setData({
              paymentModel: false
            })
            wx.reLaunch({
              url: '/pages/playMent/partialPayment/partialPayment',
            })
          }
        }
      })
    },
    // 取消订单模态框
    cancellationPayment: function () {
      this.setData({
        paymentModel: true,
      })
    },
       //开启温馨提示框
    reminder: function () {
      console.log(this)
      this.setData({
        reminderModel: false
      })
    },
    // 关闭温馨提示框
    closeReminderModel: function () {
      this.setData({
        reminderModel: true
      })
    },
    // 一次性支付按钮事件
    LumpSumPayment: function () {
      wx.requestPayment({
        'timeStamp': '',
        'nonceStr': '',
        'package': '',
        'signType': '',
        'paySign': '',
        'success': function (res) {
          console.log('支付成功')
        },
        'fail': function (res) {
          console.log('支付失败')
        }
      })
    },
    // 立即支付按钮事件
    ImmediatePayment: function () {
      wx.requestPayment({
        'timeStamp': '',
        'nonceStr': '',
        'package': '',
        'signType': '',
        'paySign': '',
        'success': function (res) {
          console.log('支付成功')
        },
        'fail': function (res) {
          console.log('支付失败')
        },
        complete: function () {
          console.log('支付失败')
        }
      })
    },
    onLoad: function (options) {
      // 用户订单详情数据请求
      var that = this;
      this.setData({
        windowHeight: wx.getStorageSync('windowHeight'),
        orderId: options.orderId
      });
      wx.request({
        url: URL + '/apiOrder/getOrderDetails',
        data: {
          // version: that.data.version,
          // token: that.data.token,
          orderId: that.data.orderId || 19
        },
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          if (res.data.code === '0'){
            var A = res.data.data
            if (A === null) {
              that.setData({
                errModel: false
              })
              return
            }
            // console.log(A)
            that.setData({
              orderDetailsList: A,
              //逾期时间
              maxTime: A.timeLeft,
              //订单状态
              status: A.orderStatus,
              //子订单数据
              orderBatchList: A.orderBatchList,
              //子订单长度
              orderBatchListNum: A.orderBatchList.length,
              // 立即付款
              remainingPayment: A.remainingPayment,
              // 一次性支付
              forthwithPayment: A.forthwithPayment
            })
            console.log(that.data.orderDetailsList)
          }else {
            that.setData({
              errModel: false
            })
            console.log('数据请求失败，请检查参数是否有问题')
          }
        }
      })
      
    },
    // 页面渲染完成后 调用  
    onReady: function () {
      var that = this;
      //总剩余时间
      var totalSecond = that.data.maxTime;
      
      var interval = setInterval(function () {
        clearInterval(interval);
        // 秒数  
        var second = totalSecond;
        // 天数位  
        var day = Math.floor(second / 3600 / 24);
        var dayStr = day.toString();
        if (dayStr.length == 1) dayStr = '0' + dayStr;
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
        // console.log(1)
        if (day > 0) {
          console.log(2)
          that.setData({
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
        console.log(totalSecond)
        // if (totalSecond === 0) {
        //   clearInterval(interval);
        //   // 订单时间为0的时候执行的事情
        //   // 如果当前状态是已经支付过的倒计时
        //   if (that.data.status ===  1) {
        //     that.setData({
        //       status: 2 //订单自动逾期
        //     })
        //   }
        //   // 如果当前状态是没有首次付款的
        //   if (that.data.status === 0 ) {
        //     that.setData({
        //       status: 5 //订单自动取消
        //     })
        //   }
          // wx.request({
          //   url: URL + '/apiOrder/cancelOrder',
          //   data: {
          //     // version: that.data.version,
          //     // token: that.data.token,
          //     orderId: that.data.orderId
          //   },
          //   header: { 'Content-Type': 'application/json' },
          //   success: function (res) {
          //     console.log(res)
          //     if (res.data.code === '0') {
          //       that.setData({
          //         paymentModel: false
          //       })
          //       wx.reLaunch({
          //         url: '/pages/playMent/partialPayment/partialPayment',
          //       })
          //     }
          //   }
          // })
        // }
      }.bind(this), 1000);
    },
    getlocation: function () {
      // var getlocation = this.data.getlocation
      wx.getLocation({
        success: function (res) {
          console.log(res)
          wx.openLocation({
            latitude: res.latitude,
            longitude: res.longitude,
            scale: 14,
            name: res.name,
            address: res.address
          })
        },
      })
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
  callModel: function () {
    this.setData({
      showModel: true
    })
  }
})