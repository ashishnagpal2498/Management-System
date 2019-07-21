function showproducts() {
    //Show all the Unissued Products in select Options
    let showunissuedoptions = $('#product-list')

    console.log('Show Products')
    //This shows all the products which are unissued
    $.get('http://localhost:2121/issue/unissued',(data)=>{
        //Append - name Wise - Id
        showunissuedoptions.empty();
        let options_list = []
        //console.log(data)
        for(op of data)
        {   //console.log(op.pid)
            let ocreated = $(`<option name = "productId" value = ${op.id} ></option>`)
            ocreated[0].innerText = op.name+op.modelName;
            options_list.push(ocreated)
        }
        //console.log(options_list)
        showunissuedoptions.append(options_list);
        let selectVal = showunissuedoptions.val();
        displayPDetails(selectVal);
    })
}
function displayPDetails(elementID) {
    console.log(elementID)
    let proDuctID = +elementID;

    //Values To be changed From the Product DATA
    let product_name = $('#product-name')
    let product_quantity = $('#quantity')
    let productIdElement = $('#product-id')
    let remQuantity = $('#rem-quantity')


    //Finding Product From Product ID
    let ProductQuantity ;
    productIdElement.attr('value',proDuctID)
    $.get(`http://localhost:2121/product/${proDuctID}`,(data)=>{
        console.log(data);
        productIdElement.empty()
        product_name.empty();
        product_name.attr('value',data.name)
        product_quantity.attr('value',data.qty)
        ProductQuantity = data.qty;
        productIdElement.append(data.id);


    })
    //********************************************

    //Remaining Quantity and Previously Issued Product Details
    $.get(`http://localhost:2121/issue/${proDuctID}`,(data)=>{
        remQuantity.empty();
        console.log(data);
        // console.log(remQuantity)
        if(data.notfound===false) {
            remQuantity.attr('value', data.remaining_qty);
            //Call the function for the quantity to be issued
            //This fun sets the quantity selection options -
            assignqty(data.remaining_qty);
        }
        else
        {   console.log(ProductQuantity)
            remQuantity.attr('value',ProductQuantity)
            assignqty(ProductQuantity)
        }
        displayDeptsLabs(data,()=>{
            console.log('Everythings Done - ')
        });
    })


}
function displayDeptsLabs(previousIssuedData,cb) {
    // issuefun(productId,(list_ofdept_labs)=>{
        //data in the form labs
        //departments
        //product
        if(previousIssuedData.notfound===false) {
            console.log(previousIssuedData);
            let list_ofdept_labs = previousIssuedData.issuedItem
            let lab_details = $('#lab-details')
            let dept_details = $('#dept-details')
            let issued_labs = []
            let issued_dept = []
            lab_details.empty()
            dept_details.empty()
            if(previousIssuedData.issuedItem.labs!==null) {
                for (lab of list_ofdept_labs.labs) {
                    let issueItemLabs = $(`    <li>
                <div class= "col-10">Lab Id: ${lab.id}</div>
                  <div class= "col-10">Lab Name: ${lab.lab.name}</div>
                <div class="col-10">Quantity Issued: ${lab.qty}</div>
                </li>`)
                    issued_labs.push(issueItemLabs)
                }
                lab_details.append(issued_labs);
            }

            if(previousIssuedData.issuedItem.department!==null) {
                for (dept of list_ofdept_labs.department) {
                    let issueItemDept = $(` <li>
                <div class= "col-10">Faculty Id: ${dept.id}</div>
                <div class="col-10">Faculty Name : ${dept.faculty.name}</div>
                <div class="col-10">Quantity Issued: ${dept.qty}</div>
                </li>`)
                    issued_dept.push(issueItemDept)
                }
                dept_details.append(issued_dept)
            }


            cb();
        }
        else{
            console.log(previousIssuedData.message)
        }
}
// function issuefun(id,cb) {
//     //No post request Exist now
//     $.post(`http://localhost:2121/issue/${id}`,(data)=>{
//         console.log(data);
//         cb(data);
//     })
// }
function assignqty(rem_qty) {

    let selectqty = $('#qty')
    selectqty.empty();
    if(rem_qty===0)
    {
        selectqty.append('<option>0</option>')

        return ;

    }
    let ops_list = []
    for(i=1;i<=rem_qty;i++)
    {
        let o = $(`<option value="${i}">${i}</option>`)
        ops_list.push(o)
    }
    selectqty.append(ops_list);
}
function showSelectOptions(val)
{
    console.log(val)
    let category = $(val).attr('value')
    console.log(category)
    $.get(`http://localhost:2121/${category}`,function (data) {
        console.log(data);
        deparmentElement(data,category)
    })
}
function deparmentElement(data,category)
{
    let selectOption = $('#departmentorlab')
    selectOption.empty();
    category==='lab' ? selectOption.attr('name','labId') : selectOption.attr('name','facultyId')
    let options_list = [];
    for(facOrLab of data)
    {   console.log(facOrLab)
        let op = $('<option></option>')
        if(category==='lab')
        {   //console.log(op.labid)
            op[0].innerText= facOrLab.name
            op.attr('value',facOrLab.id)
        }
        else
            {   op[0].innerText= facOrLab.name
                op.attr('value',facOrLab.id);
            }
        options_list.push(op)
    }
    selectOption.append(options_list);
}
$(()=>{
    showproducts();

    //Local storage se Value Le lenge -
    //Id ki - so from that - We can find the Item - Name
    //And also remaining quantity
    // let productId= localStorage.getItem('id');
    // console.log(productId);
    //


    // // Get Request With params - Used - LocalStorage


})