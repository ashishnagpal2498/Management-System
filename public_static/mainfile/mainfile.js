function reviewmenufunc(category) {
    //Displaying the popup menu
    let popup_menu = $('#popup')
    let popup_content = $('#popup-content')
    popup_content.empty()
    let pop_up_menu_heading = $(` <div class="col-12 close-btn" onclick="closepopup()" id="close-btn" align="right"><i class="fa fa-times"></i> </div>
        <!--Display the content here-->
        <h4 class="review-heading"> ${category} Review </h4>`)
    popup_content.append(pop_up_menu_heading)
    popup_menu.css('display','block')

    //Display this which item was selected and
    let productId = localStorage.getItem('productId')
    let transferableItemLd = localStorage.getItem('sub_cat_Id')
    let faculty_or_lab = localStorage.getItem('sub_cat')



    console.log('ProductId - '+productId)

    popup_content.append(`<div class="col-6" > Product ID : <input value=" ${productId}" readonly> </div>`)
    $.get(`/product/${productId}`,(data)=>{
        console.log('Productsssssss')
        console.log(data)
        //    Display data of product here
        let prod_details = $(`<div class = "row mt-2 mb-2 p-2">
<div class="col-6">Product Name : ${data.name}</div>
<div class="col-6">Total Quantity : ${data.qty}</div>
<div class="col-6">Year: ${data.warranty_year}</div>
<div class="col-6">Description : ${data.product_details}</div>
</div>`)

        popup_content.append(prod_details)


        if(category==='transfer') {
            let outerform = reviewFormFunc(faculty_or_lab, transferableItemLd);


            popup_content.append(outerform);

        }
        else if(category==='Return')
        {
            //
            $.get(`/${faculty_or_lab}/${transferableItemLd}`,(data)=>{
                let table_content;
                if(faculty_or_lab==='lab')
                {
                    table_content = $(`<div class="row"><div class="col-6 p-2">Lab Id <input name="LabId" value=" ${data.id}" readonly ></div>
        <div class="col-6 p-2">Lab name <input name="LabName" value=" ${data.name}" readonly></div>
    </div>`)
                }
                else
                {
                    table_content = $(`
        <div class="row">
        <div class="col-6 p-2">Faculty Id <input name="FacultyId" value=" ${data.id}" readonly ></div>
        <div class="col-6 p-2">Faculty name <input name="FacultyName" value=" ${data.name}" readonly></div>
    </div>
       `)
                }
                let selected_qty = $('#selected-qty')
                popup_content.append(`<div class="col-10">Selected Qty <input name="selected-qty" type="number" value="${selected_qty.val()}"></div>`)
                popup_content.append(`<input name="productId" value="${productId}" style="display: none">
                <input type="text" id="category" style="display: none" value="${faculty_or_lab}" name="category">`)
                    popup_content.append(table_content)
                popup_content.append(`<div class="col-3 btn btn-info" onclick="reviewReturnItem()">Submit</div>`)
            })
            
            
        }
    })



}
function reviewReturnItem() {
    let category = $('#category')
    let labId = $('input[name ="LabId"]')
    let facultyId = $('input[name ="FacultyId"]')
    let selectedQty = $('input[name="selected-qty"]')
    let productId = $('input[name="productId"]')
    $.post('/Return',
        {
            category:category.val(),
            labId: labId.val(),
            facultyId: facultyId.val(),
            qty: selectedQty.val(),
            productId:productId.val()
        },(data)=>{
            //popoff the menu
            //refresh the return list
            closepopup();
            if(data.itemReturned)
            {   let success_Div = $('#success-div-popup')
                success_Div.empty();
                //Refresh Values

                $.get('/Return',(data)=>{
                    let list = $('#list-items')
                    list.empty();
                    list_Fun(data,list,'Return');
                })

                success_Div.append(data.message)
                // alert(data.message);
                success_Div.css('display','block')
                setTimeout(()=>{
                    success_Div.css('display','none')
                },3000)
            }
            else
            {

            }
        })
}
function transferSuccessful(ev) {
    //Not working Right Now -
    ev.preventDefault();

    let senderCategory = $('#senderCategory')
    let receiverCategory = $('#receiverCategory')
    let senderFacultyId = $('input[name="senderFacultyId"]')
    let senderLabId = $('input[name="senderLabId"]')
    //SEND HERE -----
    let receiver_labId = $('input[name = "receiver_labId"]')
    let receiver_facultyId = $('input[name = "receiver_facultyId"]')
    let transferQty = $('input[name="transferQty"]')
    let productId = $('input[name="productId"]')

    let transferForm = $('#transferForm')

    $.post('/transfer',{
        senderCategory: senderCategory.val(),
        receiverCategory: receiverCategory.val(),
        senderFacultyId : senderFacultyId.val(),
        senderLabId: senderLabId.val(),
        receiver_labId: receiver_labId.val(),
        receiver_facultyId: receiver_facultyId.val(),
        transferQty: transferQty.val(),
        productId: productId.val()
    },(data)=>{
        if(data.transfer)
        {
        //    Transfer Successfull
            let trans_Succ = $('#success-div-popup')
            closepopup();

            //REFRESHING THE LIST -
            // $.get('/transfer',(data)=>{
            //     let list = $('#list-items')
            //     list.empty();
            //     list_Fun(data,list,'transfer');
            // })
            //REDIRECT MESSAGE -
            // let redirect_time_span = $('#redirect-time')
            // let i =3;
            // let redirect_count = setInterval(()=>{
            //
            //         redirect_time_span.append(i);
            //     i--;
            // })
            trans_Succ.css('display','block')
            //window.scrollTo(0,0)
            setTimeout(()=>{
                trans_Succ.css('display','none')
                // if(i>0)
                // {
                //     // redirect_count
                // }
                window.location = "../mainfile/mainfile.html"
            },3000)

        }
        else
        {
            alert('Transfer Failed')
        }
    })

}
function reviewFormFunc(faculty_or_lab,transferableItemLd) {
    //Display this to which - the item is going -
    //Quantity and lab - details -
    let outerform = $(`<form class="row" id="transferForm" onsubmit="transferSuccessful(event)" method = "post" action = "/transfer"></form>`)
    //This is the table which show the details of product to be transfered from that lab
    let itemDiv_1 = $(`    
                            <div class = "col-6 pl-3 pb-2" id ="item-send"><h5>Sender</h5></div>`)
    //This table shows the details of lab in which item is transfered
    let itemDiv_2 = $(`    
                            <div class="col-6 pl-3 pb-2" id = "item-receive"><h5>Receiver</h5></div> `)


    $.get(`/${faculty_or_lab}/${transferableItemLd}`,(data)=>{
        let table_content;
        if(faculty_or_lab==='lab')
        {
            table_content = $(`
        <div class="row">
        <div class="col-6 p-2">Lab Id <input name="senderLabId" value=" ${data.id}" readonly ></div>
        <div class="col-6 p-2">Lab name <input name="senderName" value=" ${data.name}" readonly></div>
    </div>
       `)
        }
        else
        {
            table_content = $(`
        <div class="row">
        <div class="col-6 p-2">Faculty Id <input name="senderFacultyId" value=" ${data.id}" readonly ></div>
        <div class="col-6 p-2">Faculty name <input name="senderFacultyName" value=" ${data.name}" readonly></div>
    </div>
       `)
        }
        itemDiv_1.append(`<input type="text" id="senderCategory" style="display: none" value="${faculty_or_lab}" name="senderCategory">`)
        itemDiv_1.append(table_content)
    })



    //Select - Created --------------------
    let selected_transfer = $('#TransferId')
    let selected_transfer_val = selected_transfer.val()
    // console.log( selected_lab.children("option:selected").val())
    let facultyOrLab = selected_transfer.attr('name').split('Id')[0];


        $.get(`/${facultyOrLab}/${selected_transfer_val}`,(data)=>{
            console.log(data)
            let table_content = $(`  <div class="row">
        <div class="col-6 p-2">${facultyOrLab} Id <input name="receiver_${facultyOrLab}Id" value=" ${data.id}" readonly ></div>
        <div class="col-6 p-2">${facultyOrLab} name <input name="receiver_${facultyOrLab}Name" value=" ${data.name}" readonly></div>
    </div> `)
            itemDiv_2.append(table_content);


            //Append both the tables into the form

            outerform.append(itemDiv_1)
            outerform.append(itemDiv_2)

            //Now show the quantity to be transfered in th middle
            let productId = localStorage.getItem('productId')
            let selected_qty = $('#selected-qty')
            outerform.append(`<div class="col-12 mt-2 mb-2"> <h6 align="center">Selected Quantity  <input name="transferQty" value=" ${selected_qty.val()}" readonly> </h6></div>
        <input value="${productId}" name="productId" style="display: none"> 
        <input value="${facultyOrLab}" name="receiverCategory" id="receiverCategory" type="text" style="display: none">    `)
            let transfer_btn = $(`<div class="col-12" align="center"> <input class = "btn btn-info" type="submit" value="Submit" ></div>`)
            outerform.append(transfer_btn)
        })

    return outerform
}


