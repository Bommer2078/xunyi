import {Http} from "../utils/http";


function getLikeData(type,index,fn){
    let http = new Http()
    let url = `classic/${type}/${index}/favor`
    let promise = http.request({url})
    promise.then((res)=>fn(res))
}

function handleLikeClick({data,art_id,type}){
    let http = new Http()
    let isLike = data.detail.isLike
    let url = isLike?'/like':'/like/cancel'
    http.request({
        url,
        method:'POST',
        data:{
            art_id:art_id,
            type:type
        }
    })
}


export { getLikeData, handleLikeClick }