// function getuserdetail (cb) {
//     $.get('/login/', (data) => {
//         cb(data);
//     })
// }

// function displayprofile (user) {
//
//     return $(`
//          <div class="col-md-12">
//                     <div class="row">
//                         <div class="col-md-4">
//                             <p style="font-weight: bold">User ID: </p>
//                         </div>
//
//                         <div class="col-md-6">
//                             ${user.userid}
//                         </div>
//                     </div>
//                     <div class="row">
//                         <div class="col-md-4">
//                             <p style="font-weight: bold">Name: </p>
//                         </div>
//                         <div class="col-md-6">
//                             <input id="myprofile-name" type="text">
//                         </div>
//                     </div>
//                     <div class="row">
//                         <div class="col-md-4">
//                             <p style="font-weight: bold">Email: </p>
//                         </div>
//                         <div class="col-md-6">
//                             <input id="myprofile-email" type="email">
//                         </div>
//                     </div>
//                     <div class="row">
//                         <div class="col-md-4">
//                             <p style="font-weight: bold">Phone: </p>
//                         </div>
//                         <div class="col-md-6">
//                             <input id="myprofile-phone" type="number">
//                         </div>
//                     </div>
//                     <div class="row">
//                         <div class="col-md-4">
//                             <p style="font-weight: bold">Designation: </p>
//                         </div>
//                         <div class="col-md-6">
//                             <input id="myprofile-designation" type="text">
//                         </div>
//                     </div>
//                 </div>
//         `)
// }

$(function () {
    let userid = $('#id')
    let name = $('#name')
    let username = $('#username')
    let designation = $('#designation')
    let phone = $('#phone')

    $.get('/login',(data)=>{
        console.log(data)
        if(data.user) {
            userid.attr('value', data.user[0].id);
            name.attr('value', data.user[0].name);
            username.attr('value', data.user[0].username)
            designation.attr('value', data.user[0].designation)
        }
        else
        {
            window.location = './Login/login.html'
        }
    })

    // let myprofileid = $('#myprofileid')


       // myprofileid.append(displayprofile(user))

})