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