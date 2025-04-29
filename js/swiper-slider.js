// Swiper Hero
jQuery.noConflict(); // Release the `$` alias from other libraries

(function ($) {
  $(document).ready(function () {

    const sliderSpeed = 300;

    const swiper = new Swiper('.swiper-container', {
      slidePerView: 'auto',
      parallax: true,
      speed: sliderSpeed,
      allowTouchMove: true,
      grabCursor: true,
      autoplay: {
        enabled: true,
        delay: 6000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          let title = document.querySelector(`.swiper-slide:nth-child(${index + 1})`).dataset.title;
          return '<div class="' + className + '"><div class="' + className + '-bar"><div class="' + className + '-number">' + title + '</div></div></div>';
        },
      },
      on: {
        init: function () {
          const preloader = document.getElementById('hero-preloader');
          if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 400);
          }
        }
      }
    });
//
// // Swiper Guide Topics
//     if ($('.section-guide-topics .swiper-slide').length) {
//       let swiper;
//
//       function initializeSwiper() {
//         if (swiper) {
//           swiper.destroy(true, true);
//         }
//
//         swiper = new Swiper('.section-guide-topics .swiper', {
//           slidesPerView: 1,
//           grid: {
//             rows: 2,
//           },
//           grabCursor: true,
//           pagination: {
//             el: '.section-guide-topics .swiper-pagination',
//             clickable: true,
//           },
//           breakpoints: {
//             768: {
//               slidesPerView: 2,
//             },
//             992: {
//               slidesPerView: 3,
//             },
//             1200: {
//               slidesPerView: 4,
//             },
//           },
//         });
//       }
//
//       initializeSwiper();
//
//       $(window).on('resize', function () {
//         initializeSwiper();
//       });
//     }

// Gallery Single Swiper

    new Swiper('.section-gallery-single .swiper', {
      slidesPerView: 'auto',
      loop: true,
      navigation: {
        nextEl: '.section-gallery-single .swiper-button-next',
        prevEl: '.section-gallery-single .swiper-button-prev',
      },
    });

    // Interesting Zones
    new Swiper('.section-interesting-zones__swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: '.section-interesting-zones__swiper .swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
          grid: {
            rows: 2,
            fill: 'row',
          },
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
          grid: {
            rows: 1,
            fill: 'row',
          },
        },
      },
    });

    // Guide Topics
    new Swiper('.section-guide-topics__swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: '.section-guide-topics__swiper .swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
          grid: {
            rows: 2,
            fill: 'row',
          },
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
          grid: {
            rows: 1,
            fill: 'row',
          },
        },
      },
    });
  });
})(jQuery);
