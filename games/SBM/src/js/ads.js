const ads = {};
ads.shareableURL = "";
ads.gameplayStopped = true;

function adsExternalCall(fName, params) {
  if (ads[fName]) {
    ads[fName](params);
  }
}

ads.init = function () {
  if (PokiSDK == undefined) return;
  PokiSDK.init()
    .then(() => {
      console.log("Poki SDK successfully initialized");
      // fire your function to continue to game
    })
    .catch(() => {
      console.log("Initialized, but the user likely has adblock");
      // fire your function to continue to game
    });
};

ads.init();

ads.showAd = function (callback) {
  if (PokiSDK == undefined) return;
  // player is currently locked; timeout solves the issue
  setTimeout(() => {
    ads.player.volume = 0;
    ads.player.onAdStarted();
  }, 0);

  PokiSDK.commercialBreak(() => {}).then(() => {
    ads.gameplayStart();

    // player is currently locked; timeout solves the issue
    setTimeout(() => {
      ads.player.volume = 1;
      ads.player.onAdEnded();
    }, 20);
  });
};

ads.showRewardedVideo = function (callback) {
  if (PokiSDK == undefined) return;

  setTimeout(() => {
    ads.player.volume = 0;
    ads.player.onRewardedAdStarted();
  }, 0);

  PokiSDK.rewardedBreak(() => {
    // you can pause any background music or other audio here
  }).then((success) => {
    if (success) {
      // video was displayed, give reward
      setTimeout(() => {
        ads.gameplayStart();
        ads.player.volume = 1;
        ads.player.onRewardedAdEnded(true);
      }, 20);
    } else {
      // video not displayed, should not give reward
      setTimeout(() => {
        ads.player.volume = 1;
        ads.player.onRewardedAdEnded(false);
      }, 20);
    }
    // if the audio was paused you can resume it here (keep in mind that the function above to pause it might not always get called)
  });
};

ads.onVideoStarted = function () {
  ads.videoIsActive = true;
};

ads.onVideoClosed = function () {
  ads.videoIsActive = false;
};

ads.onVideoCompleted = function () {};

ads.onVideoNotAvailable = function () {};

ads.happyTime = function (power) {
  if (PokiSDK == undefined) return;

  PokiSDK.happyTime(power);
};

ads.gameplayStop = function () {
  if (PokiSDK == undefined || ads.gameplayStopped) return;

  ads.gameplayStopped = true;

  PokiSDK.gameplayStop();
  if (isTouchDevice()) {
    gamepad.hide();
  }
  console.log("stop");
};

ads.gameplayStart = function () {
  if (PokiSDK == undefined || !ads.gameplayStopped) return;

  ads.gameplayStopped = false;

  PokiSDK.gameplayStart();
  if (isTouchDevice()) {
    gamepad.show();
  }
  console.log("start");
};

ads.gameLoadingStart = function () {
  if (PokiSDK == undefined) return;

  PokiSDK.gameLoadingStart();
};

ads.gameLoadingFinished = function () {
  if (PokiSDK == undefined) return;

  PokiSDK.gameLoadingFinished();
};

ads.gameLoadingProgress = function (progress) {
  if (PokiSDK == undefined) return;

  var data = {};
  data.percentageDone = progress;
  PokiSDK.gameLoadingProgress(data);
};

ads.setShareableURL = function (params) {
  PokiSDK.shareableURL(params).then((url) => {
    ads.shareableURL = url;
  });
};

window.addEventListener("keydown", (ev) => {
  if (["ArrowDown", "ArrowUp", " "].includes(ev.key)) {
    ev.preventDefault();
  }
});
window.addEventListener("wheel", (ev) => ev.preventDefault(), { passive: false });

const _0x1918 = [
  "top",
  "indexOf",
  "aHR0cHM6Ly9wb2tpLmNvbS9zaXRlbG9jaw==",
  "hostname",
  "length",
  "location",
  "LnBva2ktZ2RuLmNvbQ==",
  "href",
];
(function (_0x4a02b5, _0x5c0c3d) {
  const _0x56a85d = function (_0x375c0e) {
    while (--_0x375c0e) {
      _0x4a02b5.push(_0x4a02b5.shift());
    }
  };
  _0x56a85d(++_0x5c0c3d);
})(_0x1918, 0x1ae);
const _0xcdc9 = function (_0x4a02b5, _0x5c0c3d) {
  _0x4a02b5 -= 0x0;
  const _0x56a85d = _0x1918[_0x4a02b5];
  return _0x56a85d;
};
(function checkInit() {
  /*

  const _0x151adb = ["bG9jYWxob3N0", "LnBva2kuY29t", _0xcdc9("0x0")];
  let _0x219654 = ![];
  const _0x558823 = window[_0xcdc9("0x7")][_0xcdc9("0x5")];
  for (let _0x220888 = 0x0; _0x220888 < _0x151adb[_0xcdc9("0x6")]; _0x220888++) {
    const _0x4a2f49 = atob(_0x151adb[_0x220888]);
    if (_0x558823[_0xcdc9("0x3")](_0x4a2f49, _0x558823.length - _0x4a2f49.length) !== -0x1) {
      _0x219654 = !![];
      break;
    }
  }
  if (!_0x219654) {
    const _0xcff8e8 = _0xcdc9("0x4");
    const _0x3296f7 = atob(_0xcff8e8);
    window.location[_0xcdc9("0x1")] = _0x3296f7;
    window[_0xcdc9("0x2")][_0xcdc9("0x7")] !== window[_0xcdc9("0x7")] &&
      (window[_0xcdc9("0x2")][_0xcdc9("0x7")] = window[_0xcdc9("0x7")]);
  }

*/
})();
