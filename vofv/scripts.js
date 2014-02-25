document.ready = function () {
    window.unID = Math.sqrt(new Date().getTime());
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
                $('#wordPO').html("Word: " + $('#word').val());
                $('#defPO').html("Definition: " + $('#definition').val());
                $('#remodelingPO').html("Remodeling: " + $('#remodeling1').val() + " (" + $('#pOs1').val() + "), " + $('#remodeling2').val() + " (" + $('#pOs2').val() + ")");
                $('#etymPO').html("Origin: " + $('#etymology').val());
                $('#sentencePO').html("Sentence: " + $('#sentence').val().split("[").join("<u>").split("]").join("</u>"));
                $('#synonymPO').html("Synonym: " + $('#synonym').val());
                $('#antonymPO').html("Antonym: " + $('#antonym').val());
            }, 1);
        });
        window.crossPost = function (params) {
            // Add the iframe with a unique name
            var iframe = document.createElement("iframe");
            var uniqueString = "asdfghjkl;'''';lkjhgfdsaqwertyuiop;'[][][polkjhgfghnmkjhgfdertyuiop[]]";
            document.body.appendChild(iframe);
            iframe.style.display = "none";
            iframe.contentWindow.name = uniqueString;

            // construct a form with hidden inputs, targeting the iframe
            var form = document.createElement("form");
            form.target = uniqueString;
            form.action = "http://qsysmine.tk/vofv2drive/?mode=post";
            form.method = "POST";

            // repeat for each parameter
            for (var i in params) {
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = i;
                input.value = params[i];
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
        };
    })();
    $('#crossPostButton').click(function() {
        window.crossPost({
            word: $('#wordPO').html(),
            def: $('#defPO').html(),
            remodeling: $('#remodelingPO').html(),
            origin: $('#etymPO').html(),
            sentence: $('#sentencePO').html(),
            synonym: $('#synonymPO').html(),
            antonym: $('#antonymPO').html(),
            unID: unID
        });
        window.open("http://qsysmine.tk/vofv2drive/shell.php?id="+unID);
    });
    $('#getImageButton').click(function() {
        $('#vofvImage').attr('src', $('#getImageURL').val());
    });
};