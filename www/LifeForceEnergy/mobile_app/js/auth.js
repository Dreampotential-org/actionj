$(document).ready(function () {
        $(".auth__tab").click(function () {
            $(".auth__tab").removeClass("active");
            $(".form__container").hide();
            $(".additional__links").hide();

            var index = $(".auth__tab").index(this);
            $(this).addClass("active");
            $(".additional__links").eq(index).show();
            $(".form__container").eq(index).show();
        })
})