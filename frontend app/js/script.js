const home = $("#home");
const customer = $("#customer")
const store = $("#store")
const orders = $("#orders")

const customer_div = $("#customer-div");
const item_div =  $("#item-div");
const order_div =  $("#order-div");
const home_div = $("#home-div");

home.on('click', ()=>{
    home_div.show();
    customer_div.hide();
    item_div.hide();
    order_div.hide(); 
});

customer.on('click', ()=>{
    customer_div.show();
    item_div.hide();
    order_div.hide();
    home_div.hide();
});

store.on('click', ()=>{
    customer_div.hide();
    item_div.show();
    order_div.hide();
    home_div.hide();
});

orders.on('click', ()=>{
    customer_div.hide();
    item_div.hide();
    order_div.show();
    home_div.hide();
});