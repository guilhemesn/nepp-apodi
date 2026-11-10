const siteRoot = new URL("../", document.currentScript.src);
const dataPath = new URL("data/site.json", siteRoot);
let siteAxes = [];

function formatYears(years) {
  return years.join(" · ");
}

function createAxisTags(axisIds) {
  const tags = createTextElement("div", "project-card__area", "");
  axisIds.forEach((id) => {
    const axis = siteAxes.find((item) => item.id === id);
    const tag = createTextElement(
      "a",
      "project-axis-tag",
      `Eixo ${axis.number}`,
    );
    tag.href = new URL(`pages/eixo-${axis.number}.html`, siteRoot).href;
    tag.dataset.axis = axis.id;
    tag.title = axis.title;
    tag.setAttribute("aria-label", `Eixo ${axis.number}: ${axis.title}`);
    tags.append(tag);
  });
  return tags;
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value ?? "";
}

function createTextElement(tagName, className, value) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = value ?? "";
  return element;
}

function shuffleProjects(projects) {
  const shuffled = [...projects];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function createProjectCard(project, isCarouselSlide = false) {
  const card = document.createElement("article");
  card.className = isCarouselSlide
    ? "project-card swiper-slide"
    : "project-card";
  card.append(
    createAxisTags(project.axes),
    createTextElement(
      "h3",
      "project-card__title",
      project.cardTitle || project.title,
    ),
    createTextElement(
      "p",
      "project-card__period",
      `Ano de execução: ${formatYears(project.years)}`,
    ),
    createTextElement("p", "project-card__summary", project.summary),
  );

  const link = createTextElement("a", "text-link", "Ver projeto");
  link.href = new URL(
    `pages/projeto-detalhe.html?id=${encodeURIComponent(project.id)}`,
    siteRoot,
  ).href;
  link.setAttribute("aria-label", `Conheça o projeto ${project.title}`);
  card.append(link);
  return card;
}

function renderProjects(projects) {
  document.querySelectorAll("[data-project-grid]").forEach((grid) => {
    const isFeaturedCarousel = Boolean(grid.closest("[data-project-carousel]"));
    const axisFilter = grid.dataset.axisFilter;
    const filteredProjects = axisFilter
      ? projects.filter((project) => project.axes.includes(axisFilter))
      : projects;
    const projectsToRender = isFeaturedCarousel
      ? shuffleProjects(filteredProjects.filter((project) => project.featured))
      : filteredProjects;

    if (projectsToRender.length === 0) {
      grid.append(
        createTextElement(
          "p",
          "empty-state",
          "Os projetos serão publicados aqui em breve.",
        ),
      );
      return;
    }

    projectsToRender.forEach((project) =>
      grid.append(createProjectCard(project, isFeaturedCarousel)),
    );
  });
}

function initializeProjectCarousel() {
  const carousel = document.querySelector("[data-project-carousel]");
  if (!carousel) return;

  const swiperElement = carousel.querySelector(".project-swiper");
  const previousButton = carousel.querySelector("[data-carousel-previous]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const controls = carousel.querySelector(".project-carousel__controls");
  if (swiperElement.querySelectorAll(".project-card").length < 2) {
    controls.hidden = true;
    return;
  }

  if (typeof window.Swiper !== "function") {
    carousel.classList.add("project-carousel--fallback");
    controls.hidden = true;
    return;
  }

  const maximumVisibleSlides = Math.max(
    1,
    swiperElement.querySelectorAll(".project-card").length - 1,
  );
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const swiper = new window.Swiper(swiperElement, {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 12,
    speed: 600,
    loop: true,
    grabCursor: true,
    allowTouchMove: true,
    simulateTouch: true,
    touchEventsTarget: "container",
    touchAngle: 45,
    touchRatio: 1,
    threshold: 5,
    touchStartPreventDefault: false,
    watchOverflow: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
      stopOnLastSlide: false,
    },
    navigation: {
      prevEl: previousButton,
      nextEl: nextButton,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    a11y: {
      containerMessage: "Projetos em destaque",
      containerRoleDescriptionMessage: "carrossel",
      prevSlideMessage: "Projeto anterior",
      nextSlideMessage: "Próximo projeto",
    },
    breakpoints: {
      641: {
        slidesPerView: Math.min(2, maximumVisibleSlides),
        spaceBetween: 18,
      },
      821: {
        slidesPerView: Math.min(3, maximumVisibleSlides),
        spaceBetween: 18,
      },
    },
  });

  const updateAutoplay = () => {
    const hoveredCard = swiperElement.querySelector(".project-card:hover");
    if (reducedMotion.matches || hoveredCard) swiper.autoplay.stop();
    else if (!swiper.autoplay.running) swiper.autoplay.start();
  };

  swiperElement.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", updateAutoplay);
    card.addEventListener("mouseleave", updateAutoplay);
  });
  reducedMotion.addEventListener("change", updateAutoplay);
  updateAutoplay();
}

