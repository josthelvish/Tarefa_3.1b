/* =========================================================
   footer.js — rodapé comum
   Preenche o <footer id="app-footer"> de cada página.
   ========================================================= */
(function () {
  const footer = document.getElementById("app-footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="row">
        <section class="col-lg-4 mb-4 mb-lg-0">
          <h2>Criadores</h2>
          <p class="lead mb-0">
            <a href="mailto:ricardo.queiros@gmail.com">Ricardo Queirós</a><br>
            <a href="mailto:filipeportela@iotech.pt">Filipe Portela</a>
          </p>
        </section>
        <section class="col-lg-4 mb-4 mb-lg-0">
          <h2>Presença digital</h2>
          <a href="#" class="btn btn-outline-light btn-social mx-1" aria-label="Facebook"><i class="fab fa-fw fa-facebook-f" aria-hidden="true"></i></a>
          <a href="#" class="btn btn-outline-light btn-social mx-1" aria-label="Twitter"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i></a>
          <a href="#" class="btn btn-outline-light btn-social mx-1" aria-label="LinkedIn"><i class="fab fa-fw fa-linkedin-in" aria-hidden="true"></i></a>
        </section>
        <section class="col-lg-4">
          <h2>Sobre o Animalec</h2>
          <p class="lead mb-0">Animalec usa um tema Bootstrap com licença MIT, criado por
            <a href="https://startbootstrap.com">Start Bootstrap</a>.</p>
        </section>
      </div>
    </div>`;
})();
