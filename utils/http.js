import {config} from '../config'
function Http (){
    this.baseResUrl = config.api_blink_url
}




//
Http.prototype.request = function({url,data={},method='GET'}){
    let theUrl = this.baseResUrl + url
    return new Promise((resolve,reject)=>{
        wx.request({
            url:theUrl,
            data,
            method,
            header:{
                'content-type':'application/json',
                'appkey':config.appkey
            },
            success:(res)=>{
                let statusCode = res.statusCode.toString()
                let startChar = statusCode.charAt(0)
                if(startChar === '2'){
                    resolve(res.data)
                }
                else{
                    reject(res)
                }
            },
            fail:(err)=>{
                reject(err)
            }
        })
     })
}

export {Http}