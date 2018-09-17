// components/searchBar/index.js
import bookMolde from '../../model/book'
import {getStorage,setStorage} from '../../utils/setStorage'
Component({
  properties: {
      hotList:Array
  },

  data: {
      showSearch:false,
      searchResolveList:[],
      inputValue:'',
      showNothing:false,
      searchHistory:[]
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

          bookMolde.search(searchWord)
              .then(res=>{
                  if(res.count == 0){
                      this.showNoFind(true)
                      wx.hideLoading()
                      return
                  }

                  this.addHistory(searchWord)

                  this.setData({
                      searchResolveList:res.books
                  })

                  wx.hideLoading()
              })
      },

      restoreSearch(){
          this._restoreSearch()
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

          console.log(boolean)

          if(boolean){
              return
          }


          let arr = this.data.searchHistory
          arr.unshift(searchWord)
          this.setData({
              searchHistory:arr
          })

          setStorage('searchHistory',arr)

      }
  }


})
