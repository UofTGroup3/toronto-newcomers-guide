$(document).ready(function () {

  var userBtn = $('#userBtn');
  var userDropdown = $('#userDropdown');
  var modal = $('.modal');
  var select = $('select');
  var profileType = $('#profileType');
  // Used(https://learn.jquery.com/using-jquery-core/selecting-elements/) as reference.
  var modalFooterLogin = $('.modal-footer a:contains("Login")');

  // Initialize dropdown, modals and select
  userBtn.dropdown();
  modal.modal();
  select.formSelect();

  var newProfileType = function () {
    var selectedProfile = profileType.val();
    localStorage.setItem('profileType', selectedProfile);
  }
  profileType.change(newProfileType);

});