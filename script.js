document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  // Add subtle bottom border to sticky header once the user scrolls.
  const updateHeaderBorder = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  };

  // Toggle mobile navigation drawer.
  const closeMenu = () => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a nav link or resume button inside it is clicked.
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu on Escape key for keyboard accessibility.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  // Highlight the navigation link matching the section currently in view.
  const setActiveLink = (sectionId) => {
    navLinks.forEach((link) => {
      const target = link.getAttribute("href");
      link.classList.toggle("active", target === `#${sectionId}`);
    });
  };

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  updateHeaderBorder();
  window.addEventListener("scroll", updateHeaderBorder, { passive: true });
});
