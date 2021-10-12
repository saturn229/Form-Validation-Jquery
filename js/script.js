//focus on name field
$('#name').focus();

//hides other-title text field till it is choosen
$( "#other-title" ).hide();

$('#title').on('change', function () {
  let selected = $(this).val();
  if (selected === 'other') {
    $( "#other-title" ).show();
  } else {
    $( "#other-title" ).hide();
  }
});


//t-shirt functionallity
$('#color').hide();
$('#design option').eq(0).attr('disabled', true);
$('#design').change(function (e) {
    const $theme = $(this).val();

    function colors(color1, color2){
        $('#color').val('');
        for(let i = 0; i < color1.length; i++){
            let option1 = "#color option[value = " + color1[i] + "]"
            $(option1).hide()
        }
        for(let y = 0; y < color2.length; y++){
            let option2 = "#color option[value = " + color2[y] + "]"
            $(option2).show()
        }

    };
    if($theme !== 'Select Theme'){
        if($theme === 'js puns'){
            colors(["tomato", "steelblue", "dimgrey"], ["cornflowerblue", "darkslategrey", "gold"])
            $('#color').show();
        } else if ($theme === 'heart js'){
            colors(["cornflowerblue", "darkslategrey", "gold"], ["tomato", "steelblue", "dimgrey"])
            $('#color').show();
        }
    }
});



//event listener for check box functions
let totalCost = 0;
let $input = $('input[type="checkbox"]');
const $div = $("<div id='totalCost'> Total Cost: "+ totalCost +" </div>");
const $fieldSet = $('fieldset').eq(2);
$fieldSet.append($div);
$div.hide();

$('input[type="checkbox"]').change(function(e){
    let $box = $(this);
    let $cost = parseInt($(this).attr("data-cost"));
    const checkboxes = $('input[type="checkbox"]')
    if($box.is(":checked")){
        totalCost += $cost;
        $div.html("Total Cost: " + totalCost)
    } else if ($box.is(':checked') === false){
        totalCost -= $cost;
        $div.html("Total Cost: " + totalCost)
    }
    $div.show();


    let $dateTime = $(this).attr("data-day-and-time");


    for(let i = 0; i < $input.length; i++){

        let $checkbox = $('input[type="checkbox"]')[i];
        let $currentDateTime = $checkbox.getAttribute("data-day-and-time");
        if($dateTime === $currentDateTime && $checkbox !== this){
            $checkbox.disabled = true;
        }

        if ($box.is(":checked") === false){
            $checkbox.disabled = false;
        }



    }
});





//code for payment functionallity
$('#payment option').eq(0).hide(); //hides select payment method so cant be choosen
$('select option[value = "credit card"]').attr('selected', true); //selects credit card as primary option

//hides paypal and bitcoin divs
$('#paypal').hide();
$('#bitcoin').hide();

//event listener for payment options selections
$('#payment').change(function (e){
    let selected = $(this).val();


    //if statement for which payment method to display
    if (selected === 'credit card'){
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
        $('#select method').prop('disabled' ,true);
    } else if (selected === 'paypal'){
        $('#credit-card').hide();
        $('#paypal').show();
        $('#bitcoin').hide();
        $('#select method').prop('disabled' ,true);

    } else if (selected === 'bitcoin'){
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').show();
        $('#select method').prop('disabled' ,true);

    } else {
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').hide();
    }
});






//************************************
//form validation
//************************************
const $name = $('#name');
const $nameLabel = $('label[for="name"]');
const $email = $('#mail')
const $emailLabel = $('label[for="mail"]');
const $ccNum = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');
const $ccNumLabel = $('label[for="cc-num"]');
const $zipLabel = $('label[for="zip"]');
const $cvvLabel = $('label[for="cvv"]');
const $payment = $('#payment').val()
const $activites = $('.actTitle');

//Name field can't be blank.
function nameValidation(){
    const nameValue = $name.val();
    if(/^[a-zA-Z ]{2,30}$/.test(nameValue)){
        $name.css("border", "2px solid rgb(111, 157, 220)");
        return true;
    } else {
        $name.css("border-color", "red");
        return false;
    }
}
// Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
function emailValidation(){
    const emailValue = $email.val();
    if (/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue)){
        $email.css("border", "2px solid rgb(111, 157, 220)");
        return true;
    } else {
        $email.css("border-color", "red");
        return false;
    }
}

//User must select at least one checkbox under the "Register for Activities" section of the form.
function activityValidation(){
    if(totalCost === 0){
        console.log('a');
        $activites.css("color", "red");
        return false;
    } else {
        console.log('b');
        return true;
    }


}
// If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
// Credit Card field should only accept a number between 13 and 16 digits.

//figure out how to show that credit card is selected
if (payment === 'credit card'){
  function ccNumValidation(){
      const ccNumValue = $ccNum.val();
      if (/^\d{13,16}$/.test(ccNumValue)){
          $ccNum.css("border", "2px solid rgb(111, 157, 220)");
          return true;
      } else {
          $ccNum.css("border-color", "red");
          return false;
      }
  }

  //The Zip Code field should accept a 5-digit number.
  function zipValidation(){
      const zipValue = $zip.val();
      if (/[0-9]{5}/.test(zipValue)){
          $zip.css("border", "2px solid rgb(111, 157, 220)");

          return true;
      } else {
          $zip.css("border-color", "red");
          return false;
      }
  }

  //The CVV should only accept a number that is exactly 3 digits long.
  function cvvValidation(){
      const cvvValue = $cvv.val();
      if (/[0-9]{3}/.test(cvvValue)){
          $cvv.css("border", "2px solid rgb(111, 157, 220)");
          return true;
      } else {
          $cvv.css("border-color", "red");
          return false;
      }
  }
}



$(document).submit(function (e){

  if(payment === 'credit card' ){
      if(nameValidation(), emailValidation(), activityValidation(), ccNumValidation(), zipValidation(), cvvValidation()){
          console.log("A");
      } else {
        e.preventDefault();
      }
  } else {
      if(nameValidation(), emailValidation(), activityValidation()){
          console.log("B");
      } else {
        e.preventDefault();
      }
    }


});
