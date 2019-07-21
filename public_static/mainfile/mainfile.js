function reviewmenufunc() {
    //Displaying the popup menu
    let popup_menu = $('#popup')
    let popup_content = $('#popup-content')
    popup_content.empty()
    let pop_up_menu_heading = $(` <div class="col-12 close-btn" onclick="closepopup()" id="close-btn" align="right"><i class="fa fa-times"></i> </div>
        <!--Display the content here-->
        <h4> Transfer Review </h4>`)
    popup_content.append(pop_up_menu_heading)
    popup_menu.css('display','block')

    //Display this which item was selected and
    let productId = localStorage.getItem('productId')
    let transferableItemLd = localStorage.getItem('deptorlab')
    let dept_or_lab = localStorage.getItem('sub_cat')



    console.log('ProductId - '+productId)

    popup_content.append(`<div class="col-6" > Product ID : <input value=" ${productId}" readonly> </div>`)
    $.get(`http://localhost:2121/product/${productId}`,(data)=>{
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



        let outerform = reviewFormFunc(dept_or_lab,transferableItemLd);


        popup_content.append(outerform);


    })



}
function transferSuccessful(ev) {
    //Not working Right Now -
    ev.preventDefault();
    let senderId = $('input[name="senderLabId"]')
    let receiverId = $('input[name = "receiverLabId"]')
    let transferQty = $('input[name="transferQty"]')
    let productId = $('input[name="productId"]')

    let transferForm = $('#transferForm')

    $.post('http://localhost:2121/transfer',{
        senderLabId: senderId.val(),
        receiverLabId:receiverId.val(),
        transferQty: transferQty.val(),
        productId: productId.val()
    },(data)=>{
        if(data.transfer)
        {
        //    Transfer Successfull
            let trans_Succ = $('#transfer_Succ')
            closepopup();

            //REFRESHING THE LIST -
            $.get('http://localhost:2121/transfer',(data)=>{
                let list = $('#list-items')
                list.empty();
                list_Fun(data,list,'transfer');
            })



            trans_Succ.css('transform','translateY(200px)')
            window.scrollTo(0,0)
            setTimeout(()=>{
                trans_Succ.css('transform','translateY(-200px)')
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


    $.get(`http://localhost:2121/${faculty_or_lab}/${transferableItemLd}`,(data)=>{
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
        itemDiv_1.append(`<input type="text" style="display: none" value="${faculty_or_lab}" name="senderCategory">`)
        itemDiv_1.append(table_content)
    })



    //Select - Created --------------------
    let selected_transfer_val = $('#TransferId').val()
    // console.log( selected_lab.children("option:selected").val())
    let facultyOrLab = selected_transfer_val.attr('name').split('Id')[0];


        $.get(`http://localhost:2121/${facultyOrLab}/${selected_transfer_val}`,(data)=>{
            console.log(data)
            let table_content = $(`  <div class="row">
        <div class="col-6 p-2">${facultyOrLab} Id <input name="receiver${facultyOrLab}Id" value=" ${data.id}" readonly ></div>
        <div class="col-6 p-2">${facultyOrLab} name <input name="receiver${facultyOrLab}Name" value=" ${data.name}" readonly></div>
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
        <input value="${facultyOrLab}" name="receiverCategory" type="text" style="display: none">    `)
            let transfer_btn = $(`<div class="col-12" align="center"> <input class = "btn btn-info" type="submit" value="Submit" ></div>`)
            outerform.append(transfer_btn)
        })

    return outerform
}


function closepopup() {
    document.getElementById('popup').style.display = 'none';
}


function showSelectOptions(val,total_qty)
{   let OptionsDiv = $('#options-div')
    OptionsDiv.empty();
    console.log(val)
    let category = $(val).attr('value')
    console.log(category)

    //Quantity Select -
    let qty_list = []
    //Quantity available - Select
    for(i=1 ; i<=total_qty;i++)
    {
        let item = $(`<option>${i} </option>`)
        qty_list.push(item)
    }
    let qty_select = $('<select class="col-8 p-2" id="selected-qty" name= "qty"></select>')
    qty_select.append(qty_list)
    let select_div = $('<div class="col-12"></div>')
    $.get(`http://localhost:2121/${category}`,function (data) {
        console.log(data);

        //deparmentElement(data,category)

        select_div.append(`<h6>Select ${category}</h6>`)
        let labs_list_Li = [];
        for(i of data)
        {   console.log(i)
            let item = $(`<option  value = ${i.id} >${i.name} </option>`)
            labs_list_Li.push(item)
        }
        //Creating A Select - having name as LabId
        let labs_select = $('<select class="col-8 p-2" id="TransferId" name="labId"></select>')
        labs_select.append(labs_list_Li)

        if(category==='lab')
        {

        }
        else
        {
            labs_select.attr('name','facultyId')
        }
        select_div.append(labs_select)
        select_div.append(`<h6>Select Quantity</h6>`)
        select_div.append(qty_select);
        OptionsDiv.append(select_div);
    })
}

function createTransferObj(sub_cat,data,data2,total_Data) {
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
    let options_div =$(`<div id="options-div"></div>`)
    let select_Option = $(`<h4>Select Option</h4>
       <label>Faculty</label> <input onchange="showSelectOptions(this,${total_Data.qty})" style="width: 10%;" type="radio" class=" " name="category" value="faculty" >
       <label>Lab</label> <input onchange="showSelectOptions(this,${total_Data.qty})" style="width: 10%" type="radio" class="" name="category" value="lab" >
        `)


        // let select_div = $(`<div class = col-10></div>`)
        detailDiv.append(select_Option);
        //Select Div is appended in the main center div
        detailDiv.append(options_div)
       detailDiv.append('<div class="row justify-content-center"> <button class= "mt-3 mb-3 pt-1 pb-1 col-3 btn btn-info" onclick="reviewmenufunc()" style= "background-color:rgba(57,139,52,0.76);font-size: 20px;font-weight: bold; margin: 0 auto">TRANSFER</button></div>')

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
    else if(category==='faculty')
    {
        $.get(`http://localhost:2121/faculty/${id}`,(data)=>{
            detailDiv.append(createElement(data,category))
        })
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
        console.log('Issue category--------------------->>')
        console.log(id)
        //Append the EDIT BUTTON -

       //id and Product Id are same in this case -
        let productId = +($(el).attr('productId'));
        // let editbtn = $('#edit-btn')
        // editbtn.attr('href',`../forms/issue.html?productId=${productId}`)
        $.get(`http://localhost:2121/issue/${productId}`,(list_ofdept_labs)=>{
             let product_Details_Val = list_ofdept_labs.issuedItem.product
            let issueItemProduct = createElement(product_Details_Val,'product')
            let labsHeading = $('<h4 style="margin: 10px" align="center">Labs</h4>')
            let DeptHeading = $('<h4 style="margin: 10px" align="center">Faculty</h4>')
             if(list_ofdept_labs.issuedItem.labs!==null)
            {   for(lab of list_ofdept_labs.issuedItem.labs)
                {
                    let issueItemLabs = $(`
                    <div class= "col-10">Lab Id: ${lab.labId}</div>
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
        localStorage.setItem('sub_cat',sub_category)
        //Sub cat Id will be given by -
        let sub_cat_Id = $(el).attr("cat-id")

        //Setting the labOrDepartment ID to LOCAL STORAGE
        localStorage.setItem('deptorlab',sub_cat_Id)
        
        //Subcat - Product Id
        let sub_Cat_ProductID = $(el).attr("product-id")

        localStorage.setItem('productId',sub_Cat_ProductID)

        if(sub_category==="lab")
        {
            $.get(`http://localhost:2121/transfer/${id};${sub_category}`,(data)=>{
                // MULTIPLE PARAMS -
                console.log('INSIDE TRANSFER -----')
                console.log(data);
               createTransferObj(sub_category,data.lab,data.product,data)

            })
            //Request on lab and bring the data of that lab - and also the product Issued details
            // $.get(`http://localhost:2121/${sub_category}/${sub_cat_Id}`,(data)=>{
            //     //callback function of get
            //     console.log('LETS SEE WHAT IS DATA   ')
            //     console.log(data);
            //     $.get(`http://localhost:2121/product/${sub_Cat_ProductID}`,(data2)=> {
            //        //We need remaining quantity and so - 1 request issue wale par bhi jayegi -
            //         //PROBLEM HERE CHECK - ID is not ID
            //         console.log('LETS SEE WHAT IS DATA 2    ')
            //         console.log(data2)
            //         console.log('Object ID     ------'+id)
            //         $.get(`http://localhost:2121/issue/${id}`,(data3)=>{
            //             console.log("DATA 3 VALUE-------------")
            //             console.log(data3)
            //             //This can be reduced extra calls to - backend  -------
            //             createTransferObj(sub_category,data,data2,data3.issuedItem.labs[0])
            //         })
            //     })
            // })
        }

        //It will be faculty-----
        else
        {
            $.get(`http://localhost:2121/transfer/${id};${sub_category}`,(data)=>{
                // MULTIPLE PARAMS -
                console.log('INSIDE TRANSFER -----')
                console.log(data);
                createTransferObj(sub_category,data.faculty,data.product,data)

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
                        li[0].textContent = Obj.name+" "+Obj.manufacturer+" "+Obj.modelName;
                        li.attr('productId',Obj.id);
                         break;
        case 'transfer' : li.attr('category','transfer')
                            li.attr('sub-cat',Obj.deptorlab)
                         //FOR THE TIME BEING - LETS SAY _ ITS ONLY FOR LABS
                         li.attr('cat-id',Obj.deptorlabId)
                        li.attr('product-id',Obj.productId)
                            li[0].textContent = Obj.name;
                            break;
        case 'faculty' : li.attr('category','faculty')
                         li[0].textContent = Obj.name;
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
            console.log(item.id)
            let li = createLi(product_ob,'product');
            list_items.push(li)
            console.log(li)
            Product_list.push(product_ob);
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
        $('#delete-btn')[0].classList.add('display-btns')
         $('#edit-btn')[0].classList.add('display-btns')
        let addbtn = $('#add-btn')
            // editbtn.attr('href','../forms/issue.html')
            addbtn[0].textContent = "Issue Product"
    }
    else if(category==='transfer')
    {   console.log('Testing data of transfer')
        console.log(data.labs)
        console.log('------------------------------------>>>>>>>>>>>>>>>>>>>>>>')
        console.log(data);
        if(data.labs!==null)
        for (item of data.labs)
        {
            let object_Transfer = new Transfer(item,item.lab,item.product,"lab")
            console.log(item.id)
            let li = createLi(object_Transfer,'transfer');
            list_items.push(li)
            console.log(li)
            // Transfer_list.push(object_Transfer);
        }
        if(data.department!==null)
        {
            for (item of data.department) {
                let product_ob = new Transfer(item,item.faculty,item.product,"faculty")
                console.log(item.id)
                let li = createLi(product_ob,'transfer');
                list_items.push(li)
                console.log(li)
                // Transfer_list.push(product_ob);
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
        console.log('FORM REQ --------->>>>>>>>>.')
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

window.onclick = function(event) {
    let popup_menu = $('#popup')[0]
    if (event.target === popup_menu ) {
        popup_menu.style.display = "none";
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