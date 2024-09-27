let Price = document.getElementById("Price");
let Title = document.getElementById("Title");
let Taxes = document.getElementById("Taxes");
let Ads = document.getElementById("Ads");
let Discount = document.getElementById("Discount");
let Count = document.getElementById("Count");
let Category = document.getElementById("Category");
let sum = document.getElementById("sum");
let tableBody = document.getElementById("tableBody");
let btnDeleteAll = document.getElementById("btnDeleteAll");
let btnCreate = document.getElementById("btnCreate");
let update = false;


//Calcolo Totale
function CalcTotale(){
    let total = 0
if(Price.value !==''){
    total = (+Price.value + +Taxes.value + +Ads.value - +Discount.value);
    sum.innerHTML = total;
}
else{
    sum.innerHTML = 0;
}

if(sum.innerHTML>0){
    sum.style.backgroundColor = 'green';
}else{
    sum.style.backgroundColor = 'red';
}
}

//create product

let products = JSON.parse(localStorage.getItem('products')) || [];
/*Per garantire che il valore restituito sia un array anziché null, 
sto utilizzando l'operatore || per fornire un array vuoto come valore 
predefinito nel caso in cui getItem restituisca null. In questo modo, 
se non ci sono dati precedentemente salvati, inizieremo con un array vuoto.*/
let tmp;
//addProduct
function addProduct(){
        if(update === false){
            if(Count.value === ''){
                const product = {
                    Title:Title.value,
                    Price:Price.value,
                    Taxes:Taxes.value,
                    Ads:Ads.value,
                    Discount:Discount.value,
                    Category:Category.value,
                    total:sum.innerHTML
                }
                products.push(product);
            }else{
            for(let i = 0 ; i<Count.value ; i++){
            const product = {
                Title:Title.value,
                Price:Price.value,
                Taxes:Taxes.value,
                Ads:Ads.value,
                Discount:Discount.value,
                Category:Category.value,
                total:sum.innerHTML
            }
            products.push(product);
            }
        }
        }else{
            products[tmp].Title = Title.value;
            products[tmp].Price = Price.value;
            products[tmp].Taxes = Taxes.value;
            products[tmp].Ads = Ads.value;
            products[tmp].Discount = Discount.value;
            products[tmp].total = sum.innerHTML;
        }
        update = false;
        btnCreate.innerHTML = "Create";
        Count.classList.remove("hide");
    localStorage.setItem('products',JSON.stringify(products));
    clearData();
    ShowData();
    
}


// clear input after submit

function clearData(){
    Title.value = '';
    Price.value = '';
    Taxes.value = '';
    Ads.value = '';
    Discount.value = '';
    Count.value ='';
    Category.value = '';
    sum.innerHTML = 0;
    CalcTotale();
}

//Show Data

function ShowData(){
    let table = '';
    for(let i=0 ; i<products.length ; i++){
        table += `<tr>
                            <th>${i+1}</th>
                            <td>${products[i].Title}</td>
                            <td>${products[i].Price}</td>
                            <td>${products[i].Taxes}</td>
                            <td>${products[i].Ads}</td>
                            <td>${products[i].Discount}</td>
                            <td>${products[i].total}</td>
                            <td>${products[i].Category}</td>
                            <td><button onclick="updateProduct(${i})">UPDATE</button></td>
                            <td><button onclick="deleteProduct(${i})">Delete</button></td>
                            </tr>`
    }
    tableBody.innerHTML = table;
    if(products.length>0){
        btnDeleteAll.classList.remove("hide");
        btnDeleteAll.innerHTML = `Delete ALL (${products.length})`
    }else{
        btnDeleteAll.classList.add("hide");
    }
}
ShowData();
//Delete Product
function deleteProduct(i){
    products.splice(i,1);
    localStorage.setItem("products",JSON.stringify(products));
    ShowData();
    clearData();
}

//delete all products
function deleteAllProducts(){
    products.splice(0,products.length);
    localStorage.setItem('products',JSON.stringify(products));
    ShowData();
}

//aggiornare dato singolo 1 
function updateProduct(i){
    btnCreate.innerHTML = "UPDATE";
    update = true;
    tmp = i;
    Title.value = products[i].Title;
    Price.value = products[i].Price;
    Taxes.value = products[i].Taxes;
    Ads.value = products[i].Ads;
    Discount.value = products[i].Discount;
    Category.value = products[i].Category;
    sum.innerHTML = products[i].total;
    Count.classList.add("hide");
}

/*finzione per verificare il tipo di ricerca
 */
//search method

let inputSearch = document.getElementById("inputSearch");
let searchbyTitle = false;

function searchMode(id){
    if(id === "FindTitBtn"){
        inputSearch.placeholder = "Search by Title";
        searchbyTitle = true;
    }
    else{
        inputSearch.placeholder = "Search by Category";
        searchbyTitle = false;
    }
    inputSearch.focus();
}

function search(value){
    let table = '';
    let searchValue = value.toLowerCase();
    for(let i = 0 ; i<products.length ; i++){
        if(searchbyTitle === true){
            if(products[i].Title.toLowerCase().includes(searchValue)){
                table += `<tr>
                            <th>${i+1}</th>
                            <td>${products[i].Title}</td>
                            <td>${products[i].Price}</td>
                            <td>${products[i].Taxes}</td>
                            <td>${products[i].Ads}</td>
                            <td>${products[i].Discount}</td>
                            <td>${products[i].total}</td>
                            <td>${products[i].Category}</td>
                            <td><button onclick="updateProduct(${i})">UPDATE</button></td>
                            <td><button onclick="deleteProduct(${i})">Delete</button></td>
                            </tr>`
            }
        }else{
            if(products[i].Category.toLowerCase().includes(searchValue)){
                    table += `<tr>
                                <th>${i+1}</th>
                                <td>${products[i].Title}</td>
                                <td>${products[i].Price}</td>
                                <td>${products[i].Taxes}</td>
                                <td>${products[i].Ads}</td>
                                <td>${products[i].Discount}</td>
                                <td>${products[i].total}</td>
                                <td>${products[i].Category}</td>
                                <td><button onclick="updateProduct(${i})">UPDATE</button></td>
                                <td><button onclick="deleteProduct(${i})">Delete</button></td>
                                </tr>`
            }
        }
    }
    tableBody.innerHTML = table;
}

/**funzione per ricerca a partire dell afunzione
 * precedente prendiamo il value di cio che abbimao scritto
 */
