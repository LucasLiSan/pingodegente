document.addEventListener("DOMContentLoaded", async function () {
    const calendarBody = document.getElementById("bodyCalendar");
    const eventsContainer = document.querySelector(".events");
    const monthLabel = document.getElementById("mouth");
    const yearLabel = document.getElementById("year");
    const schoolDaysCurrent = document.getElementById("shoolDaysCurrent");

    // Fetch JSON data
    const calendarData = await fetch("calendario.json").then(response => response.json());

    // Initialize with the current month
    const today = new Date();
    let displayedYear = today.getFullYear();
    let displayedMonth = today.getMonth();

    // Function to display the calendar for a specific month
    function displayCalendar(year, month) {
        calendarBody.innerHTML = ""; // Clear calendar body
        eventsContainer.innerHTML = ""; // Clear events container

        // Update month and year labels
        monthLabel.innerText = getMonthName(month);
        yearLabel.innerText = year;

        // Get days in the current month and the first day
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

        // Calculate previous month's days needed to fill the grid
        const prevMonthDays = new Date(year, month, 0).getDate();
        const startPrevMonth = prevMonthDays - firstDayOfMonth + 1;

        // Load relevant data from JSON
        const monthData = calendarData.calendario_escolar.find(data => data.mes === getMonthName(month) && data.ano === year);

        // Function to check if a day has an event or special status
        function getDayStatus(day) {
            if (monthData) {
                const dayData = monthData.dias.find(d => d.dia === day);
                return dayData ? dayData : null;
            }
            return null;
        }

        // Populate previous month days
        for (let i = startPrevMonth; i <= prevMonthDays; i++) {
            const day = document.createElement("span");
            day.className = "previusMouth";
            day.setAttribute("tabindex", "0");
            day.innerText = i;
            calendarBody.appendChild(day);
        }

        // Populate current month days with special conditions
        for (let i = 1; i <= totalDaysInMonth; i++) {
            const day = document.createElement("span");
            day.setAttribute("tabindex", "0");
            day.innerText = i;

            const dayOfWeek = new Date(year, month, i).getDay();
            const dayStatus = getDayStatus(i);

            // Add holiday class if day status is different from "LETIVO"
            if (dayStatus.situacao == "FERIADO" || dayStatus.situacao == "PONTO FACULTATIVO" || dayStatus.situacao == "NÃO LETIVO" || dayStatus.situacao == "FÉRIAS" || dayStatus.situacao == "RECESSO" || dayStatus.situacao == "CONSELHO DE CLASSE" || dayStatus.situacao == "PLANEJAMENTO") {
                day.classList.add("holiday");
            } else if (dayOfWeek === 0 || dayOfWeek === 6) {
                // Apply weekend class only if it's not "LETIVO"
                day.classList.add("weekend");
            }

            calendarBody.appendChild(day);

            // Display events if they exist for the day
            if (dayStatus && dayStatus.eventos.length > 0) {
                day.classList.add("eventDay"); // Custom class for days with events
                day.addEventListener("click", () => displayEvents(dayStatus.eventos));
            }
        }

        // Calculate remaining slots to fill with next month's days
        const remainingSlots = 35 - calendarBody.children.length;
        for (let i = 1; i <= remainingSlots; i++) {
            const day = document.createElement("span");
            day.className = "nextMouth";
            day.setAttribute("tabindex", "0");
            day.innerText = i;
            calendarBody.appendChild(day);
        }

        // Update the count of school days
        updateSchoolDaysCount(year, month);
    }

    // Function to display events in the event section
    function displayEvents(events) {
        eventsContainer.innerHTML = ""; // Clear previous events

        events.forEach(event => {
            const eventElement = document.createElement("p");
            eventElement.className = "event";

            const dateSpan = document.createElement("span");
            dateSpan.className = "eventDate";
            dateSpan.innerText = event.data_evento;

            const descSpan = document.createElement("span");
            descSpan.className = "eventDescrition";
            descSpan.innerText = event.descricao_evento;

            const guestsSpan = document.createElement("span");
            guestsSpan.className = "eventGuests";
            guestsSpan.innerText = event.participantes.length > 0 ? event.participantes.join(", ") : "NÃO HAVERÁ AULA";

            eventElement.appendChild(dateSpan);
            eventElement.appendChild(descSpan);
            eventElement.appendChild(guestsSpan);
            eventsContainer.appendChild(eventElement);
        });
    }

    // Helper function to get the month name
    function getMonthName(monthIndex) {
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        return monthNames[monthIndex];
    }

    // Function to count and display school days up to the displayed month
    function updateSchoolDaysCount(year, month) {
        let countSchoolDays = 0;
        const today = new Date();
    
        // Loop through each month up to the displayed month
        for (let m = 0; m <= month; m++) {
            const currentMonthData = calendarData.calendario_escolar.find(data => data.mes === getMonthName(m) && data.ano === year);
            if (currentMonthData) {
                currentMonthData.dias.forEach(day => {
                    // Only count up to today's date if we are in the current month and year
                    if (year === today.getFullYear() && m === today.getMonth() && day.dia > today.getDate()) {
                        return;
                    }
                    // Count the day if it's "LETIVO"
                    if (day.situacao === "LETIVO") {
                        countSchoolDays++;
                    }
                });
            }
        }
    
        // Update the schoolDaysCurrent element with the count of school days
        schoolDaysCurrent.innerText = countSchoolDays;
    }

    // Function to navigate months
    function changeMonth(offset) {
        displayedMonth += offset;
        if (displayedMonth < 0) {
            displayedMonth = 11;
            displayedYear -= 1;
        } else if (displayedMonth > 11) {
            displayedMonth = 0;
            displayedYear += 1;
        }
        displayCalendar(displayedYear, displayedMonth);
    }

    // Event listeners for month navigation
    document.getElementById("prevMonth").addEventListener("click", () => changeMonth(-1));
    document.getElementById("nextMonth").addEventListener("click", () => changeMonth(1));

    // Initial calendar load for the current month
    displayCalendar(displayedYear, displayedMonth);
});
