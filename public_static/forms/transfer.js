
//Selected Option for transfer of the system -
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
    let qty_select = $('<select class="col-4 ml-2 mr-1 p-2" id="selected-qty" name= "qty"></select>')
    qty_select.append(qty_list)
    let select_div = $('<div class="col-12 row justify-content-center"></div>')
    $.get(`/${category}`,function (data) {
        console.log(data);

        //deparmentElement(data,category)

        select_div.append(`<h6 style="display: inline-block;width: 40%">Select ${category}</h6>`)
        let labs_list_Li = [];
        for(i of data)
        {   console.log(i)
            let item = $(`<option  value = ${i.id} >${i.name} </option>`)
            labs_list_Li.push(item)
        }
        //Creating A Select - having name as LabId
        let labs_select = $('<select class="col-4 ml-2 mr-2 p-2" id="TransferId" name="labId"></select>')
        labs_select.append(labs_list_Li)

        if(category==='lab')
        {

        }
        else
        {
            labs_select.attr('name','facultyId')
        }
        select_div.append(`<h6 style="display: inline-block;width: 40%">Select Quantity</h6>`)
        select_div.append(labs_select)

        select_div.append(qty_select);
        OptionsDiv.append(select_div);
    })
}
//Options Available to be selected by user for - Transfer
//
function transferPageOptions(cat,total_Data)
{
    let detailDiv = $('#detailed-div')
    let options_div = $(`<div class="row justify-content-center" id="options-div"></div>`)

    let select_Option = $(`<h5>Select Option</h5>
       <label>Faculty</label> <input onchange="showSelectOptions(this,${total_Data.qty})" style="width: 10%;" type="radio" class=" " name="category" value="faculty" >
       <label>Lab</label> <input onchange="showSelectOptions(this,${total_Data.qty})" style="width: 10%" type="radio" class="" name="category" value="lab" >
        `)


    // let select_div = $(`<div class = col-10></div>`)
    detailDiv.append(select_Option);
    //Select Div is appended in the main center div
    detailDiv.append(options_div)
    detailDiv.append(`<div class="row justify-content-center"> <button class= "mt-3 mb-3 pt-1 pb-1 col-4 btn btn-info" onclick="reviewmenufunc('${cat}')" style= "background-color:rgba(57,139,52,0.76);font-size: 20px;font-weight: bold; margin: 0 auto">TRANSFER</button></div>`)

}
$(()=>{
    let sub_category =   localStorage.getItem('sub_cat')
    //search the element in the list

    //Sub cat Id will be given by -
    let sub_cat_Id =  localStorage.getItem('sub_cat_Id')
    //Subcat - Product Id
    let sub_Cat_ProductID =   localStorage.getItem('productId')
    if(sub_category==="lab")
    {
        $.get(`/transfer/${sub_cat_Id};${sub_category}`,(data)=>{
            // MULTIPLE PARAMS -
            console.log('INSIDE TRANSFER -----')
            console.log(data);
            createTransferObj('transfer',sub_category,data.lab,data.product,data)
            setTimeout(()=>{
                transferPageOptions('transfer',data)
                $('#transfer-btn').css('display','none')

            },0)
        })
    }

    //It will be faculty-----
    else
    {
        $.get(`/transfer/${sub_cat_Id};${sub_category}`,(data)=>{
            // MULTIPLE PARAMS -
            console.log('INSIDE TRANSFER -----')
            console.log(data);
            createTransferObj('transfer',sub_category,data.faculty,data.product,data)
            setTimeout(()=>{
                transferPageOptions('transfer',data)
            },200)
        })
    }

})