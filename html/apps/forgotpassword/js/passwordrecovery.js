$(document).ready(function()
{
    var emailerr = false, session = true;

    function resetFields() {
        $("#status-box").text("");
        $("#status-box").removeClass();
        $("#email").val("");
        $("#email").removeClass();
        $("#emailfield").text("");
        $("#emailfield").removeClass();
    }

    function checkEmpty() {
        var emailval = $("#email").val();
        if (!emailval && !($("#email").is(":focus"))) {
            $("#emailfield").text("Required field!");
            $("#email").removeClass();
            $("#emailfield").removeClass();
            $("#email").addClass("error");
            $("#emailfield").addClass("error");
            emailerr = true;
        } else {
            emailerr = false;
            $("#email").removeClass();
            $("#emailfield").removeClass();
            $("#emailfield").text("");
        }
    }

    $("#submit").click(function() {
        checkEmpty();
        if (emailerr) {
            $("#status-box").text("Please fill email");
        } else {
            var mail = $("#email").val();
            $.ajax( "/api/recoverpassword.json", {
                data: { forgotemail: mail },
                dataType: 'json',
                success: function (response) {
                    resetFields();
                    $("#status-box").text(response.message);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $("#status-box").text(thrownError);
                    $("#status-box").addClass("error");
                },
            });
        }
    });
});
