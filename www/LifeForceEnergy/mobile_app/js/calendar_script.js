$(document).ready(function () {
        $(".calendar__container").calendar({
            prevButton: "<i class='bx bxs-left-arrow'></i>",
            nextButton: "<i class='bx bxs-right-arrow' ></i>",
            showTodayButton: false,

            date: new Date()
        })
})