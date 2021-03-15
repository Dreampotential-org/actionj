$(document).ready(function () {
    $("#toggler").click(function () {
        $(".modal").show();
        if ($(".modal").hasClass("pad-reverse")) {
            $(".modal").removeClass("pad-reverse")
        }
    })

    $(".close").click(function () {
        $(".modal").addClass("pad-reverse")
        setTimeout(function () {
            $(".modal").hide();
        }, 200)
    })

})