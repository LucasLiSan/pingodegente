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

    // Initialize school days count and calculate once
    let schoolDaysCount = calculateSchoolDaysCount(today.getFullYear(), today.getMonth());

    // Function to calculate school days only once, up to the current date
    function calculateSchoolDaysCount(currentYear, currentMonth) {
        let countSchoolDays = 0;

        // Loop through each month up to the current month and count LETIVO days
        for (let m = 0; m <= currentMonth; m++) {
            const currentMonthData = calendarData.calendario_escolar.find(data => data.mes === getMonthName(m) && data.ano === currentYear);
            if (currentMonthData) {
                currentMonthData.dias.forEach(day => {
                    // Only count up to today's date if we are in the current month and year
                    if (currentYear === today.getFullYear() && m === today.getMonth() && day.dia > today.getDate()) {
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
        return countSchoolDays;
    }

    // Function to display all events for the current month
    function displayMonthEvents(monthData) {
        eventsContainer.innerHTML = ""; // Clear previous events
        if (monthData && monthData.dias.length > 0) {
            monthData.dias.forEach(dayData => {
                if (dayData.eventos && dayData.eventos.length > 0) {
                    dayData.eventos.forEach(event => {
                        const eventElement = createEventElement(event, dayData.dia);
                        eventsContainer.appendChild(eventElement);
                    });
                }
            });
        }
    }

    // Function to create an event element
    function createEventElement(event, day) {
        const eventElement = document.createElement("p");
        eventElement.className = "event";

        const dateSpan = document.createElement("span");
        dateSpan.className = "eventDate";
        dateSpan.innerText = `${day}/${getMonthName(displayedMonth).slice(0, 3)}`;

        const descSpan = document.createElement("span");
        descSpan.className = "eventDescrition";
        descSpan.innerText = event.descricao_evento;

        const guestsSpan = document.createElement("span");
        guestsSpan.className = "eventGuests";
        guestsSpan.innerText = event.participantes.length > 0 ? event.participantes.join(", ") : "NÃO HAVERÁ AULA";

        eventElement.appendChild(dateSpan);
        eventElement.appendChild(descSpan);
        eventElement.appendChild(guestsSpan);

        return eventElement;
    }

    // Function to display events for a specific day
    function displayDayEvents(dayStatus) {
        eventsContainer.innerHTML = ""; // Clear previous events

        if (dayStatus && dayStatus.eventos.length > 0) {
            dayStatus.eventos.forEach(event => {
                const eventElement = createEventElement(event, dayStatus.dia);
                eventsContainer.appendChild(eventElement);
            });
        } else {
            const noEventElement = document.createElement("p");
            noEventElement.className = "noEvent";
            noEventElement.innerText = "NENHUM EVENTO PARA O DIA ESPECÍFICO";
            eventsContainer.appendChild(noEventElement);
        }
    }

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
            const dayStatus = monthData ? monthData.dias.find(d => d.dia === i) : null;

            // Add holiday class if day status is different from "LETIVO"
            if (dayStatus && (dayStatus.situacao !== "LETIVO")) {
                day.classList.add("holiday");
            } else if (dayOfWeek === 0 || dayOfWeek === 6) {
                // Apply weekend class only if it's not "LETIVO"
                day.classList.add("weekend");
            }

            calendarBody.appendChild(day);

            // Add click event listener to show events of the day
            day.addEventListener("click", () => {
                displayDayEvents(dayStatus);
            });
        }

        // Populate next month's days
        const remainingSlots = 35 - calendarBody.children.length;
        for (let i = 1; i <= remainingSlots; i++) {
            const day = document.createElement("span");
            day.className = "nextMouth";
            day.setAttribute("tabindex", "0");
            day.innerText = i;
            calendarBody.appendChild(day);
        }

        // Display all events for the current month by default
        displayMonthEvents(monthData);
    }

    // Helper function to get the month name
    function getMonthName(monthIndex) {
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        return monthNames[monthIndex];
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

    // Event listener for clicking outside the calendar to restore monthly events
    document.addEventListener("click", (e) => {
        if (!calendarBody.contains(e.target)) {
            const monthData = calendarData.calendario_escolar.find(data => data.mes === getMonthName(displayedMonth) && data.ano === displayedYear);
            displayMonthEvents(monthData);
        }
    });

    // Initialize the calendar with the current month
    displayCalendar(displayedYear, displayedMonth);
});
