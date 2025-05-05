jQuery.noConflict(); // Release the `$` alias from other libraries

(function ($) {
  $(document).ready(function () {

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all);
      if (selectEl) {
        if (all) {
          selectEl.forEach((e) => e.addEventListener(type, listener));
        } else {
          selectEl.addEventListener(type, listener);
        }
      }
    };

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener);
    };

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('.header');
      let offset = header.offsetHeight;

      let elementPos = select(el).offsetTop;
      window.scrollTo({
        top: elementPos - offset + 60,
        behavior: 'smooth',
      });
    };

    /**
     * Toggle .header-scrolled class to .header when page is scrolled
     */
    let selectHeader = document.querySelector('.header');
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 0) {
          selectHeader.classList.add('header-scrolled');
        } else {
          selectHeader.classList.remove('header-scrolled');
        }
      };
      window.addEventListener('load', headerScrolled);
      window.addEventListener('scroll', headerScrolled);
    }

    /**
     * Back to top button
     */
    let backtotop = select('#backtotop');
    backtotop.innerHTML = '<span><i class="bi bi-arrow-up-short"></i></span>';
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 768) {
          backtotop.classList.add('active');
        } else {
          backtotop.classList.remove('active');
        }
      };
      window.addEventListener('load', toggleBacktotop);
      onscroll(document, toggleBacktotop);
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.navbar-button', function (e) {
      const navbar = select('#navbar');
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.add('navbar-closed');
        select('body').classList.remove('no-scroll');
        // select('.back-to-top').style.opacity = '1';

        const navbarClosed = select('.navbar-closed');
        const animationDuration = window.getComputedStyle(navbarClosed).animationDuration;
        const durationInterval = parseFloat(animationDuration.split('s')[0] * 1000);

        setTimeout(function () {
          navbar.classList.remove('navbar-mobile');
        }, durationInterval);
      } else {
        navbar.classList.add('navbar-mobile');
        navbar.classList.remove('navbar-closed');
        select('body').classList.add('no-scroll');
        // select('.back-to-top').style.opacity = '0';
      }

      // select('body').classList.toggle('no-scroll');
      this.classList.toggle('active');
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) {
        select('#navbar').classList.remove('navbar-mobile');
        select('#navbar').classList.remove('navbar-closed');
        select('body').classList.remove('no-scroll');
        select('.navbar-button').classList.remove('active');
        // select('.back-to-top').style.opacity = '1';
      }
    });

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on(
      'click',
      '.scrollto',
      function (e) {
        if (select(this.hash)) {
          e.preventDefault();

          let navbar = select('#navbar');
          if (navbar.classList.contains('navbar-mobile')) {
            navbar.classList.remove('navbar-mobile');
          }
          scrollto(this.hash);
        }
      },
      true
    );

    /**
     * Mobile nav dropdowns activate
     */
    on(
      'click',
      '.navbar .dropdown > a',
      function (e) {
        const navbar = select('#navbar');

        if (navbar.classList.contains('navbar-mobile')) {
          e.preventDefault();

          const allDropdowns = navbar.querySelectorAll('.dropdown-active');
          const submenu = this.nextElementSibling;

          // Close all open submenus
          allDropdowns.forEach(drop => {
            if (drop !== submenu) {
              drop.classList.remove('dropdown-active');
            }
          });

          // Toggle clicked submenu
          submenu.classList.toggle('dropdown-active');
        }
      },
      true
    );

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash);
        }
      }
    });

    /**
     * Preloader
     */
    let preloader = document.querySelector('.preloader');

    if (preloader) {
      console.log('Preloader element found');

      function hidePreloader() {
        console.log('Window loaded, hiding preloader');
        preloader.classList.add('inactive');
        setTimeout(() => preloader.remove(), 300);
      }

      if (document.readyState === 'complete') {
        hidePreloader();
      } else {
        window.addEventListener('load', hidePreloader);
      }
    }

    /**
     * Search input
     */
    const searchInput = document.querySelector("#MvsoftSearch input");

    if (searchInput) {
      searchInput.value = "";
      searchInput.addEventListener("click", function () {
        if (searchInput.value.length > 0) {
          searchInput.value = "";
        }
      });
    }

    /**
     * Expand/Collapse text
     */
    // const eventButtons = select('.section-events__card .btn-load-more', true);
    // const overseasButtons = select('.section-overseas__card .section-overseas__read-more', true);
    //
    // const toggleTextExpansion = (btnList = [], text = 'Load', direction = 'vertical') => {
    //   // console.log(btnList);
    //
    //   if (btnList?.length === 0) {
    //     return;
    //   }
    //
    //   btnList.forEach((button) => {
    //     button.addEventListener('click', () => {
    //       let startPosition = direction === 'vertical' ? 'down' : 'right';
    //       const showThisElement = button.previousElementSibling;
    //       showThisElement.classList.toggle('active');
    //       // console.log(showThisElement);
    //
    //       if (showThisElement?.classList?.contains('active')) {
    //         button.innerHTML = `${text} less <i class="bi bi-arrow-${startPosition === 'down' ? 'up' : 'left'}"></i>`;
    //       } else {
    //         button.innerHTML = `${text} more <i class="bi bi-arrow-${startPosition}"></i>`;
    //       }
    //     });
    //   });
    // };

    /**
     * Slider
     */
    new Swiper('.section-new-this-week__swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      grid: {
        rows: 1,
        fill: 'row',
      },
      pagination: {
        el: '.section-new-this-week__swiper .swiper-pagination',
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
          spaceBetween: 20,
          grid: {
            rows: 1,
            fill: 'row',
          },
        },
      },
    });

    const horizontalSwiper = select('.section-events__swiper.section-events__horizontal-swiper');
    if (horizontalSwiper) {
      new Swiper('.section-events__swiper.section-events__horizontal-swiper', {
        slidesPerView: 1,
        // loop: true,
        grid: {
          rows: 4,
          fill: 'row',
        },
        autoplay: {
          enabled: true,
          delay: 2000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.section-events__swiper.section-events__horizontal-swiper .swiper-pagination',
          clickable: true,
        },
      });
    }
    const verticalSwiper = select('.section-events__swiper.section-events__vertical-swiper');

    if (verticalSwiper) {
      new Swiper('.section-events__swiper.section-events__vertical-swiper', {
        slidesPerView: 3,
        slidesPerGroup: 1,
        direction: 'vertical',
        autoplay: {
          enabled: true,
          delay: 2000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.section-events__swiper.section-events__vertical-swiper .swiper-pagination',
          clickable: true,
        },
      });
    }

    new Swiper('.section-overseas__swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      grid: {
        rows: 1,
        fill: 'row',
      },
      pagination: {
        el: '.section-overseas__swiper .swiper-pagination',
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
          spaceBetween: 20,
          grid: {
            rows: 1,
            fill: 'row',
          },
        },
      },
    });

