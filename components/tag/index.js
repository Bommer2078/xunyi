// components/tag/index.js
Component({
  options:{
      multipleSlots:true
  },

  properties: {
      text:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      tapTag(){
          this.triggerEvent('tapTag',{
              content:this.properties.text
          },{})
      }
  }
})
