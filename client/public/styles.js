$('document').ready(() => {
  $('.button-collapse').sideNav();
  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });
  $('.slider').slider();
  $('select').material_select();
  $('#description').val();
  $('#description').trigger('autoresize');
  $('ul.tabs').tabs();
  $('#review').val();
  $('#review').trigger('autoresize');
  $('#contact-message').val();
  $('#contact-message').trigger('autoresize');
  $('li.active').addClass('blue');
  $('li.indicator').addClass('blue');
});
