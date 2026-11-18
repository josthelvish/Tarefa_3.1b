/* =========================================================
   sponsors.js — páginas de SPONSORS (Patrocinadores)
   - sponsors.html     : lista, ordenação, modal "Ver", remover
   - sponsor_form.html : adicionar / editar + animais associados
   Protótipo: as alterações não são gravadas (apenas alert).
   ========================================================= */

/* ---------------- Lista ---------------- */
function initSponsorList() {
  const tableBody = document.getElementById("records-table-body");
  const cards = document.getElementById("records-cards");
  const count = document.getElementById("record-count");
  const sortHeader = document.getElementById("sort-header");
  const sortButton = document.getElementById("sort-button");

  let sponsors = SPONSORS.slice();
  let sortAscending = true;

  function actionsHtml(sponsor) {
    return `
      <a class="btn btn-outline-success btn-sm" href="sponsor_form.html?id=${sponsor._id}">
        <i class="fas fa-edit" aria-hidden="true"></i> Editar<span class="sr-only"> ${escapeHtml(sponsor.name)}</span></a>
      <button type="button" class="btn btn-outline-success btn-sm" data-action="view" data-id="${sponsor._id}">
        <i class="fas fa-search" aria-hidden="true"></i> Ver<span class="sr-only"> ${escapeHtml(sponsor.name)}</span></button>
      <button type="button" class="btn btn-outline-danger btn-sm" data-action="remove" data-id="${sponsor._id}">
        <i class="fas fa-trash-alt" aria-hidden="true"></i> Remover<span class="sr-only"> ${escapeHtml(sponsor.name)}</span></button>`;
  }

  function render() {
    sponsors.sort((a, b) =>
      sortAscending ? a.name.localeCompare(b.name, "pt") : b.name.localeCompare(a.name, "pt")
    );

    tableBody.innerHTML = sponsors
      .map(sponsor => {
        const total = getAnimalsBySponsorId(sponsor._id).length;
        const email = sponsor.contact.email
          ? `<a href="mailto:${escapeHtml(sponsor.contact.email)}">${escapeHtml(sponsor.contact.email)}</a>`
          : "—";
        return `
          <tr>
            <th scope="row">${escapeHtml(sponsor.name)}</th>
            <td>${escapeHtml(getSponsorTypeLabel(sponsor.type))}</td>
            <td>${email}</td>
            <td>${total}</td>
            <td>${activeBadgeHtml(sponsor.active)}</td>
            <td>${actionsHtml(sponsor)}</td>
          </tr>`;
      })
      .join("");

    cards.innerHTML = sponsors
      .map(sponsor => {
        const total = getAnimalsBySponsorId(sponsor._id).length;
        return `
          <article class="record-card" aria-labelledby="card-${sponsor._id}">
            <h2 id="card-${sponsor._id}">${escapeHtml(sponsor.name)}</h2>
            <p>${escapeHtml(getSponsorTypeLabel(sponsor.type))} · ${total} ${total === 1 ? "animal" : "animais"}</p>
            <p>Ativo: ${activeBadgeHtml(sponsor.active)}</p>
            <div class="record-actions">${actionsHtml(sponsor)}</div>
          </article>`;
      })
      .join("");

    count.textContent = `${sponsors.length} ${sponsors.length === 1 ? "patrocinador" : "patrocinadores"}`;
    sortHeader.setAttribute("aria-sort", sortAscending ? "ascending" : "descending");
    sortButton.querySelector("i").className = sortAscending ? "fas fa-arrow-up" : "fas fa-arrow-down";
  }

  function showDetails(sponsor) {
    const animals = getAnimalsBySponsorId(sponsor._id);
    const s = sponsor.sponsorship;
    const amount = s.amount ? `${s.amount.toLocaleString("pt-PT")} €` : "—";
    const website = sponsor.links.website
      ? `<a href="${escapeHtml(sponsor.links.website)}">${escapeHtml(sponsor.links.website)}</a>`
      : "—";
    const animalList = animals.length
      ? `<ul class="list-unstyled mb-0">${animals.map(a => `<li>${escapeHtml(a.name)} <span class="badge badge-group">${getGroupLabel(a.group)}</span></li>`).join("")}</ul>`
      : "Nenhum";

    const rows = [
      ["Nome", escapeHtml(sponsor.name)],
      ["Tipo", escapeHtml(getSponsorTypeLabel(sponsor.type))],
      ["Descrição", escapeHtml(sponsor.description) || "—"],
      ["Email", escapeHtml(sponsor.contact.email) || "—"],
      ["Telefone", escapeHtml(sponsor.contact.phone) || "—"],
      ["Localização", escapeHtml(formatLocation(sponsor.location)) || "—"],
      ["Website", website],
      ["Patrocínio", `${formatDate(s.start_date)} a ${formatDate(s.end_date)} · ${amount}`],
      ["Ativo", activeBadgeHtml(sponsor.active)],
      [`Animais (${animals.length})`, animalList]
    ];

    document.getElementById("details-modal-title").textContent = `Patrocinador: ${sponsor.name}`;
    document.getElementById("details-list").innerHTML = rows
      .map(([term, value]) => `<dt class="col-sm-4">${term}</dt><dd class="col-sm-8">${value}</dd>`)
      .join("");
    $("#details-modal").modal("show");
  }

  function removeSponsor(sponsor) {
    const linked = getAnimalsBySponsorId(sponsor._id);
    // Remove o patrocinador e retira o seu _id dos animais associados
    sponsors = sponsors.filter(s => s._id !== sponsor._id);
    linked.forEach(animal => {
      animal.sponsors = animal.sponsors.filter(id => id !== sponsor._id);
    });
    render();
    const extra = linked.length ? `\nFoi desassociado de ${linked.length} ${linked.length === 1 ? "animal" : "animais"}.` : "";
    alert(`Patrocinador «${sponsor.name}» removido.${extra}`);
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const sponsor = sponsors.find(s => s._id === button.dataset.id);
    if (!sponsor) return;
    if (button.dataset.action === "view") showDetails(sponsor);
    if (button.dataset.action === "remove") removeSponsor(sponsor);
  });

  sortButton.addEventListener("click", () => {
    sortAscending = !sortAscending;
    render();
  });

  render();
}

