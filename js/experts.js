/* =========================================================
   experts.js — páginas de EXPERTS (Especialistas)
   - experts.html     : lista, ordenação, modal "Ver", remover
   - expert_form.html : adicionar / editar + animais do grupo (só leitura)
   Regra: os animais de um expert são os animais do mesmo grupo.
   Protótipo: as alterações não são gravadas (apenas alert).
   ========================================================= */

/* ---------------- Lista ---------------- */
function initExpertList() {
  const tableBody = document.getElementById("records-table-body");
  const cards = document.getElementById("records-cards");
  const count = document.getElementById("record-count");
  const sortHeader = document.getElementById("sort-header");
  const sortButton = document.getElementById("sort-button");

  let experts = EXPERTS.slice();
  let sortAscending = true;

  function groupBadgeHtml(group) {
    return `<span class="badge badge-group">${escapeHtml(getGroupLabel(group))}</span>`;
  }

  function actionsHtml(expert) {
    return `
      <a class="btn btn-outline-success btn-sm" href="expert_form.html?id=${expert._id}">
        <i class="fas fa-edit" aria-hidden="true"></i> Editar<span class="sr-only"> ${escapeHtml(expert.name)}</span></a>
      <button type="button" class="btn btn-outline-success btn-sm" data-action="view" data-id="${expert._id}">
        <i class="fas fa-search" aria-hidden="true"></i> Ver<span class="sr-only"> ${escapeHtml(expert.name)}</span></button>
      <button type="button" class="btn btn-outline-danger btn-sm" data-action="remove" data-id="${expert._id}">
        <i class="fas fa-trash-alt" aria-hidden="true"></i> Remover<span class="sr-only"> ${escapeHtml(expert.name)}</span></button>`;
  }

  function render() {
    experts.sort((a, b) =>
      sortAscending ? a.name.localeCompare(b.name, "pt") : b.name.localeCompare(a.name, "pt")
    );

    tableBody.innerHTML = experts
      .map(expert => `
        <tr>
          <th scope="row">${escapeHtml(expert.name)}</th>
          <td>${groupBadgeHtml(expert.group)}</td>
          <td>${escapeHtml(expert.institution) || "—"}</td>
          <td>${getAnimalsByGroup(expert.group).length}</td>
          <td>${activeBadgeHtml(expert.active)}</td>
          <td>${actionsHtml(expert)}</td>
        </tr>`)
      .join("");

    cards.innerHTML = experts
      .map(expert => {
        const total = getAnimalsByGroup(expert.group).length;
        return `
          <article class="record-card" aria-labelledby="card-${expert._id}">
            <h2 id="card-${expert._id}">${escapeHtml(expert.name)}</h2>
            <p>${groupBadgeHtml(expert.group)} · ${total} ${total === 1 ? "animal" : "animais"}</p>
            <p>${escapeHtml(expert.institution) || "—"}</p>
            <p>Ativo: ${activeBadgeHtml(expert.active)}</p>
            <div class="record-actions">${actionsHtml(expert)}</div>
          </article>`;
      })
      .join("");

    count.textContent = `${experts.length} ${experts.length === 1 ? "especialista" : "especialistas"}`;
    sortHeader.setAttribute("aria-sort", sortAscending ? "ascending" : "descending");
    sortButton.querySelector("i").className = sortAscending ? "fas fa-arrow-up" : "fas fa-arrow-down";
  }

  function showDetails(expert) {
    const animals = getAnimalsByGroup(expert.group);
    const website = expert.links.website
      ? `<a href="${escapeHtml(expert.links.website)}">${escapeHtml(expert.links.website)}</a>`
      : "—";
    const orcid = expert.links.orcid
      ? `<a href="https://orcid.org/${escapeHtml(expert.links.orcid)}">${escapeHtml(expert.links.orcid)}</a>`
      : "—";
    const animalList = animals.length
      ? `<ul class="list-unstyled mb-0">${animals.map(a => `<li>${escapeHtml(a.name)}</li>`).join("")}</ul>`
      : "Nenhum";

    const rows = [
      ["Nome", escapeHtml(expert.name)],
      ["Grupo", groupBadgeHtml(expert.group)],
      ["Grau académico", escapeHtml(expert.degree) || "—"],
      ["Instituição", escapeHtml(expert.institution) || "—"],
      ["Descrição", escapeHtml(expert.description) || "—"],
      ["Email", escapeHtml(expert.contact.email) || "—"],
      ["Telefone", escapeHtml(expert.contact.phone) || "—"],
      ["Localização", escapeHtml(formatLocation(expert.location)) || "—"],
      ["Website", website],
      ["ORCID", orcid],
      ["Ativo", activeBadgeHtml(expert.active)],
      [`Animais do grupo (${animals.length})`, animalList]
    ];

    document.getElementById("details-modal-title").textContent = `Especialista: ${expert.name}`;
    document.getElementById("details-list").innerHTML = rows
      .map(([term, value]) => `<dt class="col-sm-4">${term}</dt><dd class="col-sm-8">${value}</dd>`)
      .join("");
    $("#details-modal").modal("show");
  }

  function removeExpert(expert) {
    experts = experts.filter(e => e._id !== expert._id);
    render();
    alert(`Especialista «${expert.name}» removido.`);
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const expert = experts.find(e => e._id === button.dataset.id);
    if (!expert) return;
    if (button.dataset.action === "view") showDetails(expert);
    if (button.dataset.action === "remove") removeExpert(expert);
  });

  sortButton.addEventListener("click", () => {
    sortAscending = !sortAscending;
    render();
  });

  render();
}

