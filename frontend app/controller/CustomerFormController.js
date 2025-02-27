import { validateMobile,validateEmail } from "../util/Validation.js";

$(document).ready(function(){
    loadCustomerTable();
});

const btnDisableOrEnable = (value)=>{
    $("#customer_update_btn").prop("disabled", value);
    $("#customer_delete_btn").prop("disabled", value);
    $("#customer_add_btn").prop("disabled", !value);
};

btnDisableOrEnable(true);

const cleanCustomerForm  = () => {
    $('#mobileNumber').val("");
    $('#name').val("")
    $('#email').val("");
    $('#address').val("");
};

const loadCustomerTable = ()=>{

    $("#customerTableBody").empty();
    $.ajax({
        url:'http://localhost:8080/api/v1/customer/getAll',
        type:"GET",
        success:(res)=>{
            res.data.forEach(customer => {
            let data = 
            `<tr>
            <td>${customer.id}</td>
            <td>${customer.phone}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.address}</td>
            </tr>`
        $("#customerTableBody").append(data); 
        })},
        error:(err)=>{
            console.error(err);
        }
    });

};

$("#customer_add_btn").on('click', (e)=>{
    
    e.preventDefault();

    let mobileNumber = $('#mobileNumber').val(); 
    let name = $('#name').val();
    let email = $('#email').val();
    let address = $('#address').val();

    if(!validateMobile(mobileNumber)){
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Mobile",
        });
    }else if(name.length===0){
        Swal.fire({
            title: "Invalid Input",
            text: "Enter customer name",
            icon: "question"
          });
    }else if(!validateEmail(email)){
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Email",
        });
    }else if(address.length===0){
        Swal.fire({
            title: "Invalid Input",
            text: "Enter customer address",
            icon: "question"
          });
    }else{
        
        $.ajax({
            url:'http://localhost:8080/api/v1/customer/save',
            type:"POST",
            headers:{"Content-Type": "application/json"},
            data: JSON.stringify({
                "phone":mobileNumber,
                "name":name,
                "email":email,
                "address":address
            }),
            success:(res)=>{
                Swal.fire({
                    icon: "success",
                    title: res.msg,
                });
                cleanCustomerForm();
                loadCustomerTable();
            },
            error:(res)=>{ 
                Swal.fire({
                    icon: "error",
                    text: res.msg,
                });
            }
        })

        // let customer = new CustomerModel(mobileNumber,name,email,address);
        // customer_array.push(customer);
         
    }
});

let customer_id;

$('#customerTableBody').on('click', 'tr', (e)=>{
    console.log(e.currentTarget); 

    customer_id = $(e.currentTarget).find('td:eq(0)').text().trim();
    let mobileNumber = $(e.currentTarget).find('td:eq(1)').text().trim();
    let name = $(e.currentTarget).find('td:eq(2)').text().trim();
    let email = $(e.currentTarget).find('td:eq(3)').text().trim();
    let address = $(e.currentTarget).find('td:eq(4)').text().trim();

    $('#mobileNumber').val(mobileNumber);
    $('#name').val(name)
    $('#email').val(email);
    $('#address').val(address);

    btnDisableOrEnable(false);
    
});

$('#customer_update_btn').on('click', function(){

    let mobileNumber = $('#mobileNumber').val(); 
    let name = $('#name').val();
    let email = $('#email').val();
    let address = $('#address').val();

    if(!validateMobile(mobileNumber)){
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Mobile",
        });
    }else if(name.length===0){
        Swal.fire({
            title: "Invalid Input",
            text: "Enter customer name",
            icon: "question"
          });
    }else if(!validateEmail(email)){
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Email",
        });
    }else if(address.length===0){
        Swal.fire({
            title: "Invalid Input",
            text: "Enter customer address",
            icon: "question"
          });
    }else{
        $.ajax({
            url:'http://localhost:8080/api/v1/customer/update',
            type:"PUT",
            headers:{"Content-Type": "application/json"},
            data: JSON.stringify({
                "id":customer_id,
                "phone":mobileNumber,
                "name":name,
                "email":email,
                "address":address
            }),
            success:(res)=>{
                Swal.fire({
                    icon: "success",
                    title: res.msg,
                });
                cleanCustomerForm();
                loadCustomerTable();
                btnDisableOrEnable(true);
            },
            error:(res)=>{ 
                Swal.fire({
                    icon: "error",
                    text: res.msg,
                });
            }
        });   
    }

});

$('#customer_delete_btn').on('click', function(){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            cancelButton: "btn btn-primary",
            confirmButton: "btn btn-danger"
        },
        // buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You want to delete customer?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        reverseButtons: false
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                url:`http://localhost:8080/api/v1/customer/delete/${customer_id}`,
                type:"DELETE",
                success:(res)=>{
                    Swal.fire({
                        icon: "success",
                        title: res.msg,
                    });
                    cleanCustomerForm();
                    loadCustomerTable();
                    btnDisableOrEnable(true);
                },
                error:(res)=>{ 
                    Swal.fire({
                        icon: "error",
                        text: res.msg,
                    });
                }
            }); 
            
            
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            
        }
    });
});