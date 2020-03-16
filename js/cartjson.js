$(function () {
    var ProductId = JSON.parse(sessionStorage.getItem("productsId")); 
    var i;
    var allItmes=[];
    var allProductPrice=[];
    let CurrencyCode = "\u20AC";
    let len;
    if (ProductId==null) {
		len=0;
	}else{

        len=ProductId.length;
    }
    for (i = 0; i <len; i++) {
        if (ProductId[i] == null) {
            continue;
        }
        var allItmes=[];
        const url = 'https://afternoon-falls-30227.herokuapp.com/api/v1/products/' + ProductId[i];

        if (sessionStorage.getItem(ProductId[i]) == null) {

            sessionStorage.setItem(ProductId[i], 1);
        }
        var element;
        var totalPrice = 0;
        var quantity;
        $.getJSON(url, function (data) {
            element = data.data;
            quantity = parseInt(sessionStorage.getItem(element['ProductId']));
            totalPrice = element['Price'] * quantity;
            // ArrayToCollectAllTotalPrice
            allProductPrice.push(totalPrice);
            currencyCode = element['CurrencyCode']
            if (element['CurrencyCode'] == 'EUR') {
                // unicode for eur
                currencyCode=CurrencyCode;
            }
            // this array send to save indexDB             
            allItmes.push(element['Name']);
            allItmes.push(quantity);
            allItmes.push(totalPrice);
            // EndArray
            $("tbody").append(
                "<tr>" +
                "<td class='cart-pic first-row'><img src='" + element['ProductPicUrl'] + "' alt=''/></td>" +
                "<td class='cart-title first-row'><h5>" + element['Name'] + "</h5></td>" +
                "<td class='p-price first-row'>" + currencyCode + element['Price'] + "</td>" +
                "<td class='qua-col first-row'>" +
                    "<div class='pro-qty'>"+
                        "<span class='dec qtybtn'>-</span>"+
                            "<input type='text' disabled value=" + quantity + " id=" + element['ProductId'] + " >"+
                        "<span class='inc qtybtn'>+</span>"+
                    "</div>" +
                "<td class='total-price first-row'>" + currencyCode + totalPrice + "</td>" +
                "<td ><button class='delButton btn btn-danger first-row' value='"+ element['ProductId']+"'>X</button></td>" +
                "</tr>"
            );
        });
    }

    /*-------------------GetAllProductPriceFunction---------- */
    $("#getAllProductPrice").click((ev) => {
        getAllProductPrice();
    });
    function getAllProductPrice() {
        total=0;
        allProductPrice.forEach(el=>{
            total=total+el;
        });
        $(".cart-total").empty();
        $(".cart-total").append("Total <span>"+CurrencyCode+" "+total+"</span>");        
    }
    /*-------------------Quantity change--------------------- */
    $('tbody').on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        let ProductId = $button.parent().find('input').attr('id');
        sessionStorage.setItem(ProductId, newVal);
        $button.parent().find('input').val(newVal);
        reloadFun();
    });
    /*-------------------DeleteButton--------------------- */
    $('tbody').on('click', '.delButton', (ev) => {
        delProductId=ev.target.attributes.value["value"];
        for( var i = 0; i < len; i++)
        {  { if ( ProductId[i] === delProductId) 
            { 
                ProductId.splice(i, 1); 
                if (sessionStorage.getItem(delProductId)) {
                    sessionStorage.removeItem(delProductId);
                }
            }
        }}
        window.sessionStorage.setItem("productsId", JSON.stringify(ProductId));
        reloadFun();
    });

    /*-------------------SaveButton-----------------------------------*/
    $("#save").click((ev) => {
        StoreDate(allItmes);
    
    setTimeout(function clearSession() {
        sessionStorage.clear();
        reloadFun();
        
    },300);
    });
    /*-------------------FUnctionToReloadPage------------------------*/
    function reloadFun(){
         // setTimeout(function() { console.log("reload");
        // window.location=window.location;},3000);
        $.ajax({
            url: '',
            success: function (result) {
                location.reload(false);
            },
            error: function () {
                console.log("ERRORInloadinngPage");
                
            }
        });
    }
    setInterval(function() {  
        $("#num").empty();
        if (sessionStorage.getItem("productsId")) {
            $("#num").append(JSON.parse(sessionStorage.getItem("productsId")).length);
        }else{
            $("#num").append(0);

        }
      },1000);
});