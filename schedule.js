const ROWS = [
  { label: "8:00am - 9:15am", start: "8:00", end: "9:15" },
  { label: "9:30am - 10:45am", start: "9:30", end: "10:45" },
  { label: "11:00am - 12:15pm", start: "11:00", end: "12:15" },
  { label: "12:30pm - 1:45pm", start: "12:30", end: "13:45" },
  { label: "2:00pm - 3:15pm", start: "14:00", end: "15:15" },
  { label: "3:30pm - 4:45pm", start: "15:30", end: "16:45" },
  { label: "5:00pm - 6:15pm", start: "17:00", end: "18:15" },
  { label: "6:30pm - 7:45pm", start: "18:30", end: "19:45" }
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday"];

const DAY_COL = {
  Monday: 2,
  Tuesday: 3,
  Wednesday: 4,
  Thursday: 5
};

const COURSE_TYPES = {
  lecture: { label: "Lecture", minutes: 75 },
  recitation: { label: "Recitation", minutes: 50 },
  lab110: { label: "Lab (1h 50m)", minutes: 110 },
  lab250: { label: "Lab (2h 50m)", minutes: 170 }
};

const themes = {
	default: {
		"--bg-color": "#f5f7fb",
		"--text-color": "#1f2937",
		"--muted-text": "#6f8098",
		"--accent-color": "#750009",		
		"--accent-hover": "#5e0007",		
		"--card-bg": "#ffffff",		
		"--soft-bg": "#fbfbfc",		
		"--border-color": "#d7dde5",		
		"--input-border": "#d7e3ea",		
		"--overlay-bg": "rgba(0, 0, 0, 0.2)",		
		"--sidebar-bg": "#ffffff",		
		"--nav-text": "#2c3e50",		
		"--nav-hover-bg": "#f1f5f9",		
		"--nav-active-bg": "#fff0f0",		
		"--nav-active-text": "#750009",		
		"--slot-bg": "#f8fafc",		
		"--class-bg": "#750009",		
		"--class-text": "#ffffff"	
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
		"--input-border": "rgba(255,255,255,0.18)",	
		"--overlay-bg": "rgba(0, 0, 0, 0.35)",	
		"--sidebar-bg": "#32496f",	
		"--nav-text": "#efe7a6",	
		"--nav-hover-bg": "#3f5b84",	
		"--nav-active-bg": "#6d87a5",	
		"--nav-active-text": "#efe7a6",	
		"--slot-bg": "#415a82",	
		"--class-bg": "#6d87a5",	
		"--class-text": "#efe7a6"	
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
		"--input-border": "rgba(255,255,255,0.18)",	
		"--overlay-bg": "rgba(0, 0, 0, 0.35)",	
		"--sidebar-bg": "#2f5b4f",	
		"--nav-text": "#f3ebdb",	
		"--nav-hover-bg": "#3f6d61",	
		"--nav-active-bg": "#96a183",	
		"--nav-active-text": "#244e43",	
		"--slot-bg": "#3f6d61",	
		"--class-bg": "#96a183",	
		"--class-text": "#244e43"	
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
		"--input-border": "#eadbe3",	
		"--overlay-bg": "rgba(61, 93, 145, 0.12)",	
		"--sidebar-bg": "#fff7fb",	
		"--nav-text": "#3d5d91",	
		"--nav-hover-bg": "#f8cae4",	
		"--nav-active-bg": "#ffd7ea",	
		"--nav-active-text": "#c54872",		
		"--slot-bg": "#fff1f7",	
		"--class-bg": "#c54872",
		"--class-text": "#fff7fb"	
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
		"--input-border": "#f1d38f",	
		"--overlay-bg": "rgba(38, 117, 51, 0.12)",	
		"--sidebar-bg": "#fff4d1",	
		"--nav-text": "#267533",	
		"--nav-hover-bg": "#f0b8cf",	
		"--nav-active-bg": "#99b7f3",
		"--nav-active-text": "#267533",
		"--slot-bg": "#fff2c7",	
		"--class-bg": "#267533",	
		"--class-text": "#fff4d1"	
	}
};
	

function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) return;
  Object.keys(theme).forEach(variable => {
    document.documentElement.style.setProperty(variable, theme[variable]);
  });
}

function toMinutes(time24) {
  if (!time24) return 0;
  const [h, m] = time24.split(":").map(Number);
  return h * 60 + m;
}

function getEndMinutes(startTime, courseType) {
  const typeKey = courseType ? courseType.toLowerCase() : "lecture";
  const type = COURSE_TYPES[typeKey] || COURSE_TYPES.lecture;
  return toMinutes(startTime) + type.minutes;
}

