$(function () {
    let url='https://afternoon-falls-30227.herokuapp.com/api/v1/products/';
    $("#show").click(function () {
        $.getJSON(url, function (data) {
            data['data'].forEach(element => {
                $("table").append(
                   "<tr><td><button value="+element['ProductId']+">CArt</button></td>"+
                   "<td><a href="+url+element['ProductId']+">DeTAILS</a></td>"+
                   "<td>"+element['ProductId']+
                   "</td><td>"+ element['Category'] +
                //    "</td><td>"+ element['MainCategory'] +
                //    "</td><td>" + element['TaxTarifCode'] +
                //    "</td><td>"+ element['SupplierName'] +
                //    "</td><td>" + element['WeightMeasure'] +
                //    "</td><td>" + element['WeightUnit'] +
                //    "</td><td>" + element['Description'] +
                //    "</td><td>"+ element['Name'] +
                //    "</td><td>" + element['DateOfSale'] +
                //    "</td><td><img src='"+element['ProductPicUrl']+"' width='50' height='50'/>" +
                //    "</td><td>" + element['Status'] +
                //    "</td><td>" + element['Quantity'] +
                //    "</td><td>" + element['UoM']+
                //    "</td><td>" + element['CurrencyCode'] +
                //    "</td><td>"+ element['Price'] +
                //    "</td><td>"+ element['Width'] +
                //    "</td><td>"+ element['Depth'] +
                //    "</td><td>" + element['Height'] +
                //    "</td><td>" + element['DimUnit']+
                   "</td></tr>"
                );
           
            // console.log('status: ' + data['status']);
            // console.log('error: ' + data['error']);
            // console.log('page: ' + data['page']);
            // console.log('limit: ' + data['limit']);
            // console.log('total_items: ' + data['total_items']);
            // console.log('total_pages: ' + data['total_pages'])
        });

        $("button").click((ev) => {
                console.log(ev.target.value);  
                window.location.href = "cart.html?"+ev.target.value;     
            });
    });
});


});