// Our Team Swiper
    new Swiper('.section-our-team__swiper', {
      slidesPerView: 1,
      pagination: {
        el: '.section-our-team__swiper .swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });

// Where Jakarta More Guides
    new Swiper('.section-guides__swiper', {
      slidesPerView: 1,
      pagination: {
        el: '.section-guides__swiper .swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });

// swiper calls
// toggleTextExpansion(eventButtons);
// toggleTextExpansion(overseasButtons, "Read", "vertical");

// AI Assistant
    // const $assistant = $('df-messenger-chat-bubble');
    // let isFixed = false;
    // let absoluteTop = $assistant.offset().top;

    // const updateAbsoluteTop = () => {
    //   if (!isFixed) {
    //     absoluteTop = $assistant.offset().top;
    //   }
    // };

    // const updatePosition = () => {
    //   const scrollTop = $(window).scrollTop();
    //   const halfWindow = $(window).height() * 0.5;

    //   updateAbsoluteTop();

    //   if (!isFixed && absoluteTop - scrollTop <= halfWindow) {
    //     const computedRight = $assistant.css('right');
    //     $assistant.css({
    //       position: 'fixed',
    //       top: halfWindow,
    //       right: '25px',
    //       bottom: 'auto',
    //     });
    //     isFixed = true;
    //   } else if (isFixed && absoluteTop - scrollTop > halfWindow) {
    //     $assistant.attr('style', '');
    //     isFixed = false;
    //   }
    // };

    // $(window).on('scroll resize', updatePosition);

    // Tourist Guides Section Toggle
    if ($('.section-tourist-guides__img').length) {
      let currentActive = null;

      const hideElements = (pinNumber) =>
        $(`.section-tourist-guides__img-${pinNumber}, .section-tourist-guides__popup-${pinNumber}`).hide();

      const showElements = (pinNumber) => {
        $(`.section-tourist-guides__img-${pinNumber}, .section-tourist-guides__popup-${pinNumber}`).show();
      };

      $('span[class^="section-tourist-guides__map-pin"]').each(function (index) {
        const pinNumber = index + 1;
        hideElements(pinNumber);

        $(this).on('click', () => {
          if (currentActive === pinNumber) {
            hideElements(pinNumber);
            currentActive = null;
          } else {
            if (currentActive !== null) {
              hideElements(currentActive);
            }
            showElements(pinNumber);
            currentActive = pinNumber;
          }
        });
      });
    }

    // Tourist guides areas__adsBox__guides heading replacement
    const container = document.querySelector('.section-areas__adsBox__guides');
    console.log(container)
    if (container) {
      const header = container.querySelector('header');
      console.log('header', header)
      if (header) {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = '<h4><span>Jakarta</span> Essential Guides</h4>';
        header.replaceWith(newDiv);
      }
    }
  });
})(jQuery);
