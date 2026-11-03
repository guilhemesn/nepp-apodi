const dataPath = new URL("data/site.json", document.baseURI);

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

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.append(
    createTextElement("p", "project-card__area", project.area),
    createTextElement("h3", "project-card__title", project.title),
    createTextElement("p", "project-card__summary", project.summary)
  );

  const link = createTextElement("a", "text-link", "Conheça o projeto →");
  link.href = `projeto-detalhe.html?id=${encodeURIComponent(project.id)}`;
  link.setAttribute("aria-label", `Conheça o projeto ${project.title}`);
  card.append(link);
  return card;
}

function renderProjects(projects) {
  document.querySelectorAll("[data-project-grid]").forEach((grid) => {
    const limit = Number(grid.dataset.featuredLimit);
    const visibleProjects = Number.isFinite(limit) && limit > 0
      ? projects.slice(0, limit)
      : projects;

    if (visibleProjects.length === 0) {
      grid.append(createTextElement("p", "empty-state", "Os projetos serão publicados aqui em breve."));
      return;
    }

    visibleProjects.forEach((project) => grid.append(createProjectCard(project)));
  });
}

function renderObjectives(objectives) {
  const grid = document.querySelector("[data-objectives]");
  if (!grid) return;

  objectives.forEach((objective, index) => {
    const card = document.createElement("article");
    card.className = "info-card";
    card.append(
      createTextElement("span", "info-card__number", String(index + 1).padStart(2, "0")),
      createTextElement("h3", "info-card__title", objective.title),
      createTextElement("p", "info-card__description", objective.description)
    );
    grid.append(card);
  });
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
    link.href = "projetos.html";
    detail.replaceChildren(heading, message, link);
    document.title = "Projeto não encontrado | NEPP Apodi";
    return;
  }

  document.title = `${project.title} | NEPP Apodi`;
  setText("[data-project-area]", project.area);
  setText("[data-project-title]", project.title);
  setText("[data-project-summary]", project.summary);
  setText("[data-project-description]", project.description);
  setText("[data-project-methodology]", project.methodology);
  setText("[data-project-responsible]", project.responsible);
  setText("[data-project-period]", project.period);
  setText("[data-project-status]", project.status);

  const objectives = detail.querySelector("[data-project-objectives]");
  project.objectives.forEach((objective) => {
    objectives.append(createTextElement("li", "", objective));
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
  setText("[data-objectives-intro]", site.objectivesIntro);
  setText("[data-team-text]", site.teamText);
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

  renderObjectives(site.objectives);
}

async function initializeSite() {
  configureNavigation();

  try {
    const response = await fetch(dataPath);
    if (!response.ok) throw new Error(`Falha ao carregar dados: ${response.status}`);
    const data = await response.json();

    renderSite(data.site);
    renderProjects(data.projects);
    renderProjectDetail(data.projects);
  } catch (error) {
    const errorMessage = document.querySelector("[data-load-error]");
    if (errorMessage) errorMessage.hidden = false;
    console.error(error);
  }
}

initializeSite();
