$(function() {
    var titles = {
      "/design/": "Design - Ari Stassinopoulos",
      "/development/": "Development - Ari Stassinopoulos",
      "/": "Ari Stassinopoulos"
    };

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
              window.scrollTo(0,0);
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
                window.scrollTo(0,0);
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
        if(titles[href]) {
        for(el in document.getElementsByTagName("title")) {
          document.getElementsByTagName("title")[el].innerText = titles[href];
        }
      }
    };
    window.resolveSilentLinks = function() {
      window.onpopstate = (() => {
        loadPage(location.pathname, true);
      });
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
    resolveSilentLinks();
});
