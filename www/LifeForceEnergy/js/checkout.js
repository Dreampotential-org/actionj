var tab = 0;

$(document).ready(function () {
    $("#forward").click(function (e) {
        e.preventDefault()
        if(tab === 2) {
            return false;
        } else{
            $(".checkout__section").hide();
            var next_tab = tab + 1;
            $(".checkout__section").eq(next_tab).show();
            tab = next_tab;

            if (tab === 2){
                $("#forward").find("span").text("PLACE ORDER");
            }

            $("html, body").animate({scrollTop: 0}, 800)
        }


    })

    $("#backward").click(function (e) {
        e.preventDefault()
        if(tab === 0) {
            return false;
        } else{
            if (tab === 2){
                $("#forward").find("span").text("NEXT");
            }
            $(".checkout__section").hide();
            var next_tab = tab - 1;
            $(".checkout__section").eq(next_tab).show();
            tab = next_tab;

            $("html, body").animate({scrollTop: 0}, 800)
        }


    })
})