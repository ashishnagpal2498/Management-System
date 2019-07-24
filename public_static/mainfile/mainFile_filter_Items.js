function filters(category) {

}

function createFilterElement(Obj,name) {
   return $(`<label class="checkbox-container"> ${Obj.name}
                                <input name="${name}" type="checkbox" value="${Obj.id}" class="checkbox-filter" >
                                <span class="checkmark"></span>
                            </label>`)
}

function createFilterDiv(list) {
    let elementOuterDiv = $(` <div class="col-12">
                           
                    </div>`)
    let elementRow = $(` <div class="col-12 row filter-options-own"></div>`)
    elementOuterDiv.append(list);
    elementRow.append(elementOuterDiv);
    return elementRow
}

function filterOptions(category)
{   console.log('FILTER OPS CALLED')
    let filterRow = $('#filter-row')
    filterRow.empty();
    let filterHeading = $('<div class="col-12"><h4>Filters</h4></div>')
    filterRow.append(filterHeading);
    let filterContent;
    if(category==='vendor')
    {
        filterContent = $(`<div class="filter-content-setts">No Filters Available</div>`)
        filterRow.append(filterContent);

    }
    else if(category==='product')
    {
        filterContent = $(`<div class="row ml-3 mr-3">
                    <!--Size Filter-->
                    <div class="col-12 filter-heading mt-3 mb-3">Category</div>
                    <div class="col-12 row filter-options-own">
                        <div class="col-12">
                            <label class="checkbox-container"> Computer
                                <input name="category" type="checkbox" value="computer" class="checkbox-filter" >
                                <span class="checkmark"></span>
                            </label>
                            <label class="checkbox-container"> Printer
                                <input name="category" type="checkbox" value="printer" class="checkbox-filter" >
                                <span class="checkmark"></span>
                            </label>
                            <label class="checkbox-container"> AA
                                <input name="category" type="checkbox" value="6" class="checkbox-filter" >
                                <span class="checkmark"></span>
                            </label>
                            <label class="checkbox-container"> BB
                                <input name="category" type="checkbox" value="7" class="checkbox-filter" >
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <!--Price Range-->
                    <div class="col-12 filter-heading mt-3 mb-3">DATE</div>
                    <div class="col-12 row filter-options-own">
                        <div class="col-12">
                            <label class="checkbox-container">2019
                                <input name="date" type="checkbox"  id="price-filter" value="2019" class="checkbox-filter" >
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="col-12">
                            <label class="checkbox-container"> 2018
                                <input name="date" type="checkbox"  value="2018" class="checkbox-filter" >
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="col-12">
                            <label class="checkbox-container"> 2017
                                <input name="date" type="checkbox" value="2017"  class="checkbox-filter" >
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="col-12">
                            <label class="checkbox-container"> 2016
                                <input name="date" type="checkbox" value="2016"   class="checkbox-filter" >
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="col-12">
                            <label class="checkbox-container"> 2015
                                <input name="date" type="checkbox" value="2015" class="checkbox-filter" >
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="col-12">
                            <label class="checkbox-container"> 2014
                                <input name="date" type="checkbox" value="2014" class="checkbox-filter" >
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <div class="col-3 w-100"><button class="btn btn-info" onclick="filterlist('${category}')">Submit</button> </div>
                </div>`)
        console.log('INSIDE _ PRODUCT')
        filterRow.append(filterContent);

    }
    else if (category==='transfer')
    {   console.log('INSIDE TRANSFER _ FILTER FILE')
        let mainRow = $(`<div class="row ml-3 mr-3"></div>`)
         $.get('http://localhost:2121/lab',(labs)=>{
             let RowHeading = $(`  <div class="col-12 filter-heading mt-3 mb-3">Labs</div>`)
             let labs_list = []
             for(i of labs)
             {
                 let elementDiv = createFilterElement(i,'lab');
                 labs_list.push(elementDiv);
             }
             console.log('DATA ---- ')
             console.log(labs_list)
             let FinalDivLabs = createFilterDiv(labs_list);
             mainRow.append(RowHeading)
             mainRow.append(FinalDivLabs)
             //    FACULTY -
             $.get('http://localhost:2121/faculty',(data)=>{
                 let facultyList = []
                 for(i of data)
                 {
                     let elementDiv = createFilterElement(i,'faculty')
                     facultyList.push(elementDiv)
                 }
                 let finalDiv = createFilterDiv(facultyList)
                 let rHeading = $(`  <div class="col-12 filter-heading mt-3 mb-3">Faculty</div>`)
                 mainRow.append(rHeading)
                 mainRow.append(finalDiv)
                 mainRow.append(`<div class="col-3 w-100"><button class="btn btn-info" onclick="filterlist('${category}')">Submit</button> </div>`)
                 filterContent = mainRow;
                 filterRow.append(filterContent);
             })

         })
    }
    else if(category==='lab')
    {
        let mainRow = $(`<div class="row ml-3 mr-3"></div>`)
        let rHeading = $(`  <div class="col-12 filter-heading mt-3 mb-3">Block</div>`)
        $.get('http://localhost:2121/department',(depts)=>{
            console.log(depts)
            let dept_list = []
            for(i of depts)
            {
                let element = createFilterElement(i,'department')
                dept_list.push(element)
            }
            let final_DeptDiv = createFilterDiv(dept_list)

            let block_list = []
            for(let i=1;i<=5;i++)
            {   let obj = {name: `${i}`, id:i}
                let ele = createFilterElement(obj,'block')
                block_list.push(ele)
            }
            let floor_list = []
            for(let i=0;i<=3;i++)
            {   let obj = {name: `${i}`, id:i}
                let ele = createFilterElement(obj,'floor')
                floor_list.push(ele)
            }

            let final_Block_Div = createFilterDiv(block_list)
            let final_Floor_list = createFilterDiv(floor_list)

            let deptHead = $(`  <div class="col-12 filter-heading mt-3 mb-3">Department</div>`)
            let FloorHead = $(`  <div class="col-12 filter-heading mt-3 mb-3">Floor</div>`)

            mainRow.append(deptHead)
            mainRow.append(final_DeptDiv)
            mainRow.append(rHeading)
            mainRow.append(final_Block_Div)
            mainRow.append(FloorHead)
            mainRow.append(final_Floor_list)
            mainRow.append(`<div class="col-3 w-100"><button class="ml-3 btn btn-info" onclick="filterlist('${category}')">Submit</button> </div>`)
            filterRow.append(mainRow);
        })
    }
    else
    {
        filterContent = $(`<div class="filter-content-setts">No Filters Available</div>`)
        filterRow.append(filterContent);

    }
}
function createList(inputObjs) {
    let List = []
    for(i of inputObjs)
    {    console.log(i)
        if(i.checked)
        {
            List.push(i.value)
        }
    }
    return List;
}
function filterlist(formRequest)
{
    let date_input = $('input[name="date"]')
    let category = $('input[name="category"]')
    let labs = $('input[name="lab"]')
    let faculty = $('input[name="faculty"]')
    let department = $('input[name="department"]')
    let block = $('input[name="block"]')
    let floor = $('input[name="floor"]')
    console.log(date_input)
    console.log(category)
    let categoryList =[]
    let dateList = []
    let labsList =[]
    let facultyList = []
    let departmentList =[]
    let floorList =[]
    let blockList =[]
    if(category)
    {
        categoryList = createList(category)
    }
    if(date_input)
    {
        dateList = createList(date_input)
    }
    if(labs)
    {
        labsList = createList(labs)
    }
    if(faculty)
    {
        facultyList = createList(faculty)
    }
    if(department)
    {
        departmentList = createList(department)
    }
    if(floor)
    {
        floorList = createList(floor)
    }
    if(block)
    {
        blockList = createList(block)
        console.log('BLOCK LIST')
        console.log(blockList)
        if(blockList == [])
        {
            blockList.push("");
            console.log(blockList);
        }
    }

    console.log(categoryList)
    console.log(dateList)
    console.log('DEPARTMENT LIST ')
    console.log(departmentList)
    $.post(`http://localhost:2121/${formRequest}/filter`,
        {
            category: categoryList,
            date: dateList,
            facultyId : facultyList,
            labId : labsList,
            departmentId : departmentList,
            block:blockList,
            floor:floorList
        },(data)=>{
            if(data) {
                if(data.val)
                {
                    console.log(data.message)       
                }
                else {
                    let list = $('#list-items')
                    list.empty()
                    console.log(data);
                    list_Fun(data, list, formRequest);
                }
            }
        })
}

$(()=>{
    // let formreq = localStorage.getItem('form_request')
    // console.log(formreq)
    // if(formreq)
    // {   console.log('DUE TO - FORM REQ')
    //     filterOptions();
    // }
})