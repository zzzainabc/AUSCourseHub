let tasks = [];
let grades = [];

const themes = {
  default: {
    "--bg-color": "#f6f7f9",
    "--text-color": "#16233d",
    "--muted-text": "#6f8098",
    "--accent-color": "#8b0008",
    "--accent-hover": "#750006",
    "--card-bg": "#ffffff",
    "--soft-bg": "#fbfbfc",
    "--border-color": "#d7dde5",
    "--light-border": "#e1e5ea",
    "--dash-border": "#dbe1e8",
    "--input-border": "#e1e1e1",
    "--secondary-btn-bg": "#ffffff",
    "--secondary-btn-text": "#1f2937",
    "--secondary-btn-border": "#d9dde4",
    "--cancel-bg": "#8b8f97",
    "--cancel-hover": "#737780",
    "--overlay-bg": "rgba(0,0,0,0.25)",
    "--tab-bg": "#eef1f5",
    "--tab-active-bg": "#ffffff",
    "--tab-active-text": "#16233d",
    "--grade-main-bg": "#8b0008",
    "--grade-main-text": "#ffffff",
    "--grade-scale-bg": "#eef1f5",
    "--scale-box-bg": "#ffffff",
    "--sidebar-bg": "#ffffff",
    "--nav-text": "#2c3e50",
    "--nav-hover-bg": "#f1f5f9",
    "--nav-active-bg": "#fff0f0",
    "--nav-active-text": "#750009",
    "--sidebar-border": "#d7dde5"
  },

  midnight: {
    "--bg-color": "#2b3f63",
    "--text-color": "#efe7a6",
    "--muted-text": "#d8d09a",
    "--accent-color": "#efe7a6",
    "--accent-hover": "#ddd58c",
    "--card-bg": "#354d73",
    "--soft-bg": "#3b547d",
    "--border-color": "rgba(255,255,255,0.14)",
    "--light-border": "rgba(255,255,255,0.14)",
    "--dash-border": "rgba(255,255,255,0.18)",
    "--input-border": "rgba(255,255,255,0.18)",
    "--secondary-btn-bg": "#415a82",
    "--secondary-btn-text": "#efe7a6",
    "--secondary-btn-border": "rgba(255,255,255,0.18)",
    "--cancel-bg": "#6d87a5",
    "--cancel-hover": "#5c7694",
    "--overlay-bg": "rgba(0, 0, 0, 0.35)",
    "--tab-bg": "#3b547d",
    "--tab-active-bg": "#415a82",
    "--tab-active-text": "#efe7a6",
    "--grade-main-bg": "#6d87a5",
    "--grade-main-text": "#efe7a6",
    "--grade-scale-bg": "#3b547d",
    "--scale-box-bg": "#415a82",
    "--sidebar-bg": "#32496f",
    "--nav-text": "#efe7a6",
    "--nav-hover-bg": "#3f5b84",
    "--nav-active-bg": "#6d87a5",
    "--nav-active-text": "#efe7a6",
    "--sidebar-border": "rgba(255,255,255,0.14)"
  },

  forest: {
    "--bg-color": "#244e43",
    "--text-color": "#f3ebdb",
    "--muted-text": "#ddd5c6",
    "--accent-color": "#f3ebdb",
    "--accent-hover": "#e1d8c6",
    "--card-bg": "#325d52",
    "--soft-bg": "#3c675c",
    "--border-color": "rgba(255,255,255,0.14)",
    "--light-border": "rgba(255,255,255,0.14)",
    "--dash-border": "rgba(255,255,255,0.18)",
    "--input-border": "rgba(255,255,255,0.18)",
    "--secondary-btn-bg": "#426e63",
    "--secondary-btn-text": "#f3ebdb",
    "--secondary-btn-border": "rgba(255,255,255,0.18)",
    "--cancel-bg": "#96a183",
    "--cancel-hover": "#85906f",
    "--overlay-bg": "rgba(0, 0, 0, 0.35)",
    "--tab-bg": "#3c675c",
    "--tab-active-bg": "#426e63",
    "--tab-active-text": "#f3ebdb",
    "--grade-main-bg": "#96a183",
    "--grade-main-text": "#244e43",
    "--grade-scale-bg": "#3c675c",
    "--scale-box-bg": "#426e63",
    "--sidebar-bg": "#2f5b4f",
    "--nav-text": "#f3ebdb",
    "--nav-hover-bg": "#3f6d61",
    "--nav-active-bg": "#96a183",
    "--nav-active-text": "#244e43",
    "--sidebar-border": "rgba(255,255,255,0.14)"
  },

  bubblegum: {
    "--bg-color": "#f4e7e7",
    "--text-color": "#3d5d91",
    "--muted-text": "#6d7ea4",
    "--accent-color": "#c54872",
    "--accent-hover": "#a83d61",
    "--card-bg": "#fff7fb",
    "--soft-bg": "#f8ecf4",
    "--border-color": "#eadbe3",
    "--light-border": "#eadbe3",
    "--dash-border": "#eadbe3",
    "--input-border": "#eadbe3",
    "--secondary-btn-bg": "#fff7fb",
    "--secondary-btn-text": "#3d5d91",
    "--secondary-btn-border": "#eadbe3",
    "--cancel-bg": "#c78aa0",
    "--cancel-hover": "#b77790",
    "--overlay-bg": "rgba(61, 93, 145, 0.12)",
    "--tab-bg": "#f8ecf4",
    "--tab-active-bg": "#fff7fb",
    "--tab-active-text": "#3d5d91",
    "--grade-main-bg": "#c54872",
    "--grade-main-text": "#fff7fb",
    "--grade-scale-bg": "#f8ecf4",
    "--scale-box-bg": "#fff7fb",
    "--sidebar-bg": "#fff7fb",
    "--nav-text": "#3d5d91",
    "--nav-hover-bg": "#f8cae4",
    "--nav-active-bg": "#ffd7ea",
    "--nav-active-text": "#c54872",
    "--sidebar-border": "#eadbe3"
  },

  funky: {
    "--bg-color": "#ffe6ad",
    "--text-color": "#f5793b",
    "--muted-text": "#8c6a42",
    "--accent-color": "#267533",
    "--accent-hover": "#1f5f29",
    "--card-bg": "#fff4d1",
    "--soft-bg": "#ffeebd",
    "--border-color": "#f1d38f",
    "--light-border": "#f1d38f",
    "--dash-border": "#f1d38f",
    "--input-border": "#f1d38f",
    "--secondary-btn-bg": "#fff4d1",
    "--secondary-btn-text": "#267533",
    "--secondary-btn-border": "#f1d38f",
    "--cancel-bg": "#99b7f3",
    "--cancel-hover": "#82a5eb",
    "--overlay-bg": "rgba(38, 117, 51, 0.12)",
    "--tab-bg": "#ffeebd",
    "--tab-active-bg": "#fff4d1",
    "--tab-active-text": "#267533",
    "--grade-main-bg": "#99b7f3",
    "--grade-main-text": "#267533",
    "--grade-scale-bg": "#ffeebd",
    "--scale-box-bg": "#fff4d1",
    "--sidebar-bg": "#fff4d1",
    "--nav-text": "#267533",
    "--nav-hover-bg": "#f0b8cf",
    "--nav-active-bg": "#99b7f3",
    "--nav-active-text": "#267533",
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

function showTasks() {
  document.getElementById("tasksSection").style.display = "block";
  document.getElementById("gradesSection").style.display = "none";

  document.querySelectorAll(".tab")[0].classList.add("active");
  document.querySelectorAll(".tab")[1].classList.remove("active");
}

function showGrades() {
  document.getElementById("tasksSection").style.display = "none";
  document.getElementById("gradesSection").style.display = "block";

  document.querySelectorAll(".tab")[1].classList.add("active");
  document.querySelectorAll(".tab")[0].classList.remove("active");
}

function openTaskForm() {
  document.getElementById("taskFormPopup").style.display = "flex";
}

function closeTaskForm() {
  document.getElementById("taskFormPopup").style.display = "none";
}

function openGradeForm() {
  document.getElementById("gradeFormPopup").style.display = "flex";
}

function closeGradeForm() {
  document.getElementById("gradeFormPopup").style.display = "none";
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("selectedTheme");

  if (savedTheme && typeof themes !== "undefined" && themes[savedTheme]) {
    applyTheme(savedTheme);
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

  const taskForm = document.getElementById("taskForm");

  if (taskForm) {
    taskForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(taskForm);
      const params = new URLSearchParams(formData);

      fetch("addTask", {
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          alert(data.message || "Failed to save task.");
          return;
        }

        const task = data.task;
        const taskList = document.getElementById("taskList");
        const emptyBox = document.getElementById("tasksEmptyBox");

        if (emptyBox) {
          emptyBox.style.display = "none";
        }

        taskList.innerHTML +=
          "<div class='task-card'>" +
            "<div class='task-left'>" +
              "<form action='toggleTask' method='post'>" +
                "<input type='hidden' name='task_id' value='" + task.task_id + "'>" +
                "<input type='hidden' name='course_id' value='" + task.course_id + "'>" +
                "<input class='task-checkbox' type='checkbox'>" +
              "</form>" +
              "<div class='task-text'>" +
                "<div class='task-title'>" + escapeHtml(task.task_name) + "</div>" +
                "<div class='task-date'>Due: " + escapeHtml(task.due_date) + "</div>" +
              "</div>" +
            "</div>" +
            "<form action='deleteTask' method='post'>" +
              "<input type='hidden' name='task_id' value='" + task.task_id + "'>" +
              "<input type='hidden' name='course_id' value='" + task.course_id + "'>" +
              "<button class='delete-task-btn' type='submit'>Delete</button>" +
            "</form>" +
          "</div>";

        taskForm.reset();
        closeTaskForm();
      })
      .catch(err => {
        console.error("Error adding task:", err);
        alert("Something went wrong while saving the task.");
      });
    });
  }

  document.addEventListener("change", function (event) {
    if (event.target.classList.contains("task-checkbox")) {
      const checkbox = event.target;
      const form = checkbox.closest("form");
      const taskCard = checkbox.closest(".task-card");
      const formData = new FormData(form);
      const params = new URLSearchParams(formData);

      fetch("toggleTask", {
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to toggle task");
        }
        return response.text();
      })
      .then(() => {
        taskCard.classList.toggle("completed");
      })
      .catch(err => {
        console.error("Error toggling task:", err);
        checkbox.checked = !checkbox.checked;
        alert("Could not update task status.");
      });
    }
  });

  document.addEventListener("submit", function (event) {
    if (event.target.getAttribute("action") === "deleteTask") {
      event.preventDefault();

      const form = event.target;
      const taskCard = form.closest(".task-card");
      const formData = new FormData(form);
      const params = new URLSearchParams(formData);

      fetch("deleteTask", {
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
        return response.text();
      })
      .then(() => {
        taskCard.remove();

        const taskList = document.getElementById("taskList");
        const emptyBox = document.getElementById("tasksEmptyBox");

        if (taskList.children.length === 0 && emptyBox) {
          emptyBox.style.display = "flex";
        }
      })
      .catch(err => {
        console.error("Error deleting task:", err);
        alert("Could not delete task.");
      });
    }
  });
}
);