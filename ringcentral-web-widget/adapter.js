(function() {
  console.warn('this uri is deprecated. Please stop use it soon before the feature is completely removed. Please use new uri: https://ringcentral.github.io/ringcentral-embeddable-voice/adapter.js');
  var currentScipt = document.currentScript;
  if (!currentScipt) {
    currentScipt = document.querySelector('script[src*="adapter.js"]');
  }
  if (currentScipt && currentScipt.src) {
    currentScipt = currentScipt.src;
    currentScipt = currentScipt.replace('ringcentral-web-widget', 'ringcentral-embeddable-voice');
  } else {
    currentScipt = "https://ringcentral.github.io/ringcentral-embeddable-voice/adapter.js";
  }
  var rc_s = document.createElement("script");
  rc_s.src = currentScipt;
  var rc_s0 = document.getElementsByTagName("script")[0];
  rc_s0.parentNode.insertBefore(rc_s, rc_s0);
})();
