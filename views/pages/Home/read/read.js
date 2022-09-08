$(document).ready(function () {
    $('.show-search-bar').click(function(){
        $('.search-bar').toggle()
    })
    //dark mode
    // $('#toggle-dark-mode').click(function(){
    //     $('.header').toggleClass('dark')
    //     $('.search-field').toggleClass('dark-input')
    //     $('#toggle-dark-mode').toggleClass('dark-toggle-btn')
    //     $('.menu').toggleClass('dark-menu')
    // })
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        let a = $('.main-container').offset().top
        if(scroll >= a){
            $('.feature-bar').css({
                'position': 'fixed',
                'top':'0px',
                'left':'0',
                'right':'0'
            })
        }else{
            $('.feature-bar').css({
                'position': 'relative',
            })
        }
    });
    click_to_flex('.category-click','.cat-submenu-mobile','hidden')
    click_to_flex('.chart-click','.chart-submenu-mobile','hidden')
    click_to_flex('.toggle_menu_mobile','.menu_mobile_content','height-fit')
    click_to_flex('.chapter-list-bottom-toggle','.chapter-list-bottom-container','hidden')
    click_to_flex('.list-chapter','.chapter-list-top','hidden')
    click_to_flex('.select-chapter','.feature-bar-chapter-list','hidden')

    click_out_to_hide('.feature-bar-chapter-list','.select-chapter')
})
function click_to_flex(element_click,element_show,class_active){
    $(`${element_click}`).click(function(){
        $(`${element_show}`).toggleClass(class_active)
    })
}
function click_out_to_hide(class_hide,button_trigger){
    $(document).mouseup(function(e) 
    {
        var container = $(class_hide);
        var btn = $(button_trigger)
        if (!btn.is(e.target) && btn.has(e.target).length === 0 &&  !container.is(e.target) && container.has(e.target).length === 0 && !container.hasClass('hidden')) 
        {
            container.addClass('hidden');
        }
    });
}

function type_search(type){
    if($(`.field${type}`).val() != "")
        $(`.result${type}`).css({'display':'flex'})
    else
         $(`.result${type}`).css({'display':'none'})
}