function renderProjectDetail(projects) {
  const detail = document.querySelector("[data-project-detail]");
  if (!detail) return;

  const projectId = new URLSearchParams(window.location.search).get("id");
  const project = projects.find((item) => item.id === projectId);
  if (!project) {
    const heading = createTextElement(
      "h1",
      "section-title",
      "Projeto não encontrado",
    );
    const message = createTextElement(
      "p",
      "body-copy",
      "Confira o catálogo e escolha um projeto disponível.",
    );
    const link = createTextElement(
      "a",
      "button button-primary",
      "Ver projetos",
    );
    link.href = new URL("pages/projetos.html", siteRoot).href;
    detail.replaceChildren(heading, message, link);
    document.title = "Projeto não encontrado | NEPP Apodi";
    return;
  }

  document.title = `${project.title} | NEPP Apodi`;
  document.querySelector('meta[name="description"]').content = project.summary;
  detail
    .querySelector("[data-project-area]")
    .replaceChildren(createAxisTags(project.axes));
  setText("[data-project-title]", project.title);
  setText("[data-project-summary]", project.summary);
  setText("[data-project-description]", project.description);
  setText("[data-project-methodology]", project.methodology);
  setText("[data-project-responsible]", project.responsible);
  detail.querySelector("[data-project-responsible]").closest("p").hidden =
    !project.responsible;
  setText("[data-project-period]", formatYears(project.years));
  setText("[data-project-status]", project.status);
  detail.querySelector("[data-project-status]").closest("p").hidden =
    !project.status;
  detail.querySelector("[data-project-methodology]").closest("section").hidden =
    !project.methodology;

  const objectives = detail.querySelector("[data-project-objectives]");
  objectives.closest("section").hidden = !project.objectives.length;
  project.objectives.forEach((objective) => {
    objectives.append(createTextElement("li", "", objective));
  });
}

function configureNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  if (!toggle || !navigation) return;
  const dropdown = navigation.querySelector(".nav-dropdown");
  if (dropdown) {
    const panel = dropdown.querySelector(".nav-dropdown__content");
    const summary = dropdown.querySelector("summary");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverMenu = window.matchMedia(
      "(min-width: 821px) and (hover: hover) and (pointer: fine)",
    );
    let openingAnimation;
    const openDropdown = () => {
      if (dropdown.open) return;
      dropdown.open = true;
      openingAnimation?.cancel();
      if (reducedMotion.matches) return;
      // Start in the same event as opening, before the browser paints the panel.
      openingAnimation = panel.animate(
        [
          { opacity: 0, transform: "translateY(-12px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 300, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
      );
    };
    summary.addEventListener("click", (event) => {
      event.preventDefault();
      if (dropdown.open && !(hoverMenu.matches && event.detail > 0)) {
        openingAnimation?.cancel();
        dropdown.open = false;
      } else openDropdown();
    });
    dropdown.addEventListener("pointerenter", () => {
      if (hoverMenu.matches) openDropdown();
    });
    dropdown.addEventListener("pointerleave", () => {
      if (hoverMenu.matches && !dropdown.contains(document.activeElement)) {
        dropdown.open = false;
      }
    });
    dropdown.addEventListener("focusout", (event) => {
      if (
        !dropdown.contains(event.relatedTarget) &&
        !dropdown.matches(":hover")
      ) {
        dropdown.open = false;
      }
    });
  }
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu principal");
    navigation.classList.remove("is-open");
    if (dropdown) dropdown.open = false;
  };
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Fechar menu principal");
      navigation.classList.add("is-open");
    }
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !toggle.contains(event.target))
      closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const wasMenuOpen = toggle.getAttribute("aria-expanded") === "true";
    const wasDropdownOpen = dropdown?.open;
    closeMenu();
    if (wasMenuOpen) toggle.focus();
    else if (wasDropdownOpen) dropdown.querySelector("summary").focus();
  });
  window.matchMedia("(max-width: 820px)").addEventListener("change", closeMenu);
}

