// Used(https://learn.jquery.com/using-jquery-core) and (https://materializecss.com) documentations as reference.
$(document).ready(function () {

  var modal = $('.modal');
  var select = $('select');
  var profileType = $('#profileType');
  var profileTypeBtn = $('#profileTypeBtn');
  var profileTypeModal = $('#profileTypeModal');
  var actualLoginBtn = $('#actualLoginBtn');
  var username = $('#username');
  var password = $('#password');
  var loginBtn = $('#loginBtn');
  var loginModal = $('#loginModal');
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
  var dropdownTrigger = $('.dropdown-trigger');
  var dashboardBtn = $('#dashboardBtn');
  var usernameDisplay = $('#usernameDisplay');
  var profileTypeDisplay = $('#profileTypeDisplay');
  var recommendations = $('#recommendations');
  //get dates in proper format for parameter filter to GET newest stories
  var today = dayjs().format('YYYY-MM-DD');
  var twoDaysAgo = dayjs().subtract(2, 'day').format('YYYY-MM-DD');
  var slideIndex = 0;
  // Here I'm trying to create an array to store the recommendations based on the profile type selected. based 
  //TODO: check all links and images
  var recommendationsArray = [
    {
      student: "Here are some recommendations for you based on your status as a student",
      studentRecommendations: [
        {
          title: "How to get your student card?",
          description: "Steps to obtain an official student identification card for academic and campus activities.",
          link: "https://www.ryerson.ca/registrar/students/records/studentcard/",
        },
        {
          title: "How to get your OHIP card and SIN number?",
          description: "Guidance on acquiring an Ontario Health Insurance Plan card and Social Insurance Number.",
          link: "https://www.ontario.ca/page/getting-health-card",
        },
        {
          title: "How to get your TTC student card?",
          description: "Instructions to secure a student card for discounted Toronto Transit Commission fares.",
          link: "https://www.ttc.ca/Fares_and_passes/Passes/Post-Secondary_Student_Pass.jsp",
        },
        {
          title: "How to get your Presto card?",
          description: "Learn how to acquire a Presto card for easy and contactless public transportation payments in Ontario.",
          link: "https://www.prestocard.ca/en",
        },
        {
          title: "How to get your first credit card?",
          description: "Discover steps to apply for your first credit card, ensuring you build a strong financial foundation.",
          link: "https://www.nerdwallet.com/article/credit-cards/how-to-apply-for-a-credit-card",
        },
        {
          title: "How to apply for a student loan?",
          description: "Detailed guidelines on how to navigate and apply for student loans in Ontario to support your education.",
          link: "https://www.ontario.ca/page/osap-ontario-student-assistance-program",
        },
        {
          title: "How to get a part-time job?",
          description: "Strategies and resources to help you land a part-time job, providing both experience and financial support.",
          link: "https://www.ryerson.ca/career-coop/students/jobs/",
        },
        {
          title: "How can you locate a doctor?",
          description: "Navigate the healthcare system and find a local family doctor or nurse practitioner in Ontario.",
          link: "https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner",
        },
        {
          title: "How can you locate a settelment?",
          description: "Resources to find a suitable settlement or support agency to assist with your transition in Ontario.",
          link: "https://www.nestpick.com/student-accommodation/toronto/",
        },
        {
          title: "How to get your G1 license?",
          description: "A guide on how to start your driving journey by obtaining a G1 license in Ontario.",
          link: "https://www.ontario.ca/page/get-g-drivers-licence-new-drivers",
        },
        {
          title: "How to get your Library card?",
          description: "Steps to apply for a library card to access vast resources at Toronto Public Libraries.",
          link: "https://www.torontopubliclibrary.ca/using-the-library/library-cards/",
        },
        {
          title: "Are you looking for exciting events in Toronto?",
          description: "Discover the vibrant events happening around Toronto, perfect for students to relax, learn, and socialize.",
          link: "https://www.eventbrite.com/blog/college-event-ideas/",
        },
      ]
    },
    {
      refugee: "Here are some recommendations for you based on your status as a refugee",
      refugeeRecommendations: [
        {
          title: "Find a refugee settlement agency near you",
          description: "Discover agencies dedicated to helping refugees settle in Canada.",
          link: "https://www.canrefugee.ca/settling/settlement_agencies",
        },
        {
          title: "find a welcome centre near you.",
          description: "Explore local welcome centres designed to assist newcomers in understanding and navigating the resources available in their community.",
          link: "https://welcomecentre.ca/",
        },
        {
          title: "How to enter Interim Federal Health Program?",
          description: "The Interim Federal Health Program (IFHP) offers temporary health insurance to refugees, protected persons, and other specified groups in Canada who aren't eligible for provincial or territorial health insurance.",
          link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees/help-within-canada/health-care/interim-federal-health-program/apply.html",
        },
        {
          title: "How to get your SIN number?",
          description: "Guidance on acquiring a Social Insurance Number.",
          link: "https://www.canada.ca/en/employment-social-development/services/sin/apply.html",
        },
        {
          title: "How to get your TTC refugee card?",
          description: "A concise guide to obtaining your Toronto Transit Commission (TTC) refugee card, granting eligible refugees discounted transit access in Toronto.",
          link: "https://www.ttc.ca/Fares_and_passes/Passes/Refugee_Pass.jsp",
        },
        {
          title: "How to get your Presto card?",
          description: "Learn how to acquire a Presto card for easy and contactless public transportation payments in Ontario.",
          link: "https://www.prestocard.ca/en",
        },
        {
          title: "How to open an account?",
          description: "A straightforward guide to setting up a new bank account.",
          link: "https://www.ontario.ca/page/opening-bank-account",
        },
        {
          title: "How to get help from government?",
          description: "A concise guide on accessing various government assistance programs",
          link: "https://www.ontario.ca/page/get-help-government",
        },
        {
          title: "How to find a job?",
          description: "A step-by-step guide to navigating the job market.",
          link: "https://www.ontario.ca/page/employment-ontario",
        },
        {
          title: "How can you locate a doctor?",
          description: "Navigate the healthcare system and find a local family doctor or nurse practitioner in Ontario.",
          link: "https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner",
        },
        {
          title: "How can you locate a settelment?",
          description: "Resources to find a suitable settlement or support agency to assist with your transition in Ontario.",
          link: "https://www.ontario.ca/page/settlement-agencies",
        },
      ]
    },
    {
      temporary: "Here are some recommendations for you based on your status as a temporary resident",
      temporaryRecommendations: [
        {
          title: "How to get your OHIP card?",
          description: "A guide to acquiring Ontario's health insurance card for temporary residents.",
          link: "https://www.ontario.ca/page/apply-ohip-and-get-health-card",
        },
        {
          title: "find a welcome centre near you.",
          description: "Explore local welcome centres designed to assist newcomers in understanding and navigating the resources available in their community.",
          link: "https://welcomecentre.ca/",
        },
        {
          title: "How to get your SIN number?",
          description: "Guidance on acquiring a Social Insurance Number.",
          link: "https://www.canada.ca/en/employment-social-development/services/sin/apply.html",
        },
        {
          title: "How to get your TTC card?",
          description: "A concise guide to obtaining your Toronto Transit Commission (TTC) card.",
          link: "https://www.ttc.ca/Fares-and-passes/How-to-buy-fares-and-passes",
        },
        {
          title: "How to get your Presto card?",
          description: "Learn how to acquire a Presto card for easy and contactless public transportation payments in Ontario.",
          link: "https://www.prestocard.ca/en",
        },
        {
          title: "How to open a bank account?",
          description: "A straightforward guide to setting up a new bank account.",
          link: "https://www.ontario.ca/page/opening-bank-account",
        },
        {
          title: "How to get help from government?",
          description: "A concise guide on accessing various government assistance programs",
          link: "https://www.ontario.ca/page/get-help-government",
        },
        {
          title: "How to find a job?",
          description: "A step-by-step guide to navigating the job market.",
          link: "https://www.ontario.ca/page/employment-ontario",
        },
        {
          title: "How can you locate a doctor?",
          description: "Navigate the healthcare system and find a local family doctor or nurse practitioner in Ontario.",
          link: "https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner",
        },
        {
          title: "How can you locate a settelment?",
          description: "Resources to find a suitable settlement or support agency to assist with your transition in Ontario.",
          link: "https://www.ontario.ca/page/settlement-agencies",
        },
        {
          title: "How to get your G1 license?",
          description: "A guide on how to start your driving journey by obtaining a G1 license in Ontario.",
          link: "https://www.ontario.ca/page/get-g-drivers-licence-new-drivers",
        },
      ]
    },
    {
      pr: "Here are some recommendations for you based on your status as a permanent resident",
      prRecommendations: [
        {
          title: "How to get your OHIP card?",
          description: "Steps to avail Ontario's health insurance card for permanent residents.",
          link: "https://www.ontario.ca/page/apply-ohip-and-get-health-card",
        },
        {
          title: "find a welcome centre near you.",
          description: "Explore local welcome centres designed to assist newcomers in understanding and navigating the resources available in their community.",
          link: "https://welcomecentre.ca/",
        },
        {
          title: "How to get your SIN number?",
          description: "Guidance on acquiring a Social Insurance Number.",
          link: "https://www.canada.ca/en/employment-social-development/services/sin/apply.html",
        },
        {
          title: "How to get your TTC card?",
          description: "A concise guide to obtaining your Toronto Transit Commission (TTC) card.",
          link: "https://www.ttc.ca/Fares-and-passes/How-to-buy-fares-and-passes",
        },
        {
          title: "How to get your Presto card?",
          description: "Learn how to acquire a Presto card for easy and contactless public transportation payments in Ontario.",
          link: "https://www.prestocard.ca/en",
        },
        {
          title: "How to open a bank account?",
          description: "A straightforward guide to setting up a new bank account.",
          link: "https://www.ontario.ca/page/opening-bank-account",
        },
        {
          title: "How to get help from government?",
          description: "A concise guide on accessing various government assistance programs",
          link: "https://www.ontario.ca/page/get-help-government",
        },
        {
          title: "How to find a job?",
          description: "A step-by-step guide to navigating the job market",
          link: "https://www.ontario.ca/page/employment-ontario",
        },
        {
          title: "How can you locate a doctor?",
          description: "Navigate the healthcare system and find a local family doctor or nurse practitioner in Ontario.",
          link: "https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner",
        },
        {
          title: "How can you locate a settelment?",
          description: "Resources to find a suitable settlement or support agency to assist with your transition in Ontario.",
          link: "https://www.ontario.ca/page/settlement-agencies",
        },
        {
          title: "How to get your G1 license?",
          description: "A guide on how to start your driving journey by obtaining a G1 license in Ontario.",
          link: "https://www.ontario.ca/page/get-g-drivers-licence-new-drivers",
        },
        {
          title: "Are you eligible for citizenship?",
          description: "Determine your readiness and qualifications for citizenship with this comprehensive overview of requirements, documentation, and processes, ensuring you're on the right path towards obtaining your citizenship status.",
          link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/check-eligibility.html",
        },
        {
          title: "Are you looking for exciting events in Toronto?",
          description: "Discover Toronto's vibrant scene of upcoming events, festivals, and cultural happenings",
          link: "https://www.eventbrite.ca/",
        }
      ]
    }
  ];

  // Initialize dropdown, modals and select
  dropdownTrigger.dropdown();
  modal.modal();
  select.formSelect();

  var openProfileTypeModal = function () {
    profileTypeModal.modal("open");
  };

  var newProfileType = function () {
    var selectedProfile = profileType.val();
    localStorage.setItem('profileType', selectedProfile);
  };

  var openLoginModal = function () {
    loginModal.modal("open");
  };

  // Defining a global function by using window object to be able to make a function available for use across different parts of the codebase
  window.attemptLogin = function () {

    var loginUsername = username.val().toLowerCase();
    var loginPassword = password.val();
    // used(https://www.w3schools.com/jsref/jsref_some.asp) as a reference.
    //checking if any array element matches the login credentials.
    var userExists = users.some(function (user) {
      return user.username === loginUsername && user.password === loginPassword;
    });

    if (userExists) {
      localStorage.setItem("isLoggedin", "true");
      localStorage.setItem("username", loginUsername);
      localStorage.setItem("password", loginPassword);
      newProfileType();
      displayUserProfile();
      //using the jQuery method for closing modals with Materialize CSS.
      loginModal.modal("close");
    } else {
      showError('Invalid username or password');
    }
  };

  actualLoginBtn.click(function () {
    attemptLogin();
  });

  var openSignupModal = function () {
    signupModal.modal("open");
  };

  var signupValidation = function (event) {

    event.preventDefault();

    var signupUsernameValue = signupUsername.val().toLowerCase();
    var signupEmailValue = signupEmail.val();
    var signupPasswordValue = signupPassword.val();
    var signupConfirmPasswordValue = signupConfirmPassword.val();

    newProfileType();

    //email validation regex from (https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript)
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(signupEmailValue)) {
      showError("Invalid email address");
      return;
    }

    if (signupPasswordValue.length < 8) {
      showError("Password must be at least 8 characters");
      return;
    }

    if (signupPasswordValue !== signupConfirmPasswordValue) {
      showError("Passwords do not match");
      return;
    }

    var newUser = {
      username: signupUsernameValue,
      email: signupEmailValue,
      password: signupPasswordValue,
      profileType: localStorage.getItem("profileType") || "Not Selected",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    //closing the modal and resetting the form.
    signupModal.modal("close");
    signupForm[0].reset();
    displayUserProfile();
  };

  var displayUserProfile = function () {

    var storedUsername = localStorage.getItem('username');
    var storedProfileType = localStorage.getItem('profileType') || 'Not Selected';
    var isLoggedin = localStorage.getItem('isLoggedin') === 'true';
    var isProfileTypeSelected = storedProfileType !== 'Not Selected';
    
    if (isLoggedin && storedUsername && isProfileTypeSelected) {
      displayUsername.text(storedUsername);
      displayProfileType.text(storedProfileType);
      userProfile.show();
    } else {
      userProfile.hide();
    }
    
  };

  var openDashboard = function (event) {

    event.preventDefault();

    var storedProfileType = localStorage.getItem('profileType') || 'Not Selected';
    var storedUsername = localStorage.getItem('username');
    var isLoggedin = localStorage.getItem('isLoggedin') === 'true';
    var isProfileTypeSelected = storedProfileType !== 'Not Selected';

    if (storedProfileType === 'Not Selected') {
      showError('Please select a profile type');
      return;
    };
    if (!isLoggedin) {
      showError('Please login or signup');
      return;
    };
    if (isLoggedin && storedUsername && isProfileTypeSelected) {
      window.location.href = "dashboard.html";
      displayUsername.text(storedUsername);
      displayProfileType.text(storedProfileType);
    };

  };
  
  var logoutUser = function () {
    localStorage.setItem("isLoggedin", "false");
    location.reload();
  };

  //Helper function for showing error messages.
  var showError = function (errorMessage) {
    errorMsgText.text(errorMessage);
    errorMsg.modal('open');
  };

  //*****************************Google Translate***************************
  
  // // https://www.javatpoint.com/how-to-add-google-translate-button-on-your-webpage#:~:text=translator%20api%20%2D%2D%3E-,%3Cscript%20type%3D%22text%2Fjavascript%22,will%20be%20translated
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_google_translate_dropdown
    // https://codepen.io/j_holtslander/pen/PjPWMe
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en', 
    includedLanguages: 'en,es,fr,de,af,sq,ar,bs,bg,hy,zh-CN,hr,cs,da,nl,el,gu,he,hi,hu,it,ja,ko,fa,pl,pt,pa,ro,ru,sr,so,sv,ta,th,tr,uk,ur,vi,zu', 
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
    };

  //*****************************Parallax***************************

  // https://materializecss.com/parallax.html
  // Initialize parallax
  $('.parallax').parallax();

  //*****************************Sliders***************************

  //function to autopay the slider every 8 seconds - reference from W3Schools.
  //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow_auto
  function showSlides() {
    var i;
    var slides = document.querySelectorAll(".slide");

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 8000);
  };

  //************************Interactive Map************************

  //https://www.w3schools.com/jquery/jquery_hide_show.asp
  //https://www.geeksforgeeks.org/how-to-filter-objects-by-data-attribute-value-in-jquery/

  //Hide All Maps
  function hideMaps() {
    $(".map").hide();
  }

  //Show only 'attractions' map on load
  hideMaps();
  $("#attractionsMap").show();

  //Click event listeners for map buttons
  $(".mapFilter").click(function () {
    var filter = $(this).data("filter");
    //Hide all maps on click
    hideMaps();
    //Show clicked on map
    $("#" + filter).show();
  });
  
  //********************News Section************************

  //https://ilikekillnerds.com/2023/02/handling-errors-with-the-fetch-api/
  //https://mediastack.com/
  //GET API data
  var showNews = function() {
  var key = "400ac6f6b4a53023ad0df9c54d691c7b"
  var queryURL = "http://api.mediastack.com/v1/news?access_key=" + key + "&country=ca&sources=cp24&keywords=toronto&date="+ twoDaysAgo + "," + today;
    fetch(queryURL)
      .then(function (response) {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        };
      })
      .then(function (data) {
        // console.log(data);
        
        //Display data
        for (var i = 0; i < 6; i++) {
          var topstory = $('#topStory' + (i + 1));
          var newsTitle = $('<h3>').text(data.data[i].title);
          var newsDescription = $('<p>').text(data.data[i].description);
          var newsImageUrl = $('<img>').attr("src", data.data[i].image).css({'width':'100%'});
          var newsUrl = $('<a>').attr({ "href": data.data[i].url, "target": "_blank" }).text('Click to read article');
          topstory.append(newsImageUrl, newsTitle, newsDescription, newsUrl);
        };
      })
      .catch(function (error) {
        console.error('Error: ', error);
      });
    };
    
  //***********************Dashboard Section**************************
  
  // Creating a function to display username and profile type in the dashboard page inside the related span elements.
  var displayUserDashboard = function () {

    var storedUsername = localStorage.getItem('username').toUpperCase();
    var storedProfileType = localStorage.getItem('profileType').toUpperCase();

    usernameDisplay.text(storedUsername);
    profileTypeDisplay.text(storedProfileType);

  };

  //I'm creating needed divs and elements dynamicly and add them to the main div by id of recommendations.
  var createRecommendationCard = function (recommendation) {

    var recommendationDiv = $('<div>');
    recommendationDiv.addClass('col s12 m6 l4');
    
    var cardDiv = $('<div>');
    cardDiv.addClass('recCards');
    
    var cardContentDiv = $('<div>');
    cardContentDiv.addClass('recCardsContent');
    var cardTitle = $('<span>');
    cardTitle.addClass('recCardsTitle');
    cardTitle.text(recommendation.title);
    var cardDescription = $('<p>');
    cardDescription.text(recommendation.description);
    
    var cardActionDiv = $('<div>');
    cardActionDiv.addClass('recCardsAction');
    var cardActionLink = $('<a>');
    cardActionLink.attr('href', recommendation.link);
    cardActionLink.attr('target', '_blank');
    cardActionLink.text('Learn More');
    
    cardContentDiv.append(cardTitle).append(cardDescription);
    cardActionDiv.append(cardActionLink);
    cardDiv.append(cardContentDiv).append(cardActionDiv);
    recommendationDiv.append(cardDiv);
    
    return recommendationDiv;

  };

  //Here I'm trying to loop over the recommendation array to dispaly the recommendations for each profile type by using the profile type selected.
  var displayRecommendations = function () {

    var storedProfileType = localStorage.getItem('profileType') || 'Not Selected';
    var recommendationsList;

    switch (storedProfileType) {
      case 'student':
        recommendationsList = recommendationsArray[0].studentRecommendations;
        break;
      case 'refugee':
        recommendationsList = recommendationsArray[1].refugeeRecommendations;
        break;
      case 'temporary resident':
        recommendationsList = recommendationsArray[2].temporaryRecommendations;
        break;
      case 'permanent resident':
        recommendationsList = recommendationsArray[3].prRecommendations;
        break;
      default:
        recommendations.text('No recommendations available');
        return;
    }; 

    recommendationsList.forEach(function (recommendation) {
      var recommendationCard = createRecommendationCard(recommendation);
      recommendations.append(recommendationCard);
    });

  };
  
  //***********************Event Listeners**************************

  profileTypeBtn.on('click', openProfileTypeModal);
  profileType.change(newProfileType);
  loginBtn.on('click', openLoginModal);
  signupBtn.on('click', openSignupModal);
  signupForm.submit(signupValidation);
  dashboardBtn.on('click', openDashboard);
  displayUserProfile();
  logoutBtn.on('click', logoutUser);
  displayUserDashboard();
  displayRecommendations();
  showNews();
  //Set a timeout for the google translate element to load properly.
  setTimeout(googleTranslateElementInit, 2000);
  showSlides();
  
});