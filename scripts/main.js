// still working on this js I know I can do better, but I'm really sleepy... 

const courses = [

  { number: "CSE 110", name: "Introduction to Programming",   credits: 2, certificate: "webcs",   completed: true  },
  { number: "CSE 111", name: "Programming with Functions",    credits: 2, certificate: "webcs",   completed: true  },
  { number: "CSE 210", name: "Programming with Classes",      credits: 2, certificate: "webcs",   completed: true  },
  { number: "WDD 130", name: "Web Fundamentals",              credits: 2, certificate: "webcs",   completed: true  },
  { number: "WDD 131", name: "Dynamic Web Fundamentals",      credits: 2, certificate: "webcs",   completed: true  },
  { number: "WDD 231", name: "Web Frontend Development I",    credits: 2, certificate: "webcs",   completed: false },

 
  { number: "CSE 340", name: "Web Backend Development",       credits: 3, certificate: "webdev",  completed: false },
  { number: "CSE 341", name: "Web Services",                  credits: 3, certificate: "webdev",  completed: false },
  { number: "ITM 111", name: "Introduction to Databases",     credits: 3, certificate: "webdev",  completed: false },
  { number: "WDD 330", name: "Web Frontend Development II",   credits: 3, certificate: "webdev",  completed: false },
  { number: "WDD 430", name: "Web Full-Stack Development",    credits: 3, certificate: "webdev",  completed: false },

  
  { number: "CSE 212", name: "Programming with Data Structures", credits: 2, certificate: "softdev", completed: false },
  { number: "CSE 270", name: "Software Testing",              credits: 3, certificate: "softdev", completed: false },
  { number: "CSE 300", name: "Professional Readiness",        credits: 1, certificate: "softdev", completed: false },
  { number: "CSE 310", name: "Applied Programming",           credits: 3, certificate: "softdev", completed: false },
  { number: "CSE 325", name: ".NET Software Development",     credits: 3, certificate: "softdev", completed: false },
  { number: "CSE 370", name: "Software Engineering Principles", credits: 2, certificate: "softdev", completed: false },
];


const certLabels = {
  webcs:   "Web &amp; CS",
  webdev:  "Web Dev",
  softdev: "Software Dev",
};


function renderCourses(filter) {
  const container = document.getElementById("course-list");

  const filtered = (filter === "all")
    ? courses
    : courses.filter(c => c.certificate === filter);

  container.innerHTML = filtered.map(course => {
    const isCurrent = course.number === "WDD 231" && !course.completed;
    const cardClass  = course.completed ? " completed" : (isCurrent ? " current" : "");
    const ariaLabel  = `${course.number}: ${course.name}${course.completed ? ", completed" : isCurrent ? ", in progress" : ""}`;
    const badge      = course.completed
      ? '<span class="badge-done" aria-label="Completed">&#10003; Done</span>'
      : isCurrent
        ? '<span class="badge-current" aria-label="In progress">&#9654; Current</span>'
        : "";

    return `
    <article class="course-card${cardClass}" aria-label="${ariaLabel}">
      <p class="course-number">${course.number}</p>
      <p class="course-name">${course.name}</p>
      <div class="card-footer">
        <span class="course-credits">${course.credits} cr</span>
        ${badge}
      </div>
    </article>`;
  }).join("");

  const total = filtered.reduce((sum, c) => sum + c.credits, 0);
  document.getElementById("total-credits").textContent = total;
}


document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    
    document.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");

    renderCourses(btn.dataset.filter);
  });
});


const menuToggle = document.getElementById("menu-toggle");
const mainNav    = document.getElementById("main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});


mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("copyright-year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent  = document.lastModified;

renderCourses("all");