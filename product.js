
var x = new URLSearchParams(window.location.search); 
var  cartArrProId=[];

var queryString = x.get('id');


var url = 'https://afternoon-falls-30227.herokuapp.com/api/v1/products/' + queryString;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    myFunction(myArr);
  }else if(this.status == 404){
	var error_msg = "data not found" 
	document.getElementById("error").innerHTML =error_msg;
   // $("#section").hide(); 
    document.getElementById("section").style.display = "none";
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.onerror = function () {
};
xmlhttp.send();
function myFunction(arr) {
		var obj = arr.data;
        var category = obj.Category;
		document.getElementById("Category").innerHTML = category;
	     var SupplierName =obj.SupplierName;
		 document.getElementById("SupplierName").innerHTML = SupplierName;
		  var WeightMeasure =obj.WeightMeasure;
		  var WeightUnit =obj.WeightUnit;
		  var Widths=WeightMeasure+" "+WeightUnit;
		document.getElementById("WeightMeasure").innerHTML=Widths;
		 var Description =obj.Description;
		 document.getElementById("description").innerHTML = Description;
		  var Name=obj.Name;
		document.getElementById("name").innerHTML = Name;
		  var Status =obj.Status; 
		 document.getElementById("Status").innerHTML = Status;
		  var Quantity =obj.Quantity;
		 document.getElementById("Quantity").innerHTML = Quantity;
		   var CurrencyCode =obj.CurrencyCode; 
		   var Price =obj.Price;
		   var Prices=Price+ " "+CurrencyCode;
		    document.getElementById("prices").innerHTML=Prices;
		   var Width =obj.Width;
		   var Depth =obj.Depth;
		   var Height =obj.Height;
		   var vol=Width*Depth*Height;
		    var DimUnit =obj.DimUnit
		 var volumeunit= vol+" "+DimUnit;
		document.getElementById("Volume").innerHTML = volumeunit;
		var ProductPicUrl =obj.ProductPicUrl; 
		 document.getElementById("product-img").src = ProductPicUrl;
		//$("#error").hide();
		  document.getElementById("error").style.display = "none";
  }
//   CartButton
  $('#addCart').click( (ev)=>{
	  cartArrProId=JSON.parse(sessionStorage.getItem("productsId")); 
	if (!cartArrProId.includes(queryString)) {
      cartArrProId.unshift(queryString);
    } else {
      let len = cartArrProId.length;
      for (var i = 0; i < len; i++) {
        if (cartArrProId[i] === queryString) { 
			cartArrProId.splice(i, 1); 
			  if (sessionStorage.getItem(queryString)) {
				sessionStorage.removeItem(queryString);
}

		}
	}
}
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


