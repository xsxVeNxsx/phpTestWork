$(document).ready(function () {
    $("#hidden_frame").on("load", function () {
        if ($($("#hidden_frame")[0].contentWindow.document).find("#success").length > 0)
            window.location = "?controller=admin";
    })
})
