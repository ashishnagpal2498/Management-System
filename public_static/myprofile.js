function getuserdetail (cb) {
    $.get('/login/', (data) => {
        cb(data);
    })
}

function displayprofile (user) {

    return $(`
         <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-4">
                            <p style="font-weight: bold">User ID: </p>
                        </div>
                       
                        <div class="col-md-6">
                            ${user.userid}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <p style="font-weight: bold">Name: </p>
                        </div>
                        <div class="col-md-6">
                            <input id="myprofile-name" type="text">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <p style="font-weight: bold">Email: </p>
                        </div>
                        <div class="col-md-6">
                            <input id="myprofile-email" type="email">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <p style="font-weight: bold">Phone: </p>
                        </div>
                        <div class="col-md-6">
                            <input id="myprofile-phone" type="number">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <p style="font-weight: bold">Designation: </p>
                        </div>
                        <div class="col-md-6">
                            <input id="myprofile-designation" type="text">
                        </div>
                    </div>
                </div>   
        `)
}

$(function () {
    let userid = $('#uid')
    let name = $('#username')
    let email = $('#email')
    let designation = $('#designation')
    

    let myprofileid = $('#myprofileid')


        myprofileid.append(displayprofile(user))

})