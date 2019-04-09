let adminLogin = false;

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
    else if(category==='department')
    {
        let departmentItem = $(`
          <li id="vendor-id"> <b>Department ID:</b>  ${Obj.id} </li>
                    <li  id="vendor-name"><b>NAME:</b> ${Obj.name} </li>
                    <li id="vendor-company-name"><b>BLOCK</b>  ${Obj.block}</li>
                   <li id="hod"><b>HOD :</b> ${Obj.hod}</li>
            `)
        return departmentItem;

    }
    else if(category==='lab')
    {
        let labItem = $(`
          <li id="vendor-id"> <b>Department ID:</b>  ${Obj.id} </li>
                    <li  id="vendor-name"><b>NAME:</b> ${Obj.name} </li>
                    <li id="vendor-company-name"><b>BLOCK</b>  ${Obj.block}</li>
                   <li id="hod"><b>Floor:</b> ${Obj.floor}</li>
            `)
        return labItem;

    }
}



//Listing of selected Div - In the centre menu -
function funSelectedItem(el){
    //Event-
    let CenterDivHeading = $('#center-div-heading')
    CenterDivHeading.empty();
    console.log(el)
    let list_item = $(el).attr('list-val')
    console.log('list item  ' + list_item)
    let category = $(el).attr('category')
    console.log(category)
    let detailDiv = $('#detailed-div')
    detailDiv.empty()
    console.log(detailDiv)
    CenterDivHeading.append(category+'  Details')
    console.log(typeof list_item)
    if(category==='vendor') {
        for (it of Vendors_List) {
            console.log(it)
            //List item is of type string hence Type Cas to number value
            if (+list_item === it.id) {   //console.log('abc')
                detailDiv.append(createElement(it,category))
                break;
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
                break;
            }
        }
    }
    else if(category==='department')
    {
        for (it of Department_list) {
            console.log(typeof it.id)
            //List item is of type string hence Type Cas to number value
            if (+list_item === it.id) {   //console.log('abc')
                detailDiv.append(createElement(it,category))
                break;
            }
        }
    }
    else if(category==='lab')
    {
        for (it of Labs_list) {
            console.log(typeof it.id)
            //List item is of type string hence Type Cas to number value
            if (+list_item === it.id) {   //console.log('abc')
                detailDiv.append(createElement(it,category))
                break;
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

        case 'department' : li.attr('category','department')
                             li[0].textContent = Obj.name;
                              break;
        case 'lab' :    li.attr('category','lab')
                         li[0].textContent = Obj.name;
                         break;
    }


    return li;
}


//Generic Function to Create Left Centre Div -
//Function call onclick from the Side Menu - $ request
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
    else if(category==='department'){
        for (item of data) {
            let product_ob = new Department(item)
            console.log(item.id)
            let li = createLi(product_ob,'department');
            list_items.push(li)
            console.log(li)
            Department_list.push(product_ob);
        }
    }
    else if(category==='lab')
    {    for (item of data) {
        let product_ob = new Lab(item)
        console.log(item.id)
        let li = createLi(product_ob,'lab');
        list_items.push(li)
        console.log(li)
        Labs_list.push(product_ob);
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

            Product_list = [];
            Vendors_List =[]
            Department_list = []
            Labs_list = [];
            $('#add-btn').attr('href','../forms/'+formrequest+'.html')
            list_Fun(data,list,formrequest);



    })
}





$(()=>{
    //Prototype Classes -
    $.get('http://localhost:2121/login',(data)=>{
        if(data.user[0].username==='admin')
        {   //Admin login - Set the user Value-

            adminLogin = true;
            $('#add-btn').css('display','block')
            $('#edit-btn')[0].classList.remove('display-btns')
            $('#delete-btn')[0].classList.remove('display-btns')

            console.log(data.user[0].username);
        }
    })
})