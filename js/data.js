/* =========================================================
   data.js — dados de exemplo do protótipo
   Estrutura igual ao modelo definido para a SPA:
   - Animal.sponsors : string[]  (_id de SPONSOR, sem repetições)
   - EXPERT.group    : string    (os animais do expert são os do mesmo grupo)
   ========================================================= */

const GROUPS = [
  { value: "anfibio", label: "Anfíbio" },
  { value: "ave", label: "Ave" },
  { value: "mamifero", label: "Mamífero" },
  { value: "peixe", label: "Peixe" },
  { value: "reptil", label: "Réptil" }
];

const SPONSOR_TYPES = [
  { value: "empresa", label: "Empresa" },
  { value: "ong", label: "ONG" },
  { value: "particular", label: "Particular" }
];

const ANIMALS = [
  { _id: "a01", name: "Cão", group: "mamifero", avatar: "img/avatars/cao.png", sponsors: ["s01", "s02"] },
  { _id: "a02", name: "Leão", group: "mamifero", avatar: "img/avatars/leao.png", sponsors: ["s03"] },
  { _id: "a03", name: "Macaco", group: "mamifero", avatar: "img/avatars/macaco.png", sponsors: ["s03"] },
  { _id: "a04", name: "Tigre", group: "mamifero", avatar: "img/avatars/tigre.png", sponsors: ["s01", "s03"] },
  { _id: "a05", name: "Sapo", group: "anfibio", avatar: "img/avatars/sapo.png", sponsors: [] },
  { _id: "a06", name: "Salamandra", group: "anfibio", avatar: "", sponsors: ["s04"] },
  { _id: "a07", name: "Águia", group: "ave", avatar: "", sponsors: [] },
  { _id: "a08", name: "Papagaio", group: "ave", avatar: "", sponsors: ["s02"] },
  { _id: "a09", name: "Salmão", group: "peixe", avatar: "", sponsors: [] },
  { _id: "a10", name: "Tubarão", group: "peixe", avatar: "", sponsors: ["s04"] },
  { _id: "a11", name: "Tartaruga", group: "reptil", avatar: "", sponsors: ["s04"] },
  { _id: "a12", name: "Camaleão", group: "reptil", avatar: "", sponsors: [] }
];

const SPONSORS = [
  {
    _id: "s01",
    name: "Zoo Verde",
    type: "empresa",
    description: "Parque zoológico dedicado à conservação de mamíferos.",
    contact: { email: "geral@zooverde.pt", phone: "+351 220 000 001" },
    location: { city: "Porto", district: "Porto", country: "Portugal" },
    links: { logo: "", website: "https://zooverde.example.pt" },
    sponsorship: { start_date: "2025-01-01", end_date: "2026-12-31", amount: 5000 },
    active: true
  },
  {
    _id: "s02",
    name: "BioPet",
    type: "empresa",
    description: "Marca de alimentação animal.",
    contact: { email: "contacto@biopet.pt", phone: "+351 210 000 002" },
    location: { city: "Lisboa", district: "Lisboa", country: "Portugal" },
    links: { logo: "", website: "https://biopet.example.pt" },
    sponsorship: { start_date: "2025-06-01", end_date: "2026-05-31", amount: 2500 },
    active: true
  },
  {
    _id: "s03",
    name: "Fundação Fauna",
    type: "ong",
    description: "Organização sem fins lucrativos de proteção da vida selvagem.",
    contact: { email: "info@fundacaofauna.org", phone: "+351 239 000 003" },
    location: { city: "Coimbra", district: "Coimbra", country: "Portugal" },
    links: { logo: "", website: "https://fundacaofauna.example.org" },
    sponsorship: { start_date: "2024-09-01", end_date: "2027-08-31", amount: 12000 },
    active: true
  },
  {
    _id: "s04",
    name: "Maria Santos",
    type: "particular",
    description: "Patrocinadora individual.",
    contact: { email: "maria.santos@example.pt", phone: "" },
    location: { city: "Faro", district: "Faro", country: "Portugal" },
    links: { logo: "", website: "" },
    sponsorship: { start_date: "2025-03-15", end_date: "", amount: 300 },
    active: false
  }
];

const EXPERTS = [
  {
    _id: "e01",
    name: "Ana Ribeiro",
    group: "ave",
    degree: "Doutoramento em Biologia",
    institution: "Universidade do Porto",
    description: "Investigadora em aves migratórias.",
    contact: { email: "ana.ribeiro@example.pt", phone: "+351 220 100 001" },
    location: { city: "Porto", district: "Porto", country: "Portugal" },
    links: { photo: "", website: "", orcid: "0000-0002-1825-0097" },
    active: true
  },
  {
    _id: "e02",
    name: "Rui Costa",
    group: "mamifero",
    degree: "Mestrado em Ecologia",
    institution: "Universidade de Lisboa",
    description: "Especialista em grandes mamíferos.",
    contact: { email: "rui.costa@example.pt", phone: "+351 210 100 002" },
    location: { city: "Lisboa", district: "Lisboa", country: "Portugal" },
    links: { photo: "", website: "", orcid: "" },
    active: true
  },
  {
    _id: "e03",
    name: "Sara Lopes",
    group: "reptil",
    degree: "Doutoramento em Zoologia",
    institution: "Universidade de Aveiro",
    description: "Estudo de répteis da Península Ibérica.",
    contact: { email: "sara.lopes@example.pt", phone: "" },
    location: { city: "Aveiro", district: "Aveiro", country: "Portugal" },
    links: { photo: "", website: "", orcid: "" },
    active: false
  }
];

/* ---------- Funções auxiliares partilhadas ---------- */

function getGroupLabel(value) {
  const group = GROUPS.find(g => g.value === value);
  return group ? group.label : value;
}

function getSponsorTypeLabel(value) {
  const type = SPONSOR_TYPES.find(t => t.value === value);
  return type ? type.label : value;
}

function getAnimalsBySponsorId(sponsorId) {
  return ANIMALS.filter(animal => animal.sponsors.includes(sponsorId));
}

function getAnimalsByGroup(group) {
  return ANIMALS.filter(animal => animal.group === group);
}

/* Lê o parâmetro ?id= do URL (null se não existir) */
function getIdFromUrl() {
  return new URLSearchParams(window.location.search).get("id");
}

/* Escapa texto antes de o inserir como HTML */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text == null ? "" : String(text);
  return div.innerHTML;
}

/* Miniatura de um animal: avatar se existir, senão a inicial */
function animalThumbHtml(animal) {
  if (animal.avatar) {
    return `<img class="animal-thumb" src="${animal.avatar}" alt="">`;
  }
  return `<span class="animal-thumb" aria-hidden="true">${escapeHtml(animal.name.charAt(0))}</span>`;
}

function formatLocation(location) {
  return [location.city, location.district, location.country].filter(Boolean).join(", ");
}

function formatDate(isoDate) {
  if (!isoDate) return "—";
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

function activeBadgeHtml(active) {
  return active
    ? '<span class="badge badge-success">Sim</span>'
    : '<span class="badge badge-secondary">Não</span>';
}
