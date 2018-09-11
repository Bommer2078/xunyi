// components/navigation/index.js
import {Http} from '../../utils/http'
import {setStorage,getStorage} from '../../utils/setStorage'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      classicTitle:String,
      lastIndex:{
          type:Number,
          observer(){
              this.isForbid()
          }
      },
      currIndex:{
          type:Number,
          observer(){
              this.isForbid()
          }
      },
      classicType:{
          type:String
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      preOpacity:1,
      nextOpacity:1
  },
  /**
   * 组件的方法列表
   */

  methods: {
      nextClick(){
          this._handleClick('next')
      },
      preClick(){
          this._handleClick('pre')
      },

      // 封装向前和向后的点击函数
      _handleClick(type){
          let currIndex = this.properties.currIndex
          let lastIndex = this.properties.lastIndex

          if(type==='next'&&currIndex === lastIndex){
              return
          }
          if(type==='pre'&&currIndex === 1){
              return
          }

          let isStorage = getStorage(currIndex + temp)
          let temp = type=='next'?1:-1
          if(!isStorage){
              this.getRequest(type)
          }else{
              this._updateToClassic(isStorage)
          }
      },

      // 请求数据前一期或下一期的数据
      getRequest(attr){
          let url
          let http = new Http()
          let currIndex = this.properties.currIndex
          switch (attr){
              case 'next':
                  url = '/classic/' + currIndex + '/next'
                  break
              case 'pre':
                  url ='/classic/' + currIndex + '/previous'
                  break
          }
          http.request({
              url,
              success:(data)=>{
                 this._updateToClassic(data)
                  setStorage(data.index,data)
              }
          })
      },
      // 向父组件传值
      _updateToClassic(data){
              this.triggerEvent('pushBtn',{
                  classicData:data
              },{})
      },
// 禁止按钮
      isForbid(){
          let currIndex = this.properties.currIndex
          let lastIndex = this.properties.lastIndex
          if(lastIndex === 1 ){
              this.setData({
                  preOpacity:1,
                  nextOpacity:1
              })
          }
          else{
              if(currIndex === 1){
                  this.setData({
                      preOpacity:0.3,
                      nextOpacity:1
                  })
              }
              else if(currIndex === lastIndex){
                  this.setData({
                      preOpacity:1,
                      nextOpacity:0.3
                  })
              }
              else{
                  this.setData({
                      preOpacity:1,
                      nextOpacity:1
                  })
              }
          }
      }
  }
})
