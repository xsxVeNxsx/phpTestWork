function load_comments() {
    var is_admin = url_param("controller", "index") == "admin",
        url = "?controller=" + (is_admin ? "admin" : "comments") + "&action=get_comments" + pagination_order_string();
    $("button,input,textarea").attr('disabled','disabled');
    $.ajax({
        method: 'GET',
        url: url,
        success: function (comments) {
            var data = comments["data"];
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
            init_pagination_fields(comments["count"]*1, comments["page"]*1);
            if (!is_admin) {
                $("button,input,textarea").removeAttr('disabled');
                return;
            }
            $(".comment").append(
                $("<div/>", {"class": "d-inline-block row_left admin_buttons"}).append
                (
                    button("button", "btn btn-success float-left", "approve", "approve", "Approve"),
                    button("button", "btn btn-danger float-left", "unapprove", "unapprove", "Unapprove"),
                    button("button", "btn btn-primary float-left", "edit", "edit", "Edit")
                )
            );
            init_admin_comments_list();
            $("button,input,textarea").removeAttr('disabled');
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

function pagination_order_string()
{
    var result = ""
    $.each($("#order_pagination_fields button"), function(key, button) {
        if ($(button).attr("id") == undefined)
            return;
        result += "&order_field=" + $(button).attr("name");
        result += "&order_rule=" + $(button).attr("id").split("_")[0].toUpperCase()
    });
    result += "&page_size=" + $("#pagination_fields #page_size").val();
    result += "&page=" + $("#pagination_fields #page").find(".active").text();
    return result;
}

function init_pagination_fields(comments_count, page)
{
    var pages_count = Math.ceil(comments_count / ($("#pagination_fields #page_size").val()*1)),
        ul = $("#pagination_fields #page");
    ul.find(".page_number").remove();
    ul.find("li").removeClass("disabled");
    for (var i = 0; i < pages_count; ++i)
        $("<li/>", {"class": "page-item page_number " + (i + 1 == page ? "active" : "")}).append(
            $("<a/>", {"href": "#", "class": "page-link", "text": i + 1}).on("click", function (e){
                ul.find(".page_number").removeClass("active");
                $(this).parent().addClass("active");
                load_comments();
            })
        ).insertBefore(ul.find("li:last"));
    if (ul.find(".active").length == 0)
        ul.find(".page_number:first").addClass("active");
    if (ul.find(".page_number:first").hasClass("active"))
        ul.find("li:first").addClass("disabled");
    if (ul.find(".page_number:last").hasClass("active"))
        ul.find("li:last").addClass("disabled");
}

$(document).ready(function () {
    $("#hidden_frame").on("load", load_comments);
    $("#order_pagination_fields button").on("click", function (){
        var id_val = "asc_order_field";
        switch_val = {"asc": "desc", "desc": "asc"};
        text_prefix = {"asc_order_field": "↑", "desc_order_field": "↓"};
        if ($(this).attr("id") != undefined)
            id_val = switch_val[$(this).attr("id").split("_")[0]] + "_order_field";
        $.each($("#order_pagination_fields button"), function(i, button){
            $(button).removeAttr("id").text($(button).text().replace(/↑|↓|\s/g, ""));
        });
        $(this).attr("id", id_val);
        $(this).text($(this).text() + " " + text_prefix[id_val]);
        load_comments();
    });
    $("#pagination_fields #page_size").on("change", function (){
        load_comments();
    });
    $("#pagination_fields #page").find("li:first").on("click", function (){
        $("#pagination_fields #page").find(".active").prev().children("a").click();
    });
    $("#pagination_fields #page").find("li:last").on("click", function (){
        $("#pagination_fields #page").find(".active").next().children("a").click();
    });

    load_comments();
});
