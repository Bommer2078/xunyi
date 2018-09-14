import {Http} from "../utils/http";

const bookMolde = {
    getBooksData(that){
        const http = new Http()
        let promise = http.request({
            url:'/book/hot_list'
        })

        promise.then(res=>{
            that.setData({
                books:res
            })
        },err=>console.log(err))
    }
}

export default bookMolde