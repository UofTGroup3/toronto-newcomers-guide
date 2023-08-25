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
  var dashboardBtn = $('#dashboardBtn');
  var dashboardContent = $('#dashboardContent');
  var usernameDisplay = $('#usernameDisplay');
  var profileTypeDisplay = $('#profileTypeDisplay');
  var recommendations = $('#recommendations');

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

    var userExists = users.some(function (user) {
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

  var openDashboard = function (event) {

    event.stopPropagation();
    var storedProfileType = localStorage.getItem('profileType') || 'Not Selected';
    var storedUsername = localStorage.getItem('username');
    var isLoggedin = localStorage.getItem('isLoggedin') === 'true';
    var isProfileTypeSelected = storedProfileType !== 'Not Selected';

    if (storedProfileType === 'Not Selected') {
      showError('Please select a profile type');
      return;
    }
    if (!isLoggedin) {
      showError('Please login or signup');
      return;
    }
    if (isLoggedin && storedUsername && isProfileTypeSelected) {
      window.location.href = "dashboard.html";
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

  // https://www.javatpoint.com/how-to-add-google-translate-button-on-your-webpage#:~:text=translator%20api%20%2D%2D%3E-,%3Cscript%20type%3D%22text%2Fjavascript%22,will%20be%20translated

  function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,es,fr,de,af,sq,ar,bs,bg,hy,zh-CN,hr,cs,da,nl,el,gu,he,hi,hu,it,ja,ko,fa,pl,pt,pa,ro,ru,sr,so,sv,ta,th,tr,uk,ur,vi,zu',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  };

  //Initializing the carousel
  carouselImg.carousel({
    indicators: true
  });
  var carouselTimer = function () {
    carouselImg.carousel('next');
  };

  // Here I'm trying to create an array to store the recommendations based on the profile type selected. based 
  //TODO: check all links and images
  var recommendationsArray = [
    {
      student: "Here are some recommendations for you based on your status as a student",
      recommendation: [
        {
          title: "How to get your student card?",
          description: "Steps to obtain an official student identification card for academic and campus activities.",
          link: "https://www.ryerson.ca/registrar/students/records/studentcard/",
          image: "assets/images/studentcard.jpg"
        },
        {
          title: "How to get your OHIP card and SIN number?",
          description: "Guidance on acquiring an Ontario Health Insurance Plan card and Social Insurance Number.",
          link: "https://www.ontario.ca/page/getting-health-card",
          image: "assets/images/healthcard.jpg"
        },
        {
          tiltle: "How to get your TTC student card?",
          description: "Instructions to secure a student card for discounted Toronto Transit Commission fares.",
          link: "https://www.ttc.ca/Fares_and_passes/Passes/Post-Secondary_Student_Pass.jsp",
          image: "assets/images/ttc.jpg"
        },
        {
          title: "How to get your Presto card?",
          description: "Learn how to acquire a Presto card for easy and contactless public transportation payments in Ontario.",
          link: "https://www.prestocard.ca/en",
          image: "assets/images/presto.jpg"
        },
        {
          title: "How to get your first credit card?",
          description: "Discover steps to apply for your first credit card, ensuring you build a strong financial foundation.",
          link: "https://www.nerdwallet.com/article/credit-cards/how-to-apply-for-a-credit-card",
          image: "assets/images/creditcard.jpg"
        },
        {
          title: "How to apply for a student loan?",
          description: "Detailed guidelines on how to navigate and apply for student loans in Ontario to support your education.",
          link: "https://www.ontario.ca/page/osap-ontario-student-assistance-program",
          image: "assets/images/studentloan.jpg"
        },
        {
          title: "How to get a part-time job?",
          description: "Strategies and resources to help you land a part-time job, providing both experience and financial support.",
          link: "https://www.ryerson.ca/career-coop/students/jobs/",
          image: "assets/images/parttimejob.jpg"
        },
        {
          title: "How can you locate a doctor?",
          description: "Navigate the healthcare system and find a local family doctor or nurse practitioner in Ontario.",
          link: "https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner",
          image: "assets/images/doctor.jpg"
        },
        {
          title: "How can you locate a settelment?",
          description: "Resources to find a suitable settlement or support agency to assist with your transition in Ontario.",
          link: "https://www.nestpick.com/student-accommodation/toronto/",
          image: "assets/images/settlement.jpg"
        },
        {
          title: "How to get your G1 license?",
          description: "A guide on how to start your driving journey by obtaining a G1 license in Ontario.",
          link: "https://www.ontario.ca/page/get-g-drivers-licence-new-drivers",
          image: "assets/images/g1.jpg"
        },
        {
          title: "How to get your Library card?",
          description: "Steps to apply for a library card to access vast resources at Toronto Public Libraries.",
          link: "https://www.torontopubliclibrary.ca/using-the-library/library-cards/",
          image: "assets/images/library.jpg"
        },
        {
          title: "Are you looking for exciting events in Toronto?",
          description: "Discover the vibrant events happening around Toronto, perfect for students to relax, learn, and socialize.",
          link: "https://www.eventbrite.com/blog/college-event-ideas/",
          image: "assets/images/events.jpg"
        },
      ]
    },
    {
      refugee: "Here are some recommendations for you based on your status as a refugee",
      recommendation: [
        {
          title: "Find a refugee settlement agency near you",
          description: "Discover agencies dedicated to helping refugees settle in Canada.",
          link: "https://www.canrefugee.ca/settling/settlement_agencies",
          image: "assets/images/settlement.jpg"
        },
        {
          title: "find a welcome centre near you.",
          description: "Explore local welcome centres designed to assist newcomers in understanding and navigating the resources available in their community.",
          link: "https://welcomecentre.ca/",
          image: "assets/images/welcomecentre.jpg"
        },
        {
          title: "How to enter Interim Federal Health Program?",
          description: "The Interim Federal Health Program (IFHP) offers temporary health insurance to refugees, protected persons, and other specified groups in Canada who aren't eligible for provincial or territorial health insurance.",
          link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees/help-within-canada/health-care/interim-federal-health-program/apply.html",
          image: "assets/images/healthcard.jpg"
        },
        {
          title: "How to get your SIN number?",
          description: "Guidance on acquiring a Social Insurance Number.",
          link: "https://www.canada.ca/en/employment-social-development/services/sin/apply.html",
          image: "assets/images/sin.jpg"
        },
        {
          title: "How to get your TTC refugee card?",
          description: "A concise guide to obtaining your Toronto Transit Commission (TTC) refugee card, granting eligible refugees discounted transit access in Toronto.",
          link: "https://www.ttc.ca/Fares_and_passes/Passes/Refugee_Pass.jsp",
          image: "assets/images/ttc.jpg"
        },
        {
          title: "How to get your Presto card?",
          description: "Learn how to acquire a Presto card for easy and contactless public transportation payments in Ontario.",
          link: "https://www.prestocard.ca/en",
          image: "assets/images/presto.jpg"
        },
        {
          title: "How to open an account?",
          description: "A straightforward guide to setting up a new bank account.",
          link: "https://www.ontario.ca/page/opening-bank-account",
          image: "assets/images/bankaccount.jpg"
        },
        {
          title: "How to get help from government?",
          description: "A concise guide on accessing various government assistance programs",
          link: "https://www.ontario.ca/page/get-help-government",
          image: "assets/images/government.jpg"
        },
        {
          title: "How to find a job?",
          description: "A step-by-step guide to navigating the job market.",
          link: "https://www.ontario.ca/page/employment-ontario",
          link2: " https://www.jobbank.gc.ca/",
        },
        {
          title: "How can you locate a doctor?",
          description: "Navigate the healthcare system and find a local family doctor or nurse practitioner in Ontario.",
          link: "https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner",
          image: "assets/images/doctor.jpg"
        },
        {
          title: "How can you locate a settelment?",
          description: "Resources to find a suitable settlement or support agency to assist with your transition in Ontario.",
          link: "https://www.ontario.ca/page/settlement-agencies",
          image: "assets/images/settlement.jpg"
        },
      ]
    },
    {
      temporary: "Here are some recommendations for you based on your status as a temporary resident",
      recommendation: [
        {
          title: "How to get your OHIP card?",
          description: "A guide to acquiring Ontario's health insurance card for temporary residents.",
          link: "https://www.ontario.ca/page/apply-ohip-and-get-health-card",
          image: "assets/images/healthcard.jpg"
        },
        {
          title: "find a welcome centre near you.",
          description: "Explore local welcome centres designed to assist newcomers in understanding and navigating the resources available in their community.",
          link: "https://welcomecentre.ca/",
          image: "assets/images/welcomecentre.jpg"
        },
        {
          title: "How to get your SIN number?",
          description: "Guidance on acquiring a Social Insurance Number.",
          link: "https://www.canada.ca/en/employment-social-development/services/sin/apply.html",
          image: "assets/images/sin.jpg"
        },
        {
          title: "How to get your TTC card?",
          description: "A concise guide to obtaining your Toronto Transit Commission (TTC) card.",
          link: "https://www.ttc.ca/Fares-and-passes/How-to-buy-fares-and-passes",
          image: "assets/images/ttc.jpg"
        },
        {
          title: "How to get your Presto card?",
          description: "Learn how to acquire a Presto card for easy and contactless public transportation payments in Ontario.",
          link: "https://www.prestocard.ca/en",
          image: "assets/images/presto.jpg"
        },
        {
          title: "How to open a bank account?",
          description: "A straightforward guide to setting up a new bank account.",
          link: "https://www.ontario.ca/page/opening-bank-account",
          image: "assets/images/bankaccount.jpg"
        },
        {
          title: "How to get help from government?",
          description: "A concise guide on accessing various government assistance programs",
          link: "https://www.ontario.ca/page/get-help-government",
          image: "assets/images/government.jpg"
        },
        {
          title: "How to find a job?",
          description: "A step-by-step guide to navigating the job market.",
          link: "https://www.ontario.ca/page/employment-ontario",
          image: "assets/images/job.jpg"
        },
        {
          title: "How can you locate a doctor?",
          description: "Navigate the healthcare system and find a local family doctor or nurse practitioner in Ontario.",
          link: "https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner",
          image: "assets/images/doctor.jpg"
        },
        {
          title: "How can you locate a settelment?",
          description: "Resources to find a suitable settlement or support agency to assist with your transition in Ontario.",
          link: "https://www.ontario.ca/page/settlement-agencies",
          image: "assets/images/settlement.jpg"
        },
        {
          title: "How to get your G1 license?",
          description: "A guide on how to start your driving journey by obtaining a G1 license in Ontario.",
          link: "https://www.ontario.ca/page/get-g-drivers-licence-new-drivers",
          image: "assets/images/g1.jpg"
        },
      ]
    },
    {
      pr: "Here are some recommendations for you based on your status as a permanent resident",
      recommendation: [
        {
          title: "How to get your OHIP card?",
          description: "Steps to avail Ontario's health insurance card for permanent residents.",
          link: "https://www.ontario.ca/page/apply-ohip-and-get-health-card",
          image: "assets/images/healthcard.jpg"
        },
        {
          title: "find a welcome centre near you.",
          description: "Explore local welcome centres designed to assist newcomers in understanding and navigating the resources available in their community.",
          link: "https://welcomecentre.ca/",
          image: "assets/images/welcomecentre.jpg"
        },
        {
          title: "How to get your SIN number?",
          description: "Guidance on acquiring a Social Insurance Number.",
          link: "https://www.canada.ca/en/employment-social-development/services/sin/apply.html",
          image: "assets/images/sin.jpg"
        },
        {
          title: "How to get your TTC card?",
          description: "A concise guide to obtaining your Toronto Transit Commission (TTC) card.",
          link: "https://www.ttc.ca/Fares-and-passes/How-to-buy-fares-and-passes",
          image: "assets/images/ttc.jpg"
        },
        {
          title: "How to get your Presto card?",
          description: "Learn how to acquire a Presto card for easy and contactless public transportation payments in Ontario.",
          link: "https://www.prestocard.ca/en",
          image: "assets/images/presto.jpg"
        },
        {
          title: "How to open a bank account?",
          description: "A straightforward guide to setting up a new bank account.",
          link: "https://www.ontario.ca/page/opening-bank-account",
          image: "assets/images/bankaccount.jpg"
        },
        {
          title: "How to get help from government?",
          description: "A concise guide on accessing various government assistance programs",
          link: "https://www.ontario.ca/page/get-help-government",
          image: "assets/images/government.jpg"
        },
        {
          title: "How to find a job?",
          description: "A step-by-step guide to navigating the job market",
          link: "https://www.ontario.ca/page/employment-ontario",
          image: "assets/images/job.jpg"
        },
        {
          title: "How can you locate a doctor?",
          description: "Navigate the healthcare system and find a local family doctor or nurse practitioner in Ontario.",
          link: "https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner",
          image: "assets/images/doctor.jpg"
        },
        {
          title: "How can you locate a settelment?",
          description: "Resources to find a suitable settlement or support agency to assist with your transition in Ontario.",
          link: "https://www.ontario.ca/page/settlement-agencies",
          image: "assets/images/settlement.jpg"
        },
        {
          title: "How to get your G1 license?",
          description: "A guide on how to start your driving journey by obtaining a G1 license in Ontario.",
          link: "https://www.ontario.ca/page/get-g-drivers-licence-new-drivers",
          image: "assets/images/g1.jpg"
        },
        {
          title: "Are you eligible for citizenship?",
          description: "Determine your readiness and qualifications for citizenship with this comprehensive overview of requirements, documentation, and processes, ensuring you're on the right path towards obtaining your citizenship status.",
          link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/check-eligibility.html",
          image: "assets/images/citizenship.jpg"
        },
        {
          title: "Are you looking for exciting events in Toronto?",
          description: "Discover Toronto's vibrant scene of upcoming events, festivals, and cultural happenings",
          link: "https://www.eventbrite.ca/",
          image: "assets/images/events.jpg"
        }
      ]
    },
  ];

  //Here I'm trying to loop over the recommendation array to dispaly the recommendations for each profile type by using the profile type selected and creating needed divs and elements dynamicly and add them to the main div by id of recommendations.
  var displayRecommendations = function () {
    var storedProfileType = localStorage.getItem('profileType') || 'Not Selected';
    var isLoggedin = localStorage.getItem('isLoggedin') === 'true';
    var storedUsername = localStorage.getItem('username');
    var isProfileTypeSelected = storedProfileType !== 'Not Selected';

    if (isLoggedin && storedUsername && isProfileTypeSelected) {
      switch (storedProfileType) {
        case 'student':
          recommendationsArray.studentRecommendations.forEach(function (recommendation) {
            var recommendationDiv = $('<div>');
            recommendationDiv.addClass('col s12 m6 l4');
            var cardDiv = $('<div>');
            cardDiv.addClass('recCards');
            var cardImageDiv = $('<div>');
            cardImageDiv.addClass('recCardsImage');
            var cardImage = $('<img>');
            cardImage.attr('src', recommendation.image);
            cardImage.attr('alt', 'specific recommendation image');
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
            cardImageDiv.append(cardImage);
            cardContentDiv.append(cardTitle);
            cardContentDiv.append(cardDescription);
            cardActionDiv.append(cardActionLink);
            cardDiv.append(cardImageDiv);
            cardDiv.append(cardContentDiv);
            cardDiv.append(cardActionDiv);
            recommendationDiv.append(cardDiv);
            recommendations.append(recommendationDiv);
          });
          break;
      }
    };
  };


    // Here I'm trying to create a function that will display the recommendations based on the profile type selected. based on the profile type selected, the recommendations will be displayed in the dashboard.html page.
    // var displayRecommendations = function () {
    //   var storedProfileType = localStorage.getItem('profileType') || 'Not Selected';
    //   var isLoggedin = localStorage.getItem('isLoggedin') === 'true';
    //   var storedUsername = localStorage.getItem('username');
    //   var isProfileTypeSelected = storedProfileType !== 'Not Selected';

    //   if (isLoggedin && storedUsername && isProfileTypeSelected) {
    //     recommendations.show();
    //   } else {
    //     recommendations.hide();
    //   }
    // };


    profileTypeBtn.on('click', openProfileTypeModal);
    profileType.change(newProfileType);
    loginBtn.on('click', openLoginModal);
    signupBtn.on('click', openSignupModal);
    signupForm.submit(signupValidation);
    dashboardBtn.on('click', openDashboard);
    displayUserProfile();
    logoutBtn.on('click', logoutUser);
    setInterval(carouselTimer, 5000);
    googleTranslateElementInit();

});