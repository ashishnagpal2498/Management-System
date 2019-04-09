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
    let options_list = [];
    for(dpOrLab of data)
    {
        let op = $('<option></option>')
      category ==='lab' ? op[0].innerText= dpOrLab.labname : op[0].innerText= dpOrLab.dname
        options_list.push(op)
    }
    selectOption.append(options_list);
}
$(()=>{
    let product_name = $('#product-name')
    let product_quantity = $('#quantity')
    let productIdElement = $('#product-id')
    let remQuantity = $('#rem-quantity')
    //Local storage se Value Le lenge -
    //Id ki - so from that - We can find the Item - Name
    //And also remaining quantity
    let productId= localStorage.getItem('id');
    console.log(productId);
    productIdElement.attr('value',productId)
    $.get(`http://localhost:2121/issue/${productId}`,(data)=>{
        remQuantity.empty();
        console.log(data);
        // console.log(remQuantity)
        remQuantity.attr('value',data.remaining_qty);

    })
    // Get Request With params - Used - LocalStorage
    $.get(`http://localhost:2121/product/${productId}`,(data)=>{
        console.log(data);
        productIdElement.empty()
        product_name.empty();
        product_quantity.attr('value',data.qty)
        productIdElement.append(data.pid);

    })

})