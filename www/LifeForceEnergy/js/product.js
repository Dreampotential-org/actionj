$(document).ready(function () {
    $(".product__like").click(function () {
        var heart = $(".product__like i");

        if(heart.hasClass("bx-heart")){
            heart.removeClass("bx-heart");
            heart.addClass("bxs-heart");
            $(".product__like").addClass("liked");
        } else{
            heart.removeClass("bxs-heart");
            heart.addClass("bx-heart");
            $(".product__like").removeClass("liked");
        }
    })

    $(".product__color .color").click(function () {
        $(".product__color .color").removeClass("colored__border");
        $(this).toggleClass("colored__border");
    })

    $("#order__quantity").on("input", function() {
        var length = $(this).val().length;
        var value = $(this).val().slice(length-1)

        if (isNaN(value)) {
            $(this).val($(this).val().replace(value, ""));
        }
    })

    $("#order__quantity").on("blur", function() {
        if($(this).val() === "" || $(this).val() === null) {
            $(this).val(1);
        }
    })

    $(".quantity__plus").click(function () {
        var value = $("#order__quantity").val();

        var incremented = parseInt(value) + 1;
        $("#order__quantity").val(incremented);
    })

    $(".quantity__minus").click(function () {
        var value = parseInt($("#order__quantity").val());

       if(value != 1){
           var decreased = parseInt(value) - 1;
           $("#order__quantity").val(decreased);
       }
    })

    $(".detail__content").click(function () {
        $(".detail__content").removeClass("active");
        $(".full__list__detail").addClass("hidden__content");

       var  index = $(".detail__content").index(this);
       $(this).addClass("active");

       $(".full__list__detail").eq(index).removeClass("hidden__content");

    })

    $(".image__item img").click(function () {
        var clone = $(this).clone();
        $(".product__modal .image__container").append(clone);
        $(".product__modal").show();
    })

    $("#close__modal").click(function () {
        $(".product__modal .image__container").html("");
        $(".product__modal").hide();
    })

    $(document).on("click", function (e) {
        if($(e.target).is(".product__modal")) {
            $(".product__modal .image__container").html("");
            $(".product__modal").hide();
        }
    })
})