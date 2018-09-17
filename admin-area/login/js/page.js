$(document).ready(function() {

  /* ========== SELECT MENU POINT ========== */

  $('header.main ul a:eq(5)').addClass('active');
  $('nav.navigation ul a:eq(5)').addClass('active');

  /* ========== FORM CONTROLS ========== */

  $('.form-control').each(function(index, el) {
    changeState($(this));
  });

  $('.form-control').focusout(function(event) {
    changeState($(this));
  });

  function changeState($formControl) {
    if($formControl.val().length > 0) {
      $formControl.addClass('has-value');
    } else {
      $formControl.removeClass('has-value');
    }
  }

  $('#contact_form button').click(function(event) {
    validate(1);
  });

  $('#contact_form .input-group .form-control').each(function() {
    $(this).keyup(function(event) {
      if(event.keyCode == 13) {
        if(!$(this).is('textarea')) {
          validate(1);
        }
      } else {
        if(IS_VALIDATED) {
          validate(0);
        }
      }
    });
  });

  /* ========== FORM VALIDATION ========== */

  $('#login button').click(function(event) {
    validate(1);
  });

  $('#login .input-group .form-control').each(function() {
    $(this).keyup(function(event) {
      if(event.keyCode == 13) {
        validate(1);
      } else {
        if(IS_VALIDATED) {
          validate(0);
        }
      }
    });
  });

  var IS_VALIDATED = false;

  function validate(ENTER) {
    var PASSWORD = $('#password').val();

    $.post('system/login.php', {
      password: PASSWORD,
      enter: ENTER
    }, function(data) {
      if(data == "SUCCESS") {
        window.location.replace("/admin-area");
      } else if(data == "LEHRER") {
        console.log('LEHRER');
        window.location.replace("/admin-area/english-assignments");
      } else if(data == "FAILURE") {
        window.location.replace("?failure");
      } else if(data == " ") {
        $('.input-group').each(function() {
          $(this).removeClass('is-invalid');
        });
        $('.input-group .error').each(function() {
          $(this).text("");
        });
      } else {
        var datas = data.split(";");
        $('.input-group').each(function() {
          $(this).removeClass('is-invalid');
        });
        $('.error').each(function() {
          $(this).text("");
          datas.forEach(function(entry) {
            if(entry.charAt(0) === '0') {
              var ERROR = entry.substr(2);
              $('#password ~ .error').html(ERROR);
              $('#password').parent().addClass('is-invalid');
            }
          });
        });
        IS_VALIDATED = true;
      }
    });
  }
});
