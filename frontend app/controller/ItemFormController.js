import { item_array } from "../db/Database.js";
import ItemModel from "../models/ItemModel.js";

    $("#store").on('click', function(){
        loadItemTable();
    });

    const generateItemCode = ()=>{
        return "i"+(item_array.length+1);
    }
    let itemCode = generateItemCode();
    $('#itemCode').val(itemCode);
    
    const btnDisableOrEnable = (value)=>{
        $("#item_update_btn").prop("disabled", value);
        $("#item_delete_btn").prop("disabled", value);
    };
    btnDisableOrEnable(true);
    
    let selected_item_index = null;
    
    const loadItemTable = ()=>{
        $("#itemTableBody").empty();
        item_array.map((item)=>{
            let data = `<tr><td>${item.itemCode}</td><td>${item.description}</td><td>${item.qty}</td><td>${item.price}</td></tr>`
            $("#itemTableBody").append(data);
        })
    };
    
    const cleanItemForm  = () => {
        $('#itemCode').val(generateItemCode());
        $('#description').val("")
        $('#qty').val("");
        $('#price').val("");
    };
    
    $("#itemTableBody").on('click','tr', function(){
        let index = $(this).index();
        selected_item_index = $(this).index();
    
        let item_obj = item_array[index];
    
        let itemCode = item_obj.itemCode;
        let description = item_obj.description;
        let qty = item_obj.qty;
        let price = item_obj.price;
    
        $('#itemCode').val(itemCode);
        $('#description').val(description)
        $('#qty').val(qty);
        $('#price').val(price);
    
        btnDisableOrEnable(false);
    
    });
    
    $("#item_add_btn").on('click', ()=>{
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
            
            let item = new ItemModel(itemCode,description,parseInt(qty),parseFloat(price));
            console.log(item.itemCode);
            item_array.push(item);
            cleanItemForm();
            loadItemTable();
        }
       
    });
    
    $("#item_update_btn").on('click',()=>{
        console.log("hello");
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
            
            let item = new ItemModel(itemCode,description,parseInt(qty),parseFloat(price));
            item_array[selected_item_index] = item;
            cleanItemForm();
            loadItemTable();
            btnDisableOrEnable(true);
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
    
                item_array.splice(selected_item_index, 1);
                cleanItemForm();
                loadItemTable();
                btnDisableOrEnable(true);
                
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                
            }
        });    
    });