function closepopup() {
    document.getElementById('popup').style.display = 'none';
}




function createTransferObj(cat,sub_cat,data,data2,total_Data) {
    //Data2 is product data and data 1 is LabOrDepartment Data
    let detailDiv = $('#detailed-div')
    if(sub_cat==='lab') {
        let labItem = createElement(data, "lab")
        detailDiv.append(labItem)
        detailDiv.append(` <li id="qty-issued"><b>Quantity Issued: </b>${total_Data.qty}</li>`)

    }
    else
    {
        let FacultyItem = createElement(data, "faculty")
        detailDiv.append(FacultyItem)
        detailDiv.append(` <li id="qty-issued"><b>Quantity Issued: </b>${total_Data.qty}</li>`)
    }
    let productItem = createElement(data2,"product")
    detailDiv.append(productItem)

    // console.log(total_Data)
    //let labs_list ;
    if(cat==='transfer') {
    let transferBtn = $(`<a class="mt-1 col-6 btn btn-info" id="transfer-btn" style="color: white;" href="/forms/transfer.html">Transfer</a>`)
        detailDiv.append(transferBtn)
    }
    else if(cat==='Return')
    {
        let qty_list = []
        //Quantity available - Select
        for(i=1 ; i<=total_Data.qty;i++)
        {
            let item = $(`<option>${i} </option>`)
            qty_list.push(item)
        }
        let qty_select = $('<select class="col-8 p-2" id="selected-qty" name= "qty"></select>')
        qty_select.append(qty_list)
        detailDiv.append(qty_select);
        detailDiv.append(`<div class="row justify-content-center"> <button class= "mt-3 mb-3 pt-1 pb-1 col-3 btn btn-info" onclick="reviewmenufunc('${cat}')" style= "background-color:rgba(57,139,52,0.76);font-size: 20px;font-weight: bold; margin: 0 auto">RETURN</button></div>`)


    }
}

