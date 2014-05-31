(function () {
    var beep = function (duration, type, finishedCallback) {
        if (!(window.audioContext || window.webkitAudioContext)) {
            throw Error("Your browser does not support Audio Context.");
        }
        duration = +duration;
        // Only 0-4 are valid types.
        type = (type % 5) || 0;
        if (typeof finishedCallback != "function") {
            finishedCallback = function () {};
        }
        var ctx = new(window.audioContext || window.webkitAudioContext);
        var osc = ctx.createOscillator();
        osc.type = type;
        osc.connect(ctx.destination);
        osc.noteOn(0);
        setTimeout(function () {
            osc.noteOff(0);
            finishedCallback();
        }, duration);
    };
    $('#startButton').click(function () {
        var countdown = parseInt($('#amountOfHiderTime').val());
        var countdown1 = parseInt($('#amountOfSeekerTime').val());
        $('#setup').slideUp();
        $('#countdown0').html(countdown);
        $('#countdown0C').slideDown();
        beep(1000, 1, function () {
            cd0(countdown, countdown1);
        });
    });
    var cd0 = function (c, c1) {
        var time = c;
        var i = setInterval(function () {
            time--;
            $('#countdown0').html(time);
            if (time <= 0) {
                clearInterval(i);
                beep(1000, 1, function () {
                    cd1(c1);
                    $('#countdown0C').slideUp();
                    $('#countdown1').html(c1);
                    $('#countdown1C').slideDown();
                    beep(1000, 1, function () {
                        cd0(countdown, countdown1);
                    });
                });
            }
        }, 1000);
    };
    var cd1 = function (c) {
        var time = c;
        var i = setInterval(function () {
            time--;
            $('#countdown1').html(time);
            if (time <= 0) {
                clearInterval(i);
                beep(1000, 1, function () {
                    cd1(c1);
                    $('#countdown0C').slideUp();
                    $('#countdown1').html(countdown);
                    $('#countdown1C').slideDown();
                    beep(1000, 1, function () {});
                });
            }
        }, 1000);
    };
})();