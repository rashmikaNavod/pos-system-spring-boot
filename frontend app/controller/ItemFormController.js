$(document).ready(function(){
    generateItemCode();
    loadItemTable();
});

const cleanItemForm  = () => {
    $('#itemCode').val(generateItemCode());
    $('#description').val("")
    $('#qty').val("");
    $('#price').val("");
};

const generateItemCode = ()=>{
    $.ajax({
        url:'http://localhost:8080/api/v1/item/getAll',
        type:"GET",
        success:(res)=>{
            let count = res.data.length+1;  
            let itemCode =  "i"+count;
            $('#itemCode').val(itemCode);
        },
        error:(err)=>{
            console.error(err);
        }
    });
};
   
const btnDisableOrEnable = (value)=>{
    $("#item_update_btn").prop("disabled", value);
    $("#item_delete_btn").prop("disabled", value);
    $("#item_add_btn").prop("disabled", !value);
};

btnDisableOrEnable(true);

$("#item_add_btn").on('click', ()=>{
    let itemCode = $('#itemCode').val(); 
    let description = $('#description').val();
    let qty = $('#qty').val();
    let price = $('#price').val();
    console.log(itemCode);
    
    
        if(description.length===0){
            Swal.fire({
                title: "Invalid Input",
                text: "Enter item description",
                icon: "question"
              });
        }else if(qty.length===0){
            Swal.fire({
                title: "Invalid Input",
                text: "Enter item qty",
                icon: "question"
              });
        }else if(price.length===0){
            Swal.fire({
                title: "Invalid Input",
                text: "Enter item price",
                icon: "question"
              });
        }else{
            
            $.ajax({
                url:'http://localhost:8080/api/v1/item/save',
                type:"POST",
                headers:{"Content-Type": "application/json"},
                data: JSON.stringify({
                    "itemCode":itemCode,
                    "description":description,
                    "qtyOnHand":qty,
                    "unitPrice":price
                }),
                success:(res)=>{
                    Swal.fire({
                        icon: "success",
                        title: res.msg,
                    });
                    cleanItemForm();
                    loadItemTable();
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
   
const loadItemTable = ()=>{
    $("#itemTableBody").empty();
    $.ajax({
        url:'http://localhost:8080/api/v1/item/getAll',
        type:"GET",
        success:(res)=>{
            res.data.forEach(item => {
            let data = 
            `<tr>
            <td>${item.itemCode}</td>
            <td>${item.description}</td>
            <td>${item.qtyOnHand}</td>
            <td>${item.unitPrice}</td>
            </tr>`
        $("#itemTableBody").append(data); 
        })},
        error:(err)=>{
            console.error(err);
        }
    });
};

let item_code;

$('#itemTableBody').on('click', 'tr', (e)=>{
    console.log(e.currentTarget); 

    item_code = $(e.currentTarget).find('td:eq(0)').text().trim();
    let description = $(e.currentTarget).find('td:eq(1)').text().trim();
    let qty = $(e.currentTarget).find('td:eq(2)').text().trim();
    let price = $(e.currentTarget).find('td:eq(3)').text().trim();

    $('#itemCode').val(item_code);
    $('#description').val(description)
    $('#qty').val(qty);
    $('#price').val(price);

    btnDisableOrEnable(false);
    
});

$("#item_update_btn").on('click',()=>{

        let itemCode = $('#itemCode').val(); 
        let description = $('#description').val();
        let qty = $('#qty').val();
        let price = $('#price').val(); 
    
        if(description.length===0){
            Swal.fire({
                title: "Invalid Input",
                text: "Enter item description",
                icon: "question"
              });
        }else if(qty.length===0){
            Swal.fire({
                title: "Invalid Input",
                text: "Enter item qty",
                icon: "question"
              });
        }else if(price.length===0){
            Swal.fire({
                title: "Invalid Input",
                text: "Enter item price",
                icon: "question"
              });
        }else{

            $.ajax({
                url:'http://localhost:8080/api/v1/item/update',
                type:"PUT",
                headers:{"Content-Type": "application/json"},
                data: JSON.stringify({
                    "itemCode":itemCode,
                    "description":description,
                    "qtyOnHand":qty,
                    "unitPrice":price
                }),
                success:(res)=>{
                    Swal.fire({
                        icon: "success",
                        title: res.msg,
                    });
                    cleanItemForm();
                    loadItemTable();
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
    
$("#item_delete_btn").on('click',()=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                cancelButton: "btn btn-primary",
                confirmButton: "btn btn-danger"
            },
            // buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You want to delete item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            reverseButtons: false
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    url:`http://localhost:8080/api/v1/item/delete/${item_code}`,
                    type:"DELETE",
                    success:(res)=>{
                        Swal.fire({
                            icon: "success",
                            title: res.msg,
                        });
                        cleanItemForm();
                        loadItemTable();
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