//ISSUE REPORT- PRODUCT
function issueReport(productId) {
    let popup_menu = $('#popup')
    let popup_content = $('#popup-content')
    popup_content.empty()
    let pop_up_menu_heading = $(` <div class="col-12 close-btn" onclick="closepopup()" id="close-btn" align="right"><i class="fa fa-times"></i> </div>
        <!--Display the content here-->
        <h4 class="review-heading"> ISSUE REPORT </h4>`)
    popup_content.append(pop_up_menu_heading)
    popup_menu.css('display','block')

    $.get(`/issue/${productId}`,(list_ofdept_labs)=>{
    //        GETTING DESIRED OBJECT -

        let issued_labs = []
        let issued_dept = []

        let labsHeading = $('<h4 style="margin: 10px" align="center">Labs</h4>')
        let DeptHeading = $('<h4 style="margin: 10px" align="center">Faculty</h4>')
        if(list_ofdept_labs.issuedItem.labs!==null)
        {   for(lab of list_ofdept_labs.issuedItem.labs)
        {
            let issueItemLabs = $(`
                    <div class= "col-10">Lab Id: ${lab.labId}</div>
                    <div class="col-10">Lab Name : ${lab.lab.name}</div>
                    <div class="col-10">Quantity Issued: ${lab.qty}</div>
                    `)
            issued_labs.push(issueItemLabs)
        }
        }
        if(list_ofdept_labs.issuedItem.faculty!==null)
        {
            for (faculty of list_ofdept_labs.issuedItem.faculty) {
                let issueItemDept = $(`
                <div class= "col-10">Department Id: ${faculty.id}</div>
                <div class="col-10">Faculty Name: ${faculty.faculty.name}</div>
                <div class="col-10">Quantity Issued: ${faculty.qty}</div>
                `)
                issued_dept.push(issueItemDept)
            }
        }
        popup_content.append(labsHeading)
        popup_content.append(issued_labs)
        popup_content.append(DeptHeading)
        popup_content.append(issued_dept)



    })


}


