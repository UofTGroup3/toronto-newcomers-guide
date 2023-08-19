// Used(https://learn.jquery.com/using-jquery-core) and (https://materializecss.com) documentations as reference.
$(document).ready(function () {

  var userBtn = $('#userBtn');
  var userDropdown = $('#userDropdown');
  var modal = $('.modal');
  var select = $('select');
  var profileType = $('#profileType');
  // Used(https://learn.jquery.com/using-jquery-core/selecting-elements/) as reference.
  var modalFooterLogin = $('.modal-footer a:contains("Login")');
  var username = $('#username');
  var password = $('#password');
  var loginModal = $('#loginModal');
  var loginError = $('#loginError');

  // Initialize dropdown, modals and select
  userBtn.dropdown();
  modal.modal();
  select.formSelect();

  var newProfileType = function () {

    var selectedProfile = profileType.val();
    localStorage.setItem('profileType', selectedProfile);

  }
  profileType.change(newProfileType);

  window.attemptLogin = function () {

    var loginUsername = username.val();
    var loginPassword = password.val();

    var storedUsername = localStorage.getItem('username');
    var storedPassword = localStorage.getItem('password');

    if (loginUsername === storedUsername && loginPassword === storedPassword) {
      //using the jQuery method for closing modals with Materialize CSS.
      loginModal.modal('close');
    } else {
      loginError.show();
    }
  };

  modalFooterLogin.click(function () {
    attemptLogin();
  });

});