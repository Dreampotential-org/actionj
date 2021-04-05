$(document).ready(function () {
        $(".tab__header .tab").click(function () {
            $(".links__container, .auth__form").hide();
            $(".tab__header .tab").removeClass("active");


            var index = $(".tab__header .tab").index(this);
            $(".auth__form").eq(index).show();
            $(".links__container").eq(index).show();
            $(this).addClass("active");
        })
});