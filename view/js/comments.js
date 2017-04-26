function load_comments()
{
    var is_admin = url_param("controller", "index") == "admin";
    var url = "?controller=comments&action=" + (is_admin ? "get_comments" : "get_approved_comments");
    $.ajax({
        method: 'GET',
        url: url,
        success: function(data){
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
                                $("<small/>", {"class": "text-muted text-danger"}).append(data[i]["edited"]*1 ? "(Edited) " : ""),
                                $("<small/>", {"class": "text-muted"}).append(data[i]["date"])
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
                if (is_admin)
                    init_admin_edit_form();
            }
    });
}

function on_document_ready()
{
    load_comments();
    $("#hidden_frame").on("load", function() {load_comments()});
}

$(document).ready(on_document_ready);