function initializeProcessJourney() {
  const journey = document.querySelector("[data-process-journey]");
  if (!journey) return;
  const steps = Array.from(journey.querySelectorAll(".process-timeline > li"));
  const markers = steps.map((step) =>
    step.querySelector(".process-timeline__marker"),
  );
  const svg = journey.querySelector(".process-journey__track");
  const path = journey.querySelector("[data-process-path]");
  const progress = journey.querySelector("[data-process-progress]");
  const cursor = journey.querySelector("[data-process-cursor]");
  const number = journey.querySelector("[data-process-number]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const compact = window.matchMedia("(max-width: 600px)");
  let points = [];
  let stops = [];
  let length = 0;
  let distance = 0;
  let activeStep = -1;
  let scrollFrame = 0;
  let measureFrame = 0;
  let motionFrame = 0;

  const draw = (position, stopIndex = null) => {
    distance = position;
    const point =
      stopIndex === null ? path.getPointAtLength(position) : points[stopIndex];
    cursor.setAttribute("cx", point.x);
    cursor.setAttribute("cy", point.y);
    number.setAttribute("x", point.x);
    number.setAttribute("y", point.y);
    progress.style.strokeDashoffset = String(length - position);
  };
  const select = (current) => {
    activeStep = current;
    number.textContent = String(current + 1);
    steps.forEach((step, index) => {
      step.classList.toggle("is-active", index === current);
      step.classList.toggle("is-complete", index < current);
      if (index === current) step.setAttribute("aria-current", "step");
      else step.removeAttribute("aria-current");
    });
  };
  const moveTo = (index, animate) => {
    cancelAnimationFrame(motionFrame);
    motionFrame = 0;
    const destination = stops[index];
    if (!animate || reducedMotion.matches) {
      draw(destination, index);
      return;
    }
    const origin = distance;
    const started = performance.now();
    const advance = (now) => {
      const elapsed = Math.min(1, (now - started) / 560);
      const eased = elapsed * elapsed * (3 - 2 * elapsed);
      draw(
        origin + (destination - origin) * eased,
        elapsed === 1 ? index : null,
      );
      if (elapsed < 1) motionFrame = requestAnimationFrame(advance);
      else motionFrame = 0;
    };
    motionFrame = requestAnimationFrame(advance);
  };
  const update = (animate = true) => {
    if (!length) return;
    const readingY =
      window.innerHeight * 0.52 - journey.getBoundingClientRect().top;
    const reach = Math.min(110, window.innerHeight * 0.14);
    let current = Math.max(0, activeStep);
    // A dead zone between the circles keeps the marker parked while a step is read.
    while (
      current < points.length - 1 &&
      readingY >= points[current + 1].y - reach
    )
      current += 1;
    while (current > 0 && readingY <= points[current - 1].y + reach)
      current -= 1;
    if (current !== activeStep) {
      select(current);
      moveTo(current, animate);
    }
  };
  const scheduleUpdate = () => {
    if (!scrollFrame)
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        update();
      });
  };
  const measure = () => {
    measureFrame = 0;
    cancelAnimationFrame(motionFrame);
    motionFrame = 0;
    const bounds = journey.getBoundingClientRect();
    points = markers.map((marker) => {
      const rect = marker.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - bounds.left,
        y: rect.top + rect.height / 2 - bounds.top,
      };
    });
    let shape = `M ${points[0].x} ${points[0].y}`;
    points.slice(1).forEach((point, index) => {
      const previous = points[index];
      if (compact.matches) {
        // On phones the curve crosses the gap between cards, never their text.
        const bottom = steps[index].getBoundingClientRect().bottom - bounds.top;
        const top = steps[index + 1].getBoundingClientRect().top - bounds.top;
        const gap = top - bottom;
        const exit = bottom + gap * 0.15;
        const entry = top - gap * 0.15;
        const middle = (exit + entry) / 2;
        shape += ` L ${previous.x} ${exit} C ${previous.x} ${middle}, ${point.x} ${middle}, ${point.x} ${entry} L ${point.x} ${point.y}`;
      } else {
        const curve = (point.y - previous.y) * 0.45;
        shape += ` C ${previous.x} ${previous.y + curve}, ${point.x} ${point.y - curve}, ${point.x} ${point.y}`;
      }
    });
    svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
    path.setAttribute("d", shape);
    progress.setAttribute("d", shape);
    length = path.getTotalLength();
    stops = points.map((point, index) => {
      if (!index) return 0;
      if (index === points.length - 1) return length;
      let low = 0,
        high = length;
      for (let iteration = 0; iteration < 18; iteration += 1) {
        const middle = (low + high) / 2;
        if (path.getPointAtLength(middle).y < point.y) low = middle;
        else high = middle;
      }
      return (low + high) / 2;
    });
    const radius = markers[0].getBoundingClientRect().width / 2;
    journey.querySelector("[data-process-gaps]").replaceChildren(
      ...points.map((point) => {
        const gap = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle",
        );
        gap.setAttribute("cx", point.x);
        gap.setAttribute("cy", point.y);
        gap.setAttribute("r", radius + 1);
        gap.setAttribute("fill", "black");
        return gap;
      }),
    );
    progress.style.strokeDasharray = `${length} ${length}`;
    cursor.setAttribute("r", radius);
    journey.classList.add("process-journey--ready");
    if (activeStep < 0) select(0);
    draw(stops[activeStep], activeStep);
    update(false);
  };
  const scheduleMeasure = () => {
    if (!measureFrame) measureFrame = requestAnimationFrame(measure);
  };
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleMeasure, { passive: true });
  window.addEventListener("pageshow", scheduleMeasure);
  reducedMotion.addEventListener("change", () => moveTo(activeStep, false));
  if (window.ResizeObserver)
    new ResizeObserver(scheduleMeasure).observe(journey);
  document.fonts.ready.then(scheduleMeasure);
  measure();
}

