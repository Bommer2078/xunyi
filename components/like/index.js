// component/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      count:{
          type:Number,
          value:9
      },
      isLike:{
        type:Boolean
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      likeUrl:'images/喜欢-拷贝@2x的副本.png',
      unlikeUrl:'images/喜欢@2x.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
      onlike() {
          let isLike = !this.properties.isLike
          let count = this.properties.count
          count = isLike?count+1:count-1
          this.setData({
            count: count,
            isLike
          })
          this.triggerEvent('like',{
              isLike
          },{})
      }
  }

})
