// components/searchBar/index.js
import bookMolde from '../../model/book'
import {getStorage,setStorage} from '../../utils/setStorage'
Component({
    properties: {
        hotList:Array,
        more:{
            type:String,
            observer:'loadMore'
        }
    },

    data: {
        showSearch:false,
        searchResolveList:[],
        inputValue:'',
        showNothing:false,
        searchHistory:[],
        total:0,
        locked:false
    },

    ready(){
        let historyData = getStorage('searchHistory')
        if(!historyData){
            return
        }

        this.setData({
            searchHistory:historyData
        })
    },

    methods: {
        searchTap(){
            this.setData({
                showSearch:!this.data.showSearch
            })
            this.triggerEvent('isSearch',{
                showSearch:this.data.showSearch
            },{})
            this._restoreSearch()
        },

        handleSearch(event){
            const searchWord = event.detail.content||event.detail.value
            if(!searchWord){
                wx.showToast({
                    title:'请输入书名',
                    icon:'none'
                })
                return
            }

            wx.showLoading()

            this._restoreSearch(searchWord)

            bookMolde.search(0,searchWord)
                .then(res=>{
                    if(res.count == 0){
                        this.showNoFind(true)
                        wx.hideLoading()
                        return
                    }

                    this.addHistory(searchWord)

                    this.setData({
                        searchResolveList:res.books,
                        total:res.total
                    })

                    wx.hideLoading()
                })
        },

        restoreSearch(){
            this._restoreSearch()
        },

        showNoFind(){
            this.setData({
                showNothing:true
            })
        },

        tapTag(event){
            this.handleSearch(event)
        },

        addHistory(searchWord){
            let boolean = this.data.searchHistory.some(item=>{
                if(searchWord === item){
                    return true
                }
            })

            if(boolean){
                return
            }


            let arr = this.data.searchHistory
            arr.unshift(searchWord)
            this.setData({
                searchHistory:arr
            })

            setStorage('searchHistory',arr)

        },

        loadMore(){
            if(!this.data.inputValue||!this._hasMore()||this.data.locked){
                return
            }

            //locked 避免短时间内多次触底而导致重复加载
            this.data.locked = true
            wx.showLoading()
            bookMolde.search(this.data.searchResolveList.length,this.data.inputValue)
                .then(res=>{

                    this.setData({
                        searchResolveList:this.data.searchResolveList.concat(res.books),
                        locked:false
                    })

                    wx.hideLoading()
                },()=>{
                    this.data.locked = false
                    wx.hideLoading()
                })
        },

        _restoreSearch(inputValue){
            if(!inputValue){
                inputValue = ''
            }
            this.setData({
                searchResolveList:[],
                inputValue:inputValue,
                showNothing:false
            })
        },

        _hasMore(){
            let currBooks = this.data.searchResolveList.length
            let allBooks = this.data.total
            if(currBooks < allBooks){
                return true
            }
            else{
                return false
            }
        }
    }
})
