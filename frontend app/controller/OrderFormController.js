import { item_array,order_array,customer_array } from "../db/Database.js";
import OrderModel from "../models/OrderModel.js";
import ItemModel from "../models/ItemModel.js";
const currentDate = new Date();
import { validateMobile } from "../util/Validation.js";

export let total_revenue = 0;

$('#date').val(currentDate.toLocaleDateString());

const generateOrderId = ()=>{
    return "O"+(order_array.length+1);
}

let oID = generateOrderId();

$('#orderId').val(oID);

const customer_phonenumber_list = [];
const itemcode_list = [];

const cleanOderForm  = () => {
    $('#orderId').val(generateOrderId());
    $('#cnumber').val("");
    $('#icode').val("");
    $('#qtyOnHand').val("");
    $('#unitPrice').val("");
    $('#iqty').val("");
};

const loadOrderTable = ()=>{
    $("#orderTableBody").empty();
    order_array.map((order)=>{
        let data = `<tr><td>${order.orderId}</td><td>${order.date}</td><td>${order.customerNumber}</td><td>${order.itemCode}</td>      <td>${order.unitPrice}</td><td>${order.iqty}</td></tr>`
        $("#orderTableBody").append(data);
    })
};

$("#orders").on('click' , function(){

    for(let customer of customer_array){
        if(!customer_phonenumber_list.includes(customer.mobileNumber)){
            customer_phonenumber_list.push(customer.mobileNumber);
        }
    }

    $('#searchCustomerSuggestions').empty();

    customer_phonenumber_list.forEach((phoneNumber)=>{
        const option = document.createElement('option');
        option.value = phoneNumber;
        $('#searchCustomerSuggestions').append(option);
    });


    for(let item of item_array){
        if(!itemcode_list.includes(item.itemCode)){
            itemcode_list.push(item.itemCode);
        }
    }

    $('#searchItemSuggestions').empty();


    itemcode_list.forEach((item)=>{
        const option = document.createElement('option');
        option.value = item;
        $('#searchItemSuggestions').append(option);
    });

    $('#enter_btn').on('click',function(){
        let icode = $('#icode').val();
        item_array.forEach((itm)=>{
            if(itm.itemCode===icode){
                $('#qtyOnHand').val(itm.qty);
                $('#unitPrice').val(itm.price);
            }
        });
    });

     $('#icode').on('keydown', function(event){
        if(event.key === 'Enter'){
            let icode = $('#icode').val();
            item_array.forEach((itm)=>{
                if(itm.itemCode===icode){
                    $('#qtyOnHand').val(itm.qty);
                    $('#unitPrice').val(itm.price);
                }
            });
        }
    });

});

$('#place_order_btn').on('click', function(){
    let orderId = $('#orderId').val();
    let date = $('#date').val();
    let cnumber = $('#cnumber').val();
    let icode = $('#icode').val();
    let qtyOnHand = $('#qtyOnHand').val();
    let unitPrice = $('#unitPrice').val();
    let iqty = $('#iqty').val();

    if(!validateMobile(cnumber)){
        Swal.fire({
        title: "Invalid Input",
        text: "Enter customer number",
        icon: "question"
      });
    }else if(icode.length===0){
        Swal.fire({
            title: "Invalid Input",
            text: "Enter Item code",
            icon: "question"
          });
    }else if(qtyOnHand.length===0){
        Swal.fire({
            title: "Invalid Input",
            text: "Enter Item qty on hand",
            icon: "question"
          });
    }else if(unitPrice.length===0){
        Swal.fire({
            title: "Invalid Input",
            text: "Enter Item unitprice",
            icon: "question"
          });
    }else if(iqty.length===0){
        Swal.fire({
            title: "Invalid Input",
            text: "Enter Item qty",
            icon: "question"
          });
    }else{

        if(parseInt(qtyOnHand)<parseInt(iqty)){
            Swal.fire({
                title: "Not Available Item",
                text: "This item qty is "+qtyOnHand,
                icon: "question"
              }); 
        }else{
            let order = new OrderModel(orderId,date,cnumber,icode,parseFloat(unitPrice),parseInt(iqty));
            order_array.push(order);
            cleanOderForm();
            loadOrderTable();


            item_array.forEach((i,idx)=>{
                if(i.itemCode===icode){
                    let updateItem = new ItemModel(i.itemCode,i.description,parseInt((i.qty)-iqty),parseFloat(i.price));
                    item_array[idx] = updateItem;
                }
            });
        }

        
        total_revenue += (unitPrice * iqty);
        
    }


});