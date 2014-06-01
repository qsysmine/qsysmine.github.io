(function() {
    $('#livePreview').keyup(function() {
        $('body').append("<script src='http://qsysmine.tk/md5API?mode=JS&text=" + $('#livePreview').val() + "'></script>");
    });
})();