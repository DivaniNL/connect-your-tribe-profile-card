jQuery(document).ready(function ($) {
    checkActiveTab();
    // Make wrapper with same data-number visible after the button with the same data-number is clicked
    $('nav .nav_item').on("click tap", function(){
        var $this = $(this);
        let num = $this.data('giver');
        $this.toggleClass("active")
        $this.siblings().removeClass('active');
        let toshow = $('article .wrapper[data-receiver='+num+']');
        toshow.toggleClass("active");
        toshow.siblings().removeClass('active');
        checkActiveTab();
    })
    $('#sidebar .svg_container').on('click tap', function(){
        $(this).next().slideToggle();
        $(this).find('.opened').toggle();
        $(this).find('.closed').toggle();
    });

});

function checkActiveTab(){
    //show correct wrappers after button press. And hide their siblings. Also the article gets classes so that, when there is no active button there is no whitespace below the nav.
    var hasActiveClass = $('.wrapper.active').length > 0;
    if(hasActiveClass) {
        $('aside').removeClass('no_tab_shown');
        $('aside').addClass('collapsed');
        $('article').addClass('collapsed');

    } else {
        $('aside').removeClass('collapsed');
        $('aside').addClass('no_tab_shown');
        $('article').removeClass('collapsed');
    }
}