const DB_NAME = "electronicStore";
const DB_TABLE_Name = "electronic";
const DB_VERSION=2;
var db;
let dateFormate = { year: 'numeric', month: 'long', day: 'numeric' };
let orderDate  = new Date();
// here  to use i in different places
if ('indexedDB' in window) {
    indexDB();
}
function indexDB() {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = function (ev) {
        
         db = ev.target.result;
        let createTable = db.createObjectStore(DB_TABLE_Name,{
            keyPath: 'order',
            autoIncrement: true
        });
        dateIndex = createTable.createIndex("Date", "Date", { unique: false });
    };
    request.onsuccess = function (ev) {
        db = ev.target.result;
        const store = db.transaction(DB_TABLE_Name, 'readwrite');
        const tran = store.objectStore(DB_TABLE_Name);
    };
    request.onerror = function (ev) {
        alert("ERROR IN(INDEXDB)YOUR DATA NOT SAVED", ev.target.errorCode);

    };
}
function StoreDate(allItmes){
    itemsInOne=[];
    len=allItmes.length;
    let i;
    let j=0;
    let totalPr=0;
    let totalItems=0;
    for(i=0;i<len;i=i+3){
      Str=+" "+allItmes[i]+" : "+allItmes[i+1]+" item : "+allItmes[i+2]+"$";
      totalPr+=allItmes[i+2];
      totalItems+=allItmes[i+1];
      itemsInOne[j]=Str;
      j++;
    }
    desc=itemsInOne.toString();
    if (db instanceof IDBDatabase) {
        const store = db.transaction(DB_TABLE_Name, 'readwrite');
        const tran = store.objectStore(DB_TABLE_Name);
        //let i;
        tran.add({
            Date: orderDate.toLocaleDateString("en-US", dateFormate),
            Item:desc,
            TotalPrice:totalPr,
            TotalNoOfItems:totalItems,
        });
    }
    sessionStorage.clear();
}
// /***************************** */
openDb();
function openDb(){
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = function (ev) {
        db = ev.target.result;
        const store = db.transaction(DB_TABLE_Name, 'readwrite'); 
        const tran = store.objectStore(DB_TABLE_Name);
    };
}
setTimeout(function orderHistory() {
    if (db instanceof IDBDatabase) {
        const store = db.transaction(DB_TABLE_Name, 'readwrite');
        const tran = store.objectStore(DB_TABLE_Name)
        tran.getAll().onsuccess = (ev) => {
            ev.target.result.forEach(element => {
                allItems=element['Item']
                items=[];
                items = allItems.split(",");
                totalQuantity=element['TotalNoOfItems']
                totalprice=element['TotalPrice']  
                  $('#orders_details').append(
                    "<tr style='height:50px;'>" +

                "<td style='width:30px;'>" + element['order'] + "</td>" +
                "<td>" + element['Date'] + "</td>" +
                "<td>" + allItems + "</td>" +
                "<td style='width:30px;text-align: center'>" + totalQuantity + "</td>" +
                "<td style='width:30px;'>" + totalprice+"$" + "</td>" +
                "</tr>"
                  );
        });
        };
    }
},300);
function delAllOrderHistory(){
    if (db instanceof IDBDatabase) {
        const store = db.transaction(DB_TABLE_Name, 'readwrite');
        const tran = store.objectStore(DB_TABLE_Name);
       tran.clear();
       $.ajax({
        url:'', 
        success: function(result){
            location.reload(false);
                     },
                   error: function(){
                       console.log("error");
                       
                   }
                  });
    }

}
setInterval(function() {  
    $("#num").empty();
    if (sessionStorage.getItem("productsId")) {
        $("#num").append(JSON.parse(sessionStorage.getItem("productsId")).length);
    }else{
        $("#num").append(0);

    }
  },1000);