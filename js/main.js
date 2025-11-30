$(document).ready(function () {

    /* =====================================================
       OWL SLIDER
    ====================================================== */
    $("#slider").owlCarousel({
        loop: true,
        items: 1,
        responsive: {
            0: { nav: false },
            1000: { nav: true }
        }
    });


    // тетрис
    AOS.init();





})