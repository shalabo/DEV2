$(function(){
    function getProductList(){
      $('.product_main').html('');
    $.ajax({
      url: "/productList",
      type:"GET",
      success: function(productList){
        sessionStorage.setItem('productDetailURL', window.location.pathname);
        if(productList.length !== 0 ){
          var x = Math.ceil(productList.length / 12);
// 顯示最多幾頁
          // console.log(x)
          $('.page').html('');
          var mypath = window.location.pathname;
          // console.log(mypath)
// 從網址判斷是否點擊換頁，從結果更改商品連結的目的地網址
// 後續所以尋都有相同判斷
          if(mypath == '/product'){
            $.each(productList,function(index,item){
              // 挑選特定幾筆放入 
              // 限制比數 = 12
              // x = 資料總長度/12 算出最多幾頁
              // 第二頁就會是 index > 12 * 當下點擊的x(頁數) && index < 12 * 當下點擊的x(頁數)
              // 例如 index > 12 * 2 && index < 12 * 3    第25比到36比
              if(index<12){                 
                $('.product_main').append(`<div class="col">
        <div class="card shadow-sm">
          <a href="./product/${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
          <div class="card-body">
            <p class="card-text border-bottom"><a href="/product/${productList[index].product_id}/detail" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
            <div class="">
            刊登者 > <span class="QAusername">${productList[index].user_name}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
            <div class="">
            所在地 > ${productList[index].city}
            </div>
              <small class="text-body-secondary">${productList[index].lunch_date}</small>
            </div>`)
          };
    
    
    
    
            })
          }else{
            // console.log(window.location.pathname)
//找出當下在第幾頁  
            var pageNumber = Number(window.location.pathname.substring(13));
            console.log(pageNumber);
            $.each(productList,function(index,item){
// 挑選特定幾筆放入 
// 限制比數 = 12
// x = 資料總長度/12 算出最多幾頁
// 第二頁就會是 index > 12 * 當下點擊的x(頁數) && index < 12 * 當下點擊的x(頁數)
// 例如 index > 12 * 2 && index < 12 * 3    第25比到36比
              if(index >=12 * (pageNumber-1) && index < 12 * (pageNumber)){               
                $('.product_main').append(`<div class="col">
        <div class="card shadow-sm">
          <a href="${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
          <div class="card-body">
            <p class="card-text border-bottom"><a href="/product/${productList[index].product_id}/detail" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
            <div class="">
            刊登者 > <span class="QAusername">${productList[index].user_name}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
            <div class="">
            所在地 > ${productList[index].city}
            </div>
              <small class="text-body-secondary">${productList[index].lunch_date}</small>
            </div>`)
          }

          
    
    
    
    
            })
          }






          for(i=1;i<=x;i++){        
            $('.page').append(`
            <a href="/product/page${i}"><span>${i}</span></a>
            `)
          }


        }




      // 測試中 焦點到搜尋物品上
      



      




      }
    })
  }
  getProductList();
  





  // 商品名搜尋

  

  $("#productSearch").on('click',function(e){
    // console.log($('#productInput').val());
    var dataToServer = {
      product_name: $('#productInput').val(),
    }
    $.ajax({
      type: "get",
      url: "/product/Search/Search",
      data: dataToServer,
      success: function(productList){
        $('.product_main').html('');
        // $('.input-group+span').text("'XD")

        var x = Math.ceil(productList.length / 12);
        $('.product_main').html('');
        var mypath = window.location.pathname;
        $('.page').html('');
        for(i=1;i<=x;i++){        
          $('.page').append(`
          <span class="Cpage" data-page="${i}">${i}</span>
          `)
        }
        $('.Cpage').bind({
          click: function(value){
            pageN(value);
          }
        })
// 判斷網址區別，根據不同網址給定不同連結
// /product前面會有跟目錄./product/
// 含有page網址的話會是去除./product/
        if(mypath == '/product'){
          
          function pageN(value){
            var thePage = 0;  
            // console.log(value.target.dataset.page);    
            thePage =   value.target.dataset.page;
            window.scrollTo(0, 0); 
//在還未點擊頁面的時候，要先把選到的商品列印出來
// 點選後清除再列印新的頁面商品
// 先清空原本的畫面，才能把新的印出來
            $('.product_main').html('');
            $.each(productList,function(index,item){

              // 挑選特定幾筆放入 
              if(index >= 12 *( thePage-1) && index < 12 * thePage){  
                          
                $('.product_main').append(`<div class="col">
        <div class="card shadow-sm">
          <a href="./product/${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
          <div class="card-body">
            <p class="card-text border-bottom"><a href="" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
            <div class="">
            刊登者 > <span class="QAusername">${productList[index].user_name}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
            <div class="">
            所在地 > ${productList[index].city}
            </div>
              <small class="text-body-secondary">${productList[index].lunch_date}</small>
            </div>`)
        // console.log(index)
          }
          })  
          
          
          }
          $.each(productList,function(index,item){
            // console.log(index)
            // 挑選特定幾筆放入 
            if(index<12){
                  
              $('.product_main').append(`<div class="col">
      <div class="card shadow-sm">
        <a href="./product/${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
        <div class="card-body">
          <p class="card-text border-bottom"><a href="" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
          <div class="">
          刊登者 > <span class="QAusername">${productList[index].user_name}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center">
          <div class="">
          所在地 > ${productList[index].city}
          </div>
            <small class="text-body-secondary">${productList[index].lunch_date}</small>
          </div>`)
        }
  
  
          })
        }else{
          function pageN(value){
            var thePage = 0;  
            // console.log(value.target.dataset.page);    
            thePage =   value.target.dataset.page;
            window.scrollTo(0, 0); 
//在還未點擊頁面的時候，要先把選到的商品列印出來
// 點選後清除再列印新的頁面商品
// 先清空原本的畫面，才能把新的印出來
            $('.product_main').html('');
            $.each(productList,function(index,item){

              // 挑選特定幾筆放入 
              if(index >= 12 *( thePage-1) && index < 12 * thePage){  
                          
                $('.product_main').append(`<div class="col">
        <div class="card shadow-sm">
          <a href="${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
          <div class="card-body">
            <p class="card-text border-bottom"><a href="" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
            <div class="">
            刊登者 > <span class="QAusername">${productList[index].user_name}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
            <div class="">
            所在地 > ${productList[index].city}
            </div>
              <small class="text-body-secondary">${productList[index].lunch_date}</small>
            </div>`)
        // console.log(index)
          }
          })  
          
          
          }
          $.each(productList,function(index,item){
            // 挑選特定幾筆放入 
            if(index<12){
                  
              $('.product_main').append(`<div class="col">
      <div class="card shadow-sm">
        <a href="${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
        <div class="card-body">
          <p class="card-text border-bottom"><a href="" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
          <div class="">
          刊登者 > <span class="QAusername">${productList[index].user_name}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center">
          <div class="">
          所在地 > ${productList[index].city}
          </div>
            <small class="text-body-secondary">${productList[index].lunch_date}</small>
          </div>`)
        }
  
  
          })
        }




      }
    })

    $("#productInput").val('')




    // 比對資料未完成
    // var x = $('#productInput').val();
    // // console.log(e);
    
    // y[index] = productList[index].user_name;
    // console.log(y);
    // if(x == y[index]){
    //   // y.indexOf()
    //   console.log(y.indexOf('三玖'));
      
    // }

    // 跳轉商品焦點
    // console.log($("#product_id_5"));
    // if(x == ''){
    //   $('.input-group+span').text('請輸入點什麼啦ˋˊ')
    // }
    // else{ 
    //   $([document.documentElement, document.body]).animate({
    //     scrollTop: $(x).offset().top
    //     }, 0.1);
    // }
    

    
  })
// 當切換商品名搜尋時，自動清除地區搜尋資料，以免混亂

  $("#productInput").focus(function(e){
    
    for(i=0;i<22;i++){
      $('.cityBTN>input')[i].dataset.selected = "false" ;
      // console.log($('.cityBTN>input')[i].dataset.selected);
      $(".cityBTN>input").addClass('btn-outline-primary');
      $(".cityBTN>input").removeClass('btn-primary');
      $('.cityBTN').addClass('CityNone');
      
    }
    for(i=0;i<$("#CitySelect>button").length;i++){
      $("#CitySelect>button")[i].dataset.selected = "false";
    }
      // console.log($("#CitySelect>button")[i])
      $("#CitySelect>button").addClass('btn-outline-primary');
      $("#CitySelect>button").removeClass('btn-primary');
    
  })

  // 按下enter也可以搜尋
  $('#productInput').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      var dataToServer = {
        product_name: $('#productInput').val(),
      }
      $.ajax({
        type: "get",
        url: "/product/Search/Search",
        data: dataToServer,
        success: function(productList){
          $('.product_main').html('');
          // $('.input-group+span').text("'XD")
  
          var x = Math.ceil(productList.length / 12);
          $('.product_main').html('');
          var mypath = window.location.pathname;
          $('.page').html('');
          for(i=1;i<=x;i++){        
            $('.page').append(`
            <span class="Cpage" data-page="${i}">${i}</span>
            `)
          }
          $('.Cpage').bind({
            click: function(value){
              pageN(value);
            }
          })
  // 判斷網址區別，根據不同網址給定不同連結
  // /product前面會有跟目錄./product/
  // 含有page網址的話會是去除./product/
          if(mypath == '/product'){
            
            function pageN(value){
              var thePage = 0;  
              // console.log(value.target.dataset.page);    
              thePage =   value.target.dataset.page;
              window.scrollTo(0, 0); 
  //在還未點擊頁面的時候，要先把選到的商品列印出來
  // 點選後清除再列印新的頁面商品
  // 先清空原本的畫面，才能把新的印出來
              $('.product_main').html('');
              $.each(productList,function(index,item){
  
                // 挑選特定幾筆放入 
                if(index >= 12 *( thePage-1) && index < 12 * thePage){  
                            
                  $('.product_main').append(`<div class="col">
          <div class="card shadow-sm">
            <a href="./product/${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
            <div class="card-body">
              <p class="card-text border-bottom"><a href="" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
              <div class="">
              刊登者 > <span class="QAusername">${productList[index].user_name}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
              <div class="">
              所在地 > ${productList[index].city}
              </div>
                <small class="text-body-secondary">${productList[index].lunch_date}</small>
              </div>`)
          // console.log(index)
            }
            })  
            
            
            }
            $.each(productList,function(index,item){
              // console.log(index)
              // 挑選特定幾筆放入 
              if(index<12){
                    
                $('.product_main').append(`<div class="col">
        <div class="card shadow-sm">
          <a href="./product/${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
          <div class="card-body">
            <p class="card-text border-bottom"><a href="" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
            <div class="">
            刊登者 > <span class="QAusername">${productList[index].user_name}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
            <div class="">
            所在地 > ${productList[index].city}
            </div>
              <small class="text-body-secondary">${productList[index].lunch_date}</small>
            </div>`)
          }
    
    
            })
          }else{
            function pageN(value){
              var thePage = 0;  
              // console.log(value.target.dataset.page);    
              thePage =   value.target.dataset.page;
              window.scrollTo(0, 0); 
  //在還未點擊頁面的時候，要先把選到的商品列印出來
  // 點選後清除再列印新的頁面商品
  // 先清空原本的畫面，才能把新的印出來
              $('.product_main').html('');
              $.each(productList,function(index,item){
  
                // 挑選特定幾筆放入 
                if(index >= 12 *( thePage-1) && index < 12 * thePage){  
                            
                  $('.product_main').append(`<div class="col">
          <div class="card shadow-sm">
            <a href="${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
            <div class="card-body">
              <p class="card-text border-bottom"><a href="" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
              <div class="">
              刊登者 > <span class="QAusername">${productList[index].user_name}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
              <div class="">
              所在地 > ${productList[index].city}
              </div>
                <small class="text-body-secondary">${productList[index].lunch_date}</small>
              </div>`)
          // console.log(index)
            }
            })  
            
            
            }
            $.each(productList,function(index,item){
              // 挑選特定幾筆放入 
              if(index<12){
                    
                $('.product_main').append(`<div class="col">
        <div class="card shadow-sm">
          <a href="${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
          <div class="card-body">
            <p class="card-text border-bottom"><a href="" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
            <div class="">
            刊登者 > <span class="QAusername">${productList[index].user_name}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
            <div class="">
            所在地 > ${productList[index].city}
            </div>
              <small class="text-body-secondary">${productList[index].lunch_date}</small>
            </div>`)
          }
    
    
            })
          }
  
  
  
  
        }
      })
// 搜尋後清空欄內搜尋字
      $("#productInput").val('')
  
    }
  })

  







  // 商品名搜尋










   // 綁定市區搜尋
   var x = '';
   var cityBeenS = [];







  // render渲染關係 網頁中的onclick會被當純HTML
  // 所以要重新bind事件clcik在特定元素上
  $('#CitySelect>button').bind({
    click: function(value){
      changeDisplay(value);
      // console.log(value.target)
    }
  })

  // 定義函式changeDisplay的工作
  // 特定元素的類別顯示跟隱藏
