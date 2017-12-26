//index.js
//获取应用实例
const app = getApp()
const url = app.globalData.url
var page = 1
// 请求banner
var loadbanner = function(that){
    wx.request({
        url: url + "/apiBanner/list",
        success:res=>{
            // console.log(res.data)
            var banneritem = that.data.imgUrls
            for(let i=0;i<res.data.data.length;i++){
                banneritem.push(res.data.data[i].imag)
                
            }
            that.setData({
                imgUrls : banneritem
            })
        }
    })
}
// 列表请求
var loadlist = function(that,page){
    wx.request({
        url: url + "/apiBatach/courseList",
        data:{
            page:page,
            pageSize:2
        },
        success: res =>{
            var datalist = that.data.mylist
            for (let i = 0; i < res.data.data.courseList.length;i++){
                datalist.push(res.data.data.courseList[i])
            }
            that.setData({
                mylist: datalist
            })
        }
    })
}
//   上拉加载动画
function updateRefreshIcon(){
    var deg = 0;
    console.log('旋转开始了.....')
    var animation = wx.createAnimation({
        duration: 1000
    });

    var timer = setInterval(() => {
        if (!this.data.loading)
            clearInterval(timer);
        animation.rotateZ(deg).step();//在Z轴旋转一个deg角度
        deg += 360;
        this.setData({
            refreshAnimation: animation.export()
        })
    }, 2000);
}
Page({
  data: {
      autoplay:true,
      interval:3000,
      duration:500,
      imgUrls:[],
      mylist:[],
      scrollTop:0
  },
  scroll:function(e){
    this.setData({
        scrollTop:e.detail.scrollTop
    })
    console.log(this.data.scrollTop)
  },
//   下拉刷新
  onPullDownRefresh:function(){
      wx.showNavigationBarLoading() //在标题栏中显示加载
      setTimeout(() => {
          if (page <= 1) {
              wx.hideNavigationBarLoading() //完成停止加载
              wx.stopPullDownRefresh() //停止下拉刷新
              return
          } else {
              loadlist(this, page - 1)
          }
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
      }, 2000) 
  },
//   上拉加载
  onReachBottom:function(e){
      console.log('hi')
      if (this.data.loading) return;
      this.setData({ loading: true });
      updateRefreshIcon.call(this);
      setTimeout(() => {
        loadlist(this,page+1)
      }, 2000)
  },


  onLoad: function (e) {
      loadbanner(this)
      loadlist(this,page)
      if (app.globalData.userInfo == null) {
          wx.getUserInfo({
              success: res => {
                  app.globalData.userInfo = res.userInfo
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
      }
      if (app.globalData.userLocation == null) {
          wx.getLocation({
              success: res => {
                  app.globalData.userLocation = res
                  console.log(app.globalData.userLocation)
              },
              fail: res => {
                  console.log("用户不予位置授权")
              }
          })
      }
  }
})