function formatTime(minutes) {
  const h24 = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const suffix = h24 >= 12 ? "pm" : "am";
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:${String(mins).padStart(2, "0")}${suffix}`;
}

function buildGrid() {
  const grid = document.getElementById("scheduleGrid");
  if (!grid) return;
  grid.innerHTML = "";

  ROWS.forEach((row, rowIndex) => {
    const timeCell = document.createElement("div");
    timeCell.className = "time-cell";
    timeCell.textContent = row.label;
    timeCell.style.gridColumn = "1";
    timeCell.style.gridRow = `${rowIndex + 1}`;
    grid.appendChild(timeCell);

    DAYS.forEach((day, dayIndex) => {
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.dataset.day = day;
      slot.dataset.row = rowIndex;
      slot.style.gridColumn = `${dayIndex + 2}`;
      slot.style.gridRow = `${rowIndex + 1}`;
      grid.appendChild(slot);
    });
  });
}

function clearRenderedClasses() {
  document.querySelectorAll(".class-rendered").forEach(el => el.remove());
}

function renderSchedule() {
  clearRenderedClasses();
  const grid = document.getElementById("scheduleGrid");
  if (!grid || typeof savedClasses === 'undefined') return;

  savedClasses.forEach((item, index) => {
    const startMinutes = toMinutes(item.startTime);
    const endMinutes = getEndMinutes(item.startTime, item.courseType);
    const daysArray = Array.isArray(item.days) ? item.days : item.days.split(", ");

    daysArray.forEach(day => {
      const trimmedDay = day.trim();
      if (!DAY_COL[trimmedDay]) return;

      const startRow = ROWS.findIndex(r => r.start === item.startTime);
      if (startRow === -1) return;

      let spanCount = 0;
      for (let i = startRow; i < ROWS.length; i++) {
        if (toMinutes(ROWS[i].start) < endMinutes) {
          spanCount++;
        }
      }

      const block = document.createElement("div");
      block.className = "class-block class-rendered";
      if (spanCount === 1) block.classList.add("compact");

      block.style.gridColumn = `${DAY_COL[trimmedDay]}`;
      block.style.gridRow = `${startRow + 1} / span ${spanCount}`;

      block.innerHTML = `
          <div>
            <span class="class-type">${item.courseType}</span>
            <strong>${item.courseCode}</strong>
            ${spanCount > 1 ? `<div class="course-name">${item.courseName}</div>` : ''}
            <small>${formatTime(startMinutes)} - ${formatTime(endMinutes)}</small>
            ${spanCount > 1 ? `<small>${item.room}</small>` : ''}
          </div>
          <button class="delete-class" data-id="${item.id}">×</button>
      `;
      grid.appendChild(block);
    });
  });

  attachDeleteListeners();
}

function attachDeleteListeners() {
  document.querySelectorAll(".delete-class").forEach(button => {
    button.addEventListener("click", function () {
      const classId = this.dataset.id;
      if (confirm("Are you sure you want to remove this course?")) {
        fetch(`DeleteCourseServlet?id=${classId}`, { method: 'POST' })
          .then(response => {
            if (response.ok) {
              location.reload(); 
            } else {
              alert("Failed to delete the course.");
            }
          })
          .catch(err => console.error("Error deleting:", err));
      }
    });
  });
}

function openForm() {
  const popup = document.getElementById("classFormPopup");
  if (popup) popup.style.display = "flex";
}

function closeForm() {
  const popup = document.getElementById("classFormPopup");
  if (popup) popup.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme && themes[savedTheme]) applyTheme(savedTheme);

  buildGrid();
  renderSchedule();
  
  const sidebar = document.getElementById("sidebar");

  const menuToggleBtn = document.getElementById("menuToggle");
  if (menuToggleBtn) {
      menuToggleBtn.addEventListener("click", function() {
          const sidebar = document.getElementById("sidebar");
          if (sidebar) {
              sidebar.classList.add("show");
          }
      });
  }
  
  const closeMenuBtn = document.getElementById("closeMenu");
  if (closeMenuBtn) {
      closeMenuBtn.addEventListener("click", function() {
          const sidebar = document.getElementById("sidebar");
          if (sidebar) {
              sidebar.classList.remove("show");
          }
      });
  }
  
  const openFormBtn = document.getElementById("openFormBtn");
  if (openFormBtn) {
      openFormBtn.addEventListener("click", function() {
          openForm();
      });
  }
  
  const cancelFormBtn = document.getElementById("cancelFormBtn");
  if (cancelFormBtn) {
      cancelFormBtn.addEventListener("click", function() {
          closeForm();
      });
  }
  
  const classForm = document.getElementById("classForm");
  
  if (classForm) {
      classForm.addEventListener("submit", function(event) {
          
          // 3. Find all checkboxes named "days" that are currently checked
          const checkedBoxes = document.querySelectorAll('input[name="days"]:checked');
          
          // 4. Convert the NodeList to a standard Array
          const selectedDays = Array.from(checkedBoxes);
          
          // 5. Validation logic
          if (selectedDays.length === 0) {
              // Stop the form from actually submitting to the server
              event.preventDefault();
              
              // Notify the user
              alert("Please select at least one day.");
          }
      });
  }
});