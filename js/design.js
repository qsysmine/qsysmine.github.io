$(function() {
    var url = "https://api.github.com/repos/qsysmine/posters/contents/svg?callback=?"
    $.getJSON(url, function(data) {
        if($('#designContainer').length) {
            var pics = data.data;
            pics.forEach(function(a, b) {
                var downloadURL = a.download_url;
                var picURL = downloadURL.replace("raw.githubusercontent.com", "rawgit.com");
                $('#designContainer').append("<img class='grid-item' src='" + picURL + "'>");
            });
            var $grid = $('#designContainer').masonry({
                itemSelector: '.grid-item'
            });
            $grid.imagesLoaded().progress(function() {
                $grid.masonry('layout');
            });
        }
    })
});