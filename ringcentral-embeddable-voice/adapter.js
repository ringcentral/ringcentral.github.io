(function() {
  console.warn('this uri is deprecated. Please stop use it soon before the feature is completely removed. Please use new uri: https://ringcentral.github.io/ringcentral-embeddable/adapter.js');
  var currentScript = document.currentScript;
  if (!currentScript) {
    currentScript = document.querySelector('script[src*="adapter.js"]');
  }
  if (currentScript && currentScript.src) {
    currentScript = currentScript.src;
    currentScript = currentScript.replace('ringcentral-embeddable-voice', 'ringcentral-embeddable');
  } else {
    currentScript = "https://ringcentral.github.io/ringcentral-embeddable/adapter.js";
  }
  if (currentScript.indexOf('redirectUri') === -1) {
    // To keep using old redirect uri on old embeddable voice adapter.js
    if (currentScript.indexOf('?') > -1) {
      currentScript = currentScript + '&redirectUri=' + encodeURIComponent('https://ringcentral.github.io/ringcentral-embeddable-voice/redirect.html');
    } else {
      currentScript = currentScript + '?redirectUri=' + encodeURIComponent('https://ringcentral.github.io/ringcentral-embeddable-voice/redirect.html');
    }
  }
  var rc_s = document.createElement("script");
  rc_s.src = currentScript;
  var rc_s0 = document.getElementsByTagName("script")[0];
  rc_s0.parentNode.insertBefore(rc_s, rc_s0);
})();
