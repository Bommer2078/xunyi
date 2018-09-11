// components/classic/music/index.js
Component({
    properties: {
        classicContent:String,
        classicImg:String,
    },
    data: {
        imgUrl:'images/音乐。@2x.png',
        playImg:'images/暂停中.png',
        isPlay:false,
        animationData:{}
    },
    methods:{
        onPlay(){
            let isPlay = this.data.isPlay
            let playImg = !isPlay?'images/播放中.png':'images/暂停中.png'
            this.setData({
                isPlay:!isPlay,
                playImg
            })
        },

    }
})