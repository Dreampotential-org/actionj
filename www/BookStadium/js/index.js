var slide_container = $(".best__seller__section .image__container");
var details_container = $(".best__seller__section .text__container")

$(document).ready(function () {
        $(".product__dot").click(function () {
            $(".product__dot").removeClass("active");
            slide_container.find("img").addClass("hidden__content");
            details_container.find(".product__details").addClass("hidden__content");

            var index = $(".product__dot").index(this);


                $(".product__dot").eq(index).addClass("active");
            details_container.find(".product__details").eq(index).removeClass("hidden__content");
                fadeIn(index, function () {
                        setTimeout(function () {
                            slide_container.find("img").eq(index).removeClass("hidden__content");
                        }, 100)
                })


        })


    $(window).scroll(function () {
    if($(this).scrollTop() >= 2500) {
        $(".inline__list").addClass("full__fade");
    }
    })
})

function fadeIn(index, callback) {
    slide_container.find("img").eq(index).addClass("slow__fade");

    callback();
}