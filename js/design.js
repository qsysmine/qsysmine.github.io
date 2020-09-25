$(function() {
    var url = "https://api.github.com/repos/qsysmine/posters/contents/svg?callback=?"
    $.getJSON(url, function(data) {
        if($('#designContainer').length) {
            var pics = data.data;
            pics.sort((a,b) => {
              return 0.5 - Math.random();
            }).forEach(function(a, b) {
                var downloadURL = a.download_url;
                var picURL = downloadURL.replace("raw.githubusercontent.com", "cdn.rawgit.com").replace("http:", "https:");
                $('#designContainer').append("<img class='grid-item' src='" + picURL + "'>");
            });
            var $grid = $('#designContainer').masonry({
                itemSelector: '.grid-item',
                gutter: 10
            });
            $grid.imagesLoaded().progress(function() {
                $grid.masonry('layout');
            });
        }
    })
});
