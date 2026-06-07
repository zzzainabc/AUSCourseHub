const courses = document.querySelectorAll(".course");

// maps visual class to database value
function getCourseStatus(course) {
    if (course.classList.contains("completed")) return "completed";
    if (course.classList.contains("in-progress")) return "in-progress";
    if (course.classList.contains("available")) return "available";
    return "locked";
}

function setCourseStatus(course, status) {
    course.classList.remove("locked", "available", "in-progress", "completed");
    course.classList.add(status);
}

// save one course status to servlet / SQL
function saveCourseStatus(course) {
    const courseCode = course.dataset.saveId;
    const courseStatus = getCourseStatus(course);

    if (!courseCode) return;

    const params = new URLSearchParams();
    params.append("courseCode", courseCode);
    params.append("courseStatus", courseStatus);

    fetch("FlowchartStatusServlet", {
        method: "POST",
        body: params,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            console.error("Failed to save status:", data.message);
        }
    })
    .catch(err => console.error("Error saving status:", err));
}

// load all saved statuses from servlet / SQL
function loadSavedStatuses() {
    fetch("FlowchartStatusServlet")
        .then(res => res.json())
        .then(data => {
            if (!data.success || !data.statuses) return;

            courses.forEach(course => {
                const courseCode = course.dataset.saveId;
                if (!courseCode) return;

                const savedStatus = data.statuses[courseCode];
                if (savedStatus) {
                    setCourseStatus(course, savedStatus);
                }
            });

            updateAvailability();
        })
        .catch(err => console.error("Error loading statuses:", err));
}

// to set the state of the class
courses.forEach(course => {
    course.addEventListener("click", () => {
        // do not allow clicking locked courses
        if (course.classList.contains("locked")) return;

        if (course.classList.contains("available")) {
            course.classList.remove("available");
            course.classList.add("in-progress");

        } else if (course.classList.contains("in-progress")) {
            course.classList.remove("in-progress");
            course.classList.add("completed");

        } else if (course.classList.contains("completed")) {
            course.classList.remove("completed");
            course.classList.add("available");
        }

        updateAvailability();
        saveCourseStatus(course);
    });
});

// sorting through prerequisites
function updateAvailability() {
    courses.forEach(course => {
        const prereqs = course.dataset.prereq;

        // check for prereqs
        if (!prereqs) {
            if (!course.classList.contains("completed") &&
                !course.classList.contains("in-progress")) {
                course.classList.add("available");
            }
            course.classList.remove("locked");
            return;
        }

        const prereqList = prereqs.split(" ");
        let allDone = true;

        prereqList.forEach(id => {
            const prereqCourse = document.querySelector(`[data-id="${id}"]`);

            if (!prereqCourse || !prereqCourse.classList.contains("completed")) {
                allDone = false;
            }
        });

        if (allDone) {
            // unlocks the course
            course.classList.remove("locked");

            if (!course.classList.contains("completed") &&
                !course.classList.contains("in-progress")) {
                course.classList.add("available");
            }

        } else {
            // re-lock course if prereq cancelled
            course.classList.add("locked");
            course.classList.remove("available", "in-progress", "completed");
        }
    });
}

// first set-up
function initializeCourses() {
    courses.forEach(course => {
        if (!course.dataset.prereq) {
            course.classList.add("available");
        }
    });

    updateAvailability();
}

