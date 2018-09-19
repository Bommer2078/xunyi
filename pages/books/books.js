// pages/books/books.js
import bookMolde from '../../model/book'
import { random } from '../../utils/tools'
Page({
    data: {
        books:[],
        showSearch:false,
        hotList:[],
        more:''
    },
    onLoad: function (options){
        this.getBooksInfo()
        this.getHotlist()
    },

    onShow: function () {
        this.getBooksInfo()
    },

    getHotlist(){
        const hotList = bookMolde.getHotList()
        hotList.then(res=>{
            this.setData({
                hotList:res.hot
            })
        })
    },

    getBooksInfo(){
        let books = bookMolde.getBooksData()
        books.then(res=>{
            this.setData({
                books:res
            })
        })
    },

    isSearch(event){
        this.setData({
            showSearch:event.detail.showSearch
        })
        console.log(event.detail.showSearch)
    },

    onReachBottom(){
        this.setData({
            more:random(16)
        })
    }
})