/* ---------------- Formulário ---------------- */
function initSponsorForm() {
  const form = document.getElementById("sponsor-form");
  const id = getIdFromUrl();
  const sponsor = id ? SPONSORS.find(s => s._id === id) : null;
  const isEdit = Boolean(sponsor);

  if (id && !sponsor) {
    alert("Patrocinador não encontrado. Vai ser criado um novo registo.");
  }

  const field = name => document.getElementById(`sponsor-${name}`);

  // Título e botão (Adicionar / Editar)
  const title = isEdit ? "Editar Patrocinador" : "Adicionar Patrocinador";
  document.getElementById("page-title").textContent = title;
  document.title = `${title} · Animalec`;
  document.getElementById("submit-label").textContent = isEdit ? "Atualizar" : "Adicionar";

  // Preencher os campos na edição
  if (isEdit) {
    field("name").value = sponsor.name;
    field("type").value = sponsor.type;
    field("description").value = sponsor.description;
    field("active").checked = sponsor.active;
    field("email").value = sponsor.contact.email;
    field("phone").value = sponsor.contact.phone;
    field("city").value = sponsor.location.city;
    field("district").value = sponsor.location.district;
    field("country").value = sponsor.location.country;
    field("logo").value = sponsor.links.logo;
    field("website").value = sponsor.links.website;
    field("start-date").value = sponsor.sponsorship.start_date;
    field("end-date").value = sponsor.sponsorship.end_date;
    field("amount").value = sponsor.sponsorship.amount;
  }

  // Pré-visualização do logótipo
  const previewImg = document.getElementById("logo-preview-img");
  const previewPlaceholder = document.getElementById("logo-preview-placeholder");
  function updatePreview() {
    const url = field("logo").value.trim();
    previewPlaceholder.textContent = (field("name").value.trim().charAt(0) || "?").toUpperCase();
    if (url && field("logo").checkValidity()) {
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
  field("logo").addEventListener("input", updatePreview);
  field("name").addEventListener("input", updatePreview);
  updatePreview();

  // Data de fim não pode ser anterior à data de início
  function validateDates() {
    const start = field("start-date").value;
    const end = field("end-date").value;
    field("end-date").setCustomValidity(
      start && end && end < start ? "A data de fim não pode ser anterior à data de início." : ""
    );
  }
  field("start-date").addEventListener("change", validateDates);
  field("end-date").addEventListener("change", validateDates);

  // ----- Componente "Animais associados" (só na edição) -----
  let associatedIds = isEdit ? getAnimalsBySponsorId(sponsor._id).map(a => a._id) : [];

  const section = document.getElementById("associated-animals");
  const list = document.getElementById("associated-list");
  const empty = document.getElementById("associated-empty");
  const select = document.getElementById("animal-select");
  const associateButton = document.getElementById("associate-button");
  const status = document.getElementById("associated-status");

  function renderAssociated() {
    const associated = ANIMALS.filter(a => associatedIds.includes(a._id));
    list.innerHTML = associated
      .map(animal => `
        <li class="chip">
          ${animalThumbHtml(animal)}
          <span class="chip-name">${escapeHtml(animal.name)}</span>
          <button type="button" class="chip-remove" data-remove-id="${animal._id}" aria-label="Remover ${escapeHtml(animal.name)}">&times;</button>
        </li>`)
      .join("");
    list.hidden = associated.length === 0;
    empty.hidden = associated.length > 0;

    // O select só mostra animais ainda não associados (sem repetições)
    const available = ANIMALS.filter(a => !associatedIds.includes(a._id));
    select.innerHTML =
      `<option value="">-- Seleciona um animal --</option>` +
      GROUPS.map(group => {
        const options = available.filter(a => a.group === group.value);
        if (!options.length) return "";
        return `<optgroup label="${group.label}">${options
          .map(a => `<option value="${a._id}">${escapeHtml(a.name)}</option>`)
          .join("")}</optgroup>`;
      }).join("");
    select.disabled = available.length === 0;
    associateButton.disabled = available.length === 0;
  }

  associateButton.addEventListener("click", () => {
    const animalId = select.value;
    if (!animalId) {
      alert("Seleciona um animal para associar.");
      select.focus();
      return;
    }
    if (associatedIds.includes(animalId)) return; // garantia extra de unicidade
    associatedIds.push(animalId);
    renderAssociated();
    status.textContent = `${ANIMALS.find(a => a._id === animalId).name} associado.`;
  });

  list.addEventListener("click", event => {
    const button = event.target.closest("[data-remove-id]");
    if (!button) return;
    const animal = ANIMALS.find(a => a._id === button.dataset.removeId);
    associatedIds = associatedIds.filter(animalId => animalId !== animal._id);
    renderAssociated();
    status.textContent = `${animal.name} removido.`;
  });

  if (isEdit) {
    section.hidden = false;
    renderAssociated();
  }

  // ----- Submeter (a validação nativa do HTML5 corre antes) -----
  form.addEventListener("submit", event => {
    event.preventDefault();
    validateDates();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = field("name").value.trim();
    const total = associatedIds.length;
    const extra = isEdit ? `\nAnimais patrocinados: ${total}.` : "";
    alert(`Patrocinador «${name}» ${isEdit ? "atualizado" : "criado"} com sucesso!${extra}`);
    window.location.href = "sponsors.html";
  });
}

/* ---------------- Arranque ---------------- */
if (document.getElementById("records-table-body")) initSponsorList();
if (document.getElementById("sponsor-form")) initSponsorForm();
