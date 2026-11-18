/* =========================================================
   header.js — cabeçalho comum (navbar)
   Preenche o <header id="app-header"> de cada página.
   ========================================================= */
(function () {
  const header = document.getElementById("app-header");
  if (!header) return;

  // Páginas que existem no protótipo; as restantes ficam desativadas
  const links = [
    { label: "Animais" },
    { label: "Quizzes" },
    { label: "Contactos" },
    { label: "Perfil" },
    { label: "Admin", href: "index.html", active: true },
    { label: "Logout" }
  ];

  const items = links
    .map(link => {
      if (!link.href) {
        return `<li class="nav-item"><span class="nav-link disabled" title="Fora do âmbito do protótipo">${link.label}</span></li>`;
      }
      const current = link.active ? ' active" aria-current="page' : "";
      return `<li class="nav-item"><a class="nav-link${current}" href="${link.href}">${link.label}</a></li>`;
    })
    .join("");

  header.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark app-navbar" aria-label="Navegação principal">
      <a class="navbar-brand" href="index.html">
        <img src="img/animalec_line.png" alt="Animalec — página de administração" width="250" height="55">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu"
              aria-controls="main-menu" aria-expanded="false" aria-label="Abrir menu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="main-menu">
        <ul class="navbar-nav ml-auto">${items}</ul>
      </div>
    </nav>`;
})();
