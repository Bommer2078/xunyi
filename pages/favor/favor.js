// pages/favor/favor.js
import favor from '../../model/favor'
Page({

  data: {
      favorBookNum:0,
      favorItems:[],
      userInfo:{}
  },

  onShow: function () {
      const favorNum = favor.getFavorBookNum()
      const favorItem =favor.getFavorItem()
      favor.getFavorBookNum().then(res=>console.log(res))
      Promise.all([favorNum,favorItem]).then(res=>{
          this.setData({
              favorBookNum:res[0].count,
              favorItems:res[1]
          })
          console.log(res[0])
          console.log(res[1])
      })
  },

    getUser(res){
      if(!res.detail.userInfo){
          wx.showToast({
              title:'请稍后登陆',
              icon:'none'
          })
      }else{
          console.log(res)
          this.setData({
              userInfo:res.detail.userInfo
          })
          wx.showToast({
              title:'登陆成功',
              icon:'success'
          })
      }
    }


})