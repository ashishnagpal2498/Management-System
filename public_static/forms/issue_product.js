function showproducts() {
    //Show all the Unissued Products in select Options
    let showunissuedoptions = $('#product-list')

    console.log('Show Products')
    $.get('http://localhost:2121/issue/unissued',(data)=>{
        //Append - name Wise - Id
        showunissuedoptions.empty();
        let options_list = []
        //console.log(data)
        for(op of data)
        {   //console.log(op.pid)
            let ocreated = $(`<option name = "productPid" value = ${op.pid} ></option>`)
            ocreated[0].innerText = op.pid;
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
    let remQuantity = $('#remquantity')


    //Finding Product From Product ID

    productIdElement.attr('value',proDuctID)
    $.get(`http://localhost:2121/product/${proDuctID}`,(data)=>{
        console.log(data);
        productIdElement.empty()
        product_name.empty();
        product_quantity.attr('value',data.qty)
        productIdElement.append(data.pid);


    })
    //Remaining Quantity
    $.get(`http://localhost:2121/issue/${proDuctID}`,(data)=>{
        remQuantity.empty();
        console.log(data);
        // console.log(remQuantity)
        remQuantity.attr('value',data.remaining_qty);

        //Call the function for the quantity to be issued
        assignqty(data.remaining_qty);
    })
    displayDeptsLabs(proDuctID);

}
function displayDeptsLabs(productId) {
    issuefun(productId,(list_ofdept_labs)=>{
        //data in the form labs
        //departments
        //product
        let lab_details = $('#lab-details')
        let dept_details = $('#dept-details')
        let issued_labs =[]
        let issued_dept = []
        lab_details.empty()
        dept_details.empty()
        for(lab of list_ofdept_labs.labs)
        {
            let issueItemLabs = $(`    <li>
                <div class= "col-10">Lab Id: ${lab.id}</div>
                <div class="col-10">Quantity Issued: ${lab.qty}</div>
                </li>`)
            issued_labs.push(issueItemLabs)
        }
        for(dept of list_ofdept_labs.department)
        {
            let issueItemDept = $(` <li>
                <div class= "col-10">Department Id: ${dept.id}</div>
                <div class="col-10">Quantity Issued: ${dept.qty}</div>
                </li>`)
            issued_dept.push(issueItemDept)
        }
        lab_details.append(issued_labs);
        dept_details.append(issued_dept)

    })
}
function issuefun(id,cb) {
    $.post(`http://localhost:2121/issue/${id}`,(data)=>{
        console.log(data);
        cb(data);
    })
}
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
function showform(val)
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
    category==='lab' ? selectOption.attr('name','labLabid') : selectOption.attr('name','departmentDno')
    let options_list = [];
    for(dpOrLab of data)
    {   console.log(dpOrLab)
        let op = $('<option></option>')
        if(category==='lab')
        {   //console.log(op.labid)
            op[0].innerText= dpOrLab.labname
            op.attr('value',dpOrLab.labid)
        }
        else
            {   op[0].innerText= dpOrLab.dname
                op.attr('value',dpOrLab.dno);
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