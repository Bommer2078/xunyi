// components/epsoide/index.js
Component({
  properties: {
      classicIndex:{
          type:String,
          value:'0',
          observer:function(){
              let index = this.properties.classicIndex
              index = index<10?'0'+index:index
              this.setData({
                  index
              })
          }
      }
  },

  data: {
      index:0,
      months:[
           '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月',
           '十二月'
      ],
      year:2018,
      month:'一月'
  },


  methods: {

  },

  ready(){
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()
      month = this.data.months[month]
      this.setData({
          year,
          month
      })
  }
})