//Listing of selected Div - In the centre menu -
//when a user clicks on the item - details to be displayed next to it -
function funSelectedItem(el,event){
    //Event-
    let CenterDivHeading = $('#center-div-heading')
    CenterDivHeading.empty();

    //This gives the 'this' value of the item selected that is - li in this case
    console.log(el)
    let category;
    let list_item;
    let id ;
    if(el!==null)
    {   list_item  = $(el).attr('list-val');
        category = $(el).attr('category')
        id = +list_item;
    }
    else
    {   list_item = null;
        category = localStorage.getItem('form_request')
        id = null;
    }

    
    console.log('EVENT----------')
    console.log(event)
    console.log(event.parentElement);
    console.log('list item  ' + list_item)
    //Converted to string


    console.log(category)
    let detailDiv = $('#detailed-div')
    detailDiv.empty()
    //console.log(detailDiv)
    CenterDivHeading.append(category+'  Details')
    console.log(typeof list_item)

    //Need to request database everytime whenever the item is clicked
    //cannot store the Temp data on files as request coming from which path not decided
    if(category==='vendor') {
        $.get(`/vendor/${id}`,(data)=>{
            detailDiv.append(createElement(data,category))
        })
    }
    else if(category==='product')
    {
        $.get(`/product/${id}`,(data)=>{
            detailDiv.append(createElement(data,category))
        })
    }
    else if(category==='faculty')
    {
        $.get(`/faculty/${id}`,(data)=>{
            detailDiv.append(createElement(data,category))
        })
    }
    else if(category==='department')
    {   if(id===null)
        {
            detailDiv.append(createElement({},'department'))
        }
        else {
        $.get(`/department/${id}`, (data) => {
            detailDiv.append(createElement(data, category))
        });
    }
    }
    else if(category==='lab')
    {
        $.get(`/lab/${id}`,(data)=>{
            detailDiv.append(createElement(data,category))
        });

    }
    else if(category==='issue')
    {
        console.log('Issue category--------------------->>')
        console.log(id)
        //Append the EDIT BUTTON -

       //id and Product Id are same in this case -
        let productId = +($(el).attr('productId'));
        let addBtn = $('#add-btn')
        addBtn.attr('href',`../forms/issue.html?productId=${productId}`)
        $.get(`/issue/${productId}`,(list_ofdept_labs)=>{
             let product_Details_Val = list_ofdept_labs.issuedItem.product
            let issueItemProduct = createElement(product_Details_Val,'product')


            detailDiv.append(issueItemProduct)
            detailDiv.append(`<div class="mt-1 col-7 btn btn-info" onclick="issueReport('${productId}')" style="color: white;">Product Report</div>`)
            //Product Id is there- set on localstorage

            localStorage.setItem('id',product_Details_Val.id)
        })
    }
    else if (category==='transfer')
    {
        let sub_category =  $(el).attr("sub-cat")
        //search the element in the list
        localStorage.setItem('sub_cat',sub_category)
        //Sub cat Id will be given by -
        let sub_cat_Id = $(el).attr("cat-id")

        //Setting the labOrDepartment ID to LOCAL STORAGE
        localStorage.setItem('sub_cat_Id',sub_cat_Id)
        
        //Subcat - Product Id
        let sub_Cat_ProductID = $(el).attr("product-id")

        localStorage.setItem('productId',sub_Cat_ProductID)

        if(sub_category==="lab")
        {
            $.get(`/transfer/${id};${sub_category}`,(data)=>{
                // MULTIPLE PARAMS -
                console.log('INSIDE TRANSFER -----')
                console.log(data);
               createTransferObj('transfer',sub_category,data.lab,data.product,data)

            })
        }

        //It will be faculty-----
        else
        {
            $.get(`/transfer/${id};${sub_category}`,(data)=>{
                // MULTIPLE PARAMS -
                console.log('INSIDE TRANSFER -----')
                console.log(data);
                createTransferObj('transfer',sub_category,data.faculty,data.product,data)

            })
        }

    }
    else if(category==='Return')
    {
        let sub_category =  $(el).attr("sub-cat")
        //search the element in the list
        localStorage.setItem('sub_cat',sub_category)
        //Sub cat Id will be given by -
        let sub_cat_Id = $(el).attr("cat-id")

        //Setting the labOrDepartment ID to LOCAL STORAGE
        localStorage.setItem('sub_cat_Id',sub_cat_Id)

        //Subcat - Product Id
        let sub_Cat_ProductID = $(el).attr("product-id")

        localStorage.setItem('productId',sub_Cat_ProductID)

        if(sub_category==="lab")
        {
            $.get(`/transfer/${id};${sub_category}`,(data)=>{
                // MULTIPLE PARAMS -
                console.log('INSIDE TRANSFER -----')
                console.log(data);
                createTransferObj('Return',sub_category,data.lab,data.product,data)

            })
        }

        //It will be faculty-----
        else
        {
            $.get(`/transfer/${id};${sub_category}`,(data)=>{
                // MULTIPLE PARAMS -
                console.log('INSIDE TRANSFER -----')
                console.log(data);
                createTransferObj('Return',sub_category,data.faculty,data.product,data)

            })
        }

    }
    else if(category==='store')
    {
        $.get(`/issue/${id}`,(list_of_faculty_labs)=> {

            detailDiv.append(createElement(list_of_faculty_labs.issuedItem.product,'product'))
            detailDiv.append(`<div class="col-12"><h4>Remaining Quantity</h4> ${list_of_faculty_labs.remaining_qty}</div>`)
        })



    }
    //END OF RIGHT SIDE CLICKED LI- LIST VALUE -


}


