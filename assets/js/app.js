// Prettyprint
var elements = document.getElementsByTagName('code');
for (var i = elements.length - 1; i >= 0; i--) {
  elements[i].setAttribute('class', 'prettyprint');
};
prettyPrint();

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-17658402-1']);
_gaq.push(['_trackPageview']);
setTimeout("_gaq.push(['_trackEvent', '15_seconds', 'read'])",15000);

// Load External Scripts
function loadScripts() {
  var s = document.getElementsByTagName('script')[0];
  var loadScript = function(src) {
    var js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = src;
    js.async = true;
    s.parentNode.insertBefore(js, s);
  };
  loadScript("http://connect.facebook.net/en_US/all.js#xfbml=1&appId=355508947902562");
  loadScript("http://platform.twitter.com/widgets.js");
  loadScript("http://www.google-analytics.com/ga.js");
}
if (window.addEventListener)
window.addEventListener("load", loadScripts, false);
else if (window.attachEvent)
window.attachEvent("onload", loadScripts);
else window.onload = loadScripts;