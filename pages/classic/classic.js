import {Http} from '../../utils/http'
Page({
  data: {
      count:0,
      isLike:false,
      movieImg:'',
      movieContent:'',
      movieIndex:0,
      movieId:'',
      classicType:''
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
                  movieImg:res.image,
                  movieContent:res.content,
                  movieIndex:res.index,
                  movieId:res.id,
                  classicType:res.type
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
              art_id:this.data.movieId,
              type:this.data.classicType
          }
      })
  }
})