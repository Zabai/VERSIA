function enableScrollNavbar() {
    var navbar = $('.navbar');
    var distance = 25;

    $(window).scroll(function() {
        if (document.body.scrollTop > distance || document.documentElement.scrollTop > distance) {
            navbar.removeClass('bg-transparent');
            navbar.addClass('bg-dark');
        } else {
            navbar.removeClass('bg-dark');
            navbar.addClass('bg-transparent');
        }
    });
}

function enableDinamicAuthForms() {
    $('.message a').click(function(){
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
}

function setUpLandingPage() {
    enableScrollNavbar();
    enableDinamicAuthForms();
}