/* ---------------- Formulário ---------------- */
function initExpertForm() {
  const form = document.getElementById("expert-form");
  const id = getIdFromUrl();
  const expert = id ? EXPERTS.find(e => e._id === id) : null;
  const isEdit = Boolean(expert);

  if (id && !expert) {
    alert("Especialista não encontrado. Vai ser criado um novo registo.");
  }

  const field = name => document.getElementById(`expert-${name}`);

  // Título e botão (Adicionar / Editar)
  const title = isEdit ? "Editar Especialista" : "Adicionar Especialista";
  document.getElementById("page-title").textContent = title;
  document.title = `${title} · Animalec`;
  document.getElementById("submit-label").textContent = isEdit ? "Atualizar" : "Adicionar";

  // Preencher os campos na edição
  if (isEdit) {
    field("name").value = expert.name;
    field("group").value = expert.group;
    field("degree").value = expert.degree;
    field("institution").value = expert.institution;
    field("description").value = expert.description;
    field("active").checked = expert.active;
    field("email").value = expert.contact.email;
    field("phone").value = expert.contact.phone;
    field("city").value = expert.location.city;
    field("district").value = expert.location.district;
    field("country").value = expert.location.country;
    field("photo").value = expert.links.photo;
    field("website").value = expert.links.website;
    field("orcid").value = expert.links.orcid;
  }

  // Pré-visualização da foto
  const previewImg = document.getElementById("photo-preview-img");
  const previewPlaceholder = document.getElementById("photo-preview-placeholder");
  function updatePreview() {
    const url = field("photo").value.trim();
    previewPlaceholder.textContent = (field("name").value.trim().charAt(0) || "?").toUpperCase();
    if (url && field("photo").checkValidity()) {
      previewImg.src = url;
      previewImg.hidden = false;
      previewPlaceholder.hidden = true;
    } else {
      previewImg.hidden = true;
      previewPlaceholder.hidden = false;
    }
  }
  previewImg.addEventListener("error", () => {
    previewImg.hidden = true;
    previewPlaceholder.hidden = false;
  });
  field("photo").addEventListener("input", updatePreview);
  field("name").addEventListener("input", updatePreview);
  updatePreview();

  // ----- "Animais do grupo" (só leitura, só na edição) -----
  const section = document.getElementById("group-animals");
  const sectionTitle = document.getElementById("group-animals-title");
  const list = document.getElementById("group-animal-list");

  function renderGroupAnimals() {
    const group = field("group").value;
    if (!group) {
      sectionTitle.textContent = "Animais do grupo";
      list.innerHTML = '<li class="text-muted">Seleciona um grupo animal.</li>';
      return;
    }
    const animals = getAnimalsByGroup(group);
    sectionTitle.textContent = `Animais do grupo ${getGroupLabel(group)} (${animals.length})`;
    list.innerHTML = animals.length
      ? animals
          .map(animal => `
            <li>
              <figure>
                ${animalThumbHtml(animal)}
                <figcaption>${escapeHtml(animal.name)}</figcaption>
              </figure>
            </li>`)
          .join("")
      : '<li class="text-muted">Ainda não há animais neste grupo.</li>';
  }

  if (isEdit) {
    section.hidden = false;
    renderGroupAnimals();
    field("group").addEventListener("change", renderGroupAnimals);
  }

  // ----- Submeter (a validação nativa do HTML5 corre antes) -----
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = field("name").value.trim();
    const group = field("group").value;
    const total = getAnimalsByGroup(group).length;
    alert(
      `Especialista «${name}» ${isEdit ? "atualizado" : "criado"} com sucesso!\n` +
      `Grupo: ${getGroupLabel(group)} (${total} ${total === 1 ? "animal" : "animais"}).`
    );
    window.location.href = "experts.html";
  });
}

/* ---------------- Arranque ---------------- */
if (document.getElementById("records-table-body")) initExpertList();
if (document.getElementById("expert-form")) initExpertForm();
