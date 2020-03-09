$(function () {
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    var ProductId = JSON.parse(sessionStorage.getItem("productsId")); 
    var i;
    for (i = 0; i < ProductId.length; i++) {
        if (ProductId[i] == null) {
            continue;
        }

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
            currencyCode = element['CurrencyCode']
            if (element['CurrencyCode'] == 'EUR') {
                // unicode for eur
                CurrencyCode = "\u20AC"
            }
            //             
            $("tbody").append(
                "<tr>" +
                "<td class='cart-pic first-row'><img src='" + element['ProductPicUrl'] + "' alt=''/></td>" +
                "<td class='cart-title first-row'><h5>" + element['Name'] + "</h5></td>" +
                "<td class='p-price first-row'>" + CurrencyCode + element['Price'] + "</td>" +
                "<td class='qua-col first-row'>" +
                    "<div class='pro-qty'>"+
                        "<span class='dec qtybtn'>-</span>"+
                            "<input type='text' disabled value=" + quantity + " id=" + element['ProductId'] + " >"+
                        "<span class='inc qtybtn'>+</span>"+
                    "</div>" +
                "<td class='total-price first-row'>" + CurrencyCode + totalPrice + "</td>" +
                "<td class='close-td first-row'><i class='ti-close'></i></td>" +
                "</tr>"
            );
        });
    }

    /*-------------------
		Quantity change
	--------------------- */
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
        // setTimeout(function() { console.log("reload");
        // window.location=window.location;},3000);
        $.ajax({
            url: '',
            success: function (result) {
                location.reload(false);
            },
            error: function () {
                console.log("error");

            }
        });
    });
    $("#save").click((ev) => {
        StoreDate(totalPrice, quantity, currencyCode);
    });
    $("#history").click((ev) => {
        orderHistory();
    });
    $("#delhistory").click((ev) => {
        delAllOrderHistory();
    });
});