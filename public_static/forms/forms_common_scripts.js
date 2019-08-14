function headerObj() {
    return (`<div class="container-fluid">
    <div class="row" id="header-row">
        <div class="col-5 col-md-3 pt-2">LOGO and Name</div>
        <div class="col-12 p-0 p-md-2  col-md-5 responsive-menu">
            <div class="navbar" id="header-nav-bar">
                <button class=" btn nav-item cross-button" onclick="closemenu()" ><i class="fas fa-times"></i></button>
                <div class="nav-item"> <a href="/"> Home</a></div>
                <div class="nav-item dropdown" >
                    <a style="text-decoration: none;color: inherit"  href="../mainfile/mainfile.html?category=product" id="dropdownMenuLink">Products </a>
                </div>
                <div class="nav-item dropdown">
                    <a href="../mainfile/mainfile.html?category=department" id="DepartmentLink"> Departments</a>
                  
                </div>
                <div class="nav-item"> <a href="../mainfile/mainfile.html?category=vendor"> Vendor</a></div>
                <div class="nav-item"> <a href=""> Faqs</a></div>
            </div>
        </div>

        <div class="col-6 col-md-4">
            <div class="row pt-2">
                <div class="col-9 col-md-6 nav-item">
                </div>
                <script>
                    function myFunction() {
                        document.getElementById("myDropdown").classList.toggle("show");
                    }
                </script>
                <div class="col-5 dropdown-menu-own" id="login-user">
                    <div class="dropbtn" onclick="myFunction()" ><i class="fas fa-user" > </i> <span id="username" >Username</span></div>
                    <div class="dropdown-content" id="myDropdown" >
                        <a href="http://localhost:2121/myprofile.html">View Profile</a>
                        <a href="/logout">Logout</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-1 pt-2"  onclick="openmenu()" id="responsive-menu-bar"><i class="fas fa-bars"></i></div>
    </div>
</div>`)
}
function sideMenuOptions()
{
    let menuOptions = $(` <a class="col-12 side-menu-fields" href="../mainfile/mainfile.html?category=vendor" > Vendor
                    <i class="fa fa-user slide-menu-icons" title="vendor"></i>
                </a>
                <a class="col-12 side-menu-fields" href="../mainfile/mainfile.html?category=product">Product
                    <i class="fa fa-shopping-bag slide-menu-icons" title="product" ></i>
                </a>
                <a class="col-12 side-menu-fields" href="../mainfile/mainfile.html?category=department">Department
                    <i class="far fa-building slide-menu-icons" title="Department"></i>
                </a>
                <a class="col-12 side-menu-fields" href="../mainfile/mainfile.html?category=lab">Lab
                    <i class="fas fa-desktop slide-menu-icons" title="Labs"></i>
                </a>
                <a class="col-12 side-menu-fields" href="../mainfile/mainfile.html?category=faculty">Faculty
                    <i class="fas fa-address-card slide-menu-icons" title="Faculty"></i>
                </a>
                <a class="col-12 side-menu-fields" href="../mainfile/mainfile.html?category=issue">Issue
                    <i class="fas fa-retweet slide-menu-icons" title="Issue"></i>
                </a>
                <a class="col-12 side-menu-fields" href="../mainfile/mainfile.html?category=transfer">Transfer
                    <i class="fas fa-exchange-alt slide-menu-icons" title="Transfer"></i>
                </a>
                <a class="col-12" href="../mainfile/mainfile.html?category=return">Return
                    <i class="fas fa-sync-alt slide-menu-icons" title="Return"></i>
                </a>
                <a class="col-12" href="../mainfile/mainfile.html?category=store">Store
                    <i class="fas fa-database slide-menu-icons" title="Store"></i>
                </a>`)
    let sideMenu = $('#side-menu-options')
    sideMenu.empty();
    sideMenu.append(menuOptions);

}
$(()=>{
    $.get('http://localhost:2121/login',(data)=>{
        console.log('User Check')
        if(data.user != undefined)
        {   //Admin login - Set the user Value-
            let username_Div = $('#username')
            username_Div.empty();
            username_Div.append(data.user[0].username)
            console.log(data.user[0].name);
        }

    })
    let bodyObj = $('body')
    bodyObj.prepend(headerObj());
    sideMenuOptions();
})