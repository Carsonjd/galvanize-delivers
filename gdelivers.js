$('document').ready(function(){

var subTotal = 0;
var total = 0;
var tax = 0;

function priceList(){
  $('#subtotal').text('$'+subTotal.toFixed(2));
  tax = subTotal * 0.08;
  $('#tax').text('$'+tax.toFixed(2));
  total = tax + subTotal;
  $('#total').text('$'+total.toFixed(2));
}

var menuObj = {
  'A Boiger!': 10.50,
  'Oice Cream!': 5.00,
  'Piece-a-Pizza!': 8.00,
  'Rack-a-Ribs!': 11.00
}

//Create and append menu items to form plus price calulations
$('#menu').find('button').on('click',function(event){
  var newTr = $('<tr>');
  var itemName = $(event.target).siblings('h5').text();
  var itemPrice = $(event.target).siblings('p').text()
  newTr.append($('<td>').text(itemName))
       .append($('<td>'))
       .append($('<td>').addClass('right-align').text(itemPrice));
  $('tbody').append(newTr);
  subTotal += menuObj[itemName];
  priceList();
})

//Clear function for use in order and cancel buttons
function clearAll(){
  $('tbody').empty();
  subTotal = 0;
  priceList();
  $('#name').val('').removeAttr('active');
  $('#phone').val('').removeAttr('active');
  $('#address').val('').removeAttr('active');
}
//Cancel button actions
$('#cancel').click(function(){
  clearAll()
})

//Order button actions
$('#order-button').click(function(event){
  event.preventDefault();
  Materialize.toast('Your Order Has Been Placed!', 3000);
  clearAll();
})

//Form validation
$('#name').blur(function(){
  if($('#name').val().length < 1){
    Materialize.toast('Please Enter Your Name', 4000);
  }else if(subTotal < 1){
    Materialize.toast('Please Choose An Item', 4000);
  }
});
$('#phone').blur(function(){
  if($('#phone').val().search(/(\d{3}).*(\d{3}).*(\d{4})/g) === -1){
    Materialize.toast('Please Enter A Valid Phone Number', 4000);
  }else if(subTotal < 1){
    Materialize.toast('Please Choose An Item', 4000);
  }
});
$('#address').keyup(function(){
  var phoneVal = $('#phone').val().search(/(\d{3}).*(\d{3}).*(\d{4})/g) === -1;
  var nameVal = $('#name').val().length < 1;

  if($('#address').val().length < 1){
    Materialize.toast('Please Enter A Valid Address', 4000);
  }else if(subTotal < 1){
    Materialize.toast('Please Choose An Item', 4000);
  }
  else if(subTotal >1 && $('#address').val().length > 1 && phoneVal === false && nameVal === false){
    $('#order-button').removeAttr('disabled');
  }
});






});
