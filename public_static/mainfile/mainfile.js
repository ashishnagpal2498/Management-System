
let adminLogin = false;
let active_Tab = undefined;

let Transfer_list = [

]

let Vendors_List = []
//Class Vendor
function Vendor(Obj){
    this.id=Obj.id;
    this.name = Obj.name;
    this.company = Obj.companyname;
    this.companycontact = Obj.companycontact
    this.companyemail= Obj.companyemail
    this.address= Obj.address
    this.contact = Obj.personalcontact;
}
let Product_list = []
//Class Products
function Product(Obj) {
    this.id = Obj.id
    this.name = Obj.name
    this.qty = Obj.qty;
    this.manufacturer = Obj.manufacturer,
        this.modelName = Obj.modelName,
    this.invoice_date= Obj.invoice_date
    this.invoice_no = Obj.invoice_no
    this.years =Obj.warranty_year
    this.product_details= Obj.product_details
    this.approval=Obj.approval

}

let Department_list = [];
function Department(Obj)
{   this.sub_cat = "department"
    this.id = Obj.id
    this.name = Obj.name
    this.hod= Obj.hod
    this.block= Obj.block
}




let Labs_list =[]
function Lab(Obj) {
    this.sub_cat = "lab"
    this.id = Obj.id
    this.name= Obj.name
    this.technician= Obj.technician
    this.block= Obj.block
    this.floor = Obj.floor
}

let Issue_list = []
function Issue(Obj) {
    this.id = Obj.id
    this.qty = Obj.qty
}

function issuefun(id,cb) {
    console.log(typeof id)
    console.log('To Hit the Issue request')
    $.get(`http://localhost:2121/issue/${id}`,(data)=>{
        console.log(data);
        cb(data);
    })
}


