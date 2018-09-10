import {config} from '../config'
function Http (){
    this.baseResUrl = config.api_blink_url
}

Http.prototype.request = function(params){
    let url = this.baseResUrl + params.url
    if(!params.method){
        params.method = 'GET'
    }
    wx.request({
        url,
        data:params.data,
        method:params.method,
        header:{
            'content-type':'application/json',
            'appkey':config.appkey
        },
        success:(res)=>{
            let statusCode = res.statusCode.toString()
            let startChar = statusCode.charAt(0)
            if(startChar === '2'){
                params.success && params.success(res.data)
            }
            else{
                params.error && params.error(res)
            }
        },
        fail:(err)=>{
            params.fail && params.fail(err)
        }
    })
}

export {Http}