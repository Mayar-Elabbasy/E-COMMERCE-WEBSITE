$(function () {
  let  cartArrProId=[];
  var page = 1,
    limit = 10,
    totatItems = 0;
    getAllData();

  $(".prev-btn").on("click", function () {
    if (page > 1) {
      page--;
      getAllData();
      $(".next-btn").show();
    }else if(page === 1){
      $(".next-btn").show()
      $(this).fadeOut(); 
     
    }
    // console.log("prev-page: " + page);
  });

  $(".next-btn").on("click", function () {

    if (page * limit < totatItems) {
      page++;
      getAllData();
      $(".prev-btn").show()
    }else  if (page === totalPages) {
      $(".prev-btn").show()
      $(this).fadeOut();
      alert("No More Pages")        
    }
    // console.log("next-page: " + page);
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



  function getAllData() {

    $.ajax({
      url: "https://afternoon-falls-30227.herokuapp.com/api/v1/products/?page=" + page,
      type: "GET",
      success: function (url) {
        //  console.log(url);
        // console.log("hello from success");
        let result1 = JSON.stringify(url);
        // console.log(result1);
        let result2 = JSON.parse(result1);
        totatItems = result2["total_items"]
        totalPages =result2["total_pages"]
        //  console.log(totatItems);

        if (url) {

          $("body").append($("#navbar"));
          $("#products").empty();
          $(result2["data"]).each(function (ind, e) {
            $("#categories").hide();
            //  console.log(result2["data"][ind]);

            productName = e.Name;
            ProductId=e.ProductId;
            // console.log(ProductId);
            

            productCategory = e.Category;
            productPic = e.ProductPicUrl;
            productPrice = e.Price;
            productCurrency = e.CurrencyCode;
            $("#mainProducts").show();
            //  console.log(productName);
            // console.log(productCategory);


    //Different Color for each Category
            if (productCategory === 'Printers') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5 border border-primary  col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill printersCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><a href='product.html?id="+ProductId+"'><img class='img-fluid img-thumbnail p-2 border border-primary' src=" + productPic + "></a><br><br>" + "<span class='p-1 price'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary border border-dark p-2  '>Add To Cart</button></div><br />")));
            } else if (productCategory === 'Flat Screen Monitors') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill flatScreenMonitorsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Laptops') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill laptopsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Accessories') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill accessoriesCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Multifunction Printers') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill multifunctionPrintersCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Mice') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill miceCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Keyboards') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill keyboardsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Mousepads') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill mousepadsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Computer System Accessories') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill computerSystemAccessoriesCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Graphic Cards') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill graphicCardsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Scanners') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill scannersCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Speakers') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill speakersCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Software') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill softwareCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Telecommunications') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill telecommunicationsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'PCs') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill pcsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Servers') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill serversCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Flat Screen TVs') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill  flatScreenTVsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Desktop Computers') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill  desktopComputersCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Tablets') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill  tabletsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Smartphones and Tablets') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill  smartphonesandTabletsCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }else if (productCategory === 'Flat Screens') {
              $("body").append($("#mainProducts").append($("#products").append("<div class='lowPrice p-5  border border-primary col-4 text-center'>" + "<span class='p-2 productName border border-primary'><a href='product.html?id="+ProductId+"'>" + productName + "</a></span><br><br>" + "<span class='p-2 border border-primary rounded-pill  flatScreensCategory'>" + productCategory + "</span><br><br>" + "<a href='product.html?id="+ProductId+"'><img class='img-fluid  img-thumbnail p-2 border border-primary 'src="  + productPic + "></a><br><br>" + "<span class='p-2'>" + productPrice + "  " + productCurrency + "</span><button type='button' id='addCart' value='"+ProductId+"' class='float-right btn btn-primary p-2 border border-dark'>Add To Cart</button></div><br />")));
            }


          });
          $("#pagination2").hide();
          $("body").append($("#pagination"));
        }

      },
      error: function () {

        alert("No more pages");
        // console.log("hello from error");
      }
    });
  }

    $('#products').on('click', '#addCart', (ev)=>{
    if (!cartArrProId.includes(ev.target.value)) {
      cartArrProId.unshift(ev.target.value);
    } else {
      let len = cartArrProId.length;
      for (var i = 0; i < len; i++) {
        if (cartArrProId[i] === ev.target.value) { cartArrProId.splice(i, 1); }
      }
    }
  });
  
  $("#cartpage").click((ev) => {
    window.sessionStorage.setItem("productsId", JSON.stringify(cartArrProId));

  });

});


