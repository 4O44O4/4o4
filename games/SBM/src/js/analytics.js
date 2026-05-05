//initialize
var analytics = {};
analytics.initialized = false;
try {
  GameAnalytics("initialize", "a663b41b2672eee43090123d69ed6c57", "b8b30f05f4407c632b801647b5de9853c9f06dfd");
  analytics.initialized = true;
} catch (e) {
  analytics.initialized = false;
}

function analyticsExternalCall(eventName, value) {
  if (!analytics.initialized) return;

  eventName = eventName.replace("’", "");

  if (value != undefined) {
    GameAnalytics("addDesignEvent", eventName, value);
  } else {
    GameAnalytics("addDesignEvent", eventName);
  }
}
