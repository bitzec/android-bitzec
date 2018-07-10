var doPause = new Date();
var doResume = new Date();

// Wait for device API libraries to load
//
// Add the deviceready event
document.addEventListener("deviceready", function(){

    // attach events
    document.addEventListener("resume", onResume, false);
    document.addEventListener("pause", onPause, false);
}, false);

function onPause() {
    doPause = new Date();
    doResume = new Date();
}

function onResume() {
    doResume = new Date();
    if (((doResume - doPause) / 1000)>60) {
        location.reload();
    }
}
