//This file is defined for classes and HTML objects Used by the main js file
// Objectes created of classes and HTML used to append into it


//Class Vendor
function Vendor(Obj){
    this.id=Obj.id;
    this.name = Obj.name;
    this.company = Obj.companyname;
    this.companycontact = Obj.companycontact
    this.companyemail= Obj.companyemail
    this.address= Obj.address
    this.contact = Obj.personalcontact;
}
//Class Products
function Product(Obj) {
    this.id = Obj.id
    this.name = Obj.name
    this.qty = Obj.qty;
    this.manufacturer = Obj.manufacturer,
        this.modelName = Obj.modelName,
        this.invoice_date= Obj.invoice_date
    this.invoice_no = Obj.invoice_no
    this.years =Obj.warranty_year
    this.product_details= Obj.product_details
    this.approval=Obj.approval
    this.category = Obj.category
}

function Department(Obj)
{   this.sub_cat = "department"
    this.id = Obj.id
    this.name = Obj.name
    this.hod= Obj.hod
    this.block= Obj.block
}

function Lab(Obj) {
    this.sub_cat = "lab"
    this.id = Obj.id
    this.name= Obj.name
    this.technician= Obj.technician
    this.block= Obj.block
    this.floor = Obj.floor
}

function Issue(Obj) {
    this.id = Obj.id
    this.qty = Obj.qty
}


function Transfer(Obj,laborDept,product,deptOrLab) {
    this.id = Obj.id
    this.name =product.name + " " + product.manufacturer + " " + product.modelName + " " + laborDept.name;
    this.qty = Obj.qty
    this.facultyorlab = deptOrLab
    this.productId = Obj.productId
    //Either take the 1st value or the second value
    if(deptOrLab==='lab')
    this.facultyorlabId = Obj.labId
        else this.facultyorlabId = Obj.facultyId;
}

//Html elements used
//Create Element Function
//which creates the elemnt to be displayed and append is center Div
function createElement (Obj,category) {
    if (category === 'vendor') {
        let vendorItem = $(`
             <li id="vendor-id"> <b>VENDOR ID:</b>  ${Obj.id} </li>
                    <li  id="vendor-name"><b>NAME:</b>  ${Obj.name}</li>
                    <li id="vendor-company-name"><b>COMPANY NAME:</b>  ${Obj.companyname}</li>
                    <li id="vendor-contact-number"><b>COMPANY NUMBER:</b> ${Obj.companycontact}</li>
                    <li><b>Personal Contact :</b>${Obj.personalcontact}</li>
                    <li><b>EMAIL: </b>${Obj.companyemail}</li>
                        <li><b>Address: </b>${Obj.address}</li>`)
        return vendorItem;
    }
    else if(category==='product')
    {
        let productItem = $(`
          <li id="vendor-id"> <b>PRODUCT ID:</b>  ${Obj.id} </li>
                    <li  id="vendor-name"><b>NAME: </b> ${Obj.name} </li>
                    <li  ><b>CATEGORY: </b> ${Obj.category} </li>

                    <li id="vendor-company-name"><b>TOTAL QUANTITY:</b>  ${Obj.qty}</li>
                    <li id="vendor-contact-number"><b>INNVOICE NUMBER:</b> ${Obj.invoice_no}</li>
                    <li><b>Manufacturer</b> ${Obj.manufacturer}</li>
                    <li><b>INNVOICE DATE</b> ${Obj.invoice_date.split('T')[0]}</li>
                    <li><b>YEAR OF WARRANTY</b> ${Obj.warranty_year}</li>
                    <li><b>DETAILS</b> ${Obj.product_details}</li>
            `)
        return productItem;
    }
    else if(category==='faculty')
    {
        return $(`<li id="faculty-id"> <b>Faculty ID:</b>  ${Obj.id} </li>
                    <li  id="faculty-name"><b>NAME:</b> ${Obj.name} </li>
                    <li ><b>Designation</b> ${Obj.designation}</li>
                    <li><b>Responsibility</b> ${Obj.responsibility}</li>
                    <li><b>Block</b> ${Obj.block}</li>
                    <li><b>Staffroom Floor</b> ${Obj.floor}</li>`)
    }
    else if(category==='department')
    {
        let departmentItem = $(`
          <li id="vendor-id"> <b>Department ID:</b>  ${Obj.id} </li>
                    <li  id="vendor-name"><b>NAME:</b> ${Obj.name} </li>
                    <li id="vendor-company-name"><b>BLOCK</b>  ${Obj.block}</li>
                   <li id="hod"><b>HOD :</b> ${Obj.hod}</li>
            `)
        return departmentItem;

    }
    else if(category==='lab')
    {
        let labItem = $(`
          <li id="vendor-id"> <b>Lab ID:</b>  ${Obj.id} </li>
                    <li  id="vendor-name"><b>NAME:</b> ${Obj.name} </li>
                    <li id=""><b>BLOCK</b>  ${Obj.block}</li>
                    <li><b>Technician: ${Obj.technician}</b></li>
                   <li id="hod"><b>Floor:</b> ${Obj.floor}</li>
            `)
        return labItem;

    }
    //Not yet Used -
    else if(category==='issue')
    {
        let productItemIssue = $(`
          <li id="vendor-id"> <b>Issue ID:</b>  ${Obj.id} </li>
                    <li  id="vendor-name"><b>NAME:</b> ${Obj.name} </li>
                    <li id="vendor-company-name"><b>Total quantity</b>  ${Obj.qty}</li>
            `)
        return productItemIssue
    }
    else if(category=== 'transfer')
    {

    }
}
