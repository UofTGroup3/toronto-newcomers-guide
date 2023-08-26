
// Used(https://learn.jquery.com/using-jquery-core) and (https://materializecss.com) documentations as reference.
$(document).ready(function () {

  var userBtn = $('#userBtn');
  var userDropdown = $('#userDropdown');
  var modal = $('.modal');
  var select = $('select');
  var profileType = $('#profileType');
  var profileTypeForm = $('#profileTypeForm');
  var profileTypeBtn = $('#profileTypeBtn');
  var profileTypeModal = $('#profileTypeModal');
  // Used(https://learn.jquery.com/using-jquery-core/selecting-elements/) as reference.
  var actualLoginBtn = $('#actualLoginBtn');
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
  var displayUsername = $('#displayUsername');
  var displayProfileType = $('#displayProfileType');
  var userProfile = $('#userProfile');
  var logoutBtn = $('#logoutBtn');
  var users = JSON.parse(localStorage.getItem('users')) || [];
  var carouselImg = $('.carousel');
  var dropdownTrigger = $('.dropdown-trigger');

  // Initialize dropdown, modals and select
  dropdownTrigger.dropdown();
  modal.modal();
  select.formSelect();

  //giving users a fresh start when they try again.
  loginModal.on('close', function () {
    loginError.hide();
  });

  var openProfileTypeModal = function () {
    profileTypeModal.modal('open');
  };

  var newProfileType = function () {

    var selectedProfile = profileType.val();
    localStorage.setItem('profileType', selectedProfile);

  };

  var openLoginModal = function () {
    loginModal.modal('open');
  };

  window.attemptLogin = function () {

    loginError.hide();
    var loginUsername = username.val();
    var loginPassword = password.val();

    var userExists = users.some(function(user) {
        return user.username === loginUsername && user.password === loginPassword;
    });

    if (userExists) {
      localStorage.setItem('isLoggedin', 'true');
      localStorage.setItem('username', loginUsername);
      localStorage.setItem('password', loginPassword);
      newProfileType();
      displayUserProfile();
      //using the jQuery method for closing modals with Materialize CSS.
      loginModal.modal('close');
    } else {
      loginError.show();
    }
  };

  actualLoginBtn.click(function () {
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
    newProfileType();

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

    var newUser = {
      username: signupUsernameValue,
      email: signupEmailValue,
      password: signupPasswordValue,
      profileType: localStorage.getItem('profileType') || 'Not Selected'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    //closing the modal and resetting the form.
    signupModal.modal('close');
    signupForm[0].reset();
    displayUserProfile();

  };

  var displayUserProfile = function () {

    var storedUsername = localStorage.getItem('username');
    var storedProfileType = localStorage.getItem('profileType') || 'Not Selected';
    var isLoggedin = localStorage.getItem('isLoggedin') === 'true';

    if (isLoggedin && storedUsername) {
      displayUsername.text(storedUsername);
      displayProfileType.text(storedProfileType);
      userProfile.show();
    } else {
      userProfile.hide();
    }

  };

  var logoutUser = function () {
    localStorage.setItem('isLoggedin', 'false');
    location.reload();
  };

  //Helper function for showing error messages.
  var showError = function (errorMessage) {
    errorMsgText.text(errorMessage);
    //using the jQuery method for opening modals with Materialize CSS
    errorMsg.modal('open');
  };

  //Initializing the carousel
  carouselImg.carousel({
    indicators: true
  });
  var carouselTimer = function () {
    carouselImg.carousel('next');
  };

  //Map Functions
  //https://www.w3schools.com/jquery/jquery_hide_show.asp
  //https://www.geeksforgeeks.org/how-to-filter-objects-by-data-attribute-value-in-jquery/

  //Hide All Maps
  function hideMaps() {
    $('.map').hide();
  };

  //Show only 'attractions' map on load
  hideMaps();
  $('#attractionsMap').show();

  //Click event listeners for map buttons
  $('.mapFilter').click(function () {
  var filter = $(this).data('filter');

  //Hide all maps on click
  hideMaps();
  //Show clicked on map
  $('#' + filter).show();
  });

  //News Section
  //https://mediastack.com/
  // http://api.mediastack.com/v1/
  //key 400ac6f6b4a53023ad0df9c54d691c7b
  //http://api.mediastack.com/v1/news? access_key = 400ac6f6b4a53023ad0df9c54d691c7b
  //get dates in proper format for parameter filter to GET newest stories
  var today = dayjs();
  today = today.format('YYYY-MM-DD');
  var yesterday = dayjs().subtract(1, 'day');
  yesterday = yesterday.format('YYYY-MM-DD');
  
  var showNews = function() {
  var key = "400ac6f6b4a53023ad0df9c54d691c7b"
  var queryURL = "http://api.mediastack.com/v1/news?access_key=" + key + "&country=ca&sources=cp24&keywords=toronto&date="+ yesterday + "," + today;
    fetch(queryURL)
      .then(function (response) {
        if(response.ok) {
          return response.json();
        } else {
          alert('Something went wrong'); //change later to proper throw error, no alerts allowed for project, 'catch (error)'?
        };
      })
      .then(function (data) {
        console.log(data);
        
          var topstory1 = $('#topStory1');
          var newsTitle = $('<h3>').text(data.data[0].title);
          var newsDescription = $('<p>').text(data.data[0].description);
          var newsImageUrl = $('<img>').attr("src", data.data[0].image);
          var newsUrl = $('<a>').attr("href", data.data[0].url).text('Click to read article');
          topstory1.append(newsImageUrl, newsTitle, newsDescription, newsUrl);

          var topstory2 = $('#topStory2');
          var newsTitle2 = $('<h3>').text(data.data[1].title);
          var newsDescription2 = $('<p>').text(data.data[1].description);
          var newsImageUrl2 = $('<img>').attr("src", data.data[1].image);
          var newsUrl2 = $('<a>').attr("href", data.data[1].url).text('Click to read article');
          topstory2.append(newsImageUrl2, newsTitle2, newsDescription2, newsUrl2);

          var topstory3 = $('#topStory3');
          var newsTitle3 = $('<h3>').text(data.data[2].title);
          var newsDescription3 = $('<p>').text(data.data[2].description);
          var newsImageUrl3 = $('<img>').attr("src", data.data[2].image);
          var newsUrl3 = $('<a>').attr("href", data.data[2].url).text('Click to read article');
          topstory3.append(newsImageUrl3, newsTitle3, newsDescription3, newsUrl3);

          var topstory4 = $('#topStory4');
          var newsTitle4 = $('<h3>').text(data.data[3].title);
          var newsDescription4 = $('<p>').text(data.data[3].description);
          var newsImageUrl4 = $('<img>').attr("src", data.data[3].image);
          var newsUrl4 = $('<a>').attr("href", data.data[3].url).text('Click to read article');
          topstory4.append(newsImageUrl4, newsTitle4, newsDescription4, newsUrl4);

          var topstory5 = $('#topStory5');
          var newsTitle5 = $('<h3>').text(data.data[4].title);
          var newsDescription5 = $('<p>').text(data.data[4].description);
          var newsImageUrl5 = $('<img>').attr("src", data.data[4].image);
          var newsUrl5 = $('<a>').attr("href", data.data[4].url).text('Click to read article');
          topstory5.append(newsImageUrl5, newsTitle5, newsDescription5, newsUrl5);
      });
    };
    



    // // https://www.javatpoint.com/how-to-add-google-translate-button-on-your-webpage#:~:text=translator%20api%20%2D%2D%3E-,%3Cscript%20type%3D%22text%2Fjavascript%22,will%20be%20translated
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_google_translate_dropdown
    // https://codepen.io/j_holtslander/pen/PjPWMe
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({ pageLanguage: 'en', 
      includedLanguages: 'en,es,fr,de,af,sq,ar,bs,bg,hy,zh-CN,hr,cs,da,nl,el,gu,he,hi,hu,it,ja,ko,fa,pl,pt,pa,ro,ru,sr,so,sv,ta,th,tr,uk,ur,vi,zu', 
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
      };
    // // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_google_translate
    // function googleTranslateElementInit() {
    //   new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
    // };
    // googleTranslateElementInit();

    profileTypeBtn.on('click', openProfileTypeModal);
    profileType.change(newProfileType);
    loginBtn.on('click', openLoginModal);
    signupBtn.on('click', openSignupModal);
    signupForm.submit(signupValidation);
    displayUserProfile();
    logoutBtn.on('click', logoutUser);
    setInterval(carouselTimer, 5000);
    googleTranslateElementInit();
    showNews();
  
});