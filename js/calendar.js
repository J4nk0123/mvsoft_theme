// jQuery.noConflict(); // Release the `$` alias from other libraries
//
// (function ($) {
//   $(document).ready(function () {
//     document.addEventListener('DOMContentLoaded', () => {
//       const title = document.getElementById('title');
//       const calendarBody = document.getElementById('calendar-body');
//
//       const today = new Date();
//       let currentMonth = today.getMonth();
//       let currentYear = today.getFullYear();
//
//       const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//       const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//
//       function clearPreviousSelection() {
//         const previousSelected = document.querySelector('.table-calendar td.selected');
//         if (previousSelected) {
//           previousSelected.classList.remove('selected');
//         }
//       }
//
//       function handleCellClick(cell, date, month, year) {
//         clearPreviousSelection();
//         cell.classList.add('selected');
//         console.log(`Selected Date: ${date}/${month + 1}/${year}`);
//       }
//
//       function showCalendar(month, year) {
//         calendarBody.innerHTML = '';
//         const firstDay = new Date(year, month).getDay();
//         const daysInMonth = 32 - new Date(year, month, 32).getDate();
//
//         title.textContent = `${months[month]}`;
//
//         let date = 1;
//         for (let i = 0; i < 6; i++) {
//           const row = document.createElement('tr');
//           for (let j = 0; j < 7; j++) {
//             const cell = document.createElement('td');
//             if (i === 0 && j < ((firstDay + 6) % 7)) {
//               row.appendChild(cell);
//             } else if (date > daysInMonth) {
//               break;
//             } else {
//               cell.textContent = date;
//
//               cell.addEventListener('click', () => handleCellClick(cell, date, month, year));
//
//               row.appendChild(cell);
//               date++;
//             }
//           }
//           calendarBody.appendChild(row);
//         }
//       }
//
//       function previous() {
//         currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
//         currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//         showCalendar(currentMonth, currentYear);
//       }
//
//       function next() {
//         currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
//         currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
//         showCalendar(currentMonth, currentYear);
//       }
//
//       document.getElementById('previous').onclick = previous;
//       document.getElementById('next').onclick = next;
//
//       document.getElementById('today').addEventListener('click', () => {
//         currentMonth = today.getMonth();
//         currentYear = today.getFullYear();
//         showCalendar(currentMonth, currentYear);
//       });
//
//       document.getElementById('next-week').addEventListener('click', () => {
//         today.setDate(today.getDate() + 7);
//         currentMonth = today.getMonth();
//         currentYear = today.getFullYear();
//         showCalendar(currentMonth, currentYear);
//       });
//
//       document.getElementById('next-month').addEventListener('click', () => {
//         currentMonth = (currentMonth + 1) % 12;
//         if (currentMonth === 0) currentYear++;
//         showCalendar(currentMonth, currentYear);
//       });
//
//       showCalendar(currentMonth, currentYear);
//     });
//   });
// })(jQuery);
