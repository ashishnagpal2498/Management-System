let Vendors_List = []
//Class Vendor
function Vendor(Obj){
    this.id=Obj.vid;
    this.name = Obj.name;
    this.company = Obj.comapnyname;
    this.contact = Obj.personalcontact;
}
let Product_list = []
//Class Products
function Product(Obj) {
    this.id = Obj.pid
    this.qty = Obj.qty;
    this.invoice_date= Obj.invoice_date
    this.invoice_no = Obj.invoice_no
    this.years =Obj.warranty_year
    this.product_details= Obj.product_details
    this.approval=Obj.approval

}

let Department_list = [];
function Department(Obj)
{
    this.id = Obj.dno
    this.name = Obj.dname
    this.hod= Obj.hod
    this.block= Obj.block
}




let Labs_list =[]
function Lab(Obj) {
    this.id = Obj.labid
    this.name= Obj.labname
    this.technician= Obj.technician
    this.block= Obj.block
    this.floor = Obj.floor
}

//Create Element Function
function createElement (Obj,category) {
    if (category === 'vendor') {
        let vendorItem = $(`
             <li id="vendor-id"> <b>VENDOR ID:</b>  ${Obj.id} </li>
                    <li  id="vendor-name"><b>NAME:</b></li>
                    <li id="vendor-company-name"><b>COMPANY NAME:</b>  ${Obj.company}</li>
                    <li id="vendor-contact-number"><b>CONTACT NUMBER:</b></li>
                    <li><b>WEBSITE</b></li>
                    <li><b>EMAIL:</b></li>`)
        return vendorItem;
    }
    else if(category==='product')
    {
        let productItem = $(`
          <li id="vendor-id"> <b>PRODUCT ID:</b>  ${Obj.id} </li>
                    <li  id="vendor-name"><b>NAME:</b> </li>
                    <li id="vendor-company-name"><b>QUANTITY:</b>  ${Obj.qty}</li>
                    <li id="vendor-contact-number"><b>INNVOICE NUMBER:</b> ${Obj.invoice_no}</li>
                    <li><b>INNVOICE DATE</b> ${Obj.invoice_date}</li>
                    <li><b>YEAR</b> ${Obj.years}</li>
                    <li><b>DETAILS</b> ${Obj.product_details}</li>
            `)
        return productItem;
    }
}



//Listing of selected Div - In the centre menu -
function funSelectedItem(el){
    //Event-
    console.log(el)
    let list_item = $(el).attr('list-val')
    console.log('list item  ' + list_item)
    let category = $(el).attr('category')
    console.log(category)
    let detailDiv = $('#detailed-div')
    detailDiv.empty()
    console.log(detailDiv)
    console.log(typeof list_item)
    if(category==='vendor') {
        for (it of Vendors_List) {
            console.log(it)
            //List item is of type string hence Type Cas to number value
            if (+list_item === it.id) {   //console.log('abc')
                detailDiv.append(createElement(it,category))
            }
        }
    }
    else if(category==='product')
    {
        for (it of Product_list) {
            console.log(typeof it.id)
            //List item is of type string hence Type Cas to number value
            if (+list_item === it.id) {   //console.log('abc')
                detailDiv.append(createElement(it,category))
            }
        }
    }
}

//Display the Side menu as ICONS or whole div-
function menuoptions(){
    //Menu Bar toggle  -  Create a class and toggle it

    let smallmenu = $('#small-menu')[0]
    let fullscreendiv = $('#main-screen-div')[0]
    fullscreendiv.classList.toggle('slide-side-menu')
    let slideMenuIcons = document.getElementsByClassName('slide-menu-icons')
    console.log(slideMenuIcons);
    for(i of slideMenuIcons)
    {
        i.classList.toggle('slide-menu-icons-display')
    }
}

function vendor_List_Fun(data,list){
    //Creating a generic function to create class object -
    // let requestname = menu_Item[0].toUpperCase();
    // requestname+= menu_Item.substr(1);
    // console.log((()=> requestname)());
    // console.log('Request name   '+requestname+ "menu item " + menu_Item[0])
    let list_items =[]
    for (item of data) {
        let vendor = new Vendor(item)
        console.log(item.comapnyname)
        let li = createLi(vendor,'vendor');
        list_items.push(li)
        Vendors_List.push(vendor);
    }
    console.log(list_items)
    list.append(list_items)
    console.log(Vendors_List);
}

//Generic Function to create Li
function createLi (Obj,category){

    let li = $('<li onclick="funSelectedItem(this);"></li>')
    li.attr('list-val',`${Obj.id}`)
    console.log('CreateLi function '+ category)
    switch (category) {
        case 'product' : li[0].textContent = Obj.invoice_no;
                         li.attr('category','product')
                            break;

        case 'vendor' :  li.attr('category','vendor')
                         li[0].textContent = Obj.company;
                            break;
    }

    return li;
}

// function product_List_Fun(data,list)
// {
//     let list_items =[]
//     for (item of data) {
//         let product_ob = new Product(item)
//         console.log(item.pid)
//         let li = createLi(product_ob,'product');
//         list_items.push(li)
//         console.log(li)
//         Product_list.push(product_ob);
//     }
//     console.log(list_items)
//     list.append(...list_items)
//     console.log(Product_list);
//
// }

function list_Fun(data,list,category) {
    let list_items =[]
    //If the category is Vendor - List all the Vendors , Inside - left center Div
    if(category==='vendor')
    {
        for (item of data) {
            let vendor = new Vendor(item)
            console.log(item.comapnyname)
            let li = createLi(vendor,'vendor');
            list_items.push(li)
            Vendors_List.push(vendor);
        }
    }
    else if(category==='product')
    {
        for (item of data) {
            let product_ob = new Product(item)
            console.log(item.pid)
            let li = createLi(product_ob,'product');
            list_items.push(li)
            console.log(li)
            Product_list.push(product_ob);
        }
    }

    console.log(list_items)
    list.append(...list_items)

}


function show(ev) {

    //Menu Items Display - In the centre div 
    let list = $('#list-items')
    list.empty()
    console.log(ev)
    //Request Going to that which option is clicked -
    let formrequest = $(ev).attr('myval-div')
    console.log(formrequest)

    $.get(`http://localhost:2121/${formrequest}`,
        //Callback Function which Receives Data -
        (data)=>{
            console.log(data)

            if(formrequest==='vendor') {
               Vendors_List =[]
                list_Fun(data,list,formrequest);
            }
            if(formrequest==='product')
            {   Product_list = [];
                list_Fun(data,list,formrequest)
                console.log(formrequest)
            }
            if(formrequest==='department')
            {
                console.log(formrequest)
            }
    })
}





$(()=>{
    //Prototype Classes -

})