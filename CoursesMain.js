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
    "--overlay-bg": "rgba(0, 0, 0, 0.25)",
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

function openForm() {
  document.getElementById("myForm").style.display = "flex";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) applyTheme(savedTheme);

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

  loadUserCourses();
});

function loadUserCourses() {
  fetch("AddCourseServlet")
    .then(res => res.json())
    .then(data => {
      if (data.success && data.courses.length > 0) {
        const list = document.getElementById("coursesList");
        document.getElementById("emptyBox").style.display = "none";
        list.style.display = "flex";
        list.innerHTML = "";
        data.courses.forEach(c => displayCourse(c));
      }
    })
    .catch(err => console.error("Failed to load courses:", err));
}

function addCourse(event) {
  event.preventDefault();

  const form = document.getElementById("courseForm");
  const formData = new FormData(form);
  const params = new URLSearchParams(formData);

  fetch("AddCourseServlet", {
    method: "POST",
    body: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById("emptyBox").style.display = "none";
        document.getElementById("coursesList").style.display = "flex";

        displayCourse(data.course);
        closeForm();
        form.reset();
      } else {
        alert("Error adding course: " + data.message);
      }
    })
    .catch(err => {
      console.error("Add course failed:", err);
      alert("Something went wrong while adding the course.");
    });
}

function displayCourse(course) {
  const list = document.getElementById("coursesList");
  const id = course.course_id;

  const html = `
    <div class="col-md-6" id="card-${id}">
      <div class="course-card">
        <div class="course-card-top">
          <div class="d-flex justify-content-between align-items-start">
            <span class="course-semester">${escapeHtml(course.semester)}</span>
			<button class="btn-close" onclick="removeCourse(${id})"></button>
          </div>
          <h2>${escapeHtml(course.courseName)}</h2>
          <p class="course-code">${escapeHtml(course.courseCode)}</p>
        </div>
        <div class="course-card-bottom">
          <p class="course-info">🎓 ${escapeHtml(course.instructor)}</p>
          <button class="workspace-btn" onclick="openWorkspace(${id})">
            Open Workspace <span>›</span>
          </button>
        </div>
      </div>
    </div>`;

  list.insertAdjacentHTML("beforeend", html);
}

function openWorkspace(id) {
  if (id) {
    window.location.href = `workspace?course_id=${id}`;
  } else {
    alert("Error: Course ID is missing.");
  }
}

function removeCourse(id) {
  if (!confirm("Are you sure you want to remove this course?")) return;

  const params = new URLSearchParams();
  params.append("courseId", id);

  fetch("RemoveCourseServlet", {
    method: "POST",
    body: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById(`card-${id}`).remove();

        const list = document.getElementById("coursesList");
        if (list.children.length === 0) {
          document.getElementById("emptyBox").style.display = "flex";
          list.style.display = "none";
        }
      }
    });
}

function escapeHtml(t) {
  const d = document.createElement("div");
  d.textContent = t;
  return d.innerHTML;
}