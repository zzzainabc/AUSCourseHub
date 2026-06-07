// ---------- Calendar ----------
let currentDate = new Date(2025, 4, 1);
const examDays = [15, 22];

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startWeekday = firstDayOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthYearDisplay = document.getElementById("monthYearDisplay");
    if (monthYearDisplay) {
        monthYearDisplay.innerText = `${monthNames[month]} ${year}`;
    }

    let gridHtml = "";
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

    weekdays.forEach(day => {
        gridHtml += `<div class="weekday">${day}</div>`;
    });

    for (let i = 0; i < startWeekday; i++) {
        gridHtml += `<div></div>`;
    }

    const today = new Date();
    const isCurrentMonthToday = (today.getFullYear() === year && today.getMonth() === month);
    const todayDate = today.getDate();

    for (let d = 1; d <= daysInMonth; d++) {
        let classes = "cal-day";
        if (isCurrentMonthToday && d === todayDate) classes += " today";
        if (examDays.includes(d) && month === 4 && year === 2025) classes += " event-day";
        gridHtml += `<div class="${classes}" data-day="${d}">${d}</div>`;
    }

    const calendarGrid = document.getElementById("calendarGrid");
    if (calendarGrid) {
        calendarGrid.innerHTML = gridHtml;
    }
}

const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

if (prevMonthBtn) {
    prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
}

renderCalendar();

// ---------- To-Do List ----------
const todoContainer = document.getElementById("todoListContainer");

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function (m) {
        if (m === "&") return "&amp;";
        if (m === "<") return "&lt;";
        if (m === ">") return "&gt;";
        return m;
    });
}

function renderTodoItem(todo) {
    const checked = todo.completed ? "checked" : "";
    const completedClass = todo.completed ? "completed-task" : "";

    return `
        <div class="todo-item d-flex align-items-center ${completedClass}" data-id="${todo.todo_id}">
            <div class="form-check me-3">
                <input class="form-check-input todo-check" type="checkbox" id="todo_${todo.todo_id}" ${checked}>
                <label class="form-check-label" for="todo_${todo.todo_id}">${escapeHtml(todo.task_text)}</label>
            </div>
            <i class="bi bi-trash3 text-danger ms-auto delete-todo" style="cursor:pointer;"></i>
        </div>
    `;
}

function loadTodos() {
    if (!todoContainer) return;

    fetch("HomepageTodoServlet")
        .then(res => res.json())
        .then(data => {
            if (!data.success) return;

            todoContainer.innerHTML = "";
            data.todos.forEach(todo => {
                todoContainer.insertAdjacentHTML("beforeend", renderTodoItem(todo));
            });
        })
        .catch(err => console.error("Error loading todos:", err));
}

function addTodo(taskText) {
    const params = new URLSearchParams();
    params.append("action", "add");
    params.append("taskText", taskText);

    fetch("HomepageTodoServlet", {
        method: "POST",
        body: params,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.success && data.todo) {
                todoContainer.insertAdjacentHTML("afterbegin", renderTodoItem(data.todo));
            } else if (data.message) {
                alert(data.message);
            }
        })
        .catch(err => console.error("Error adding todo:", err));
}

function deleteTodo(todoId, todoElement) {
    const params = new URLSearchParams();
    params.append("action", "delete");
    params.append("todoId", todoId);

    fetch("HomepageTodoServlet", {
        method: "POST",
        body: params,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.success && todoElement) {
                todoElement.remove();
            }
        })
        .catch(err => console.error("Error deleting todo:", err));
}

function toggleTodo(todoId, completed, todoElement) {
    const params = new URLSearchParams();
    params.append("action", "toggle");
    params.append("todoId", todoId);
    params.append("completed", completed);

    fetch("HomepageTodoServlet", {
        method: "POST",
        body: params,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.success && todoElement) {
                todoElement.classList.toggle("completed-task", completed);
            }
        })
        .catch(err => console.error("Error toggling todo:", err));
}

const addTodoBtn = document.getElementById("addTodoBtn");
if (addTodoBtn) {
    addTodoBtn.addEventListener("click", () => {
        const task = prompt("Add a new task to your To-Do list:", "Study for Algorithms");
        if (task && task.trim()) {
            addTodo(task.trim());
        }
    });
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-todo")) {
        const todoDiv = e.target.closest(".todo-item");
        if (!todoDiv) return;
        const todoId = todoDiv.dataset.id;
        deleteTodo(todoId, todoDiv);
    }
});

document.addEventListener("change", function (e) {
    if (e.target.classList.contains("todo-check")) {
        const todoDiv = e.target.closest(".todo-item");
        if (!todoDiv) return;
        const todoId = todoDiv.dataset.id;
        toggleTodo(todoId, e.target.checked, todoDiv);
    }
});

loadTodos();

// ---------- Nav UI ----------
document.querySelectorAll(".nav-item-custom").forEach(item => {
    item.addEventListener("click", function () {
        document.querySelectorAll(".nav-item-custom").forEach(nav => nav.classList.remove("active"));
        this.classList.add("active");
    });
});

document.addEventListener("click", function (e) {
    if (e.target.classList && e.target.classList.contains("cal-day")) {
        const day = e.target.getAttribute("data-day");
        if (day) {
            console.log(`Calendar day ${day} clicked`);
        }
    }
});

