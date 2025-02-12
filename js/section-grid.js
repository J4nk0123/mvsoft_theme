// Section Portfolio Filters with Responsive Pagination
// Swiper Hero
jQuery.noConflict(); // Release the `$` alias from other libraries

(function ($) {
  $(document).ready(function () {

    if (document.querySelector('.section-grid')) {
      const $grid = $('.section-grid__grid');
      const $items = $grid.children('.element-item');
      let itemsPerPage = window.innerWidth < 768 ? 1 : 6;
      let currentPage = 1;
      let totalPages = Math.ceil($items.length / itemsPerPage);
      let $filteredItems = $items;

      function gridLoader() {
        $('.section-grid__grid').append('<div class="preloader"></div>');

        setTimeout(function () {
          $('.preloader').addClass('inactive');
          setTimeout(function () {
            $('.preloader').remove();
          }, 300);
        }, 300);
      }

      function equalizeItemHeights() {
        const $visibleItems = $filteredItems.filter(':visible');
        let rowMap = {};

        $visibleItems.each(function () {
          $(this).css('height', '');
          let topOffset = $(this).offset().top;

          if (!rowMap[topOffset]) {
            rowMap[topOffset] = [];
          }
          rowMap[topOffset].push($(this));
        });

        Object.values(rowMap).forEach((rowItems) => {
          let maxHeight = Math.max(...rowItems.map((item) => item.outerHeight()));
          rowItems.forEach((item) => item.css('height', maxHeight + 'px'));
        });
      }

      // function showPage(page) {
      //   const startIndex = (page - 1) * itemsPerPage;
      //   const endIndex = startIndex + itemsPerPage;
      //
      //   $filteredItems.hide().slice(startIndex, endIndex).show();
      //   equalizeItemHeights();
      //   updatePagination();
      // }

      // function updatePagination() {
      //   totalPages = Math.ceil($filteredItems.length / itemsPerPage);
      //
      //   if (totalPages <= 1) {
      //     $('.section-grid-pagination').remove();
      //     return;
      //   }
      //
      //   let paginationHTML = `<button class="pagination-prev" ${
      //     currentPage === 1 ? 'disabled' : ''
      //   }><i class="bi bi-chevron-left"></i> <span>Back</span></button>`;
      //
      //   let startPage = Math.max(1, currentPage - 1);
      //   let endPage = Math.min(totalPages, startPage + 3);
      //
      //   if (endPage - startPage < 3) {
      //     startPage = Math.max(1, endPage - 3);
      //   }
      //
      //   if (startPage > 1) {
      //     paginationHTML += `<button class="pagination-number" data-page="1">1</button>`;
      //     if (startPage > 2) {
      //       paginationHTML += `<span class="pagination-dots">...</span>`;
      //     }
      //   }
      //
      //   for (let i = startPage; i <= endPage; i++) {
      //     paginationHTML += `<button class="pagination-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      //   }
      //
      //   if (endPage < totalPages) {
      //     if (endPage < totalPages - 1) {
      //       paginationHTML += `<span class="pagination-dots">...</span>`;
      //     }
      //     paginationHTML += `<button class="pagination-number" data-page="${totalPages}">${totalPages}</button>`;
      //   }
      //
      //   paginationHTML += `<button class="pagination-next" ${
      //     currentPage === totalPages ? 'disabled' : ''
      //   }><span>Next</span> <i class="bi bi-chevron-right"></i></button>`;
      //
      //   if ($('.section-grid-pagination').length === 0) {
      //     $('.section-grid').append('<div class="section-grid-pagination"></div>');
      //   }
      //
      //   $('.section-grid-pagination').html(paginationHTML);
      // }
      //
      // function changePage(newPage) {
      //   if (newPage >= 1 && newPage <= totalPages) {
      //     gridLoader();
      //     currentPage = newPage;
      //     showPage(currentPage);
      //   }
      // }

      // function updateItemsPerPage() {
      //   let previousItemsPerPage = itemsPerPage;
      //   itemsPerPage = window.innerWidth < 768 ? 1 : 6;
      //   totalPages = Math.ceil($filteredItems.length / itemsPerPage);
      //
      //   let firstItemIndex = (currentPage - 1) * previousItemsPerPage;
      //   currentPage = Math.floor(firstItemIndex / itemsPerPage) + 1;
      //
      //   currentPage = Math.min(currentPage, totalPages);
      //   currentPage = Math.max(1, currentPage);
      //
      //   showPage(currentPage);
      //   equalizeItemHeights();
      // }

      // if ($('.section-grid-pagination').length === 0) {
      //   $('.section-grid').append('<div class="section-grid-pagination"></div>');
      // }
      //
      // $(document).on('click', '.pagination-prev', function () {
      //   changePage(currentPage - 1);
      // });
      //
      // $(document).on('click', '.pagination-next', function () {
      //   changePage(currentPage + 1);
      // });
      // $(document).on('click', '.pagination-number', function () {
      //   changePage(parseInt($(this).data('page')));
      // });

      // showPage(currentPage);
      //
      // $('.section-grid #filters').on('click', 'button', function () {
      //   gridLoader();
      //   let filterValue = $(this).data('filter');
      //   $filteredItems = filterValue === '*' ? $items : $items.filter(filterValue);
      //
      //   totalPages = Math.ceil($filteredItems.length / itemsPerPage);
      //   currentPage = 1;
      //
      //   $items.hide();
      //   $filteredItems.slice(0, itemsPerPage).fadeIn();
      //
      //   equalizeItemHeights();
      //
      //   if (totalPages > 1) {
      //     if ($('.section-grid-pagination').length === 0) {
      //       $('.section-grid').append('<div class="section-grid-pagination"></div>');
      //     }
      //   }
      //
      //   updatePagination();
      // });

      // $(window).on('resize', function () {
      //   updateItemsPerPage();
      //   equalizeItemHeights();
      // });

      $('.section-grid__sorting').on('click', 'button', function () {
        $('.section-grid__sorting .is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
      });

      const $container = $('#filters');
      const $parentContainer = $container.parent();
      const $leftButton = $('<button>', { class: 'scroll-button left', html: '<i class="bi bi-chevron-left"></i>' });
      const $rightButton = $('<button>', { class: 'scroll-button right', html: '<i class="bi bi-chevron-right"></i>' });

      $parentContainer.prepend($leftButton);
      $parentContainer.append($rightButton);

      const updateButtons = () => {
        if (!$container.length || !$container[0]) {
          return;
        }

        const containerScrollWidth = $container[0].scrollWidth;
        const containerClientWidth = $container.outerWidth();
        const scrollLeft = $container.scrollLeft();
        const needsScrolling = containerScrollWidth > containerClientWidth;

        $leftButton.toggleClass('visible', needsScrolling && scrollLeft > 0);
        $rightButton.toggleClass('visible', needsScrolling && scrollLeft + containerClientWidth < containerScrollWidth - 1);
      };

      const initializeButtons = () => {
        updateButtons();
        setTimeout(updateButtons, 200);
      };

      $leftButton.on('click', () => {
        $container.animate({ scrollLeft: `-=${$(window).width() * 0.25}` }, 0, updateButtons);
      });

      $rightButton.on('click', () => {
        $container.animate({ scrollLeft: `+=${$(window).width() * 0.25}` }, 0, updateButtons);
      });

      let isDragging = false;
      let startX, scrollStart;

      $container.on('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        scrollStart = $container.scrollLeft();
        $container.css('cursor', 'grabbing');
        e.preventDefault();
      });

      $(document).on('mousemove', (e) => {
        if (!isDragging) return;
        const scrollDiff = startX - e.pageX;
        $container.scrollLeft(scrollStart + scrollDiff);
      });

      $(document).on('mouseup', () => {
        if (isDragging) {
          updateButtons();
        }
        isDragging = false;
        $container.css('cursor', 'grab');
      });

      $container.on('scroll', updateButtons);
      $(window).on('resize', updateButtons);
      initializeButtons();
    }
  });
})(jQuery);
