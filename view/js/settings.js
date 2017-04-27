Config = {"img_url": "", "home_url": "", "is_authed": false}

function init_config(img_url, home_url, is_authed)
{
    Config["img_url"] = img_url;
    Config["home_url"] = home_url;
    Config["is_authed"] = is_authed;
}

function url_param(name, def)
{
    var results = new RegExp("[\?&]" + name + "=([^&#]*)").exec(window.location.search);

    return results != null ? results[1] : def;
}

function init_links()
{
    $("#navbarNav #home_link").attr("href", Config["home_url"]);
    $("#navbarNav #auth_link").attr("href", Config["home_url"] + "?controller=auth&action=" + (Config["is_authed"] ? "signout" : "index"));
    $("#navbarNav #admin_link").attr("href", Config["home_url"] + "?controller=admin");
    $("#navbarNav #auth_link").children().remove();
    $("#navbarNav #auth_link").append(Config["is_authed"] ? "Signout" : "Signin");
    $("#auth_form").attr("action", Config["home_url"] + "?controller=auth&action=signin");

    var menuElement_by_controller = {"auth": "#auth_link", "admin": "#admin_link", "index": "#home_link"}
    $.each(menuElement_by_controller, function(index, value) {
        $("#navbarNav " + value).attr("style", url_param("controller", "index") == index ? "text-decoration:underline" : "");
    });
}

function show_errors()
{
    var div = $($("#hidden_frame")[0].contentWindow.document).find("#frame_errors");
    $(".alert").remove();
    if (div.length == 0)
        return;
    $("#comment_form").prepend(
        $("<div/>", {"class": "alert alert-danger", "text": div.text()}).append()
    )
}

function get_order_by_url()
{
    url_param
}

$(document).ready(init_links);
