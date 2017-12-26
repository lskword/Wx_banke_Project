//获取应用实例
const app = getApp()
const url = app.globalData.url

// 获取详情数据
var detail = function(that){
    wx.request({
        url: url + "/apiCourse/courseDetails",
        data:{
            // id:that.data.id
            id:1
        },
        success:res=>{
            console.log(res.data.data)
            that.setData({
                courseImg: res.data.data.courseImg,
                courseName: res.data.data.courseName,
                studyCount: res.data.data.studyCount,
                campusAddress: res.data.data.campusAddress,
                schoolLongitude: res.data.data.schoolLongitude,
                schoolatitude: res.data.data.schoolatitude,
                schooAreaName: res.data.data.schooAreaName,
                campusDistanceDes: res.data.data.campusDistanceDes,
                courseType: res.data.data.courseType,
                studyCycle: res.data.data.studyCycle,
                courseHour: res.data.data.courseHour,
                courseValidity: res.data.data.courseValidity,
                courseTotalPrice: res.data.data.courseTotalPrice,
                teacherList: res.data.data.teacherList,
                teacherId: res.data.data.teacherId,
                teacherImg: res.data.data.teacherImg,
                teacherName: res.data.data.teacherName,
                courseCategory: res.data.data.courseCategory,
                orgName: res.data.data.orgName,
                orgImg: res.data.data.orgImg,
                schoolCount: res.data.data.schoolCount,
                courseIntroduction: res.data.data.courseIntroduction,
                schemeList: res.data.data.schemeList
            })
        }
    })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
    people:'10',
    // 是否显示咨询
    showview:true,
    // 滚动条高度
    scrollTop:0,
    // 是否显示返回顶部
    floorstatus:false,
    // model层
    showModalStatus:false,
    // 执行动画
    animationData:null,
    // 列表id
    id:0,
    // 课程名称
    courseName:null,
    // 课程banner图
    courseImg:[],
    // 该课程学习人数
    studyCount:0,
    // 校区地址
    campusAddress:null,
    // 校区经度
    schoolLongitude:0,
    // 校区纬度
    schoolatitude:0,
    // 校区所属区域名称
    schooAreaName:null,
    // 当定位开启时与校区的距离
    campusDistanceDes:0,
    // 课程模板类型
    courseType:1,
    // 课程适合人群
    forTheCrowd:[],
    // 学期周期
    studyCycle:0,
    // 课程总计/科目总计/......
    courseHour:0,
    // 课程有效期
    courseValidity:0,
    // 课程总价
    courseTotalPrice:null,
    // 老师列表数据(// 老师id teacherId  // 老师头像 teacherImg  // 老师名  teacherName  // 擅长课程 courseCategory // 教龄 seniority)
    teacherList:[],
    // 机构列表数据
    // 机构id
    // 机构名
    orgName:null,
    // 机构icon
    orgImg:null,
    // 校区数量
    schoolCount:0,
    // 课程介绍
    courseIntroduction:null,
    // 分批付方案列表
    schemeList:[]
    // 第一批分批付
    // 剩余分批付
    // 付款周期
    // 分批方案id
    // 课程最低价格
  },
//   显示弹框
  showmodal:function(){
    var animation = wx.createAnimation({
        duration:200,
        timingFunction:"linear",
        delay:0
    })
    this.animation = animation
    animation.translateY(500).step()
    this.setData({
        animationData:animation.export(),
        showModalStatus:true
    })
    setTimeout(function(){
        animation.translateY(0).step()
        this.setData({
            animationData: animation.export()
        })
    }.bind(this),200)
  },
//   隐藏弹框
  hidemodal:function(){
      var animation = wx.createAnimation({
          duration: 200,
          timingFunction: "linear",
          delay: 0
      })
      this.animation = animation
      animation.translateY(500).step()
      this.setData({
          animationData: animation.export()
      })
      setTimeout(function () {
          animation.translateY(0).step()
          this.setData({
              animationData: animation.export(),
              showModalStatus: false
          })
      }.bind(this), 200)
  },
//   返回顶部
  goTop:function(){
    this.setData({
        scrollTop:0
    })
  },
//   页面滚动
  scroll:function(e){
    console.log(e.detail)
    if(e.detail.scrollTop > 300){
        this.setData({
            floorstatus:true
        })
    }else{
        this.setData({
            floorstatus:false
        })
    }
  },
//  位置信息
  getlocation:function(){
    wx.getLocation({
        success: function(res) {
            console.log(res)
            wx.openLocation({
                latitude: res.latitude,
                longitude: res.longitude,
                scale:14,
                name:"中南路中建三局中南路中建三局中南路中建三局中南路中建三局",
                address:"中南路中建三局中南路中建三局中"
            })
        },
    })
  },
//   咨询
  toggleConsultation:function(){
    var that = this;
    that.setData({
      showview:!that.data.showview
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    detail(this)
    //showview:(options.showview == "true"?true:false)
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