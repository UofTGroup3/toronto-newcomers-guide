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
  var loginBtn = $('#loginBtn');
  var loginModal = $('#loginModal');
  var loginError = $('#loginError');
  var signupBtn = $('#signupBtn');
  var signupForm = $('#signupForm');
  var signupModal = $('#signupModal');
  var signupUsername = $('#signupUsername');
  var signupEmail = $('#signupEmail');
  var signupPassword = $('#signupPassword');
  var signupConfirmPassword = $('#signupConfirmPassword');
  var errorMsg = $('#errorMsg');
  var errorMsgText = $('#errorMsgText');

  // Initialize dropdown, modals and select
  userBtn.dropdown();
  modal.modal();
  select.formSelect();

  var openLoginModal = function () {
    loginModal.modal('open');
  };

  var newProfileType = function () {

    var selectedProfile = profileType.val();
    localStorage.setItem('profileType', selectedProfile);

  };

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

  var openSignupModal = function () {
    signupModal.modal('open');
  };

  var signupValidation = function (event) {
    event.preventDefault();

    var signupUsernameValue = signupUsername.val();
    var signupEmailValue = signupEmail.val();
    var signupPasswordValue = signupPassword.val();
    var signupConfirmPasswordValue = signupConfirmPassword.val();

    //email validation regex from (https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript)
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(signupEmailValue)) {
      showError('Invalid email address');
      return;
    }

    if (signupPasswordValue.length < 8) {
      showError('Password must be at least 8 characters');
      return;
    }

    if (signupPasswordValue !== signupConfirmPasswordValue) {
      showError('Passwords do not match');
      return;
    }

    localStorage.setItem('username', signupUsernameValue);
    localStorage.setItem('email', signupEmailValue);
    localStorage.setItem('password', signupPasswordValue);

    //closing the modal and resetting the form.
    signupModal.modal('close');
    signupForm[0].reset();

  };

  //Helper function for showing error messages.
  var showError = function (errorMessage) {
    errorMsgText.text(errorMessage);
    //using the jQuery method for opening modals with Materialize CSS
    errorMsg.modal('open');
  };

  profileType.change(newProfileType);
  loginBtn.on('click', openLoginModal);
  signupBtn.on('click', openSignupModal);
  signupForm.submit(signupValidation);

});