function initializeServicesCarousel() {
  const carousel = document.querySelector(".services-swiper");
  if (!carousel || carousel.swiper) return;
  const section = carousel.closest(".hero-services");
  if (typeof window.Swiper !== "function") {
    section.classList.add("hero-services--fallback");
    return;
  }
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const swiper = new window.Swiper(carousel, {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 12,
    loop: true,
    speed: 450,
    allowTouchMove: false,
    autoplay: { delay: 2000, disableOnInteraction: false },
    a11y: {
      containerMessage: "Serviços do CONECTA",
      containerRoleDescriptionMessage: "carrossel",
      prevSlideMessage: "Serviço anterior",
      nextSlideMessage: "Próximo serviço",
    },
  });
  let pointerInside = false;
  const updateAutoplay = () => {
    const keyboardFocus = section.querySelector(".hero-service:focus-visible");
    if (reducedMotion.matches || pointerInside || keyboardFocus) {
      swiper.autoplay.stop();
    } else if (!swiper.autoplay.running) {
      swiper.autoplay.start();
    } else if (swiper.autoplay.paused) {
      swiper.autoplay.resume();
    }
  };
  section.addEventListener("mouseenter", () => {
    pointerInside = true;
    updateAutoplay();
  });
  section.addEventListener("mouseleave", () => {
    pointerInside = false;
    updateAutoplay();
  });
  document.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    const bounds = section.getBoundingClientRect();
    const inside =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;
    if (inside !== pointerInside) {
      pointerInside = inside;
      updateAutoplay();
    }
  });
  section.addEventListener("focusin", updateAutoplay);
  section.addEventListener("focusout", () =>
    requestAnimationFrame(updateAutoplay),
  );
  reducedMotion.addEventListener("change", updateAutoplay);
  window.addEventListener("pagehide", () => swiper.autoplay.stop());
  window.addEventListener("pageshow", () => {
    // A cached page can retain :hover from the click that left it.
    // Resume on return and recalculate hover on the next real pointer movement.
    pointerInside = false;
    requestAnimationFrame(() => {
      swiper.update();
      updateAutoplay();
    });
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) requestAnimationFrame(updateAutoplay);
  });
  updateAutoplay();
}

