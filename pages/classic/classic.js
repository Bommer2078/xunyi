import {Http} from '../../utils/http'
import {setStorage} from '../../utils/setStorage'
import { getLikeData } from '../../model/likeModel'

Page({
  data: {
      lastIndex:0,
      classic:{},
      count:0,
      isLike:false
  },

  onLoad: function (options) {
      this.getClassicData()
  },

  getClassicData(){
      let http = new Http()
      http.request({
          url:'/classic/latest',
          success:(res) => {
              console.log(res)
              this.setData({
                  classic:res,
                  lastIndex:res.index,
                  count:res.fav_nums,
                  isLike:res.like_status
              })
              setStorage(res.index,res)
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
               art_id:this.data.classic.id,
               type:this.data.classic.type
           }
       })
   },

    pushBtn(res){
        let classicData = res.detail.classicData

        this.setData({
            classic:classicData
        })

        this._getLikeData()
    },

    // 更新like数据
    _getLikeData(){
      let type = this.data.classic.type
      let id = this.data.classic.id
        getLikeData(type,id,(res)=>{
            this.setData({
                count:res.fav_nums,
                isLike:res.like_status
            })
        })
    }
})