//Generic Function to create Li
function createLi (Obj,category){

    let li = $('<li onclick="funSelectedItem(this,event);"></li>')
    // Global user Defined Attribute for all the list items -
    li.attr('list-val',`${Obj.id}`)

    console.log('CreateLi function '+ category)

    //MAKING RIGHT MAIN DETAILED DIV AS EMPTY
    let detailDiv = $('#detailed-div')
    detailDiv.empty()
    //console.log(detailDiv)
    let CenterDivHeading = $('#center-div-heading')
    CenterDivHeading.empty();
    CenterDivHeading.append(category+'  Details')

    //

    switch (category) {
        case 'product' : li[0].textContent = Obj.invoice_no + " " + Obj.name ;
                         li.attr('category','product')
                            break;

        case 'vendor' :  li.attr('category','vendor')
                         li[0].textContent = Obj.company + Obj.name;
                            break;

        case 'department' : li.attr('category','department')
                             li[0].textContent = Obj.name + " " + Obj.block;
                              break;
        case 'lab' :    li.attr('category','lab')
                         li[0].textContent = Obj.name;
                         break;
        case 'issue' :  li.attr('category','issue')
                        li[0].textContent = Obj.name+" "+Obj.manufacturer+" "+Obj.modelName;
                        li.attr('productId',Obj.id);
                         break;
        case 'transfer' : li.attr('category','transfer')
                            li.attr('sub-cat',Obj.facultyorlab)
                         //FOR THE TIME BEING - LETS SAY _ ITS ONLY FOR LABS
                         li.attr('cat-id',Obj.facultyorlabId)
                        li.attr('product-id',Obj.productId)
                            li[0].textContent = Obj.name;
                            break;
        case 'faculty' : li.attr('category','faculty')
                         li[0].textContent = Obj.name;
                            break;
        case 'Return' :        li.attr('category','Return')
                                li.attr('sub-cat',Obj.facultyorlab)
                               //FOR THE TIME BEING - LETS SAY _ ITS ONLY FOR LABS
                                 li.attr('cat-id',Obj.facultyorlabId)
                                li.attr('product-id',Obj.productId)
                                     li[0].textContent = Obj.name;             
                                    break;
        case 'store' :         li[0].textContent = Obj.invoice_no + " " + Obj.name;
                                 li.attr('category','store')
                                break;
    }


    return li;
}


