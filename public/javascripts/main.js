$('.lazy').lazy();



(function() {

  $('.js-header--img__humburger').on('click', function() {
    $('.js-navbar__overlay').addClass('navbar__overlay--isvisible');
    return $('body').addClass('hide-content');
  });

  $('.js-navbar__overlay').on('click', function(e) {
    var clicked;
    clicked = $(e.target);
    if (clicked.is('.js-navbar') || clicked.parents().is('.js-navbar')) {

    } else {
      $('.js-navbar__overlay').removeClass('navbar__overlay--isvisible');
      return $('body').removeClass('hide-content');
    }
  });

}).call(this);
