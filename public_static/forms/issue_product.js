function showform(val)
{
    console.log(val)
    let category = $(val).attr('value')
    console.log(category)
    $.get(`http://localhost:2121/${category}`,function (data) {
        console.log(data);
        deparmentElement(data)
    })
}
function deparmentElement(data)
{
    let selectOption = $('#departmentorlab')
    selectOption.empty();
    let options_list = [];
    for(dpOrLab of data)
    {
        let op = $('<option></option>')
        op[0].innerText= dpOrLab.labname
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
    let productId;
    $.get('http://localhost:2121/issue/1',(data)=>{
        remQuantity.empty();
        console.log(data);
        // console.log(remQuantity)
        remQuantity.append(data.remaining_qty);

    })
    // Get Request With params - Used - LocalStorage
    $.get('http://localhost:2121/product/1',(data)=>{
        console.log(data);
        productIdElement.empty()
        product_name.empty();
        product_quantity.empty();
        product_quantity.append(data.qty)
        productIdElement.append(data.pid);

    })

})