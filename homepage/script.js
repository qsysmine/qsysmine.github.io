document.ready = function () {
    var date = new Date();
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    $('.date').html(months[date.getMonth()] + ". " + date.getDate() + ", " + date.getFullYear());

    var getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    };
    var showPosition = function(position) {
        $('.weather').html("Found position: (X: " + position.coords.latitude + ", Y: " + position.coords.longitude + "). Loading location.");
        console.log("Herro");
        $('body').append("<script src=\"http://qsysmine.tk/homepage/weather.php?x=" + position.coords.latitude + "&y=" + position.coords.longitude + "\"></script>");
        console.log("Herro");
    };
    getLocation();
};