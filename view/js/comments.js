function load_comments() {
    var is_admin = url_param("controller", "index") == "admin",
        url = "?controller=comments&action=" + (is_admin ? "get_comments" : "get_approved_comments") + order_string();
    $.ajax({
        method: 'GET',
        url: url,
        success: function (data) {
            $("#comments_block").children().remove();
            for (var i = 0; i < data.length; ++i)
                $("#comments_block").append(
                    $("<div/>", {"class": "row comment", "id": "comment_" + data[i]["id"]}).append(
                        $("<div/>", {"class": "d-inline-block row_left"}).append
                        (
                            $("<img/>", {"class": "card-img-top", "src": Config["img_url"] + data[i]["img"]})
                        ),
                        $("<div/>", {"class": "card-block d-inline-block row_right"}).append
                        (
                            $("<p/>", {"class": "card-text text-right"}).append(
                                $("<small/>", {"class": "text-muted text-danger"}).append(data[i]["edited"] * 1 ? "(Edited) " : ""),
                                $("<small/>", {"class": "text-muted comment_date"}).append(data[i]["date"])
                            ),
                            $("<h4/>", {"class": "card-title comment_author"}).append(data[i]["author"]),
                            $("<h6/>", {"class": "card-subtitle mb-2 text-muted comment_email"}).append(data[i]["email"]),
                            $("<p/>", {"class": "card-text comment_msg"}).append(data[i]["msg"])
                        ),
                        $("<input/>", {
                            "class": "invisible",
                            "type": "text",
                            "name": "approved",
                            "value": data[i]["approved"]
                        }),
                        $("<input/>", {
                            "class": "invisible",
                            "type": "text",
                            "name": "edited",
                            "value": data[i]["edited"]
                        })
                    )
                );
            show_errors();
            if (!is_admin)
                return
            $(".comment").append(
                $("<div/>", {"class": "d-inline-block row_left admin_buttons"}).append
                (
                    $("<button/>", {
                        "type": "button",
                        "class": "btn btn-success float-left",
                        "name": "approve",
                        "id": "approve",
                        "text": "Approve"
                    }),
                    $("<button/>", {
                        "type": "button",
                        "class": "btn btn-danger float-left",
                        "name": "unapprove",
                        "id": "unapprove",
                        "text": "Unapprove"
                    }),
                    $("<button/>", {
                        "type": "button",
                        "class": "btn btn-primary float-left",
                        "name": "edit",
                        "id": "edit",
                        "text": "Edit"
                    })
                )
            );
            init_admin_comments_list();
        }
    });
}

function order_string()
{
    var result = ""
    $.each($("#order_fields button"), function(key, button) {
        if ($(button).attr("id") == undefined)
            return;
        result += "&order_field=" + $(button).attr("name");
        result += "&order_rule=" + $(button).attr("id").split("_")[0].toUpperCase()
    });
    return result;
}

$(document).ready(function () {
    $("#hidden_frame").on("load", function() {load_comments()});
    $("#order_fields button").on("click", function (){
        var id_val = "asc_order_field";
        switch_val = {"asc": "desc", "desc": "asc"};
        text_prefix = {"asc_order_field": "↑", "desc_order_field": "↓"};
        if ($(this).attr("id") != undefined)
            id_val = switch_val[$(this).attr("id").split("_")[0]] + "_order_field";
        $.each($("#order_fields button"), function(i, button){
            $(button).removeAttr("id").text($(button).text().replace(/↑|↓|\s/g, ""));
        });
        $(this).attr("id", id_val);
        $(this).text($(this).text() + " " + text_prefix[id_val]);
        load_comments();
    })
    load_comments();
});
