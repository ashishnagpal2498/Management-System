
function issuefun(id,cb) {
    console.log(typeof id)
    console.log('To Hit the Issue request')

}


function createTransferObj(sub_cat,data,data2) {
    //Data2 is product data and data 1 is LabOrDepartment Data
    let detailDiv = $('#detailed-div')

    let labItem = $(`
          <li id="vendor-id"> <b>Lab ID:</b>  ${data.id} </li>
                    <li  id="vendor-name"><b>NAME:</b> ${data.name} </li>
                    <li id="vendor-company-name"><b>BLOCK</b>  ${data.block}</li>
                    <li><b>Technician: ${data.technician}</b></li>
                   <li id="hod"><b>Floor:</b> ${data.floor}</li>
            `)
    detailDiv.append(labItem)

    let productItem = $(`
          <li id="vendor-id"> <b>PRODUCT ID:</b>  ${data2.id} </li>
                    <li  id="vendor-name"><b>NAME: ${data2.name}</b> </li>
                    <!--<li id="vendor-company-name"><b>QUANTITY:</b>  </li>-->
                    <li id="vendor-contact-number"><b>INNVOICE NUMBER:</b> ${data2.invoice_no}</li>
                    <li><b>Manufacturer</b> ${data2.manufacturer}</li>
                    <li><b>INNVOICE DATE</b> ${data2.invoice_date}</li>
                    <li><b>YEAR OF WARRANTY</b> ${data.years}</li>
                    <li><b>DETAILS</b> ${data2.product_details}</li>
            `)
    detailDiv.append(productItem)
}

//Listing of selected Div - In the centre menu -
//when a user clicks on the item - details to be displayed next to it -
function funSelectedItem(el){
    //Event-
    let CenterDivHeading = $('#center-div-heading')
    CenterDivHeading.empty();
    //This gives the 'this' value of the item selected that is - li in this case
    console.log(el)
    let list_item = $(el).attr('list-val')

    console.log('list item  ' + list_item)
    //Converted to string
    let id = +list_item;
    let category = $(el).attr('category')
    console.log(category)
    let detailDiv = $('#detailed-div')
    detailDiv.empty()
    //console.log(detailDiv)
    CenterDivHeading.append(category+'  Details')
    console.log(typeof list_item)

    //Need to request database everytime whenever the item is clicked
    //cannot store the Temp data on files as request coming from which path not decided
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

        $.get(`http://localhost:2121/issue/${id}`,(list_ofdept_labs)=>{
             let product_Details_Val = list_ofdept_labs.issuedItem.product
            // let issueItemProduct = $(`<div class="col-10 issue-item-style" id="issue-id">Product Id: ${product_Details_Val.id}</div>
            //
            // <div class="col-10 issue-item-style" >Total Quantity: ${product_Details_Val.qty}</div>
            // <div class="col-10 issue-item-style">Invoice Number: ${product_Details_Val.invoice_no}</div>
            //     <div class="col-10 issue-item-style">Invoice Date : ${product_Details_Val.invoice_date}</div>
            //    `)
            let issueItemProduct = createElement(product_Details_Val,'product')
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

        //Sub cat Id will be given by -
        let sub_cat_Id = $(el).attr("cat-id")

        //Subcat - Product Id
        let sub_Cat_ProductID = $(el).attr("product-id")

        if(sub_category==="lab")
        {
            //Request on lab and bring the data of that lab - and also the product Issued details
            $.get(`http://localhost:2121/${sub_category}/${sub_cat_Id}`,(data)=>{
                //callback function of get
                $.get(`http://localhost:2121/product/${sub_Cat_ProductID}`,(data2)=> {
                    createTransferObj(sub_category,data,data2)
                })
            })
        }
    }
}


//Generic Function to create Li
function createLi (Obj,category){

    let li = $('<li onclick="funSelectedItem(this);"></li>')
    // Global user Defined Attribute for all the list items -
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
                            li.attr('sub-cat',Obj.deptorlab)
                         li.attr('cat-id',Obj.deptorlabId)
                        li.attr('product-id',Obj.productId)
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
    {   console.log('Testing data of transfer')
        console.log(data.labs)
        if(data.labs!==null)
        for (item of data.labs)
        {
            let object_Transfer = new Transfer(item,"lab")
            console.log(item.id)
            let li = createLi(object_Transfer,'transfer');
            list_items.push(li)
            console.log(li)
            Transfer_list.push(object_Transfer);
        }
        if(data.department!==null)
        {
            for (item of data.department) {
                let product_ob = new Transfer(item,"department")
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