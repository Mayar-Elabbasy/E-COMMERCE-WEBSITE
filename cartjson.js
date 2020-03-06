$(function () {
    const ProductId = window.location.search.substring(1);
    const url='https://afternoon-falls-30227.herokuapp.com/api/v1/products/'+ProductId;
    const Npices=$("#q").val();
    console.log("pp"+Npices);
        $.getJSON(url, function (data) {
            let element=data.data;
            $("div").append(
                "<li>"+element['ProductId']+
                "</li><li>"+ element['Category'] +
                // "</li><li>"+ element['MainCategory'] +
                // "</li><li>" + element['TaxTarifCode'] +
                // "</li><li>"+ element['SupplierName'] +
                // "</li><li>" + element['WeightMeasure'] +
                // "</li><li>" + element['WeightUnit'] +
                // "</li><li>" + element['Description'] +
                // "</li><li>"+ element['Name'] +
                // "</li><li>" + element['DateOfSale'] +
                // "</li><li><img src='"+element['ProductPicUrl']+"' width='50' height='50'/>" +
                // "</li><li>" + element['Status'] +
                // "</li><li>" + element['Quantity'] +
                // "</li><li>" + element['UoM']+
                // "</li><li>" + element['CurrencyCode'] +
                "</li><li>NUmberOFPices= "+ Npices +
                "</li><li>current price = "+ element['Price'] +
                "</li><li>Total price = "+ element['Price']*Npices+
                // "</li><li>"+ element['Width'] +
                // "</li><li>"+ element['Depth'] +
                // "</li><li>" + element['Height'] +
                // "</li><li>" + element['DimUnit']+
                "</li>************************************"
             );
        });
    /*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
	proQty.prepend('<span class="dec qtybtn">-</span>');
	proQty.append('<span class="inc qtybtn">+</span>');
	proQty.on('click', '.qtybtn', function () {
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
        $button.parent().find('input').val(newVal);
        $.ajax({
            url:'', 
            success: function(result){
                location.reload(false);
                         },
                       error: function(){
                           console.log("error");
                           
                       }
                      });

       
    });

    });