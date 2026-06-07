emailjs.init("MKYaEYHbVUvynyaIF");

const themes = {
    default: {
        "--bg-color": "#f3f4f6",
        "--text-color": "#1f2937",
        "--muted-text": "#6b7280",
        "--card-bg": "#ffffff",
        "--input-bg": "#ffffff",
        "--input-border": "#d1d5db",
        "--accent-color": "#750009",
        "--accent-hover": "#d44a55",
        "--secondary-bg": "#f3f4f6",
        "--secondary-text": "#374151",
        "--secondary-hover": "#e5e7eb",
        "--shadow-color": "rgba(0, 0, 0, 0.08)",
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
        "--card-bg": "#354d73",
        "--input-bg": "#3b547d",
        "--input-border": "rgba(255, 255, 255, 0.16)",
        "--accent-color": "#3f5b84",
        "--accent-hover": "#ddd58c",
        "--secondary-bg": "#415a82",
        "--secondary-text": "#efe7a6",
        "--secondary-hover": "#4b6590",
        "--shadow-color": "rgba(0, 0, 0, 0.18)",
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
        "--card-bg": "#325d52",
        "--input-bg": "#3c675c",
        "--input-border": "rgba(255, 255, 255, 0.16)",
        "--accent-color": "#3f6d61",
        "--accent-hover": "#e1d8c6",
        "--secondary-bg": "#426e63",
        "--secondary-text": "#f3ebdb",
        "--secondary-hover": "#4c796d",
        "--shadow-color": "rgba(0, 0, 0, 0.18)",
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
        "--card-bg": "#fff7fb",
        "--input-bg": "#ffffff",
        "--input-border": "#eadbe3",
        "--accent-color": "#c54872",
        "--accent-hover": "#a83d61",
        "--secondary-bg": "#f8ecf4",
        "--secondary-text": "#3d5d91",
        "--secondary-hover": "#efdce8",
        "--shadow-color": "rgba(61, 93, 145, 0.12)",
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
        "--card-bg": "#fff4d1",
        "--input-bg": "#fff8e6",
        "--input-border": "#f1d38f",
        "--accent-color": "#267533",
        "--accent-hover": "#1f5f29",
        "--secondary-bg": "#ffeebd",
        "--secondary-text": "#267533",
        "--secondary-hover": "#f7e09b",
        "--shadow-color": "rgba(38, 117, 51, 0.12)",
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

const btn = document.getElementById("button");
const contactForm = document.getElementById("contact-form");
const formContainer = document.getElementById("form-container");
const successState = document.getElementById("success-state");

function showForm() {
    contactForm.reset();
    successState.classList.add("hidden");
    formContainer.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme && themes[savedTheme]) {
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

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            btn.innerText = "Sending...";

            const serviceID = "service_ntjl9uf";
            const templateID = "template_8af52k6";

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.innerText = "Send Now";
                    formContainer.classList.add("hidden");
                    successState.classList.remove("hidden");
                })
                .catch((err) => {
                    btn.innerText = "Send Now";
                    alert("Error: " + JSON.stringify(err));
                });
        });
    }
});
