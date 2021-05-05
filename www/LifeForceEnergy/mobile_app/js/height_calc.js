$(document).ready(function () {
    var content_height = $(".calc__height").eq(0).outerHeight();

    $(".main").css({
        height: content_height + 200 + 'px'
    })

    $(".bottom__link").removeClass("hidden__content");

})