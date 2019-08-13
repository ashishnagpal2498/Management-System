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
        $.get(`http://localhost:2121/transfer/${sub_cat_Id};${sub_category}`,(data)=>{
            // MULTIPLE PARAMS -
            console.log('INSIDE TRANSFER -----')
            console.log(data);
            createTransferObj('transfer',sub_category,data.lab,data.product,data)
            setTimeout(()=>{
                transferPageOptions('transfer',data)
            },200)
        })
    }

    //It will be faculty-----
    else
    {
        $.get(`http://localhost:2121/transfer/${sub_cat_Id};${sub_category}`,(data)=>{
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