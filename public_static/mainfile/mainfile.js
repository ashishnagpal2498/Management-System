function fun(el){
    //Event-
    console.log(el)
    let list_item = $(el).attr('list-val')
    console.log('list item  ' + list_item)
    let detailDiv = $('#detailed-div')
    detailDiv.empty()
    console.log(detailDiv)
    console.log(typeof list_item)
    for( it of Vendors_List)
    {   console.log(typeof it.id)
        //List item is of type string hence Type Cas to number value
        if(+list_item === it.id)
        {   //console.log('abc')
            detailDiv.append(it.createElement())
        }
    }
}
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
    // smallmenu.classList.toggle('smallmenu')
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
        let li = vendor.createLi();
        list_items.push(li)
        Vendors_List.push(vendor);
    }
    console.log(list_items)
    list.append(list_items)
    console.log(Vendors_List);
}

function product_List_Fun(data,list)
{
    let list_items =[]
    for (item of data) {
        let product_ob = new Product(item)
        console.log(item.pid)
        let li = product_ob.createLi();
        list_items.push(li)
        Product_list.push(product_ob);
    }
    console.log(list_items)
    list.append(list_items)
    console.log(Product_list);

}

$(()=>{
    //Prototype Classes - 
    Vendor.prototype.createElement = function (){
        // let vendorItem = $(`<div class="col-5" id="vendor-id">Vendor Id: ${this.id}</div>
        // <div class="col-5" id="vendor-name">Name</div>
        //     <div class="col-5" id="vendor-company-name">Company Name ${this.company}</div>
        // <div class="col-5" id="vendor-contact-number">Contact Number</div>
        // <div class="col-5">Website</div>
        //     <div class="col-5">Email</div>
        // <button class="btn btn-info"><a href="/public_static/forms/vendor_form.html">ADD</a> </button>`)
        let vendorItem = $(`
          <li id="vendor-id"> <b>VENDOR ID:</b>  ${this.id} </li>
                    <li  id="vendor-name"><b>NAME:</b></li>
                    <li id="vendor-company-name"><b>COMPANY NAME:</b>  ${this.company}</li>
                    <li id="vendor-contact-number"><b>CONTACT NUMBER:</b></li>
                    <li><b>WEBSITE</b></li>
                    <li><b>EMAIL:</b></li>`)
        return vendorItem;
    }
    Vendor.prototype.createLi = function() {
        let li = $('<li onclick="fun(this);"></li>')
        li.attr('list-val',`${this.id}`)
        li[0].textContent = this.company;
        return li;
    }
    //Create a generic function which creates LI - taking - id and name -
    Product.prototype.createLi = function (){
        let li = $('<li onclick="fun(this);"></li>')
        li.attr('list-val',`${this.id}`)
        li[0].textContent = this.invoice_date;
        return li;
    }
   
    //Menu Items Display - In the centre div 
    window.show = function(ev) {
        
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

            //Converting Json data To JavaScript
            //stringify
            //parse()
            if(formrequest==='vendor') {
                vendor_List_Fun(data,list);
            }
            if(formrequest==='product')
            {
                product_List_Fun(data,list)
                console.log(formrequest)
            }
        })
    }
})