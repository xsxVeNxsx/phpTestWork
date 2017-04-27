function create_preview()
{
    var data = {
        "author": $("#comment_author").val(),
        "email": $("#comment_email").val(),
        "msg": $("#comment_msg").val(),
        "img": "",
        "edited": 0,
        "date": date_format()
    };

    function date_format()
    {
        var date = new Date(),
            month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1),
            day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month+ "-" + day + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    function resize_img()
    {
        var width = $(this).width(),
            height = $(this).height();
        if (width > Config["img_max_width"] || height > Config["img_max_height"])
        {
            var h_or_w = height > width? true : false;
            $(this).width(h_or_w ? Config["img_max_width"] : Math.floor(width * (Config["img_max_height"] / height)));
            $(this).height(h_or_w ? Math.floor(height * (Config["img_max_width"] / width)) : Config["img_max_height"]);
        }
        $(this).removeClass("invisible");
    }

    function show(blocks)
    {
        $("#comment_form").addClass("invisible");
        $("<div/>", {"class": "row comment", "id": "comment_preview"}).append
        (
            blocks["left_block"],
            blocks["right_block"],
            $("<div/>", {"class": "d-inline-block row_left admin_buttons"}).append
            (
                button("button", "btn btn-primary float-left", "submit2", "submit2", "Submit").on("click", function (){
                    $("#comment_form").find("#submit").click();
                }),
                button("button", "btn btn-warning float-left", "cancel", "cancel", "Cancel").on("click", function (){
                    $("#comment_form_title").text("Add comment");
                    $("#comment_form").removeClass("invisible").next().remove();
                })
            )
        ).insertAfter($("#comment_form"));
        $("#comment_form_title").text("Preview");
        $("#comment_preview").find("img").addClass("invisible");
        $("#comment_preview").find("img").on("load", resize_img);
    }

    if ($("#comment_file")[0].files.length == 0)
    {
        show(main_comment_objects(data));
        return;
    }

    var oFReader = new FileReader();
    oFReader.readAsDataURL($("#comment_file")[0].files[0]);
    oFReader.onload = function (e) {
        data["img"] = e.target.result;
        show(main_comment_objects(data));
    };
}

$(document).ready(function() {
    $("#comment_form").find("#preview").on("click", create_preview);
})