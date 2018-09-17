import {Http} from "../utils/http";

const bookMolde = {
    getBooksData(){
        const http = new Http()
        return http.request({
            url:'/book/hot_list'
        })
    },

    getShortComment(id){
        const http = new Http()
        return http.request({
            url:`/book/${id}/short_comment`
        })
    },

    getBooksDetail(id){
        const http = new Http()
        return http.request({
            url:`/book/${id}/detail`
        })
    },

    getBooksFavor(id){
        const http = new Http()
        return http.request({
            url:`/book/${id}/favor`
        })
    },

    addComment(data){
        const http = new Http()
        return http.request({
            url:`/book/add/short_comment`,
            method:'POST',
            data
        })
    },

    getHotList(){
        const http = new Http()
        return http.request({
            url:'/book/hot_keyword'
        })
    },

    search(str){
        const http = new Http()
        return http.request({
            url:'/book/search',
            data:{
                start:0,
                count:20,
                summary:1,
                q:str
            }
        })
    }
}


export default bookMolde