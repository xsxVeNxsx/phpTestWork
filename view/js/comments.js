function load_comments() {
    var is_admin = url_param("controller", "index") == "admin",
        url = "?controller=comments&action=" + (is_admin ? "get_comments" : "get_approved_comments") + order_string();
    $.ajax({
        method: 'GET',
        url: url,
        success: function (data) {
            $("#comments_block").children().remove();
            for (var i = 0; i < data.length; ++i)
            {
                data[i]["img"] = Config["img_url"] + data[i]["img"];
                var blocks = main_comment_objects(data[i]);

                $("#comments_block").append
                (
                    $("<div/>", {"class": "row comment", "id": "comment_" + data[i]["id"]}).append
                    (
                        blocks["left_block"],
                        blocks["right_block"],
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
            }
            show_alerts();
            if (!is_admin)
                return;
            $(".comment").append(
                $("<div/>", {"class": "d-inline-block row_left admin_buttons"}).append
                (
                    button("button", "btn btn-success float-left", "approve", "approve", "Approve"),
                    button("button", "btn btn-danger float-left", "unapprove", "unapprove", "Unapprove"),
                    button("button", "btn btn-primary float-left", "edit", "edit", "Edit")
                )
            );
            init_admin_comments_list();
        }
    });
}

function main_comment_objects(data)
{
    return {
        "left_block": $("<div/>", {"class": "d-inline-block row_left"}).append
        (
            $("<img/>", {"class": "card-img-top", "src": data["img"]})
        ),
        "right_block": $("<div/>", {"class": "card-block d-inline-block row_right"}).append
        (
            $("<p/>", {"class": "card-text text-right"}).append
            (
                $("<small/>", {"class": "text-muted text-danger"}).append(data["edited"] * 1 ? "(Edited) " : ""),
                $("<small/>", {"class": "text-muted comment_date"}).append(data["date"])
            ),
            $("<h4/>", {"class": "card-title comment_author"}).append(data["author"]),
            $("<h6/>", {"class": "card-subtitle mb-2 text-muted comment_email"}).append(data["email"]),
            $("<p/>", {"class": "card-text comment_msg"}).append(data["msg"])
        )
    };
}

function button(_type, _class, _name, _id, _text)
{
    return $("<button/>", {
        "type": _type,
        "class": _class,
        "name": _name,
        "id": _id,
        "text": _text
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
