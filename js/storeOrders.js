const DB_NAME = "electronicStore";
const DB_TABLE_Name = "electronic";
const DB_VERSION=2;
var db;
let dateFormate = { year: 'numeric', month: 'long', day: 'numeric' };
let orderDate  = new Date();
// here  to use i in different places
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
if ('indexedDB' in window) {
    indexDB();
}
function indexDB() {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = function (ev) {
         db = ev.target.result;
        let createTable = db.createObjectStore(DB_TABLE_Name, {
            keyPath: 'order',
            autoIncrement: true
        });
        dateIndex = booksStore.createIndex("Date", "Date", { unique: false });
    };
    request.onsuccess = function (ev) {
        db = ev.target.result;
        const store = db.transaction(DB_TABLE_Name, 'readwrite');
        const tran = store.objectStore(DB_TABLE_Name);
    };
    request.onerror = function (ev) {
        console.log("ERROR IN(INDEXDB)YOUR DATA NOT SAVED", ev.target.errorCode);

    };
}
function StoreDate(allItmes){
    // console.log("items");
    
    // console.log(allItmes);    
    if (db instanceof IDBDatabase) {
        const store = db.transaction(DB_TABLE_Name, 'readwrite');
        const tran = store.objectStore(DB_TABLE_Name);
        tran.add({
            Date: orderDate.toLocaleDateString("en-US", dateFormate),
            CurrencyCode:currencyCode,
            TotalPrice:totalPrice ,
            Item :Npices,
        });
    }
}
function orderHistory() {
    // const tran = booksStore.index('Date');
    //     tran.getAll().onsuccess = (ev) => {
    //         console.log(ev.target.result);
    //     }
    if (db instanceof IDBDatabase) {
        const store = db.transaction(DB_TABLE_Name, 'readwrite');
        const tran = store.objectStore(DB_TABLE_Name);
        let table = document.getElementById("table");
        tran.getAll().onsuccess = (ev) => {
            ev.target.result.forEach(element => {
                if (element['CurrencyCode']=='EUR') {
                    // unicode for eur
                    CurrencyCode="\u20AC"
                }
                table.innerText+="#"+element['order']+" "+element['Date']+" "+CurrencyCode+element['TotalPrice']+"for "+element['Item']+"item \n";
        });
        };

    }
}
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