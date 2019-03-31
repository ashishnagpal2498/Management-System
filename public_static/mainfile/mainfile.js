$(()=>{
    window.show = function(ev) {

        console.log(ev)
        let formrequest = $(ev).attr('myval-div')
        console.log(formrequest)
        $.get(`http://localhost:2121/${formrequest}`,(err,data)=>{
            console.log(err)
            console.log(data)
        })
    }
})