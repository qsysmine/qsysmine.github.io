$(function() {
    var loadPage = function(href, ps) {
        if(href != "/") {
            $('body').css({
                overflowY: "hidden"
            });
            var redDiv = $('<div class="huge huge-red"></div>');
            redDiv.css({
                bottom: -1 * $("body").height(),
                translate: [0, $("body").height()]
            });
            redDiv.appendTo("html").transition({
                translate: [0, 0]
            }, 500, function() {
                $('#container').load(href + " #container", function() {
                    if(!ps) history.pushState({
                        path: href
                    }, "", href);
                    resolveSilentLinks();
                });
                var greenDiv = $('<div class="huge huge-green"></div>');
                greenDiv.css({
                    bottom: -1 * $("body").height(),
                    translate: [0, $("body").height()]
                });
                greenDiv.appendTo("html").transition({
                    translate: [0, 0]
                }, 500, function() {
                    redDiv.remove();
                    var blueDiv = $('<div class="huge huge-blue"></div>');
                    blueDiv.css({
                        bottom: -1 * $("body").height(),
                        translate: [0, $("body").height()]
                    });
                    blueDiv.appendTo("html").transition({
                        translate: [0, 0]
                    }, 500, function() {
                        greenDiv.remove();
                        blueDiv.slideUp(function() {
                            $(this).remove();
                            $('body').css({
                                overflowY: "auto"
                            });
                        });
                    });
                });
            });
        } else {
            $('#container').transition({
                translate: [0, -1 * $('#container').height()]
            }, 500, function() {
                $('body').css({
                    overflowY: "hidden"
                });
                $('#container').load(href + " #container", function() {
                    if(!ps) history.pushState({
                        path: href
                    }, "", href);
                    resolveSilentLinks();
                    $('#container').css({
                        translate: [0, $('#container').height()]
                    }).transition({
                        translate: [0, 0]
                    }, function() {
                        $('body').css({
                            overflowY: "auto"
                        });
                    });
                });
            })
        }
    };
    window.resolveSilentLinks = function() {
        $('a.silent').each(function(index, element) {
            var $element = $(this);
            $element.click(function(e) {
                var regExp = new RegExp("//" + location.host + "($|/)");
                var href = $element.attr("href");
                var isLocal = (href.substring(0, 4) === "http") ? regExp.test(href) : true;
                if(isLocal) {
                    e.preventDefault();
                    loadPage(href);
                }
            });
        });
        $('span.silentJSFlag').each(function() {
            var $element = $(this);
            if($element.attr("data-src")) {
                $.getScript($element.attr("data-src"), function() {
                    $element.remove();
                });
            }
        });
    };
    window.onpopstate = function(event) {
        if(event.state) {
            var href = event.state.path;
            var isLocal = (href.substring(0, 4) === "http") ? regExp.test(href) : true;
            if(isLocal) loadPage(href, true);
        }
    };
    var hSVG = "";
    $.get("/h.svg", {}, function(data) {
        console.log(data);
        hSVG = data;
    }, "text");
    $(document).keydown(function(e) {
        if($(e.target).is('input')) {
            return;
        } else if(e.keyCode == 74 && hSVG != "") {
            var hSDiv = $('<div class="bigImgContainer">' + hSVG + '</div>');
            hSDiv.appendTo("body").transition({
                opacity: 0
            }, 1000, function() {
                $(this).remove();
            });
            return false;
        }
    });
    resolveSilentLinks();
});