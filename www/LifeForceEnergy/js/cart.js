$(document).ready(function () {
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

    $("#increase").click(function () {
        var value = parseInt($("#order__quantity").val());
        var new_value = value + 1;

        $("#order__quantity").val(new_value);
    })

    $("#decrease").click(function () {
        var value = parseInt($("#order__quantity").val());
        if (value > 1) {
            var new_value = value - 1;

            $("#order__quantity").val(new_value)
        }

      ;
    })
})