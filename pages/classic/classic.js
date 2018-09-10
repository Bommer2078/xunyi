import {Http} from '../../utils/http'
Page({
  data: {
      count:0,
      isLike:false,
      classicImg:'',
      classicContent:'',
      classicIndex:0,
      classicId:'',
      classicType:'',
      classicTitle:'',
      currIndex:2,
      lastIndex:2
  },


  onLoad: function (options) {
     let http = new Http()
      http.request({
          url:'/classic/latest',
          success:(res) => {
              console.log(res)
              this.setData({
                  count:res.fav_nums,
                  isLike:res.like_status,
                  classicImg:res.image,
                  classicContent:res.content,
                  classicIndex:res.index,
                  classicId:res.id,
                  classicType:res.type,
                  classicTitle:res.title,
                  currIndex:res.index,
                  lastIndex:res.index
              })
          }
      })
  },

  like(data){
      let http = new Http()
      let isLike = data.detail.isLike
      let url = isLike?'/like':'/like/cancel'
      http.request({
          url,
          method:'POST',
          data:{
              art_id:this.data.classicId,
              type:this.data.classicType
          }
      })
  }
})