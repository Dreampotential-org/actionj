$(document).ready(function () {
        $(".image__container i").click(function () {
            var heart = $(this);

            if(heart.hasClass("bx-heart")){
                heart.removeClass("bx-heart");
                heart.addClass("bxs-heart");
                heart.addClass("liked");
            } else{
                heart.removeClass("bxs-heart");
                heart.addClass("bx-heart");
                heart.removeClass("liked");
            }
        })
})