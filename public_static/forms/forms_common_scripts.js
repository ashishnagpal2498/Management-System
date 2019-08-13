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
})