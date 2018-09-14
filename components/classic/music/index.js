// components/classic/music/index.js
import {classicBehavior} from "../commen-beh";
let mMgr = wx.getBackgroundAudioManager()

Component({
    behaviors:[classicBehavior],
    properties:{
        musicSrc:String,
        musicTitle:String
    },
    data: {
        isPlay:false
    },

    attached(){
        this.recoverMusic()
        this.monitorSwitch()
    },
    methods:{
        onPlay(){
            let isPlay = this.data.isPlay

            // 播放和停止音乐
            if(!isPlay){
                this.setData({
                    isPlay:true,
                })

                if(mMgr.src === this.properties.musicSrc){
                    mMgr.play()
                }
                else{
                    mMgr.src = this.properties.musicSrc
                    mMgr.title = this.properties.musicTitle
                }

            }
            else{
                mMgr.pause()
                this.setData({
                    isPlay:false,
                })
            }
        },
        // 操作播放器
        monitorSwitch: function() {
            mMgr.onPlay(() => {
                this.recoverMusic()
            })
            mMgr.onPause(() => {
                this.recoverMusic()
            })
            mMgr.onStop(() => {
                this.recoverMusic()
            }),
            mMgr.onEnded(()=>{
                this.recoverMusic()
            })
        },

        // 覆盖音乐播放状态
        recoverMusic(){
            if(mMgr.paused){
                this.setData({
                    isPlay:false,
                })
                return
            }
            if(mMgr.src === this.properties.musicSrc){
                console.log(mMgr.src)
                if(!mMgr.paused){
                    this.setData({
                        isPlay:true,
                    })
                }
            }
        }
    }
})