function changeDisplay (value){
  // 限定只能選一區，偷懶不用AJAX抓資料 直接用22縣市數字
  for(i=0;i<22;i++){
    $('.cityBTN>input')[i].dataset.selected = "false" ;
    // console.log($('.cityBTN>input')[i].dataset.selected);
    $(".cityBTN>input").addClass('btn-outline-primary');
    $(".cityBTN>input").removeClass('btn-primary');
  }

    $('.cityBTN').addClass('CityNone');
    var x = value.target.value;
    $(`#${x}`).removeClass('CityNone');
    // 點選的該區域ID
    var y = value.target.id;
    // console.log(value.target.dataset.selected);
    // console.log(y);
    // 
    $("#CitySelect>button").addClass('btn-outline-primary');
    $("#CitySelect>button").removeClass('btn-primary');
    for(i=0;i<$("#CitySelect>button").length;i++){
      $("#CitySelect>button")[i].dataset.selected = "false";

    }
    $(`#${y}`).addClass('btn-primary');
    $(`#${y}`).removeClass('btn-outline-primary');
    value.target.dataset.selected = "true";
    // 使用者切換區域時，會清除原本區域所選的城市
    if(value.target.id == "A0"){
      for(i=0;i<22;i++){
        cityBeenS[i] = $('.cityBTN>input')[i].value;
        // console.log(cityBeenS);
      }
    }else{
      cityBeenS = []
    }


}
  // 定義函式changeDisplay的工作
  // 特定元素的類別顯示跟隱藏



  // 綁定事件在市區按鈕上
  $('.cityBTN>input').bind({
    click : function(cityName){
        selectCity(cityName);
    }
  })
  // 綁定事件在市區按鈕上







  // 綁定市區搜尋
  $('#CitySearch').bind({
    click:function(){
        searchCity();
    }
  })

    // 抓出市區名稱準備比對
  function selectCity(cityName){
    x = cityName.target.value
    // console.log(x);

    // 確認是否選取
    var y = cityName.target.dataset.selected;
    // console.log(y);
    if(y == "false"){
      $(`#${x}`).addClass('btn-primary');
      $(`#${x}`).removeClass('btn-outline-primary');
      cityName.target.dataset.selected = "true";
    }else{
      $(`#${x}`).removeClass('btn-primary');
      $(`#${x}`).addClass('btn-outline-primary');
      cityName.target.dataset.selected = "false";
      cityBeenS = cityBeenS.filter(item=> item !== x);
      
      // console.log(cityBeenS);
    }
    

    // 有點選的話再進行比對
    if(y == "false"){
      $.ajax({
        url: "/productList",
        type:"GET",
        async: false,
        success: function(productList){
          // 拿出各縣市名稱
          var z = [];
            for(i=0;i<productList.length;i++){
              z[i] = productList[i].city;
            }
            let sCity = [x];
            let result = $(sCity).filter(z).toArray();
            // console.log(result);
            
            if(result[0] == undefined){
              alert('目前並沒有此區域內提供的商品喔!');
              $(`#${x}`).removeClass('btn-primary');
              $(`#${x}`).addClass('btn-outline-primary');
              cityName.target.dataset.selected = "false";
              // sessionStorage.removeItem("citybeenS"+cityName.target.dataset.count);
            }else{       
                  
              
              if(cityBeenS.indexOf(result[0]) !== -1){
                console.log('有重複喔!');
              }else{
                // 將資料庫內有質的放入陣列
                cityBeenS.push(result[0]);      
                // console.log(cityBeenS);
                
              }
             
            }
        },
        // data:{
        //   city: x
        // }

          })
    }
    




  }
    // 抓出市區名稱準備比對
  
    // 地區搜尋
    function searchCity(){
      // var test1 = 0;
      // function sendCity(val){
      //     // console.log($(`#${val}>input`).length);
      //     for (i=0;i<$(`#${val}>input`).length;i++) {
      //       if ($(`#${val}>input`)[i].dataset.selected == "true") {
      //         if(cityBeenS.indexOf($(`#${val}>input`)[i].value) !== -1){
      //           // console.log(cityBeenS);
      //         }else{
      //           cityBeenS.push($(`#${val}>input`)[i].value);
      //           console.log(cityBeenS);
                
      //         }
              
      //       }
      //     }

      // }
      // 沒選區域的話
      if($('.CitySelect')[0].dataset.selected == "false" && $('.CitySelect')[1].dataset.selected == "false" && $('.CitySelect')[2].dataset.selected == "false" && $('.CitySelect')[3].dataset.selected == "false" && $('.CitySelect')[4].dataset.selected == "false" && $('.CitySelect')[5].dataset.selected == "false"){
        alert('請至少選擇一個區域喔!')
        
      }else{
              // 確認縣市有選的話
      for(i=0;i<$("#CitySelect>button").length;i++){
        if($("#CitySelect>button")[i].dataset.selected == "true"){

          test1 = $("#CitySelect>button")[i].value;
          // 最終選擇結果
          // 確認一下要搜尋的陣列是否真的有東西
          console.log(cityBeenS)
          var dataToServer = {
            city: cityBeenS
          }
          // 沒選縣市
          // 有的話再到後端
          if(cityBeenS.length == 0){
            alert('請至少選擇一個縣市喔ˋˊ')
          }else{
            $.ajax({
              type: "get",
              url: "/product/citySearch/citySearch",
              data: dataToServer,
              success: function(productList){




                var x = Math.ceil(productList.length / 12);
                $('.product_main').html('');
                var mypath = window.location.pathname;
                $('.page').html('');
                for(i=1;i<=x;i++){        
                  $('.page').append(`
                  <span class="Cpage" data-page="${i}">${i}</span>
                  `)
                }
                $('.Cpage').bind({
                  click: function(value){
                    pageN(value);
                  }
                })
                if(mypath == '/product'){
                

                  
//創造假連結，用AJAX取得典擊頁數，然後重新渲染資料 

                  function pageN(value){
                    var thePage = 0;  
                    // console.log(value.target.dataset.page);    
                    thePage =   value.target.dataset.page;
                    window.scrollTo(0, 0); 
//在還未點擊頁面的時候，要先把選到的商品列印出來
// 點選後清除再列印新的頁面商品
// 先清空原本的畫面，才能把新的印出來
                    $('.product_main').html('');
                    $.each(productList,function(index,item){

                      // 挑選特定幾筆放入 
                      if(index >= 12 *( thePage-1) && index < 12 * thePage){  
                                  
                        $('.product_main').append(`<div class="col">
                <div class="card shadow-sm">
                  <a href="./product/${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
                  <div class="card-body">
                    <p class="card-text border-bottom"><a href="" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
                    <div class="">
                    刊登者 > <span class="QAusername">${productList[index].user_name}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="">
                    所在地 > ${productList[index].city}
                    </div>
                      <small class="text-body-secondary">${productList[index].lunch_date}</small>
                    </div>`)
                // console.log(index)
                  }
                  })  
                  
                  
                  }
                  $.each(productList,function(index,item){

                    // 挑選特定幾筆放入 
                    if(index<12){                      
                      $('.product_main').append(`<div class="col">
              <div class="card shadow-sm">
                <a href="./product/${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
                <div class="card-body">
                  <p class="card-text border-bottom"><a href="" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
                  <div class="">
                  刊登者 > <span class="QAusername">${productList[index].user_name}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                  <div class="">
                  所在地 > ${productList[index].city}
                  </div>
                    <small class="text-body-secondary">${productList[index].lunch_date}</small>
                  </div>`)}
                })


                }else{
                
                  function pageN(value){
                    var thePage = 0;  
                    // console.log(value.target.dataset.page);    
                    thePage =   value.target.dataset.page;
                    window.scrollTo(0, 0); 
//在還未點擊頁面的時候，要先把選到的商品列印出來
// 點選後清除再列印新的頁面商品
// 先清空原本的畫面，才能把新的印出來
                    $('.product_main').html('');
                    $.each(productList,function(index,item){

                      // 挑選特定幾筆放入 
                      if(index >= 12 *( thePage-1) && index < 12 * thePage){  
                                  
                        $('.product_main').append(`<div class="col">
                <div class="card shadow-sm">
                  <a href="${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
                  <div class="card-body">
                    <p class="card-text border-bottom"><a href="" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
                    <div class="">
                    刊登者 > <span class="QAusername">${productList[index].user_name}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="">
                    所在地 > ${productList[index].city}
                    </div>
                      <small class="text-body-secondary">${productList[index].lunch_date}</small>
                    </div>`)
                // console.log(index)
                  }



                  })  
                  
                  
                  }











                  $.each(productList,function(index,item){
      // 挑選特定幾筆放入 
      // 限制比數 = 12
      // x = 資料總長度/12 算出最多幾頁
      // 第二頁就會是 index > 12 * 當下點擊的x(頁數) && index < 12 * 當下點擊的x(頁數)
      // 例如 index > 12 * 2 && index < 12 * 3    第25比到36比
                    if(index < 12){               
                      $('.product_main').append(`<div class="col">
              <div class="card shadow-sm">
                <a href="${productList[index].product_id}/detail"><img src="${productList[index].product_image}" width="100%" height="225" style="object-fit:contain ;"></img></a>
                <div class="card-body">
                  <p class="card-text border-bottom"><a href="/product/${productList[index].product_id}/detail" id="product_id_${productList[index].product_id}">${productList[index].product_name}</a></p>
                  <div class="">
                  刊登者 > <span class="QAusername">${productList[index].user_name}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                  <div class="">
                  所在地 > ${productList[index].city}
                  </div>
                    <small class="text-body-secondary">${productList[index].lunch_date}</small>
                  </div>`)
                }
      
                
          
          
          
          
                  })
                  
                //   $.each(productList,function(index,item){
                //     // 挑選特定幾筆放入 
                //     if(index<12)
                // })
                }
 
        




              }
          })
          }





        }
      };
      }




    }

    // 地區搜尋



})