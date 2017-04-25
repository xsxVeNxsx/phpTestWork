function load_comments()
{
    var is_admin = url_param("controller", "index") == "admin";
    var url = "?controller=comments&action=" + (is_admin ? "get_comments" : "get_approved_comments");
    $.ajax({
        method: 'GET',
        url: url,
        success: function(data){
            var arr = $("#comments_block").children();
            for (var i = 0; i < arr.length; ++i)
                $(arr[i]).remove();
            for (var i = 0; i < data.length; ++i)
                $("#comments_block").append(
                    $("<div/>", {"class": "card"}).append
                    (
                        $("<img/>", {"class": "card-img-top","src": Config["img_url"] + data[i]["img"]}),
                        $("<div/>", {"class": "card-block"}).append
                        (
                            $("<h4/>", {"class": "card-title"}).append(data[i]["author"]),
                            $("<h6/>", {"class": "card-subtitle mb-2 text-muted"}).append(data[i]["email"]),
                            $("<p/>", {"class": "card-text"}).append(data[i]["msg"]),
                            $("<p/>", {"class": "card-text text-right"}).append(
                                $("<small/>", {"class": "text-muted"}).append(data[i]["date"])
                            )
                        )
                    )
                )
        }
    });
}

function on_document_ready()
{
    load_comments();
    $("#hidden_frame").on("load", function() {load_comments()});
}

$(document).ready(on_document_ready);
