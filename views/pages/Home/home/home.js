$(document).ready(function () {
    $('.show-search-bar').click(function () {
        $('.search-bar').toggle()
    })
    //dark mode
    // $('#toggle-dark-mode').click(function(){
    //     $('.header').toggleClass('dark')
    //     $('.search-field').toggleClass('dark-input')
    //     $('#toggle-dark-mode').toggleClass('dark-toggle-btn')
    //     $('.menu').toggleClass('dark-menu')
    // })
})
function type_search(type) {
    if ($(`.field${type}`).val() != "")
        $(`.result${type}`).css({ 'display': 'flex' })
    else
        $(`.result${type}`).css({ 'display': 'none' })
}

$('.search-result.resultpc').html("")



function viewDetails(slug) {
    console.log(slug);
    window.location.href = `/manga/${slug}`
}



async function nextPages(page) {
    try {
        let data = await $.ajax({
            url: `/manga/pagination?page=${page}`,
            type: 'GET',
            // data: page

        })
        //console.log(data);
        $(".list-item").html(data);
    } catch (e) {
        console.log(e);
    }
}