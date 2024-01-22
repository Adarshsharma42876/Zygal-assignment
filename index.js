let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      document.addEventListener("DOMContentLoaded", function () {
        const calendarContainer = document.querySelector(".calendar");
        const daysHeaderContainer = document.querySelector(".days-header");
        const selectedDatesContainer =
          document.getElementById("selected-dates");
        const currentMonthElement = document.getElementById("current-month");
        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");

        let selectedDates = [];

        function renderDays() {
          days.forEach((day) => {
            const dayHeader = document.createElement("div");
            dayHeader.textContent = day;
            dayHeader.classList.add("day", "disabled");
            daysHeaderContainer.appendChild(dayHeader);
          });
        }

        function renderCalendar(year, month) {
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const firstDayOfMonth = new Date(year, month, 1).getDay();

          currentMonthElement.textContent = `${new Date(
            year,
            month
          ).toLocaleString("default", { month: "long" })} ${year}`;

          calendarContainer.innerHTML = "";

          for (let i = 0; i < firstDayOfMonth; i++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day", "disabled");
            calendarContainer.appendChild(dayElement);
          }

          for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement("div");
            dayElement.textContent = i;
            dayElement.classList.add("day");
            dayElement.addEventListener("click", () =>
              toggleDate(year, month, i, dayElement)
            );
            calendarContainer.appendChild(dayElement);
          }

          highlightSelectedDates();
        }

        function toggleDate(year, month, day, dayElement) {
          const date = new Date(year, month, day);

          const selectedIndex = selectedDates.findIndex(
            (selectedDate) => selectedDate.getTime() === date.getTime()
          );

          if (selectedIndex !== -1) {
            selectedDates.splice(selectedIndex, 1);
          } else {
            selectedDates.push(date);
          }

          dayElement.classList.toggle("selected");
          renderSelectedDates();
        }

        function renderSelectedDates() {
          selectedDatesContainer.innerHTML =
            "<span> User Selected Dates: </span> [ " +
            selectedDates.map((date) => date.toLocaleDateString()).join(",  ") +
            " ] ";
        }

        function highlightSelectedDates() {
          const days = calendarContainer.querySelectorAll(".day");
          days.forEach((day, index) => {
            const date = new Date(year, month, index + 1);
            if (
              selectedDates.some(
                (selectedDate) => selectedDate.getTime() === date.getTime()
              )
            ) {
              day.classList.add("selected");
            } else {
              day.classList.remove("selected");
            }
          });
        }

        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();

        prevBtn.addEventListener("click", () => {
          currentMonth--;
          if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
          }
          renderCalendar(currentYear, currentMonth);
        });

        nextBtn.addEventListener("click", () => {
          currentMonth++;
          if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
          }
          renderCalendar(currentYear, currentMonth);
        });

        renderDays();
        renderCalendar(currentYear, currentMonth);
      });
