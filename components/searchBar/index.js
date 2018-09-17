// components/searchBar/index.js
import bookMolde from '../../model/book'
Component({
  properties: {
      hotList:Array
  },

  data: {
      showSearch:false,
      searchResolveList:[],
      inputValue:'',
      showNothing:false
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
          if(!event.detail.value){
              wx.showToast({
                  title:'请输入书名',
                  icon:'none'
              })
              return
          }
          wx.showLoading()
          // const searchWord = event.detail.content||event.detail.value
          const searchWord = event.detail.value
          this._restoreSearch(searchWord)

          bookMolde.search(searchWord)
              .then(res=>{
                  if(res.count == 0){
                      this.showNoFind(true)
                      wx.hideLoading()
                      return
                  }

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
      }
  }

})
