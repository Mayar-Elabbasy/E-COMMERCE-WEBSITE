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
        console.log("upgrade");
        
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
        console.log("ERROR IN(INDEXDB)YOUR DATA NOT SAVED", ev.target.errorCode);

    };
}
function StoreDate(allItmes){
   // console.log("items");
    itemsInOne=[];
    len=allItmes.length;
    let i;
    let j=0;
    let totalPr=0;
    let totalItems=0;
    for(i=0;i<len;i=i+3){
      Str=+" "+allItmes[i]+" : "+allItmes[i+1]+" item : "+allItmes[i+2]+"$";
      //console.log(Str);
      totalPr+=allItmes[i+2];
      totalItems+=allItmes[i+1];
      itemsInOne[j]=Str;
    //  console.log(itemsInOne[j]);
      j++;
    }
    desc=itemsInOne.toString();
    //console.log(desc);
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
}
// /***************************** */
function openDb(){
    console.log("opened");
    
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = function (ev) {
        db = ev.target.result;
        const store = db.transaction(DB_TABLE_Name, 'readwrite'); 
        const tran = store.objectStore(DB_TABLE_Name);
    };
}
// function orderHistory() {
//     console.log("orderHistory");

//     if (db instanceof IDBDatabase) {
//         console.log("function")
//         const store = db.transaction(DB_TABLE_Name, 'readwrite');
//         const tran = store.objectStore(DB_TABLE_Name);
//         let table = document.getElementById("table");
//         tran.getAll().onsuccess = (ev) => {
//             ev.target.result.forEach(element => {
             
//         });
//         };


//     }
//}
// function delAllOrderHistory(){
//     if (db instanceof IDBDatabase) {
//         const store = db.transaction(DB_TABLE_Name, 'readwrite');
//         const tran = store.objectStore(DB_TABLE_Name);
//        tran.clear();
//        $.ajax({
//         url:'', 
//         success: function(result){
//             location.reload(false);
//                      },
//                    error: function(){
//                        console.log("error");
                       
//                    }
//                   });
//     }

// }