document.querySelectorAll(".link-plain, .badge-attend a, .card-header-custom a").forEach(link => {
    if (link.getAttribute("href") === "#") {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Navigation link clicked - demo mode");
        });
    }
});

// ---------- Theme system ----------
const themes = {
    default: {
        "--bg-color": "#f5f7fb",
        "--text-color": "#1f2937",
        "--muted-text": "#6b7280",

        "--sidebar-bg": "#ffffff",
        "--card-bg": "#ffffff",
        "--soft-bg": "#f8fafc",
        "--border-color": "#edf2f7",

        "--nav-text": "#2c3e50",
        "--nav-hover-bg": "#f1f5f9",
        "--nav-active-bg": "#fff0f0",
        "--nav-active-text": "#750009",

        "--badge-bg": "#ffffff",
        "--accent-color": "#750009",
        "--accent-hover": "#5e0007",
        "--danger-color": "#d94b5c",

        "--chip-bg": "rgba(255, 255, 255, 0.96)",
        "--chip-text": "#1f2937",
        "--calendar-pill-bg": "rgba(15, 23, 42, 0.06)"
    },

    midnight: {
        "--bg-color": "#2b3f63",
        "--text-color": "#efe7a6",
        "--muted-text": "#d8d09a",

        "--sidebar-bg": "#32496f",
        "--card-bg": "#354d73",
        "--soft-bg": "#415a82",
        "--border-color": "rgba(255, 255, 255, 0.14)",

        "--nav-text": "#efe7a6",
        "--nav-hover-bg": "#3f5b84",
        "--nav-active-bg": "#6d87a5",
        "--nav-active-text": "#efe7a6",

        "--badge-bg": "#3a5279",
        "--accent-color": "#efc8a6",
        "--accent-hover": "#ddd58c",
        "--danger-color": "#ff5d70",

        "--chip-bg": "#3a5279",
        "--chip-text": "#ddd58c",
        "--calendar-pill-bg": "rgba(255, 255, 255, 0.10)"
    },

    forest: {
        "--bg-color": "#244e43",
        "--text-color": "#f3ebdb",
        "--muted-text": "#ddd5c6",

        "--sidebar-bg": "#2f5b4f",
        "--card-bg": "#325d52",
        "--soft-bg": "#3d6a5e",
        "--border-color": "rgba(255, 255, 255, 0.14)",

        "--nav-text": "#f3ebdb",
        "--nav-hover-bg": "#3f6d61",
        "--nav-active-bg": "#96a183",
        "--nav-active-text": "#244e43",

        "--badge-bg": "#335d52",
        "--accent-color": "#f3ebdb",
        "--accent-hover": "#e1d8c6",
        "--danger-color": "#ff5d70",

        "--chip-bg": "#335d52",
        "--chip-text": "#f3ebdb",
        "--calendar-pill-bg": "rgba(255, 255, 255, 0.10)"
    },

    bubblegum: {
        "--bg-color": "#f4e7e7",
        "--text-color": "#3d5d91",
        "--muted-text": "#6d7ea4",

        "--sidebar-bg": "#fff7fb",
        "--card-bg": "#fff7fb",
        "--soft-bg": "#f8ecf4",
        "--border-color": "#eadbe3",

        "--nav-text": "#3d5d91",
        "--nav-hover-bg": "#f8cae4",
        "--nav-active-bg": "#ffd7ea",
        "--nav-active-text": "#c54872",

        "--badge-bg": "#fff7fb",
        "--accent-color": "#c54872",
        "--accent-hover": "#a83d61",
        "--danger-color": "#d94b5c",

        "--chip-bg": "#fff7fb",
        "--chip-text": "#c54872",
        "--calendar-pill-bg": "rgba(61, 93, 145, 0.08)"
    },

    funky: {
        "--bg-color": "#ffe6ad",
        "--text-color": "#f5793b",
        "--muted-text": "#8c6a42",

        "--sidebar-bg": "#fff4d1",
        "--card-bg": "#fff4d1",
        "--soft-bg": "#ffeebd",
        "--border-color": "#f1d38f",

        "--nav-text": "#267533",
        "--nav-hover-bg": "#f0b8cf",
        "--nav-active-bg": "#99b7f3",
        "--nav-active-text": "#267533",

        "--badge-bg": "#fff4d1",
        "--accent-color": "#267533",
        "--accent-hover": "#1f5f29",
        "--danger-color": "#d94b5c",

        "--chip-bg": "#fff4d1",
        "--chip-text": "#267533",
        "--calendar-pill-bg": "rgba(38, 117, 51, 0.08)"
    }
};

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    Object.keys(theme).forEach(variable => {
        document.documentElement.style.setProperty(variable, theme[variable]);
    });
}

const themeSelector = document.getElementById("themeSelector");

if (themeSelector) {
    themeSelector.addEventListener("change", function () {
        const selectedTheme = this.value;
        applyTheme(selectedTheme);
        localStorage.setItem("selectedTheme", selectedTheme);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("selectedTheme");

    if (savedTheme && themes[savedTheme]) {
        applyTheme(savedTheme);
        if (themeSelector) {
            themeSelector.value = savedTheme;
        }
    }
})