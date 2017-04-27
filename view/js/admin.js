function init_admin_edit_form()
{
    var form = $("#comment_form");
    form.attr("action", "?controller=comments&action=edit");
    form.addClass("invisible");
    form.append($("<input/>", {"class": "invisible", "type": "text", "name": "id"}));
    form.append($("<input/>", {"class": "invisible", "type": "text", "name": "date"}));
    form.append
    (
        $("<input/>", {"class": "invisible", "type": "text", "name": "approved"}),
        $("<input/>", {"class": "invisible", "type": "text", "name": "edited"})
    );
}

function init_admin_comments_list()
{
    $.each($(".comment"), function( key, comment ) {
        var comment = $(comment);

        comment.find(comment.children("input[name='approved']").val()*1 ? "#approve" : "#unapprove").addClass("invisible");
        comment.find("#approve,#unapprove").on("click", function(){
            var value = $(this).attr("id") == "approve" ? 1 : 0;
            comment.find("input[name='approved']").val(value);
            fill_form(comment);
            $("#comment_form").find("#save").click();
        });
        comment.find("#edit").on("click", function(){
            fill_form(comment);
            $("#comment_form #cancel").click();
            $("#comment_form").insertAfter(comment);
            $(this).parents(".comment").addClass("invisible");
            $("#comment_form").removeClass("invisible");
        });
        $("#comment_form").find("#cancel").on("click", function(){
            $("#comment_form").addClass("invisible");
            comment.removeClass("invisible");
        });
        $("#comment_form").find("#save").on("click", function(){
            $("#comments_form_block").append($("#comment_form"));
        });
    });
}

function fill_form(comment)
{
    form = $("#comment_form");
    form.find("textarea").val(comment.find(".comment_msg").text());
    form.find("input[name='author']").val(comment.find(".comment_author").text());
    form.find("input[name='email']").val(comment.find(".comment_email").text());
    form.find("input[name='date']").val(comment.find(".comment_date").text());
    form.find("input[name='id']").val(comment.attr("id").split("_")[1]);
    form.find("input[name='edited']").val(comment.find("input[name='edited']").val());
    form.find("input[name='approved']").val(comment.find("input[name='approved']").val());
}

$(document).ready(init_admin_edit_form);
