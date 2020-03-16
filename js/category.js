$(function () {
  let  cartArrProId=[];
  
    $.ajax({
      url: "https://afternoon-falls-30227.herokuapp.com/api/v1/products-stats/",
      type: "GET",
      success: function (url) {
        // console.log("hello from success");
        let result1=Object.keys(url.data.Groups.Category)
        // console.log(result1);
        if (url) {
            result1.forEach(el=>{
             $("#filterByCategory").append('<a class="dropdown-item text-dark bg-white rounded-pill border border-dark" href="#"><span class=" text-dark  ">'+el+'</span></a>');
            });
        }
      },
      error: function () {
        alert("No more pages");
        // console.log("hello from error");
      }
    });

  $(".paginationColor").mouseenter(function () {
    $(this).css("background-color", "white");
    $(this).css("color", "navy");
    $(this).css("font-weight", "bold");
  });

  $(".paginationColor").mouseleave(function () {
    $(this).css("background-color", "black");
    $(this).css("color", "lightblue");
    $(this).css("font-weight", "bold");
  });

  $(".paginationColor").click(function () {
    $(this).css("background-color", "red");
    $(this).css("color", "navy");
    $(this).css("font-weight", "bold");
  });

        $("#filterByCategory").click((ev)=>{
          var categoryName=ev.target.innerText;
          // console.log(categoryName);
          var categoryPage = 1,
          limit = 10,
          tatalItems = 0;
          getCategoryItems();

      $(".prev-btn2").on("click", function () {
      if (categoryPage > 1) {
        categoryPage--;
        getCategoryItems();
        // $(this).fadeIn();
        $(".next-btn2").show()
      }
      else if(categoryPage === 1){
        $(".next-btn2").show()
        $(this).fadeOut(); 
      
      }
      // console.log("prev-page: " + categoryPage);
      });

      $(".next-btn2").on("click", function () {
      if (categoryPage * limit < tatalItems) {
        categoryPage++;
        getCategoryItems(); 
        $(".prev-btn2").show()
      }else  if (categoryPage === totalPages) {
        $(".prev-btn2").show()
        $(this).fadeOut();
        alert("No More Pages")        
      }
      // console.log("next-page: " + categoryPage);
      });

      function getCategoryItems() {
      $.ajax({
      // https://afternoon-falls-30227.herokuapp.com/api/v1/products/?category=Mice
      url: "https://afternoon-falls-30227.herokuapp.com/api/v1/products/" ,
      type: "GET",
      data:{
        "category":categoryName,
        "page":categoryPage
      },
      success: function (data) {
        // console.log(url);
        // console.log("hello from success");
      
        let result1 = JSON.stringify(data);
        // console.log(result1);
        
        let result2 = JSON.parse(result1);
        tatalItems = result2["total_items"]
        totalPages =result2["total_pages"]
        if(data){
          $("#categories").empty();
        $(result2["data"]).each(function (ind, e) {
          //  console.log(result2["data"][ind]);
          // $("body").append($("#navbar"));
          $("#categories").show();
          $("#products").hide();
          $(".shopping-cart").hide();
          $(".our-webcoderskull").hide();
          $(".ftco-section").hide();

              productName = e.Name;
              ProductId=e.ProductId;
          // console.log(ProductId);
              productCategory = e.Category;
              productPic = e.ProductPicUrl;
              productPrice = e.Price;
              productCurrency = e.CurrencyCode;
              $("#mainCategories").show();
                  //  console.log(productName);
                  // console.log(productCategory);


          //Different Color for each Category
                  if (productCategory === 'Printers') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5 border border-primary  col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill printersCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><a href='product.html?id="+ProductId+"'><img class='img-fluid img-thumbnail p-2 border border-primary' src=" + productPic + "></a><br><br>" + "<span class='p-1 price'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary border border-dark p-2  '>Add To Cart</button></div><br />")));
                  } else if (productCategory === 'Flat Screen Monitors') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill flatScreenMonitorsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Laptops') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill laptopsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Accessories') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill accessoriesCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Multifunction Printers') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill multifunctionPrintersCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Mice') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill miceCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Keyboards') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill keyboardsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Mousepads') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill mousepadsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Computer System Accessories') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill computerSystemAccessoriesCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Graphic Cards') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill graphicCardsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Scanners') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill scannersCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Speakers') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill speakersCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Software') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill softwareCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Telecommunications') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill telecommunicationsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'PCs') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill pcsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Servers') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill serversCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Flat Screen TVs') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill  flatScreenTVsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Desktop Computers') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill  desktopComputersCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Tablets') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill  tabletsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Smartphones and Tablets') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill  smartphonesandTabletsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }else if (productCategory === 'Flat Screens') {
                    $("body").append($("#mainCategories").append($("#categories").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill  flatScreensCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
                  }
                });
               
                $("#pagination").hide();
                $("body").append($("#pagination2"));
                $("#pagination2").show();
              }
            },
            error: function () {

              alert("No more pages");
              // console.log("hello from error");
            }
          });
        }
      });

      $('#categories').on('click', '#addCart', (ev)=>{
        
        if (sessionStorage.getItem("productsId")) {
          cartArrProId=JSON.parse(sessionStorage.getItem("productsId")); 
}
      
    if (!cartArrProId.includes(ev.target.value)) {
      cartArrProId.unshift(ev.target.value);
    } else {
      let len = cartArrProId.length;
      for (var i = 0; i < len; i++) {
        if (cartArrProId[i] === ev.target.value) { 
          cartArrProId.splice(i, 1);
          if (sessionStorage.getItem(ev.target.value)) {
	sessionStorage.removeItem(ev.target.value);
}
        }
      }
    }
    window.sessionStorage.setItem("productsId", JSON.stringify(cartArrProId));
    
    // reloadFun();
  });
  
  $("#cartpage").click((ev) => {
    window.sessionStorage.setItem("productsId", JSON.stringify(cartArrProId));
  });

  setInterval(function() {  
    $("#num").empty();
    if (sessionStorage.getItem("productsId")) {
        $("#num").append(JSON.parse(sessionStorage.getItem("productsId")).length);
    }else{
        $("#num").append(0);

    }
  },1000);


});

        
        
        