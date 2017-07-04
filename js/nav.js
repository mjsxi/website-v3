---
---

$( function() {

  var within = 0;
  var wasWithin = null;

  var tops = [
    {% for post in site.posts reversed %}$('[data-section="{{ post.title | escape }}"]').position().top,
    {% endfor %}
  ];

  var $menuItems = $('.nav-items');

  function followMenu() {
    var top = $(window).scrollTop();
    for(var i = 0; i < tops.length; i++) {
      if(top < tops[i] && top > 0) {
        within = i - 1;
        break;
      } else if(top > tops[i] && i == tops.length - 1) {
        within = tops.length - 1;
      }
    }
    if(within !== wasWithin) {
      $menuItems.removeClass('nav--active').eq(within).addClass('nav--active');
      wasWithin = within;
    }
  }

  function setTops() {
    tops = [
      {% for post in site.posts reversed %}$('[data-section="{{ post.title | escape }}"]').position().top,
      {% endfor %}
    ];
  }

  $menuItems.on('click', function(e) {
    var $section = $('[data-section="' + $(this).attr('data-control') + '"]');
    $('body,html').animate({
      scrollTop: $section.find('[data-here]').position().top
    }, '200', 'swing', function() { });
  });


  $(window).scroll(followMenu);
  $(window).resize(setTops);

  followMenu();
});
