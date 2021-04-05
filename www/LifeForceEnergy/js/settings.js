$(document).ready(function () {
        var tab__selector = $(".settings__list .setting");
        var setting_tab = $(".setting__content");
        tab__selector.click(function () {
            var index = tab__selector.index(this);

            if(index != 4) {
                tab__selector.removeClass("active");
                setting_tab.hide();
                $(this).addClass("active");

                setting_tab.eq(index).show();

                $("html, body").animate({scrollTop: 0}, 300)
            }
        })

        $(".show__details").click(function (e) {
            e.preventDefault();
            setting_tab.hide();
            setting_tab.eq(4).show();
        })

        $("#back__to__orders").click(function () {
            setting_tab.hide();
            setting_tab.eq(1).show();
        })

        $(".mobile__selection select").change(function () {
            var value = parseInt($(this).val());
            setting_tab.hide();
            setting_tab.eq(value).show();
        })
})