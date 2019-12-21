


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
$('#color').eq(0).hide();

$('#design option').eq(0).attr('disabled', true)

function themeColor(theme1, theme2){
    $('#color').val('')
    for(i = 0; i < theme1.length; i++){
        let firstTheme = "#color option[value =" + theme1[i]+ "]";
        $(firstTheme).hide();
    }
    for(y = 0; y < theme2.length; y++){
        let secondTheme = "#color option[value =" + theme2[i]+ "]";
        $(secondTheme).hide();
    }
}
$('#design').change(function (e){
    const $design = $(this).val();
    if($design === 'js puns'){
        themeColor(['cornflowerblue', 'darkslategrey', 'gold'], ['tomato', 'steelblue', 'dimgrey']);
        $('#color').show()
    }

    if($design === 'heart js'){
        themeColor(['cornflowerblue', 'darkslategrey', 'gold'], ['tomato', 'steelblue', 'dimgrey']);
        $('#color').show()
    }
});

//event listener for check box functions
$('input[type = "checkbox"]').change(function(event){
    function register(box1, box2){
        if($(box1).is(':checked')){
            $(box2).attr('disabled', true);
        } else {
            $(box2).attr('disabled', false);
        }
    };



    register('input[name="js-frameworks"]', 'input[name="express"]');
    register('input[name="express"]', 'input[name="js-frameworks"]');
    register('input[name="js-libs"]', 'input[name="node"]');
    register('input[name="node"]', 'input[name="js-libs"]');

    //code for creating and totaling cost of checkboxes selected
    let $cost = 0;
    const $checkedBoxes = $('input[type = "checkbox"]:checked');
    $cost += $checkedBoxes.length * 100;
    if($('input[name="all"]').is(':checked')){
        $cost += 100;
    }

    //look over this
    $('#totalCost').remove();
    const elem = "<div id='totalCost'>Total Cost: $" + $cost + "</div>"
    const $fieldSet = $('fieldset').eq(2);
    $fieldSet.append(elem);


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
const $ccNum = $('#cc-Num');
const $zip = $('#zip');
const $cvv = $('#ccv');
const $ccNumLabel = $('label[for="ccNum"]');
const $zipLabel = $('label[for="zip"]');
const $cvvLabel = $('label[for="ccv"]');
const error = $("<label></label>")
$('form').append(error);
const empty = error.text('fill in empty fields');
empty.hide()



$('button').on('click', function(e){
    if($name.val() === ""){
        $nameLabel.css({"color": "red"});
        $name.css({"borderColor": "red"});
        e.preventDefault();


    }

    if ($email.val() === ''){
        $emailLabel.css({"color": "red"});
        $email.css({"borderColor": "red"});
        e.preventDefault();

    }

    $('.activities input').each(function(i){
        if($(this).prop('checked')){
            $('.activities legend').css({'color': 'red', "font-weight": 'bold'})
            e.preventDefault();
        }
    });


    if($('#payment').val() === 'credit card'){
        if ($ccNum.val() === ''){
            $ccNumLabel.css({"color": "red"});
            $ccNum.css({"borderColor": "red"});
            e.preventDefault();
        }
        if ($zip.val() === ''){
            $zipLabel.css({"color": "red"});
            $zip.css({"borderColor": "red"});
            e.preventDefault();
            empty.show()
        }
        if ($cvv.val() === ''){
            $cvvLabel.css({"color": "red"});
            $cvv.css({"borderColor": "red"});
            e.preventDefault();
        }
    }

});


















//
