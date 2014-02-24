document.ready = function () {
    (function () {
        window.capitaliseFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        $('#define').click(function () {
            console.log("ermagherd");
            $("body").append("<script src='http://qsysmine.tk/vofv/request.php?word=" + $('#word').val().toLowerCase() + "'></" + "script>");
            $('.origin>a').attr("href", "http://www.etymonline.com/index.php?search=" + $('#word').val()).attr("target", "_blank").html("Etymology");
        });
        $(document).keyup(function () {
            setTimeout(function () {
                $('#wordPO').html($('#word').val());
                $('#defPO').html($('#definition').val());
                $('#remodelingPO').html($('#remodeling1').val() + " (" + $('#pOs1').val() + "), " + $('#remodeling2').val() + " (" + $('#pOs2').val() + ")");
                $('#etymPO').html($('#etymology').val());
                $('#sentencePO').html($('#sentence').val());
                $('#synonymPO').html($('#synonym').val());
                $('#antonymPO').html($('#antonym').val());
            }, 1);
        });
    })();
};