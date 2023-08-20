// https://www.javatpoint.com/how-to-add-google-translate-button-on-your-webpage#:~:text=translator%20api%20%2D%2D%3E-,%3Cscript%20type%3D%22text%2Fjavascript%22,will%20be%20translated

function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en', 
    includedLanguages: 'en,es,fr,de,af,sq,ar,bs,bg,hy,zh-CN,hr,cs,da,nl,el,gu,he,hi,hu,it,ja,ko,fa,pl,pt,pa,ro,ru,sr,so,sv,ta,th,tr,uk,ur,vi,zu', 
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
  };