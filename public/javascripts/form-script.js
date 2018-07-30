

const firstNameErr =  `<div class="form-error"><img src="/images/svg/error.svg" width="17px" height="17px"  class="mr-5" alt=""> First name is required. </div>`;
const lastNameErr = `<div class="form-error"><img src="/images/svg/error.svg" width="17px" height="17px"  class="mr-5" alt=""> Last name is required. </div>`;
const emailErr= `<div class="form-error"><img src="/images/svg/error.svg" width="17px" height="17px"  class="mr-5" alt=""> Email is required. </div>`;
const passwordErr = `<div class="form-error"><img src="/images/svg/error.svg" width="17px" height="17px"  class="mr-5" alt=""> Password is required. </div>`;
const emailValidateErr = `<div class="form-error"><img src="/images/svg/error.svg" width="17px" height="17px"  class="mr-5" alt=""> Please enter a valid email address. </div>`;
const passwordValidateErr = `<div class="form-error"><img src="/images/svg/error.svg" width="17px" height="17px"  class="mr-5" alt=""> Must contain between 6 and 12 characters.</div>`;


const errorStore = {
  "firstname_required"  :   firstNameErr,
  "lastname_required"   :   lastNameErr,
  "email_required"      :   emailErr,
  "password_required"   :   passwordErr,
  "email_validate"      :   emailValidateErr,
  "password_validate"   :   passwordValidateErr
}


var errors = [
              "firstname_required",
              "lastname_required",
              "email_validate",
              "email_required",
              "password_validate",
              "password_required"
              ];

function passLength(fieldname) {
  const field = $(this);
  if (field.val().length > 6) {
    return true;
  }
  return console.log(`${fieldname} must have a minimum of 6 characters`);
}


function addToErrors(errorName){
  if(errors.includes(errorName)){
    return;
  }
 errors.push(errorName);
 return console.log(errors);
}

function removeFromErrors(errorName){
 if(errors.includes(errorName)){
   var index = errors.indexOf(errorName);
   if (index > -1) {
    errors.splice(index, 1);
   }
   return console.log(errors);
 }
 return;

}



//check firstname and lastname for empty field
function firstnameLastname(fieldclass){
  const className = fieldclass;
  var fieldclass = `.${fieldclass}`;
  $(fieldclass).on('keyup', function(e) {
    const field = $(e.target);
    const fieldname = field.attr('attr-name');
      if (field.val()) {
        field.removeClass('border-red');
        removeFromErrors(`${className}_required`);
        return field.prev('.form-label').html(fieldname + '*');
      }
      const error = `<div class="form-error"><img src="/images/svg/error.svg" width="17px" height="17px"  class="mr-5" alt=""> ${fieldname} is required. </div>`;
      field.addClass('border-red');
      addToErrors(`${className}_required`);
      return field.prev('.form-label').html(error);
  })
}


//check email and password for empty field

function emailPassword(fieldclass){
    const className = fieldclass;
    var fieldclass = `.${fieldclass}`;
    $(fieldclass).on('keyup', function(e) {
    const field = $(e.target);
    const fieldname = field.attr('attr-name');
    if(field.val().length<1){

      if (field.val()) {
        field.removeClass('border-red');

        return field.prev('.form-label').html(fieldname + '*');
      }
      const error = `<div class="form-error"><img src="/images/svg/error.svg" width="17px" height="17px"  class="mr-5" alt=""> ${fieldname} is required. </div>`;
      field.addClass('border-red');
      addToErrors(`${className}_required`);
      return field.prev('.form-label').html(error);
    }
   return;
  })
}


//validate Email
function validateEmail(input){
  const className  = input;
  var input = `.${input}`;
  $(input).on('keyup', function(e) {
    const field = $(e.target);
    const email = field.val();
    const fieldname = field.attr('attr-name');
    if (email.length >= 1) {
      removeFromErrors(`${className}_required`);
      const pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
      if (pattern.test(email)) {
        field.removeClass('border-red');
        removeFromErrors(`${className}_validate`);
        return field.prev('.form-label').html(fieldname + '*');
      }else{
        field.addClass('border-red');
        const error = `<div class="form-error"><img src="/images/svg/error.svg" width="17px" height="17px"  class="mr-5" alt=""> Please enter a valid email address. </div>`;
        addToErrors(`${className}_validate`);
        return field.prev('.form-label').html(error);
      }

    }
  })
}

//validate Password
function validatePassword(input){
   const className = input;
   var input = `.${input}`;

  $(input).on('keyup', function(e) {

    const field = $(e.target);
    const password = field.val();
    const fieldname = field.attr('attr-name');
    if (password.length >= 1) {
      removeFromErrors(`${className}_required`);
      if(password.length>=1 && password.length<=5){

        field.addClass('border-red');
        const error = `<div class="form-error"><img src="/images/svg/error.svg" width="17px" height="17px"  class="mr-5" alt=""> Must contain between 6 and 12 characters.</div>`;
        addToErrors(`${className}_validate`);
        return field.prev('.form-label').html(error);

      }else{
            field.removeClass('border-red');
            removeFromErrors(`${className}_validate`);
            return field.prev('.form-label').html(fieldname + '*');
      }
  }
  })//password
}








firstnameLastname('firstname');
firstnameLastname('lastname');
emailPassword('email');
emailPassword('password');
validatePassword('password');
validateEmail('email');



function getClassName(error){
  const indexOf_ = error.indexOf("_");
  const  ClassName = error.substr(0,indexOf_);
  return ClassName;
}
  function callRequiredErrors(){

    //get and send errors with required errors
    errors.forEach(function(error){
      const className = getClassName(error);
      const errorName = error;
      if(errorName.includes('required')){
        $(`.${className}`).prev('.form-label').html(errorStore[error]);
        // console.log(getClassName(error))
      }
    })

  }


function callValidateErrors(){

  errors.forEach(function(error){
    const className = getClassName(error);
    if(error.includes(className) && error.includes('validate')){

      const newError = error;
      const newClass = getClassName(newError);
      errors.forEach(function(newError){
        if(newError.includes(newClass) && newError.includes('required')){
         return;
       }else{
        $(`.${newClass}`).prev('.form-label').html(errorStore[`${newClass}_validate`]);
       }


        })

    }
  })


}
//


$('input').on('click',function(){
  if($('button[type=submit]').is('.ripple')){
    $('button[type=submit]').removeClass('ripple');

  }
})
    $('button[type=submit]').on('click',function(e){
      if(errors.length >= 1 ){
        e.preventDefault();
        callRequiredErrors();
        callValidateErrors();
        $(e.target).addClass('ripple');
      }
      return;
    })


//toggle password
$('.password').on('keyup',function(e){
  if($(this).val().length>=1){
    $('.toggle-password').css('display','inline');
  }else{
      $('.toggle-password').css('display','none');
  }
})



$('.js-toggle-password').on('click',function(e){
  console.log('yes')
  const target = $(e.target);
  const password = $('.password');
  if(!target.is("[show]")){
    target.html('Hide');
    target.attr('show','yes');
    return password.attr('type','text');
  }else{
    target.html('Show');
    target.removeAttr('show');
    return password.attr('type','password');
  }

})
