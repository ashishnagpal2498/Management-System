function fun(el){
    //Event-
    console.log(el)
    let list_item = $(el).attr('list-val')
    console.log('list item  ' + list_item)
    let detailDiv = $('#detailed-div')
    detailDiv.empty()
    console.log(detailDiv)
    console.log(typeof list_item)
    for( it of Vendors_List)
    {   console.log(typeof it.id)
        //List item is of type string hence Type Cas to number value
        if(+list_item === it.id)
        {   //console.log('abc')
            detailDiv.append(it.createElement())
        }
    }
}
let Vendors_List = []
function Vendor(Obj){
    this.id=Obj.vid;
    this.name = Obj.name;
    this.company = Obj.comapnyname;
    this.contact = Obj.personalcontact;
}
function menuoptions(){
    //Menu Bar toggle  -  Create a class and toggle it

    let smallmenu = $('#small-menu')[0]
    let fullscreendiv = $('#main-screen-div')[0]
    fullscreendiv.classList.toggle('slide-side-menu')
    // smallmenu.classList.toggle('smallmenu')
}
$(()=>{
    //Prototype Classes - 
    Vendor.prototype.createElement = function (){
        let vendorItem = $(`<div class="col-5" id="vendor-id">Vendor Id: ${this.id}</div>
        <div class="col-5" id="vendor-name">Name</div>
            <div class="col-5" id="vendor-company-name">Company Name ${this.company}</div>
        <div class="col-5" id="vendor-contact-number">Contact Number</div>
        <div class="col-5">Website</div>
            <div class="col-5">Email</div>`)
        return vendorItem;
    }
    Vendor.prototype.createLi = function() {
        let li = $('<li onclick="fun(this);"></li>')
        li.attr('list-val',`${this.id}`)
        li[0].textContent = this.company;
        return li;
    }


   
    //Menu Items Display
    window.show = function(ev) {
        
        let list = $('#list-items')
        list.empty()
        console.log(ev)
        //Request Going to that which option is clicked -
        let formrequest = $(ev).attr('myval-div')
        console.log(formrequest)
        
        $.get(`http://localhost:2121/${formrequest}`,(data)=>{
            //console.log(err)
            console.log(data)
            let list_items =[]
            //Converting Json data To JavaScript
            if(formrequest==='vendor') {
                for (item of data) {
                    let vendor = new Vendor(item)
                    console.log(item.comapnyname)
                    let li = vendor.createLi();
                    list_items.push(li)
                    Vendors_List.push(vendor);
                }
                console.log(list_items)
                list.append(list_items)
                console.log(Vendors_List);
            }
            if(formrequest==='product')
            {
                console.log(formrequest)
            }
        })
    }
})