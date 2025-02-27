const currentDate = new Date();
import { validateMobile } from "../util/Validation.js";

$(document).ready(function(){
    getCustomerList();
    getItemList();
});

const getCustomerList = ()=>{
    let cnumber = $('#cnumber');
    cnumber.empty();

    $.ajax({
        url:'http://localhost:8080/api/v1/customer/getAll',
        type:"GET",
        success:(res)=>{
            res.data.forEach(customer => {
                let optionData = `
                <option value=${customer.id}>${customer.phone}</option>
            `;
            cnumber.append(optionData);    
        })},
        error:(err)=>{
            console.error(err);
        }
    });
}

const getItemList = ()=>{
    $('#searchItemSuggestions').empty();
    $.ajax({
        url:'http://localhost:8080/api/v1/item/getAll',
        type:"GET",
        success:(res)=>{
            res.data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.itemCode;
                $('#searchItemSuggestions').append(option);
        })},
        error:(err)=>{
            console.error(err);
        }
    });

}

$('#date').val(currentDate.toLocaleDateString());

const cleanOderForm  = () => {
    $('#cnumber').val("");
    $('#icode').val("");
    $('#qtyOnHand').val("");
    $('#unitPrice').val("");
    $('#iqty').val("");
};

const loadOrderTable = ()=>{
    $("#orderTableBody").empty();

};

$('#enter_btn').on('click',()=>{
    let icode = $('#icode').val();  
    $.ajax({
        url:`http://localhost:8080/api/v1/item/get_item_by_id/${icode}`,
        type:"GET",
        success:(res)=>{
            $('#qtyOnHand').val(res.data.qtyOnHand);
            $('#unitPrice').val(res.data.unitPrice);
            console.log(res);  
        },
        error:(err)=>{
            console.error(err);
        }
    });

});

$('#place_order_btn').on('click', function(){
    let date = $('#date').val();
    let phone = $('#cnumber').val();
    let icode = $('#icode').val();
    let qtyOnHand = parseInt($('#qtyOnHand').val());
    let unitPrice = parseFloat($('#unitPrice').val());
    let iqty = parseInt($('#iqty').val());

    console.log(phone);
    
    $.ajax({
        url:'http://localhost:8080/api/v1/order/place_order',
        type:"POST",
        headers:{"Content-Type": "application/json"},
        data: JSON.stringify({
            "date":date,
            "phone":phone,
            "icode":icode,
            "qtyOnHand":qtyOnHand,
            "unitPrice":unitPrice,
            "iqty":iqty,
        }),
        success:(res)=>{
            Swal.fire({
                icon: "success",
                title: res.msg,
            });
            cleanOderForm();

        },
        error:(res)=>{ 
            Swal.fire({
                icon: "error",
                text: res.msg,
            });
        }
    });

});