//Create Element Function
function createElement (Obj,category) {
    if (category === 'vendor') {
        let vendorItem = $(`
             <li id="vendor-id"> <b>VENDOR ID:</b>  ${Obj.id} </li>
                    <li  id="vendor-name"><b>NAME: ${Obj.name}</b></li>
                    <li id="vendor-company-name"><b>COMPANY NAME:</b>  ${Obj.company}</li>
                    <li id="vendor-contact-number"><b>Company NUMBER: ${Obj.companycontact}</b></li>
                    <li><b>Personal Contact : ${Obj.personalcontact}</b></li>
                    <li><b>EMAIL: ${Obj.companyemail}</b></li>
                        <li><b>Address: ${Obj.address}</b></li>`)
        return vendorItem;
    }
    else if(category==='product')
    {
        let productItem = $(`
          <li id="vendor-id"> <b>PRODUCT ID:</b>  ${Obj.id} </li>
                    <li  id="vendor-name"><b>NAME: ${Obj.name}</b> </li>
                    <li id="vendor-company-name"><b>QUANTITY:</b>  ${Obj.qty}</li>
                    <li id="vendor-contact-number"><b>INNVOICE NUMBER:</b> ${Obj.invoice_no}</li>
                    <li><b>Manufacturer</b> ${Obj.manufacturer}</li>
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
          <li id="vendor-id"> <b>Lab ID:</b>  ${Obj.id} </li>
                    <li  id="vendor-name"><b>NAME:</b> ${Obj.name} </li>
                    <li id="vendor-company-name"><b>BLOCK</b>  ${Obj.block}</li>
                    <li><b>Technician: ${Obj.technician}</b></li>
                   <li id="hod"><b>Floor:</b> ${Obj.floor}</li>
            `)
        return labItem;

    }
    else if(category==='issue')
    {
        let productItemIssue = $(`
          <li id="vendor-id"> <b>Issue ID:</b>  ${Obj.id} </li>
                    <li  id="vendor-name"><b>NAME:</b> ${Obj.name} </li>
                    <li id="vendor-company-name"><b>Total quantity</b>  ${Obj.qty}</li>
            `)
        return productItemIssue
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
    else if(category==='issue')
    {   let issued_labs = []
        let issued_dept = []
        console.log('Issue category')
        issuefun(+list_item,(list_ofdept_labs)=>{
             let product_Details_Val = list_ofdept_labs.issuedItem.product
            let issueItemProduct = $(`<div class="col-10 issue-item-style" id="issue-id">Product Id: ${product_Details_Val.id}</div>

            <div class="col-10 issue-item-style" >Total Quantity: ${product_Details_Val.qty}</div>
            <div class="col-10 issue-item-style">Invoice Number: ${product_Details_Val.invoice_no}</div>
                <div class="col-10 issue-item-style">Invoice Date : ${product_Details_Val.invoice_date}</div>
               `)
            let labsHeading = $('<h4 style="margin: 10px" align="center">Labs</h4>')
            let DeptHeading = $('<h4 style="margin: 10px" align="center">Department</h4>')
             if(list_ofdept_labs.issuedItem.labs!==null)
            {   for(lab of list_ofdept_labs.issuedItem.labs)
                {
                    let issueItemLabs = $(`
                    <div class= "col-10">Lab Id: ${lab.id}</div>
                    <div class="col-10">Quantity Issued: ${lab.qty}</div>
                    `)
                    issued_labs.push(issueItemLabs)
                }
            }
            if(list_ofdept_labs.issuedItem.department!==null)
            {
                for (dept of list_ofdept_labs.issuedItem.department) {
                    let issueItemDept = $(`
                <div class= "col-10">Department Id: ${dept.id}</div>
                <div class="col-10">Quantity Issued: ${dept.qty}</div>
                `)
                    issued_dept.push(issueItemDept)
                }
            }
            detailDiv.append(issueItemProduct)
            detailDiv.append(labsHeading)
            detailDiv.append(issued_labs)
            detailDiv.append(DeptHeading)
            detailDiv.append(issued_dept)
         //Product Id is there- set on localstorage
         localStorage.setItem('id',product_Details_Val.id)
        })
    }
    else if (category==='transfer')
    {   let sub_category =  $(el).attr("sub-cat")
        //search the element in the list
        for (it of Transfer_list) {
            console.log(typeof it.id)
            //List item is of type string hence Type Cas to number value
            if (+list_item === it.id) {   //console.log('abc')
                detailDiv.append(createElement(it,category))
                break;
            }
        }


    }
}

//Display the Side menu as ICONS or whole div -
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
        case 'issue' :  li.attr('category','issue')
                        li[0].textContent = Obj.id+ '  QTY  '+ Obj.qty;
                         break;
        case 'transfer' : li.attr('category','transfer')
                            li.attr('sub-cat',Obj.sub_cat)
                            li[0].textContent = Obj.id;
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
    else if(category==='issue')
    {
        for (item of data) {
            let product_ob = new Issue(item)
            console.log(item.id)
            let li = createLi(product_ob,'issue');
            list_items.push(li)
            console.log(li)
            Issue_list.push(product_ob);
        }
        $('#delete-btn')[0].classList.add('display-btns')
        $('#edit-btn').attr('href','../forms/issue_edit.html')
    }
    else if(category==='transfer')
    {   if(data.labs!==null)
        for (item of data.labs)
        {
            let product_ob = new Lab(item)
            console.log(item.id)
            let li = createLi(product_ob,'transfer');
            list_items.push(li)
            console.log(li)
            Transfer_list.push(product_ob);
        }
        if(data.department!==null)
        {
            for (item of data.department) {
                let product_ob = new Department(item)
                console.log(item.id)
                let li = createLi(product_ob,'transfer');
                list_items.push(li)
                console.log(li)
                Transfer_list.push(product_ob);
            }
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
            Transfer_list =[];
            active_Tab = formrequest;
            $('#add-btn').attr('href','../forms/'+formrequest+'.html')
            //To display all the lists of Items when clicked Side menu Option
            list_Fun(data,list,formrequest);



    })
}





$(()=>{
    //Prototype Classes -
    $.get('http://localhost:2121/login',(data)=>{

        if(data!==undefined && data.user[0].username==='admin')
        {   //Admin login - Set the user Value-

            adminLogin = true;
            $('#add-btn')[0].classList.remove('display-btns')
            $('#edit-btn')[0].classList.remove('display-btns')
            $('#delete-btn')[0].classList.remove('display-btns')

            console.log(data.user[0].name);
        }
    })
})