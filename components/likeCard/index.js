// components/likeCard/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        classic:Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        itemType:{
            100:'电影',
            200:'音乐',
            300:'诗句'
        },
        imageType:{
            100:'movie',
            200:'music',
            300:'essay'
        }
    },




    methods:{
        tapLikeCard(){
            wx.navigateTo({
                url:`../../pages/likeTapPage/likeTapPage?type=${this.properties.classic.type}&id=${this.properties.classic.id}`
            })

        }
    }

})
