Config = {"img_url": "", "home_url": "", "is_authed": false, "img_max_width": 320, "img_max_height": 240}

function init_config(img_url, home_url, is_authed, img_max_width, img_max_height)
{
    Config["img_url"] = img_url;
    Config["home_url"] = home_url;
    Config["is_authed"] = is_authed;
    Config["img_max_width"] = img_max_width * 1;
    Config["img_max_height"] = img_max_height * 1;
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

function show_alerts()
{
    var errors = $($("#hidden_frame")[0].contentWindow.document).find("#errors"),
        success = $($("#hidden_frame")[0].contentWindow.document).find("#success");
    $(".alert").addClass("invisible");
    if (errors.length > 0)
        $("#error_alert").removeClass("invisible").text(errors.text());
    if (success.length > 0)
        $("#success_alert").removeClass("invisible").text(success.text());
}

$(document).ready(function () {
    init_links();
    $("#hidden_frame").on("load", show_alerts);
});
