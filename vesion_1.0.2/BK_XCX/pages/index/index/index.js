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
            pageSize:10
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
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if(app.globalData.openId == null){
           wx.login({
               success:res=>{
                   if(res.code){
                       wx.request({
                           url: url + '/apiSysApiUser/wxOpenId',
                           data:{
                               jsCode:res.code
                           },
                           method: 'post',
                    //     提交方式为post时header需要修改成以下信息
                           header:{
                               "Content-Type": "application/x-www-form-urlencoded"
                           },
                           success:res=>{
                               console.log(res.data.data)
                               app.globalData.openId = res.data.data.openid
                               app.globalData.sessionKey = res.data.data.session_key
                           }
                       })
                   }
               }
           })
      }
      if (app.globalData.userInfo == null) {
          app.grantuserinfo(app)

      if (app.globalData.userLocation == null) {
          app.grantlocation(app)
      }
  }
  }
})