// adjust colors of each individual theme
const themes = {
    default: {
        "--bg-color": "#ffffff",
        "--text-color": "#000000",

        "--available-bg": "#ffffff",
        "--available-text": "#000000",
        "--available-border": "#000000",

        "--locked-bg": "#e0e0e0",
        "--locked-text": "#565d63",
        "--locked-border": "#000000",

        "--progress-bg": "orange",
        "--progress-text": "#000",
        "--progress-border": "rgb(0, 0, 0)",

        "--completed-bg": "#4CAF50",
        "--completed-text": "#fff",
        "--completed-border": "#000000",

        "--sidebar-bg": "#ffffff",
        "--sidebar-text": "#16233d",
        "--sidebar-hover": "#f1f5f9",
        "--sidebar-active-bg": "#fff0f0",
        "--sidebar-active-text": "#750009",
        "--sidebar-border": "#d7dde5"
    },

    midnight: {
        "--bg-color": "#25344f",
        "--text-color": "#F0EEA6",

        "--available-bg": "#25344f",
        "--available-text": "#F0EEA6",
        "--available-border": "#F0EEA6",

        "--locked-bg": "#617891",
        "--locked-text": "#25344f",
        "--locked-border": "#F0EEA6",

        "--progress-bg": "#6f4d38",
        "--progress-text": "#F0EEA6",
        "--progress-border": "#F0EEA6",

        "--completed-bg": "#632024",
        "--completed-text": "#F0EEA6",
        "--completed-border": "#F0EEA6",

        "--sidebar-bg": "#32496f",
        "--sidebar-text": "#F0EEA6",
        "--sidebar-hover": "#3f5b84",
        "--sidebar-active-bg": "#6d87a5",
        "--sidebar-active-text": "#F0EEA6",
        "--sidebar-border": "rgba(255,255,255,0.14)"
    },

    forest: {
        "--bg-color": "#284139",
        "--text-color": "#f3ebdb",

        "--available-bg": "#284139",
        "--available-text": "#f3ebdb",
        "--available-border": "#f3ebdb",

        "--locked-bg": "#809076",
        "--locked-text": "#284139",
        "--locked-border": "#f3ebdb",

        "--progress-bg": "#bb6830",
        "--progress-text": "#f3ebdb",
        "--progress-border": "#f3ebdb",

        "--completed-bg": "#1b3027",
        "--completed-text": "#f3ebdb",
        "--completed-border": "#f3ebdb",

        "--sidebar-bg": "#2f5b4f",
        "--sidebar-text": "#f3ebdb",
        "--sidebar-hover": "#3f6d61",
        "--sidebar-active-bg": "#96a183",
        "--sidebar-active-text": "#244e43",
        "--sidebar-border": "rgba(255,255,255,0.14)"
    },

    bubblegum: {
        "--bg-color": "#f4e7e7",
        "--text-color": "#3d5d91",

        "--available-bg": "#f4e7e7",
        "--available-text": "#3d5d91",
        "--available-border": "#3d5d91",

        "--locked-bg": "#89ace4",
        "--locked-text": "#f4e7e7",
        "--locked-border": "#3d5d91",

        "--progress-bg": "#f8cae4",
        "--progress-text": "#c54872",
        "--progress-border": "#3d5d91",

        "--completed-bg": "#c54872",
        "--completed-text": "#f4e7e7",
        "--completed-border": "#3d5d91",

        "--sidebar-bg": "#fff7fb",
        "--sidebar-text": "#3d5d91",
        "--sidebar-hover": "#f8cae4",
        "--sidebar-active-bg": "#ffd7ea",
        "--sidebar-active-text": "#c54872",
        "--sidebar-border": "#eadbe3"
    },

    funky: {
        "--bg-color": "#ffe6ad",
        "--text-color": "#f5793b",

        "--available-bg": "#ffe6ad",
        "--available-text": "#99b7f3",
        "--available-border": "#f5793b",

        "--locked-bg": "#99b7f3",
        "--locked-text": "#267533",
        "--locked-border": "#f5793b",

        "--progress-bg": "#267533",
        "--progress-text": "#f296bd",
        "--progress-border": "#f5793b",

        "--completed-bg": "#f0b8cf",
        "--completed-text": "#f5793b",
        "--completed-border": "#f5793b",

        "--sidebar-bg": "#fff4d1",
        "--sidebar-text": "#267533",
        "--sidebar-hover": "#f0b8cf",
        "--sidebar-active-bg": "#99b7f3",
        "--sidebar-active-text": "#267533",
        "--sidebar-border": "#f1d38f"
    }
};

function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    Object.keys(theme).forEach(variable => {
        document.documentElement.style.setProperty(variable, theme[variable]);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initializeCourses();
    loadSavedStatuses();

    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme && themes[savedTheme]) {
        applyTheme(savedTheme);
    }

    const themeSelector = document.getElementById("themeSelector");
    if (themeSelector) {
        if (savedTheme && themes[savedTheme]) {
            themeSelector.value = savedTheme;
        }

        themeSelector.addEventListener("change", function () {
            const selectedTheme = this.value;
            applyTheme(selectedTheme);
            localStorage.setItem("selectedTheme", selectedTheme);
        });
    }

    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");
    const sidebar = document.getElementById("sidebar");

    if (menuToggle && closeMenu && sidebar) {
        menuToggle.addEventListener("click", function () {
            sidebar.classList.add("show");
        });

        closeMenu.addEventListener("click", function () {
            sidebar.classList.remove("show");
        });
    }
});