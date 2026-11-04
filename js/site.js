const siteRoot = new URL("../", document.currentScript.src);
const dataPath = new URL("data/site.json", siteRoot);

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
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function createProjectCard(project, isCarouselSlide = false) {
  const card = document.createElement("article");
  card.className = isCarouselSlide ? "project-card swiper-slide" : "project-card";
  card.append(
    createTextElement("p", "project-card__area", project.areas.join(" · ")),
    createTextElement("h3", "project-card__title", project.cardTitle || project.title),
    createTextElement("p", "project-card__period", project.period),
    createTextElement("p", "project-card__summary", project.summary)
  );

  const link = createTextElement("a", "text-link", "Ver projeto →");
  link.href = new URL(`pages/projeto-detalhe.html?id=${encodeURIComponent(project.id)}`, siteRoot).href;
  link.setAttribute("aria-label", `Conheça o projeto ${project.title}`);
  card.append(link);
  return card;
}

function renderProjects(projects) {
  document.querySelectorAll("[data-project-grid]").forEach((grid) => {
    const isFeaturedCarousel = Boolean(grid.closest("[data-project-carousel]"));
    const projectsToRender = isFeaturedCarousel ? shuffleProjects(projects.filter((project) => project.featured)) : projects;

    if (projectsToRender.length === 0) {
      grid.append(createTextElement("p", "empty-state", "Os projetos serão publicados aqui em breve."));
      return;
    }

    projectsToRender.forEach((project) => grid.append(createProjectCard(project, isFeaturedCarousel)));
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

  const maximumVisibleSlides = Math.max(1, swiperElement.querySelectorAll(".project-card").length - 1);
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
      stopOnLastSlide: false
    },
    navigation: {
      prevEl: previousButton,
      nextEl: nextButton
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    a11y: {
      containerMessage: "Projetos em destaque",
      containerRoleDescriptionMessage: "carrossel",
      prevSlideMessage: "Projeto anterior",
      nextSlideMessage: "Próximo projeto"
    },
    breakpoints: {
      641: {
        slidesPerView: Math.min(2, maximumVisibleSlides),
        spaceBetween: 18
      },
      821: {
        slidesPerView: Math.min(3, maximumVisibleSlides),
        spaceBetween: 18
      }
    }
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
    const heading = createTextElement("h1", "section-title", "Projeto não encontrado");
    const message = createTextElement("p", "body-copy", "Confira o catálogo e escolha um projeto disponível.");
    const link = createTextElement("a", "button button-primary", "Ver projetos");
    link.href = new URL("pages/projetos.html", siteRoot).href;
    detail.replaceChildren(heading, message, link);
    document.title = "Projeto não encontrado | NEPP Apodi";
    return;
  }

  document.title = `${project.title} | NEPP Apodi`;
  document.querySelector('meta[name="description"]').content = project.summary;
  setText("[data-project-area]", project.areas.join(" · "));
  setText("[data-project-title]", project.title);
  setText("[data-project-summary]", project.summary);
  setText("[data-project-description]", project.description);
  setText("[data-project-methodology]", project.methodology);
  setText("[data-project-responsible]", project.responsible);
  detail.querySelector("[data-project-responsible]").closest("p").hidden = !project.responsible;
  setText("[data-project-period]", project.period);
  setText("[data-project-status]", project.status);
  detail.querySelector("[data-project-status]").closest("p").hidden = !project.status;
  detail.querySelector("[data-project-methodology]").closest("section").hidden = !project.methodology;

  const objectives = detail.querySelector("[data-project-objectives]");
  objectives.closest("section").hidden = !project.objectives.length;
  project.objectives.forEach((objective) => {
    objectives.append(createTextElement("li", "", objective));
  });
}

function renderTeam(members) {
  const grid = document.querySelector("[data-team-grid]");
  if (!grid) return;

  members.forEach((member) => {
    const card = createTextElement("article", "team-card", "");
    const avatar = createTextElement("div", "team-card__avatar team-card__photo-placeholder", "");
    avatar.setAttribute("aria-hidden", "true");
    card.append(
      avatar,
      createTextElement("p", "team-card__role", member.role),
      createTextElement("h3", "team-card__name", member.name),
      createTextElement("p", "team-card__description", member.description),
      createTextElement("span", "team-card__area", member.area)
    );
    grid.append(card);
  });
}

function configureNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  if (!toggle || !navigation) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu principal");
    navigation.classList.remove("is-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Abrir menu principal" : "Fechar menu principal");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });
}

function renderSite(site) {
  if (document.body.dataset.view === "home") document.title = site.title;
  setText("[data-site-tagline]", site.tagline);
  setText("[data-hero-title]", site.heroTitle);
  setText("[data-hero-description]", site.heroDescription);
  setText("[data-about-title]", site.aboutTitle);
  setText("[data-about-text]", site.aboutText);
  renderTeam(site.team);
  setText("[data-contact-text]", site.contactText);
  setText("[data-campus]", site.campus);
  setText("[data-current-year]", new Date().getFullYear());
  setText("[data-footer-credit]", site.footerCredit);

  const emailLink = document.querySelector("[data-contact-email]");
  if (emailLink && site.email) {
    emailLink.href = `mailto:${site.email}`;
    emailLink.textContent = site.email;
    emailLink.hidden = false;
  }

}

async function alignInitialSection() {
  const initialHash = window.location.hash;
  if (!initialHash) return;
  const section = document.getElementById(initialHash.slice(1));
  if (!section) return;

  const pageLoaded = document.readyState === "complete"
    ? Promise.resolve()
    : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
  await Promise.all([pageLoaded, document.fonts.ready]);

  if (window.location.hash !== initialHash) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  requestAnimationFrame(() => section.scrollIntoView({
    behavior: reducedMotion ? "instant" : "smooth",
    block: "start"
  }));
}

async function initializeSite() {
  configureNavigation();

  try {
    const response = await fetch(dataPath, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Falha ao carregar dados: ${response.status}`);
    const data = await response.json();
    if (!data.site || !Array.isArray(data.projects)) {
      throw new Error("Estrutura dos dados do site inválida.");
    }
    const allowedAreas = new Set(["Informática", "Química", "Agropecuária"]);
    const projectIds = new Set();
    data.projects.forEach((project) => {
      if (!project.id || !project.title || !Array.isArray(project.objectives) || !Array.isArray(project.areas) || !project.areas.length || project.areas.some((area) => !allowedAreas.has(area)) || new Set(project.areas).size !== project.areas.length || projectIds.has(project.id)) {
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
