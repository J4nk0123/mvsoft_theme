// Initiate Gallery Lightbox
jQuery.noConflict(); // Release the `$` alias from other libraries

(function ($) {
  $(document).ready(function () {
    const galelryLightbox = GLightbox({
      selector: '.gallery-lightbox',
    });
  });
})(jQuery);
