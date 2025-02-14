document.addEventListener("DOMContentLoaded", function () {
  // Globales Overlay-Mapping und Overlay-Referenz (für beide Bereiche)
  const overlayMapping = {
    "Bild 1": "img/_DSF4318-Verbessert-RR-Bearbeitet.jpg",
    "Bild 2": "img/DSCF7739-Bearbeitet.jpg",
    "Bild 3": "img/Flora-Verbessert.jpg",
    "Bild 4": "img/Modefotografie_Giggenbach-26.jpg",
    "Bild 5": "img/DSCF9219-Verbessert-RR.jpg"
  };
  const overlay = document.querySelector(".background-overlay");

  // Globaler Mauszeiger-Tracker (für automatische Hover-Updates im Projects Grid)
  let lastMouseX = 0;
  let lastMouseY = 0;
  document.addEventListener("mousemove", function (e) {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  /**
   * Prüft anhand der aktuellen Mausposition, welches Element unter dem Cursor liegt.
   * Befindet sich dort ein Bild aus dem Projects‑Grid, wird das Overlay aktualisiert.
   */
  function checkOverlayHover() {
    if (!overlay) return;
    const elem = document.elementFromPoint(lastMouseX, lastMouseY);
    if (elem && elem.tagName === "IMG" && elem.closest(".projects-content")) {
      const altText = elem.getAttribute("alt");
      if (overlayMapping[altText]) {
        overlay.style.backgroundImage = `url('${overlayMapping[altText]}')`;
      }
      overlay.style.visibility = "visible";
      overlay.style.opacity = "1";
    } else {
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
    }
  }

  /* ---------------------------------------------------
     IMAGE SCROLLER – ENDLOS SCROLLING (analog zum Projects Grid)
  --------------------------------------------------- */
  let imagePos = 0;
  let imageBaseDimension = 0;

  function updateImageBaseDimension() {
    const imageSet = document.querySelector('.image-set');
    if (!imageSet) return;
    imageBaseDimension = imageSet.offsetWidth;
    imagePos = 0;
    updateImageIndicator();
  }
  updateImageBaseDimension();
  window.addEventListener("resize", updateImageBaseDimension);

  // Funktion zur Aktualisierung des Image Scroller Indicators
  function updateImageIndicator() {
    const n = 5; // Anzahl der Bilder
    const segmentWidth = imageBaseDimension / n;
    const viewportCenter = window.innerWidth / 2;
    const containerCenter = imagePos + viewportCenter;
    let activeIndex = Math.floor(containerCenter / segmentWidth) % n;
    if (activeIndex < 0) activeIndex = 0;
    const dots = document.querySelectorAll('.image-indicator .dot');
    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  const imageScroller = document.querySelector('.image-scroller');
  if (imageScroller) {
    imageScroller.addEventListener("wheel", function (e) {
      e.preventDefault();
      const factor = 1;
      imagePos = (imagePos + e.deltaY * factor) % imageBaseDimension;
      if (imagePos < 0) imagePos += imageBaseDimension;
      const wrapper = document.querySelector('.image-scroller-wrapper');
      if (wrapper) {
        wrapper.style.transform = `translateX(-${imagePos}px)`;
      }
      updateImageIndicator();
    }, { passive: false });
  }

  /* ---------------------------------------------------
     MOBILE MENÜ-FUNKTIONALITÄT (falls vorhanden)
  --------------------------------------------------- */
  const menu = document.getElementById("menu");
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");

  if (menuToggle && menuClose && menu) {
    menuToggle.addEventListener("click", function (event) {
      event.preventDefault();
      menu.classList.add("active");
    });
    menuClose.addEventListener("click", function (event) {
      event.preventDefault();
      menu.classList.remove("active");
    });
  } else {
    console.error("❌ Mobile Menü-Elemente nicht gefunden!");
  }

  /* ---------------------------------------------------
     Globale Variablen für das Projects Grid
  --------------------------------------------------- */
  let pos1 = 0;
  let baseDimension1 = 0;

  function updateProjectBaseDimensions() {
    const row1Wrapper = document.querySelector(".row1 .projects-wrapper1");
    if (!row1Wrapper) return;
    if (window.innerWidth < 699) {
      baseDimension1 = row1Wrapper.querySelector(".projects-content").offsetHeight;
    } else {
      baseDimension1 = row1Wrapper.querySelector(".projects-content").offsetWidth;
    }
    pos1 = 0;
  }

  function updateIndicator() {
    const n = 5; // Anzahl der Bilder
    let activeIndex = 0;
    if (window.innerWidth < 699) {
      const viewportCenter = window.innerHeight / 2;
      const containerCenter = pos1 + viewportCenter;
      const segmentHeight = baseDimension1 / n;
      activeIndex = Math.floor(containerCenter / segmentHeight) % n;
    } else {
      const viewportCenter = window.innerWidth / 2;
      const containerCenter = pos1 + viewportCenter;
      const segmentWidth = baseDimension1 / n;
      activeIndex = Math.floor(containerCenter / segmentWidth) % n;
    }
    if (activeIndex < 0) activeIndex = 0;
    const dots = document.querySelectorAll('.projects-indicator .dot');
    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  /* ---------------------------------------------------
     DESKTOP SIDEBAR – Öffnen der Bereiche
  --------------------------------------------------- */
  const desktopSidebar = document.getElementById("desktop-sidebar");
  if (!desktopSidebar) {
    console.error("❌ Desktop Sidebar nicht gefunden!");
  }

  const desktopImprintLink = document.getElementById("desktop-imprint-link");
  if (desktopImprintLink && desktopSidebar) {
    desktopImprintLink.addEventListener("click", function (event) {
      event.preventDefault();
      desktopSidebar.classList.remove("imprint-active", "about-active", "contact-active", "projects-active", "hello-active");
      desktopSidebar.classList.add("expanded", "imprint-active");
    });
  } else {
    console.error("❌ Desktop Imprint-Link oder Sidebar nicht gefunden!");
  }

  const desktopAboutLink = document.getElementById("desktop-about-link");
  if (desktopAboutLink && desktopSidebar) {
    desktopAboutLink.addEventListener("click", function (event) {
      event.preventDefault();
      desktopSidebar.classList.remove("imprint-active", "about-active", "contact-active", "projects-active", "hello-active");
      desktopSidebar.classList.add("expanded", "about-active");
    });
  } else {
    console.error("❌ Desktop About-Link nicht gefunden!");
  }

  const desktopContactLink = document.getElementById("desktop-contact-link");
  if (desktopContactLink && desktopSidebar) {
    desktopContactLink.addEventListener("click", function (event) {
      event.preventDefault();
      desktopSidebar.classList.remove("imprint-active", "about-active", "contact-active", "projects-active", "hello-active");
      desktopSidebar.classList.add("expanded", "contact-active");
    });
  } else {
    console.error("❌ Desktop Contact-Link nicht gefunden!");
  }

  const desktopProjectsLink = document.getElementById("desktop-projects-link");
  if (desktopProjectsLink && desktopSidebar) {
    desktopProjectsLink.addEventListener("click", function (event) {
      event.preventDefault();
      desktopSidebar.classList.remove("imprint-active", "about-active", "contact-active", "projects-active", "hello-active");
      desktopSidebar.classList.add("expanded", "projects-active");
      setTimeout(() => {
        updateProjectBaseDimensions();
        updateIndicator();
      }, 300);
    });
  } else {
    console.error("❌ Desktop Projects-Link nicht gefunden!");
  }

  const sidebarCloseBtn = document.getElementById("sidebar-close-btn");
  if (sidebarCloseBtn && desktopSidebar) {
    sidebarCloseBtn.addEventListener("click", function () {
      desktopSidebar.classList.remove("expanded", "imprint-active", "about-active", "contact-active", "projects-active", "hello-active");
    });
  } else {
    console.error("❌ Desktop Sidebar-Schließ-Button nicht gefunden!");
  }

  /* ---------------------------------------------------
     MOBILE: Erweiterung des Headers (falls vorhanden)
  --------------------------------------------------- */
  const mobileHeader = document.getElementById("mobile-header");
  if (mobileHeader) {
    const mobileImprintLink = document.getElementById("mobile-imprint-link");
    const mobileImprintCloseBtn = document.getElementById("mobile-imprint-close-btn");
    if (mobileImprintLink) {
      mobileImprintLink.addEventListener("click", function (event) {
        event.preventDefault();
        mobileHeader.classList.remove("imprint-active", "about-active", "contact-active", "projects-active", "hello-active");
        mobileHeader.classList.add("expanded", "imprint-active");
      });
    } else {
      console.error("❌ Mobile Imprint-Link nicht gefunden!");
    }
    if (mobileImprintCloseBtn) {
      mobileImprintCloseBtn.addEventListener("click", function () {
        mobileHeader.classList.remove("expanded", "imprint-active", "about-active", "contact-active", "projects-active", "hello-active");
      });
    } else {
      console.error("❌ Mobile Imprint-Schließ-Button nicht gefunden!");
    }

    const mobileAboutLink = document.getElementById("mobile-about-link");
    const mobileAboutCloseBtn = document.getElementById("mobile-about-close-btn");
    if (mobileAboutLink) {
      mobileAboutLink.addEventListener("click", function (event) {
        event.preventDefault();
        mobileHeader.classList.remove("imprint-active", "about-active", "contact-active", "projects-active", "hello-active");
        mobileHeader.classList.add("expanded", "about-active");
      });
    } else {
      console.error("❌ Mobile About-Link nicht gefunden!");
    }
    if (mobileAboutCloseBtn) {
      mobileAboutCloseBtn.addEventListener("click", function () {
        mobileHeader.classList.remove("expanded", "imprint-active", "about-active", "contact-active", "projects-active", "hello-active");
      });
    } else {
      console.error("❌ Mobile About-Schließ-Button nicht gefunden!");
    }

    const mobileContactLink = document.getElementById("mobile-contact-link");
    const mobileContactCloseBtn = document.getElementById("mobile-contact-close-btn");
    if (mobileContactLink) {
      mobileContactLink.addEventListener("click", function (event) {
        event.preventDefault();
        mobileHeader.classList.remove("imprint-active", "about-active", "contact-active", "projects-active", "hello-active");
        mobileHeader.classList.add("expanded", "contact-active");
      });
    } else {
      console.error("❌ Mobile Contact-Link nicht gefunden!");
    }
    if (mobileContactCloseBtn) {
      mobileContactCloseBtn.addEventListener("click", function () {
        mobileHeader.classList.remove("expanded", "imprint-active", "about-active", "contact-active", "projects-active", "hello-active");
      });
    } else {
      console.error("❌ Mobile Contact-Schließ-Button nicht gefunden!");
    }
  }

  /* ---------------------------------------------------
     SCROLLING FÜR DAS PROJECTS GRID
     Zusätzlich: Nach jedem Scroll-Schritt wird geprüft, ob sich unter dem statischen Cursor das Bild ändert,
     und das Overlay (Hover-Effekt) wird entsprechend aktualisiert.
  --------------------------------------------------- */
  window.addEventListener(
    "wheel",
    (e) => {
      if (!desktopSidebar.classList.contains("projects-active")) return;
      e.preventDefault();
      const factor = 1;
      if (window.innerWidth < 699) {
        pos1 = (pos1 + e.deltaY * factor) % baseDimension1;
        if (pos1 < 0) pos1 += baseDimension1;
        const row1Wrapper = document.querySelector(".row1 .projects-wrapper1");
        if (row1Wrapper) {
          row1Wrapper.style.transform = `translateY(-${pos1}px)`;
        }
      } else {
        pos1 = (pos1 + e.deltaY * factor) % baseDimension1;
        if (pos1 < 0) pos1 += baseDimension1;
        const row1Wrapper = document.querySelector(".row1 .projects-wrapper1");
        if (row1Wrapper) {
          row1Wrapper.style.transform = `translateX(-${pos1}px)`;
        }
      }
      updateIndicator();
      // Zusätzlich: Prüfe, ob sich unter dem statischen Cursor ein anderes Bild im Projects Grid befindet.
      checkOverlayHover();
    },
    { passive: false }
  );

  /* ---------------------------------------------------
     SETZE DIE VARIABLE FÜR DIE VH-EINHEIT
  --------------------------------------------------- */
  function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  setVh();
  window.addEventListener("resize", setVh);

  /* ---------------------------------------------------
     HOVER-FUNKTIONALITÄT FÜR PROJECTS GRID BILDER
     Zusätzlich: Beim Hover über die Bilder wird auch der Tooltip "view project" neben dem Cursor angezeigt.
  --------------------------------------------------- */
  const projectTooltip = document.getElementById("project-tooltip");
  document.querySelectorAll(".projects-area .projects-content img").forEach((img) => {
    img.addEventListener("mouseenter", () => {
      clearTimeout(img.hideOverlayTimer);
      const altText = img.getAttribute("alt");
      if (overlayMapping[altText]) {
        overlay.style.backgroundImage = `url('${overlayMapping[altText]}')`;
      }
      overlay.style.visibility = "visible";
      overlay.style.opacity = "1";
      // Tooltip anzeigen
      if (projectTooltip) {
        projectTooltip.style.display = "block";
      }
    });
    img.addEventListener("mousemove", (e) => {
      // Positioniere den Tooltip neben dem Cursor (Offset z. B. 10px)
      if (projectTooltip) {
        projectTooltip.style.left = (e.clientX + 10) + "px";
        projectTooltip.style.top = (e.clientY + 10) + "px";
      }
    });
    img.addEventListener("mouseleave", () => {
      img.hideOverlayTimer = setTimeout(() => {
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
      }, 100);
      // Tooltip ausblenden
      if (projectTooltip) {
        projectTooltip.style.display = "none";
      }
    });
  });

  /* ---------------------------------------------------
     CUSTOM CURSOR
     Der Custom Cursor besteht nun ausschließlich aus dem Scroll-Icon (langes, mausförmiges Slot-Element, das bei Hover in ein rundes Element wechselt).
  --------------------------------------------------- */
  const customCursor = document.getElementById("custom-cursor");
  document.addEventListener("mousemove", (e) => {
    customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  const hoverElements = document.querySelectorAll("a, button");
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      customCursor.classList.add("cursor--hover");
    });
    el.addEventListener("mouseleave", () => {
      customCursor.classList.remove("cursor--hover");
    });
  });
});