//Generic Function to Create Left Centre Div -
//Function call onclick from the Side Menu - $ request
function list_Fun(data,list,category) {
    let list_items =[]

    //If the category is Vendor - List all the Vendors , Inside - left center Div
    let addbtn = $('#add-btn')
    if(adminLogin) {
        addbtn.css('display', 'block')
        addbtn[0].textContent = "ADD"
    }
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
            console.log(item.id)
            let li = createLi(product_ob,'product');
            list_items.push(li)
        }
    }
    else if(category==='faculty')
    {
        for(item of data)
        {
            let li = createLi(item,'faculty')
            list_items.push(li);
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

            let li = createLi(item,'issue');
            list_items.push(li)
            // console.log(li)
            // Issue_list.push(product_ob);
        }
            addbtn[0].textContent = "Issue Product"
    }
    else if(category==='transfer')
    {
        addbtn.css('display','none')
        if(data.labs!==null)
        for (item of data.labs)
        {
            let object_Transfer = new Transfer(item,item.lab,item.product,"lab")
            let li = createLi(object_Transfer,'transfer');
            list_items.push(li)
        }
        if(data.department!==null)
        {
            for (item of data.department) {
                let product_ob = new Transfer(item,item.faculty,item.product,"faculty")
                console.log(item.id)
                let li = createLi(product_ob,'transfer');
                list_items.push(li)
                console.log(li)
            }
        }

    }
    else if(category==='Return')
    {   addbtn.css('display','none')
        //Same As Transfer Objects -
        if(data.labs!==null)
            for (item of data.labs)
            {
                let object_Transfer = new Transfer(item,item.lab,item.product,"lab")
                let li = createLi(object_Transfer,'Return');
                list_items.push(li)
            }
        if(data.department!==null)
        {
            for (item of data.department) {
                let product_ob = new Transfer(item,item.faculty,item.product,"faculty")
                console.log(item.id)
                let li = createLi(product_ob,'Return');
                list_items.push(li)
                console.log(li)
            }
        }
    }
    else if (category==='store')
    {   addbtn.css('display','none')
        for (item of data) {
            let product_ob = new Product(item)
            let li = createLi(product_ob,'store');
            list_items.push(li)
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
    let formrequest;
    if(typeof ev ==='string')
    {
        formrequest = ev;
    }
   else {
        formrequest= $(ev).attr('myval-div')
        console.log(formrequest)
    }
   //FILTER OPTIONS SHOW

    localStorage.setItem('form_request',formrequest)
    console.log('CALLING  FILTER OPS')
    filterOptions(formrequest);
    $.get(`/${formrequest}`,
        //Callback Function which Receives Data -
        (data)=>{
        console.log('FORM REQ --------->>>>>>>>>.')
            console.log(data)

            Product_list = [];
            Vendors_List =[]
            Department_list = []
            Labs_list = [];
            Transfer_list =[];
            active_Tab = formrequest;
           let addbtn = $('#add-btn')
                addbtn.attr('href','../forms/'+formrequest+'.html')
            // addbtn.css('display','block')
            // addbtn[0].textContent ="Add"
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
     let sideMenu = document.getElementById('side-menu')
    for(i of slideMenuIcons)
    {
        i.classList.toggle('slide-menu-icons-display')
    }
}

window.onclick = function(event) {
    let popup_menu = $('#popup')[0]
    if (event.target === popup_menu ) {
        popup_menu.style.display = "none";
    }
    // let login_user = $('#login-user')[0]
    // let DropDown = $('#myDropdown')[0]
    // if(event.target !== login_user)
    // {
    //     DropDown.classList.remove('show')
    // }
}



$(()=>{
    //Prototype Classes -
    $.get('/login',(data)=>{
        console.log('User Check')
        if(data.user != undefined)
        {   //Admin login - Set the user Value-
            if(data.user[0].username==='admin') {
                adminLogin = true;

                $('#add-btn')[0].classList.remove('display-btns')
                // $('#edit-btn')[0].classList.remove('display-btns')
                // $('#delete-btn')[0].classList.remove('display-btns')
            }
            let username_Div = $('#username')
            username_Div.empty();
            username_Div.append(data.user[0].username)
            console.log(data.user[0].name);
        }

    })
    let urlSplitter = window.location.href.split('=')[1];
    if(urlSplitter)
    {   console.log("URL SPLITTER  ")
        console.log(urlSplitter)
        show(urlSplitter);
    }
})