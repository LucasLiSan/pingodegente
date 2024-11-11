document.addEventListener("DOMContentLoaded", function () {
    const calendarBody = document.getElementById("bodyCalendar");

    // Clear any existing content
    calendarBody.innerHTML = "";

    // Get current date information
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Calculate days in the current month and first day
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Calculate previous month's days needed to fill the grid
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    const startPrevMonth = prevMonthDays - firstDayOfMonth + 1;

    // Populate previous month days
    for (let i = startPrevMonth; i <= prevMonthDays; i++) {
        const day = document.createElement("span");
        day.className = "previusMouth";
        day.setAttribute("tabindex", "0");
        day.innerText = i;
        calendarBody.appendChild(day);
    }

    // Populate current month days
    for (let i = 1; i <= totalDaysInMonth; i++) {
        const day = document.createElement("span");
        day.setAttribute("tabindex", "0");
        day.innerText = i;
        
        // Check for weekends (Saturday=6 or Sunday=0)
        const dayOfWeek = new Date(currentYear, currentMonth, i).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            day.classList.add("weekend");
        }
        
        calendarBody.appendChild(day);
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
});
