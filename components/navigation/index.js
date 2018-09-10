// components/navigation/index.js
import {Http} from '../../utils/http'
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
          let currIndex = this.properties.currIndex
          let lastIndex = this.properties.lastIndex
          if(currIndex === lastIndex){
              return
          }
          this.getRequest('next')
          this.setData({
              currIndex:++currIndex
          })
      },
      preClick(){
          let currIndex = this.properties.currIndex
          if(currIndex === 1){
              return
          }
          this.getRequest('pre')
          this.setData({
              currIndex:--currIndex
          })
      },
      // 请求数据前一期或下一期的数据
      getRequest(attr){
          let url
          let http = new Http()
          let currIndex = this.properties.currIndex
          switch (attr){
              case 'next':
                  url = '/classic/' + currIndex + '/next'
                  console.log(url)
                  break
              case 'pre':
                  url ='/classic/' + currIndex + '/previous'
                  console.log(url)
                  break
          }
          http.request({
              url,
              success(data){
                  console.log(data)
              }
          })
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
