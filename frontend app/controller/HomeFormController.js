$(document).ready(function(){
    $.ajax({
        url:'http://localhost:8080/api/v1/customer/getAll',
        type:"GET",
        success:(res)=>{
            $("#customer-count").text(res.data.length);
        },
        error:(err)=>{
            console.error(err);
        }
    });

});

