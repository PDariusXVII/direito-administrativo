// modules/flashcards.js
// Gerencia a lógica e renderização dos flashcards

function renderFlashcards() {
  if (!currentTopic || !DA[currentTopic]) return;

  const d      = DA[currentTopic];
  const fcs    = d.flashcards;
  const idx    = fcIndex[currentTopic] || 0;
  const flip   = fcFlipped[currentTopic] || false;
  const fc     = fcs[idx];
  const va     = document.getElementById('view-area');

  va.innerHTML = `
    <div style="margin-bottom:20px">
      <div style="font-family:Syne,sans-serif;font-size:18px;font-weight:700;color:var(--white)">${d.icon} ${currentTopic}</div>
      <div style="font-size:12px;color:var(--muted);margin-top:4px">${fcs.length} flashcards neste tópico</div>
    </div>

    <div class="fc-area">
      <div class="fc-card" id="fc-main" onclick="flipCard()">
        <div style="text-align:center;padding:8px">
          ${!flip
            ? `<div style="font-size:10px;font-weight:700;letter-spacing:2px;color:var(--muted);margin-bottom:14px;text-transform:uppercase">Pergunta</div>
               <p style="font-family:Syne,sans-serif;font-size:16px;font-weight:700;color:var(--white);line-height:1.5">${fc.q}</p>`
            : `<div style="font-size:10px;font-weight:700;letter-spacing:2px;color:var(--acc4);margin-bottom:14px;text-transform:uppercase">Resposta</div>
               <p style="font-size:14px;color:#6ee7b7;line-height:1.6">${fc.a}</p>`
          }
        </div>
      </div>

      <p class="fc-hint">${!flip ? '👆 Clique para ver a resposta' : '👆 Clique para virar novamente'}</p>

      ${flip ? `
        <div class="fc-actions">
          <button class="fc-fail" onclick="nextFC(false)">✗ Não sabia</button>
          <button class="fc-ok"   onclick="nextFC(true)">✓ Sabia!</button>
        </div>` : ''
      }

      <div class="fc-nav">
        <button onclick="prevFC()">← Anterior</button>
        <span class="fc-counter">${idx + 1} / ${fcs.length}</span>
        <button onclick="nextFCNav()">Próximo →</button>
      </div>
    </div>`;
}

function flipCard() {
  fcFlipped[currentTopic] = !fcFlipped[currentTopic];
  renderFlashcards();
}

function nextFC(knew) {
  const fcs = DA[currentTopic].flashcards;
  if (knew && studyProgress[currentTopic] < 3) {
    studyProgress[currentTopic] = 3;
    updateSidebarProgress();
    renderSidebar(document.getElementById('search-input').value);
  }
  fcIndex[currentTopic]   = (fcIndex[currentTopic] + 1) % fcs.length;
  fcFlipped[currentTopic] = false;
  renderFlashcards();
}

function nextFCNav() {
  const fcs = DA[currentTopic].flashcards;
  fcIndex[currentTopic]   = (fcIndex[currentTopic] + 1) % fcs.length;
  fcFlipped[currentTopic] = false;
  renderFlashcards();
}

function prevFC() {
  const fcs = DA[currentTopic].flashcards;
  fcIndex[currentTopic]   = (fcIndex[currentTopic] - 1 + fcs.length) % fcs.length;
  fcFlipped[currentTopic] = false;
  renderFlashcards();
}
