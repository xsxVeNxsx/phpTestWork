Config = {"img_url": "", "home_url": "", "is_authed": false}

function init_config(img_url, home_url, is_authed)
{
    Config["img_url"] = img_url;
    Config["home_url"] = home_url;
    Config["is_authed"] = is_authed;
}

function url_param(name, def)
{
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
        .exec(window.location.href);

    return results != null ? results[1] : def;
}

function set_links()
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

$(document).ready(set_links);