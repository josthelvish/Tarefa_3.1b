# Testes do protótipo HTML5 — Back-office Animalec

Data: 18/11/2026 · Âmbito: Página de Administração, Patrocinadores (SPONSORS) e Especialistas (EXPERTS).

## Resumo

| Tipo de teste | Resultado |
|---|---|
| Validação HTML5 no validador oficial do W3C (Nu Html Checker) — 5 páginas | ✅ 0 erros, 0 avisos em todas |
| Testes funcionais de navegação e visualização (browser automatizado) | ✅ 81/81 verificações OK |
| Versão Mobile (390 × 844 px) | ✅ incluída nos 81 |
| Erros de JavaScript na consola | ✅ nenhum |

## 1. Validação HTML5 (W3C)

Cada página foi submetida ao [Nu Html Checker](https://validator.w3.org/nu/) do W3C. Para garantir que o texto validado é exatamente o dos ficheiros, comparou-se o tamanho e um *hash* de cada página antes do envio.

| Página | Erros | Avisos |
|---|---|---|
| `index.html` (Página de Administração) | 0 | 0 |
| `sponsors.html` | 0 | 0 |
| `sponsor_form.html` | 0 | 0 |
| `experts.html` | 0 | 0 |
| `expert_form.html` | 0 | 0 |

Problemas encontrados na primeira validação e corrigidos:

- O carácter `|` no URL do Google Fonts não é válido num URL. Passou a `%7C` (todas as páginas).
- `aria-disabled` em elementos `<div>` (cartões desativados da Página de Administração) e em links sem `href` (navbar). Foi removido; os links desativados passaram a `<span>`.

Para repetir a validação: abrir https://validator.w3.org/nu/#file, escolher **file upload** e enviar cada ficheiro `.html`.

## 2. Testes funcionais

Executados em Chrome (sem interface), em resolução Web (1440 × 900) e Mobile (390 × 844). As janelas `alert` foram aceites automaticamente e o texto foi verificado.

Notas:
- O ambiente de teste não tinha acesso à Internet. O Bootstrap e o jQuery foram servidos a partir do `node_modules` do projeto (Bootstrap 4.4.1, em vez do 4.6.2 do CDN). As fontes e os ícones Font Awesome não carregaram nesse ambiente; no browser normal são carregados pelos CDN.
- Numa vista Mobile o formato das datas depende da língua do browser.

### T01 · Página de Administração

| # | Verificação | Resultado |
|---|---|---|
| 1 | Título da página = GESTÃO DO ANIMALEC | ✅ OK |
| 2 | Cabeçalho comum injetado (navbar + logótipo) | ✅ OK |
| 3 | Rodapé comum injetado | ✅ OK |
| 4 | 6 cartões na grelha de administração | ✅ OK |
| 5 | Cartão Patrocinadores liga a sponsors.html | ✅ OK |
| 6 | Cartão Especialistas liga a experts.html | ✅ OK |
| 7 | Link ADMIN ativo na navbar | ✅ OK |

### T02 · Navegação Admin → Lista de Patrocinadores

| # | Verificação | Resultado |
|---|---|---|
| 1 | Navega para sponsors.html | ✅ OK |
| 2 | Título = GESTÃO DE PATROCINADORES | ✅ OK |
| 3 | Tabela mostra 4 patrocinadores | ✅ OK |
| 4 | Ordenado por nome (A→Z) | ✅ OK |
| 5 | Nº animais calculado a partir de animal.sponsors | ✅ OK |
| 6 | Ordenação inverte (Z→A) e aria-sort atualiza | ✅ OK |

### T03 · Patrocinadores: Ver (modal)

| # | Verificação | Resultado |
|---|---|---|
| 1 | Modal Ver abre com o patrocinador | ✅ OK |
| 2 | Modal lista os 3 animais patrocinados | ✅ OK |
| 3 | Modal fecha | ✅ OK |

### T04 · Patrocinadores: Remover

| # | Verificação | Resultado |
|---|---|---|
| 1 | Remover mostra alert com confirmação | ✅ OK |
| 2 | Linha removida da tabela (3 restantes) | ✅ OK |

### T02-T04 · Patrocinadores: erros JS

| # | Verificação | Resultado |
|---|---|---|
| 1 | Sem erros de JavaScript | ✅ OK |

### T05 · Editar Patrocinador + Animais associados

| # | Verificação | Resultado |
|---|---|---|
| 1 | Navega para sponsor_form.html?id=s01 | ✅ OK |
| 2 | Título = EDITAR PATROCINADOR | ✅ OK |
| 3 | Botão diz Atualizar | ✅ OK |
| 4 | Campos preenchidos (nome, email, tipo, montante) | ✅ OK |
| 5 | Secção Animais patrocinados visível na edição | ✅ OK |
| 6 | Chips com os 2 animais associados (Cão, Tigre) | ✅ OK |
| 7 | Select exclui animais já associados | ✅ OK |
| 8 | Associar acrescenta chip e retira do select (sem repetição) | ✅ OK |
| 9 | Remover chip volta a disponibilizar o animal no select | ✅ OK |
| 10 | Associar sem seleção avisa o utilizador | ✅ OK |
| 11 | Atualizar mostra alert e volta à lista | ✅ OK |
| 12 | Sem erros de JavaScript | ✅ OK |

### T06 · Adicionar Patrocinador + validação HTML5

| # | Verificação | Resultado |
|---|---|---|
| 1 | Título = ADICIONAR PATROCINADOR | ✅ OK |
| 2 | Secção Animais patrocinados escondida ao adicionar | ✅ OK |
| 3 | Nome obrigatório bloqueia submissão (validação nativa) | ✅ OK |
| 4 | Email inválido bloqueia submissão (type=email) | ✅ OK |
| 5 | Data de fim anterior ao início bloqueia submissão | ✅ OK |
| 6 | Adicionar mostra alert 'criado' e volta à lista | ✅ OK |
| 7 | Menu Principal volta à Página de Administração | ✅ OK |
| 8 | Cancelar volta à lista | ✅ OK |
| 9 | Sem erros de JavaScript | ✅ OK |

### T07 · Lista de Especialistas

| # | Verificação | Resultado |
|---|---|---|
| 1 | Navega para experts.html | ✅ OK |
| 2 | Título = GESTÃO DE ESPECIALISTAS | ✅ OK |
| 3 | Colunas: Nome, Grupo, Instituição, Nº Animais, Ativo, Ações (sem Especialidade) | ✅ OK |
| 4 | Nº animais derivado do grupo | ✅ OK |
| 5 | Modal Ver mostra os 4 animais do grupo | ✅ OK |
| 6 | Remover especialista (alert + 2 restantes) | ✅ OK |
| 7 | Sem erros de JavaScript | ✅ OK |

### T08 · Editar Especialista + Animais do grupo

| # | Verificação | Resultado |
|---|---|---|
| 1 | Título = EDITAR ESPECIALISTA e campos preenchidos | ✅ OK |
| 2 | Não existe campo Especialidade | ✅ OK |
| 3 | Grupo com só os 5 grupos do projeto | ✅ OK |
| 4 | Animais do grupo: 4 mamíferos, só leitura (sem botões) | ✅ OK |
| 5 | Mudar grupo atualiza a lista (Peixe, 2) | ✅ OK |
| 6 | ORCID inválido bloqueia submissão (pattern) | ✅ OK |
| 7 | Atualizar mostra alert com grupo e volta à lista | ✅ OK |
| 8 | Sem erros de JavaScript | ✅ OK |

### T09 · Adicionar Especialista

| # | Verificação | Resultado |
|---|---|---|
| 1 | Título = ADICIONAR ESPECIALISTA, sem secção Animais do grupo | ✅ OK |
| 2 | Grupo obrigatório bloqueia submissão | ✅ OK |
| 3 | Adicionar mostra alert 'criado' | ✅ OK |
| 4 | Sem erros de JavaScript | ✅ OK |

### T10 · Versão Mobile (390 px)

| # | Verificação | Resultado |
|---|---|---|
| 1 | Mobile: menu colapsado em botão ☰ | ✅ OK |
| 2 | Mobile: ☰ abre o menu em lista vertical | ✅ OK |
| 3 | Mobile: cartões admin em 2 colunas | ✅ OK |
| 4 | index.html Mobile: sem scroll horizontal | ✅ OK |
| 5 | index.html Mobile: sem erros de JavaScript | ✅ OK |
| 6 | sponsors.html Mobile: tabela escondida e cartões visíveis | ✅ OK |
| 7 | sponsors.html Mobile: botões de topo a 100% da largura | ✅ OK |
| 8 | sponsors.html Mobile: sem scroll horizontal | ✅ OK |
| 9 | sponsors.html Mobile: sem erros de JavaScript | ✅ OK |
| 10 | sponsor_form.html?id=s03 Mobile: sem scroll horizontal | ✅ OK |
| 11 | sponsor_form.html?id=s03 Mobile: sem erros de JavaScript | ✅ OK |
| 12 | experts.html Mobile: tabela escondida e cartões visíveis | ✅ OK |
| 13 | experts.html Mobile: botões de topo a 100% da largura | ✅ OK |
| 14 | experts.html Mobile: sem scroll horizontal | ✅ OK |
| 15 | experts.html Mobile: sem erros de JavaScript | ✅ OK |
| 16 | expert_form.html?id=e02 Mobile: sem scroll horizontal | ✅ OK |
| 17 | expert_form.html?id=e02 Mobile: sem erros de JavaScript | ✅ OK |

### T11 · Estrutura HTML5 (DOM renderizado)

| # | Verificação | Resultado |
|---|---|---|
| 1 | index.html: DOCTYPE HTML5, lang pt-PT, 1 h1, header/nav/main/footer, ids únicos, labels, alt, sem interativos aninhados | ✅ OK |
| 2 | sponsors.html: DOCTYPE HTML5, lang pt-PT, 1 h1, header/nav/main/footer, ids únicos, labels, alt, sem interativos aninhados | ✅ OK |
| 3 | sponsor_form.html?id=s01: DOCTYPE HTML5, lang pt-PT, 1 h1, header/nav/main/footer, ids únicos, labels, alt, sem interativos aninhados | ✅ OK |
| 4 | experts.html: DOCTYPE HTML5, lang pt-PT, 1 h1, header/nav/main/footer, ids únicos, labels, alt, sem interativos aninhados | ✅ OK |
| 5 | expert_form.html?id=e01: DOCTYPE HTML5, lang pt-PT, 1 h1, header/nav/main/footer, ids únicos, labels, alt, sem interativos aninhados | ✅ OK |

## 3. Teste manual sugerido (percurso completo)

1. Abrir `index.html` → confirmar os 6 cartões; só **Patrocinadores** e **Especialistas** abrem.
2. **Patrocinadores** → lista com 4 registos → clicar no cabeçalho **Nome** (ordem inverte).
3. **Ver** em "Fundação Fauna" → modal com 3 animais → **Fechar**.
4. **Editar** em "Zoo Verde" → chips Cão e Tigre → associar "Leão" → remover "Cão" → **Atualizar** → alert → volta à lista.
5. **Adicionar Patrocinador** → **Adicionar** sem nome (bloqueado) → preencher nome → **Adicionar** → alert.
6. **Remover** "BioPet" → alert indica 2 animais desassociados.
7. **Menu Principal** → **Especialistas** → **Editar** "Rui Costa" → 4 mamíferos → mudar o grupo para Peixe (lista passa a 2).
8. Reduzir a janela para largura de telemóvel → tabela passa a cartões; menu ☰.