function initializePartnersCarousel() {
  const carousel = document.querySelector(".partner-swiper");
  if (!carousel) return;
  if (carousel.swiper) return;
  if (typeof window.Swiper !== "function") {
    carousel.classList.add("partners-carousel--fallback");
    return;
  }
  const track = carousel.querySelector(".partners-track");
  const partners = Array.from(track.children);
  if (partners.length < 2) {
    carousel.classList.add("partners-carousel--fallback");
    return;
  }
  // Keep full copies of the sequence offscreen so Swiper can recycle slides
  // without moving a visible card when three partners are shown at once.
  const minimumSlides = 12;
  const copies = Math.max(1, Math.ceil(minimumSlides / partners.length));
  for (let copy = 1; copy < copies; copy += 1) {
    partners.forEach((partner) => {
      const duplicate = partner.cloneNode(true);
      duplicate.removeAttribute("id");
      duplicate
        .querySelectorAll("[id]")
        .forEach((element) => element.removeAttribute("id"));
      duplicate.setAttribute("aria-hidden", "true");
      duplicate.inert = true;
      track.append(duplicate);
    });
  }
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const swiper = new window.Swiper(carousel, {
    slidesPerView: 1.2,
    spaceBetween: 18,
    speed: 5000,
    loop: true,
    loopAdditionalSlides: 3,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    a11y: {
      containerMessage: "Instituições parceiras",
      containerRoleDescriptionMessage: "carrossel",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      980: { slidesPerView: 3 },
    },
  });
  if (reducedMotion.matches) swiper.autoplay.stop();
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) swiper.autoplay.stop();
    else swiper.autoplay.start();
  });
}

function renderSite(site) {
  if (document.body.dataset.view === "home") document.title = site.title;
  setText("[data-site-tagline]", site.tagline);
  setText("[data-hero-title]", site.heroTitle);
  const heroTitle = document.querySelector("[data-hero-title]");
  if (
    heroTitle &&
    site.heroTitleAccent &&
    site.heroTitle.endsWith(site.heroTitleAccent)
  ) {
    const lead = site.heroTitle
      .slice(0, -site.heroTitleAccent.length)
      .trimEnd();
    heroTitle.replaceChildren(
      createTextElement("span", "hero-title__lead", lead),
      document.createTextNode(" "),
      createTextElement("span", "hero-title__accent", site.heroTitleAccent),
    );
  }
  setText("[data-hero-description]", site.heroDescription);
  setText("[data-about-text]", site.aboutText);
  setText("[data-contact-text]", site.contactText);
  setText("[data-campus]", site.campus);
  setText("[data-current-year]", new Date().getFullYear());
  setText("[data-footer-credit]", site.footerCredit);

  const emailLink = document.querySelector("[data-contact-email]");
  if (site.email) {
    const gmailUrl = new URL("https://mail.google.com/mail/");
    gmailUrl.search = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: site.email,
    });
    document.querySelectorAll("[data-contact-link]").forEach((link) => {
      link.href = gmailUrl.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  }
  if (emailLink && site.email) {
    emailLink.textContent = site.email;
    emailLink.hidden = false;
  }
}

async function alignInitialSection() {
  const initialHash = window.location.hash;
  if (!initialHash) return;
  const section = document.getElementById(initialHash.slice(1));
  if (!section) return;

  const pageLoaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((resolve) =>
          window.addEventListener("load", resolve, { once: true }),
        );
  await Promise.all([pageLoaded, document.fonts.ready]);

  if (window.location.hash !== initialHash) return;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  requestAnimationFrame(() =>
    section.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "start",
    }),
  );
}

async function initializeSite() {
  configureNavigation();
  initializeProcessJourney();
  initializeServicesCarousel();
  initializePartnersCarousel();

  try {
    const response = await fetch(dataPath, { cache: "no-cache" });
    if (!response.ok)
      throw new Error(`Falha ao carregar dados: ${response.status}`);
    const data = await response.json();
    if (
      !data.site ||
      !Array.isArray(data.projects) ||
      !Array.isArray(data.axes)
    ) {
      throw new Error("Estrutura dos dados do site inválida.");
    }
    siteAxes = data.axes;
    const allowedAxes = new Set(siteAxes.map((axis) => axis.id));
    const projectIds = new Set();
    data.projects.forEach((project) => {
      if (
        !project.id ||
        !project.title ||
        !Array.isArray(project.objectives) ||
        !Array.isArray(project.axes) ||
        !project.axes.length ||
        project.axes.some((axis) => !allowedAxes.has(axis)) ||
        new Set(project.axes).size !== project.axes.length ||
        !Array.isArray(project.years) ||
        !project.years.length ||
        projectIds.has(project.id)
      ) {
        throw new Error("Projeto inválido ou identificador duplicado.");
      }
      projectIds.add(project.id);
    });

    renderSite(data.site);
    renderProjects(data.projects);
    renderProjectDetail(data.projects);
    initializeProjectCarousel();
    alignInitialSection();
  } catch (error) {
    const errorMessage = document.querySelector("[data-load-error]");
    if (errorMessage) errorMessage.hidden = false;
    console.error(error);
  }
}

initializeSite();
