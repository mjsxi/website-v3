$( function() {

  // Images

  function setImageLogic() {
    $('.images img').on('click', function(e) {
      // Update active class on image click
      var target = $(e.target);
      target.siblings().removeClass('active');
      target.addClass('active');
      centerCurrentImage(target);
      expandList(target);
    });

    // Keyboard shortucts:
    // A) ESC: Close all active
    // B) Forward Arrow: Move to next
    // C) Back Arrow: Move to previous
    window.addEventListener('keydown', function(e) {
      var active = $('.active');
      if (e.keyCode === 27) {
        active.removeClass('active');
      } else if (
        (e.keyCode === 37 && active.prev().length > 0) ||
        (e.keyCode === 39 && active.next().length > 0)
      ) {
        var target = e.keyCode === 37 ? active.prev() : active.next();
        active.removeClass('active');
        target.addClass('active');
        centerCurrentImage(target);

        // If we're moving forward, expand the list to mock infinite scrolling
        if (e.keyCode === 39) {
          expandList(target);
        }
      }
    });
  }

  // If nearing the end of the current image list, clone and expand to create
  // an infinite effect.
  //
  // TODO: Make this more performant if need be
  function expandList(target) {
    if (target.nextAll().length <= 2) {
      var siblings = target.siblings();
      var previous = siblings.clone(true);
      previous.insertAfter(siblings.last());
    }
  }

  // After expansion delay, center image in viewport
  function centerCurrentImage(target) {
    setTimeout(function() {
      var offset = (window.innerWidth - target.width()) / 2;
      var reset = target.parent().parent().scrollLeft() + target.position().left - offset;
      target.parent().parent().animate({ scrollLeft: reset });
    }, 310);
  }

  setImageLogic();

  $('.header-nav-button, .c-nav a').click(function() {  //use a class, since your ID gets mangled
    $('.c-nav').toggleClass('active');      //add the class to the clicked element
  });
});
