// app.js
// Ponto de entrada principal — inicializa estado global e roteamento de abas

// ─── ESTADO GLOBAL ────────────────────────────────────────────────────
let currentTopic = null;
let currentTab   = 'aprender';

// Estado de progresso por tópico (0=não iniciado, 1=visto, 2=aprendeu, 3=concluído)
let studyProgress = {};

// Controle de quiz: { topico: { indiceQuestao: opcaoEscolhida } }
let quizAnswered = {};

// Controle de flashcards por tópico
let fcIndex   = {};
let fcFlipped = {};

// ─── INICIALIZAÇÃO ────────────────────────────────────────────────────
(function init() {
  const topics = Object.keys(DA);
  topics.forEach(t => {
    studyProgress[t] = 0;
    quizAnswered[t]  = {};
    fcIndex[t]       = 0;
    fcFlipped[t]     = false;
  });

  renderSidebar();
  updateSidebarProgress();
})();

// ─── ROTEAMENTO DE ABAS ───────────────────────────────────────────────
function switchTab(tab) {
  currentTab = tab;

  document.querySelectorAll('.tab').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });

  renderCurrentView();
}

function renderCurrentView() {
  // Aba de progresso não depende de tópico selecionado
  if (currentTab === 'progresso') {
    renderProgress();
    return;
  }

  // Demais abas exigem tópico selecionado
  if (!currentTopic) {
    document.getElementById('view-area').innerHTML = `
      <div class="empty">
        <div class="e-icon">⚖️</div>
        <p>Selecione um tópico na barra lateral para começar</p>
      </div>`;
    return;
  }

  // Reset de padding para a view de mapa mental
  document.getElementById('view-area').style.padding =
    currentTab === 'mapa' ? '16px' : '28px 32px';

  switch (currentTab) {
    case 'aprender':    renderAprender();    break;
    case 'mapa':        renderMapa();        break;
    case 'flashcards':  renderFlashcards();  break;
    case 'quiz':        renderQuiz();        break;
  }
}
