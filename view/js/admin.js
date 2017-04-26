function init_admin_edit_form()
{
    var form = $("#comments_form_block form");
    form.attr("action", "?controller=comments&action=edit");
    form.addClass("invisible");
    $.each($(".comment"), function( key, comment ) {
        var comment = $(comment);
        var new_form = form.clone();
        new_form.insertAfter(comment);
        new_form.append($("<input/>", {"class": "invisible", "type": "text", "name": "id"}));
        new_form.find("textarea").val(comment.find(".comment_msg").text());
        new_form.find("input[name='author']").val(comment.find(".comment_author").text());
        new_form.find("input[name='email']").val(comment.find(".comment_email").text());
        new_form.find("input[name='id']").val(comment.attr("id").split("_")[1]);
        new_form.append(comment.children("input[name='edited']").detach());
        new_form.append(comment.children("input[name='approved']").detach());
        new_form.find(new_form.children("input[name='approved']").val()*1 ? "#approve" : "#unapprove").addClass("invisible");
        comment.append(
            $("<div/>", {"class": "d-inline-block row_left", "id": "admin_buttons"}).append(
                new_form.find("#edit").detach(),
                new_form.find("#approve").detach(),
                new_form.find("#unapprove").detach()
            )
        );
        comment.find("#approve,#unapprove").on("click", function(){
            var value = $(this).attr("id") == "approve" ? 1 : 0;
            $(this).parents(".comment").next().find("input[name='approved']").val(value);
            $(this).parents(".comment").next().submit();
        });
        comment.find("#edit").on("click", function(){
            $(this).parents(".comment").addClass("invisible");
            $(this).parents(".comment").next().removeClass("invisible");
        });
        comment.find("#cancel").on("click", function(){
            $(this).parents("form").addClass("invisible");
            $(this).parents("form").prev().removeClass("invisible");
        });
        comment.find("#save").on("click", function(){
            $(this).parents("form").submit();
        });
    });
}
