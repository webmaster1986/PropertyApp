/* User Dropdown  */
function myFunction() {
    document.getElementById('myDropdown').classList.toggle('show');
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        const dropdowns = document.getElementsByClassName('dropdown-content');
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

// JCF Plugin
// $(() => {
//     jcf.replaceAll();
// });

// Show/Hide Filter options
$(document).on('click', '.mortgage > p', () => {
    $('.mortgage-options').toggle();
    $('.filter-content').fadeOut('fast');
});
$(document).on('click', '.filters > p', () => {
    $('.filter-content').toggle();
    $('.mortgage-options').fadeOut('fast');
});
$(document).on('mouseup', 'body', (e) => {
    var subject = $('#mortgage-options');
    if (e.target.id != subject.attr('id') && !subject.has(e.target).length) {
        subject.fadeOut('fast');
    }
    var subject = $('#filter-content');
    if (e.target.id != subject.attr('id') && !subject.has(e.target).length) {
        subject.fadeOut('fast');
    }
});
$(document).on('click', '#tab-1', function() {
    $('.tab-data').hide();
    $('#tab-data-1').fadeIn();
    $('.tabs li').removeClass('active');
    $(this).addClass('active');

});
$(document).on('click', '#tab-2', function() {
    $('.tab-data').hide();
    $('#tab-data-2').fadeIn();
    $('.tabs li').removeClass('active');
    $(this).addClass('active');
});
$(document).on('click', '#tab-3', function() {
    $('.tab-data').hide();
    $('#tab-data-3').fadeIn();
    $('.tabs li').removeClass('active');
    $(this).addClass('active');
});
$(document).on('click', '#tab-4', function() {
    $('.tab-data').hide();
    $('#tab-data-4').fadeIn();
    $('.tabs li').removeClass('active');
    $(this).addClass('active');
});

$(document).on('click', '#tab-5', function() {
    $('.tab-data').hide();
    $('#tab-data-5').fadeIn();
    $('.tabs li').removeClass('active');
    $(this).addClass('active');
});


