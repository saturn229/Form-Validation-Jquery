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
const $div = $("<div id='totalCost'> Total Cost: "+ totalCost +" </div>");
const $fieldSet = $('fieldset').eq(2);
$fieldSet.append($div);
$div.hide();

$('input[type="checkbox"]').change(function(e){
    let $box = $(this);
    let $cost = parseInt($(this).attr("data-cost"));
    if($box.is(":checked")){
        totalCost += $cost;
        $div.html("Total Cost: " + totalCost)
    } else if ($box.prop('checked', false)){
        totalCost -= $cost;
        $div.html("Total Cost: " + totalCost)
    }
    $div.show();


    let $dateTime = $(this).attr("data-day-and-time");
    // 1. In the change event for the activities section loop through the check boxes.
    for(let i = 0; i < $('input[type="checkbox"]').length; i++){
        // 2. grab the current checkbox that is being checked in the loop in a variable.
        let $checkbox = $('input[type="checkbox"]')[i];
        // 3. grab the current checkbox day and time attribute and save in a variable.
        let $currentDateTime = $checkbox.getAttribute("data-day-and-time");
        // 4. In an if statement check the current check box day and time and compare it to the clicked checkbox day and time.
        // 5. If current day and time and clicked day and time are the same AND if the current checkbox is not clicked -
        //    set the disabled property of the current check box to true. ELSE set it to false.
        if($currentDateTime === $dateTime && $checkbox.checked == false){
            $checkbox.disabled = true;
        } else {
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
$('#payment').on('change', function (){
    let selected = $(this).val();


    //if statemnet for which payment method to display
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
const $warning = $('<label></label>');
const $ccNum = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');
const $ccNumLabel = $('label[for="cc-num"]');
const $zipLabel = $('label[for="zip"]');
const $cvvLabel = $('label[for="cvv"]');

//Name field can't be blank.
function nameValidation(){
    const nameValue = $name.value
    if(/^[a-zA-Z]+$/.test(nameValue)){
        return true;
    } else {
        return false;
    }
}


//Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
//User must select at least one checkbox under the "Register for Activities" section of the form.
//If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
//Credit Card field should only accept a number between 13 and 16 digits.
//The Zip Code field should accept a 5-digit number.
//The CVV should only accept a number that is exactly 3 digits long.
