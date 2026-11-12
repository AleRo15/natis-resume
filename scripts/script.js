
/* =========================================================
   NATI'S EVENT ARCHIVE
   EVENT ARCHIVE — SIBLING PROJECT TO PIXEL ARCHIVE
========================================================= */

(() => {
  'use strict';

  /* =====================================================
     SELECTORS
  ===================================================== */

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

  const screens = [
    'intro',
    'aboutScreen',
    'menu',
    'editorScreen',
    'eventDetailScreen'
  ];

  const scoreEl = $('#score');

  let score = 8420;
  let currentScreen = 'intro';
  let activeEvent = null;

  /* =====================================================
     EVENT DATABASE
  ===================================================== */

  const events = [
    {
      id: 'abracadabra',
      number: '01',
      community: 'Divulgação Ducks',
      event: 'Abracadabra',
      date: 'OCT 28 — NOV 03, 2026',
      startDate: '2026-10-28',
      endDate: '2026-11-03',
      status: 'COMPLETED',
      statusClass: 'completed',
      role: 'EDITOR',
      profile: 'assets/images/perfil01.png',
      profileUrl: 'https://app.duckapps.com.br/c/divulgacao/u/keaawe',
      communityUrl: 'https://app.duckapps.com.br/c/divulgacao',

      contributions: [
        {
          title: 'Gift profile themes',
          type: 'PROFILE THEME DESIGN',
          folder: 'hocus pocus',
          preview: 'assets/events/abracadabra/profile-themes/preview.png',
          note: 'Profile themes created as event gifts.'
        },
        {
          title: 'Event web countdown',
          type: 'WEB / EVENT COUNTDOWN',
          folder: 'cinnamon witch',
          preview: 'assets/events/abracadabra/countdown/preview.png',
          note: 'Countdown website created for the event. Visit the website here: <a href="https://abracadabra-countdown.netlify.app/" target="_blank" rel="noopener noreferrer">Abracadabra Countdown</a>'
        }
      ]
    },

    {
      id: 'project-xiii',
      number: '02',
      community: 'Eventos & Notícias Ducks BR',
      event: 'PROJECT XIII: O chamado da meia-noite',
      date: 'NOV 01 — NOV 13, 2026',
      startDate: '2026-11-01',
      endDate: '2026-11-13',
      status: 'IN PROGRESS',
      statusClass: 'progress',
      role: 'EDITOR',
      profile: 'assets/images/perfil02.png',
      profileUrl: 'https://app.duckapps.com.br/c/eventos-noticias-ducks-br/u/m2nrdr',
      communityUrl: 'https://app.duckapps.com.br/c/eventos-noticias-ducks-br',

      contributions: [
        {
          title: 'Staff chat edits',
          type: 'CHAT GRAPHICS / STAFF',
          folder: 'event teams',
          preview: 'assets/events/project-xiii/staff-chat-edits/preview.png',
          note: 'Visual edits made for the event staff chat.'
        },
        {
          title: 'Event web countdown',
          type: 'WEB / EVENT COUNTDOWN',
          folder: 'psycho cat club',
          preview: 'assets/events/project-xiii/countdown/preview.gif',
          note: 'Countdown website created for the event. Visit the website here: <a href="https://project-xiii.netlify.app" target="_blank" rel="noopener noreferrer">Project XIII Countdown</a>'
        }
      ]
    },

    {
      id: 'vdk-under-the-snow',
      number: '03',
      community: 'VDK',
      event: 'VDK: Under the snow',
      date: 'DEC 09 — DEC 13, 2026',
      startDate: '2026-12-09',
      endDate: '2026-12-13',
      status: 'UPCOMING',
      statusClass: 'upcoming',
      role: 'EDITOR',
      profile: 'assets/images/perfil03.png',
      profileUrl: 'https://app.duckapps.com.br/c/vdk/u/b2nfvh',
      communityUrl: 'https://app.duckapps.com.br/c/vdk',

      contributions: [],

      pending: 'Event contributions will be added when the mission begins.'
    },

    {
      id: 'rpg-asako',
      number: '04',
      community: 'RPG Asako',
      event: 'Event title to be announced',
      date: 'DEC 14 — DEC 25, 2026',
      startDate: '2026-12-14',
      endDate: '2026-12-25',
      status: 'UPCOMING',
      statusClass: 'upcoming',
      role: 'EDITOR',
      profile: 'assets/images/perfil04.png',
      profileUrl: 'https://app.duckapps.com.br/c/rpg-asako/u/tbv46g',
      communityUrl: 'https://app.duckapps.com.br/c/rpg-asako',

      contributions: [],

      pending: 'The event name and contributions have not been announced yet.'
    }
  ];

  /* =====================================================
     EVENT STATUS — MONTERREY TIMEZONE
  ===================================================== */

  function getMonterreyDate() {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Monterrey',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date());

    const dateParts = {};

    parts.forEach(part => {
      if (part.type !== 'literal') {
        dateParts[part.type] = part.value;
      }
    });

    return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
  }

  function updateEventStatuses() {
    const today = getMonterreyDate();

    events.forEach(item => {

      if (today < item.startDate) {

        item.status = 'UPCOMING';
        item.statusClass = 'upcoming';

      } else if (today <= item.endDate) {

        item.status = 'IN PROGRESS';
        item.statusClass = 'progress';

      } else {

        item.status = 'COMPLETED';
        item.statusClass = 'completed';

      }

    });
  }

  /* =====================================================
     DYNAMIC MISSION COUNTERS
  ===================================================== */

  function updateMissionCounters() {
    const total = events.length.toString().padStart(2, '0');

    const introCounter = $('#introMissionCount');
    const menuCounter = $('#menuMissionCount');
    const editorCounter = $('#editorMissionCount');

    if (introCounter) {
      introCounter.textContent = total;
    }

    if (menuCounter) {
      menuCounter.textContent = total;
    }

    if (editorCounter) {
      editorCounter.textContent = `${total} / ${total}`;
    }
  }

  /* =====================================================
     CUSTOM BUTTON SOUNDS
  ===================================================== */

  const buttonSounds = {
    click: new Audio('assets/audio/click.mp3'),
    back: new Audio('assets/audio/back.mp3'),
    see: new Audio('assets/audio/see.mp3'),
    ini: new Audio('assets/audio/ini.mp3')
  };

  Object.values(buttonSounds).forEach(sound => {
    sound.preload = 'auto';
    sound.volume = 0.65;
  });

  function playButtonSound(name) {
    const original = buttonSounds[name];

    if (!original) return;

    const sound = original.cloneNode();

    sound.volume = original.volume;

    sound.play().catch(error => {
      console.warn(`Could not play sound: ${name}`, error);
    });
  }

  /* =====================================================
     BACKGROUND MUSIC
  ===================================================== */

  const backgroundMusic = new Audio('assets/audio/background.mp3');

  backgroundMusic.loop = true;
  backgroundMusic.preload = 'auto';
  backgroundMusic.volume = 0.35;

  let musicControls = null;
  let musicButton = null;
  let musicVolume = null;

  function startBackgroundMusic() {
    if (!backgroundMusic.paused) return;

    backgroundMusic.play().then(() => {
      updateMusicButton();
    }).catch(error => {
      console.warn('Could not play background music:', error);
      updateMusicButton();
    });
  }

  function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    updateMusicButton();

    if (musicControls) {
      musicControls.classList.remove('music-controls-visible');
    }
  }

  function toggleBackgroundMusic() {
    if (backgroundMusic.paused) {
      startBackgroundMusic();
    } else {
      backgroundMusic.pause();
      updateMusicButton();
    }
  }

  function updateMusicButton() {
    if (!musicButton) return;

    musicButton.textContent = backgroundMusic.paused
      ? '▶'
      : 'Ⅱ';

    musicButton.setAttribute(
      'aria-label',
      backgroundMusic.paused
        ? 'Play background music'
        : 'Pause background music'
    );

    musicButton.classList.toggle(
      'music-playing',
      !backgroundMusic.paused
    );
  }

  function createMusicControls() {
    if (musicControls) return;

    musicControls = document.createElement('div');
    musicControls.className = 'music-controls';

    musicControls.innerHTML = `
      <button
        type="button"
        class="music-toggle"
        aria-label="Play background music"
      >
        ▶
      </button>

      <input
        type="range"
        class="music-volume"
        min="0"
        max="1"
        step="0.01"
        value="0.35"
        aria-label="Music volume"
      >
    `;

    document.body.appendChild(musicControls);

    musicButton = musicControls.querySelector('.music-toggle');
    musicVolume = musicControls.querySelector('.music-volume');

    musicButton.addEventListener('click', toggleBackgroundMusic);

    musicVolume.addEventListener('input', () => {
      backgroundMusic.volume = Number(musicVolume.value);
    });

    updateMusicButton();
  }

  /* =====================================================
     SCORE
  ===================================================== */

  function addScore(amount = 10) {
    score += amount;

    if (scoreEl) {
      scoreEl.textContent = String(score).padStart(6, '0');
    }
  }

  /* =====================================================
     SCREEN NAVIGATION
  ===================================================== */

  function showScreen(id) {
    screens.forEach(screenId => {
      const element = document.getElementById(screenId);

      if (!element) return;

      const active = screenId === id;

      element.classList.toggle('screen-hidden', !active);
      element.classList.toggle('screen-visible', active);

      element.setAttribute(
        'aria-hidden',
        String(!active)
      );
    });

    const end = $('#endScreen');

    if (end) {
      end.classList.toggle(
        'end-visible',
        id === 'endScreen'
      );
    }

    currentScreen = id;

    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }

  /* INTRO → ABOUT ME */

  function startGame() {
    playButtonSound('ini');
    startBackgroundMusic();

    if (musicControls) {
      musicControls.classList.add('music-controls-visible');
    }

    showScreen('aboutScreen');
    addScore(25);
  }

  /* ABOUT ME → SELECT MISSION */

  function selectMission() {
    playButtonSound('see');
    showScreen('menu');
    addScore(10);
  }

  /* SELECT MISSION → EDITOR */

  function openEditor() {
    playButtonSound('click');
    showScreen('editorScreen');
    addScore(10);
  }

  /* =====================================================
     HTML ESCAPING
  ===================================================== */

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }

  /* =====================================================
     EVENT CARDS
     WITHOUT PROFILE IMAGES
  ===================================================== */

  function makeEventCard(item) {
    const card = document.createElement('article');

    card.className = `event-card ${item.statusClass}`;

    card.innerHTML = `
      <div class="event-number">
        ${escapeHTML(item.number)}
      </div>

      <div class="event-identity">

        <div class="event-status">
          [ ${escapeHTML(item.status)} ]
        </div>

        <h3>${escapeHTML(item.event)}</h3>

        <p>
          ${escapeHTML(item.community)}
          <span>//</span>
          ${escapeHTML(item.date)}
        </p>

        <small>
          POSITION: ${escapeHTML(item.role)}
        </small>

      </div>

      <button
        class="stage-button event-enter"
        type="button"
      >
        INSPECT <span>▶</span>
      </button>
    `;

    card.querySelector('.event-enter').addEventListener(
      'click',
      () => {
        openEvent(item.id);
      }
    );

    card.addEventListener('click', event => {
      if (!event.target.closest('button')) {
        openEvent(item.id);
      }
    });

    return card;
  }

  /* =====================================================
     RENDER EVENT LIST
  ===================================================== */

  function renderEvents() {
    const list = $('#eventList');

    if (!list) return;

    list.innerHTML = '';

    events.forEach(item => {
      list.appendChild(makeEventCard(item));
    });

    updateMissionCounters();
  }

  /* =====================================================
     CONTRIBUTION CARDS
  ===================================================== */

  function renderContribution(item, contribution) {
    const tile = document.createElement('article');

    tile.className = 'contribution-card';

    tile.innerHTML = `
      <div
        class="contribution-preview"
        data-empty-label="ADD YOUR WORK IMAGE"
      >

        <img
          class="contribution-image"
          src="${escapeHTML(contribution.preview || '')}"
          alt="${escapeHTML(contribution.title)} preview"
        >

        <div class="preview-placeholder">
          <div class="preview-cross">＋</div>
          <span>ADD PREVIEW IMAGE</span>
        </div>

      </div>

      <div class="contribution-meta">

        <span class="contribution-type">
          ${escapeHTML(contribution.type)}
        </span>

        <h4>${escapeHTML(contribution.title)}</h4>

        <p>${contribution.note || ''}</p>

        <code>${escapeHTML(contribution.folder)}</code>

      </div>
    `;

    const preview = tile.querySelector('.contribution-image');
    const previewBox = tile.querySelector('.contribution-preview');

    preview.addEventListener('load', () => {
      previewBox.classList.add('has-image');
    });

    preview.addEventListener('error', () => {
      preview.remove();
    });

    previewBox.addEventListener('click', () => {
      if (
        preview.isConnected &&
        preview.complete &&
        preview.naturalWidth > 0
      ) {
        openModal(
          contribution.preview,
          contribution.title,
          contribution.type,
          contribution.note
        );
      }
    });

    return tile;
  }

  /* =====================================================
     INSPECT EVENT
  ===================================================== */

  function openEvent(id) {
    const item = events.find(event => event.id === id);

    if (!item) return;

    playButtonSound('click');

    activeEvent = item;

    const detailStage = $('#detailStage');
    const detailTitle = $('#detailTitle');
    const detailStatus = $('#detailStatus');
    const root = $('#eventDetail');

    if (!root) {
      console.error('Missing #eventDetail element.');
      return;
    }

    if (detailStage) {
      detailStage.textContent =
        `STAGE ${item.number} // MISSION DATA`;
    }

    if (detailTitle) {
      detailTitle.textContent = item.event;
    }

    if (detailStatus) {
      detailStatus.innerHTML =
        `STATUS <span>${escapeHTML(item.status)}</span>`;
    }

    root.innerHTML = `
      <section class="mission-overview">

        <div class="mission-profile">

          <div class="mission-profile-frame">

            <img
              src="${escapeHTML(item.profile)}"
              alt="${escapeHTML(item.community)} profile"
            >

            <div class="mission-profile-fallback">
              PLAYER<br>${escapeHTML(item.number)}
            </div>

          </div>

          <span>COMMUNITY PROFILE</span>

        </div>

        <div class="mission-data">

          <div class="panel-kicker">
            ▶ MISSION BRIEFING
          </div>

          <h3>${escapeHTML(item.community)}</h3>

          <div class="mission-row">
            <span>EVENT</span>
            <strong>${escapeHTML(item.event)}</strong>
          </div>

          <div class="mission-row">
            <span>DATE</span>
            <strong>${escapeHTML(item.date)}</strong>
          </div>

          <div class="mission-row">
            <span>POSITION</span>
            <strong>${escapeHTML(item.role)}</strong>
          </div>

          <div class="mission-row">
            <span>STATUS</span>
            <strong class="${escapeHTML(item.statusClass)}">
              ${escapeHTML(item.status)}
            </strong>
          </div>

          <div class="mission-links">

            <a
              href="${escapeHTML(item.profileUrl)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              PLAYER PROFILE
            </a>

            <a
              href="${escapeHTML(item.communityUrl)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              EVENT COMMUNITY
            </a>

          </div>

        </div>

      </section>

      <section class="contribution-section">

        <div class="section-heading">

          <span class="stage-number">
            MISSION OUTPUT // CREATIVE LOG
          </span>

          <h3>MY CONTRIBUTIONS</h3>

        </div>

        <div
          class="contribution-grid"
          id="contributionGrid"
        ></div>

      </section>

      ${
        item.pending
          ? `
            <div class="pending-message">
              <span>◈ MISSION PENDING</span>
              <p>${escapeHTML(item.pending)}</p>
            </div>
          `
          : ''
      }

      <div class="detail-footnote">
        NATI STUDIO
        // CLICK THE PREVIEW TO VIEW IT IN HIGH QUALITY
      </div>
    `;

    /* Profile image fallback */

    const profile = root.querySelector('.mission-profile img');

    if (profile) {
      profile.addEventListener('error', () => {
        profile.style.display = 'none';

        const fallback = root.querySelector(
          '.mission-profile-fallback'
        );

        if (fallback) {
          fallback.style.display = 'grid';
        }
      });
    }

    /* Contributions */

    const grid = $('#contributionGrid', root);

    if (grid) {
      if (item.contributions.length) {

        item.contributions.forEach(contribution => {
          grid.appendChild(
            renderContribution(item, contribution)
          );
        });

      } else {

        grid.innerHTML = `
          <div class="empty-output">
            NO CONTRIBUTION DATA AVAILABLE YET
          </div>
        `;

      }
    }

    showScreen('eventDetailScreen');
    addScore(15);
  }

  /* =====================================================
     IMAGE MODAL
  ===================================================== */

  function openModal(src, title, type, message) {
    const modal = $('#imageModal');
    const modalImage = $('#modalImage');

    if (!modal || !modalImage) return;

    modalImage.src = src;

    $('#modalFile').textContent = title.toUpperCase();
    $('#modalAssetName').textContent = title.toUpperCase();
    $('#modalAssetType').textContent = type;
    $('#modalMessage').innerHTML = message || '';

    modal.classList.add('active');

    modal.setAttribute(
      'aria-hidden',
      'false'
    );
  }

  function closeModal() {
    const modal = $('#imageModal');
    const modalImage = $('#modalImage');

    if (!modal) return;

    modal.classList.remove('active');

    modal.setAttribute(
      'aria-hidden',
      'true'
    );

    if (modalImage) {
      modalImage.src = '';
    }
  }

  /* =====================================================
     NAVIGATION BUTTONS
  ===================================================== */

  $('#startBtn')?.addEventListener('click', startGame);

  $('#selectMissionBtn')?.addEventListener(
    'click',
    selectMission
  );

  $('#restartBtn')?.addEventListener('click', () => {
    playButtonSound('back');
    closeModal();
    showScreen('intro');
  });

  $('#endBtn')?.addEventListener('click', () => {
    stopBackgroundMusic();
    showScreen('endScreen');
  });

  $$('[data-open="editor"]').forEach(button => {
    button.addEventListener('click', openEditor);
  });

  $$('[data-back]').forEach(button => {
    button.addEventListener('click', () => {
      const destination = button.dataset.back;

      if (destination) {
        playButtonSound('back');
        showScreen(destination);
      }
    });
  });

  $('#eventDetailBack')?.addEventListener('click', () => {
    playButtonSound('back');
    showScreen('editorScreen');
  });

  /* =====================================================
     MODAL CONTROLS
  ===================================================== */

  $('#closeModal')?.addEventListener('click', closeModal);

  $$('[data-close-modal]').forEach(element => {
    element.addEventListener('click', closeModal);
  });

  $('#modalImage')?.addEventListener('error', () => {
    const message = $('#modalMessage');

    if (message) {
      message.textContent =
        'IMAGE FILE NOT FOUND. CHECK THE ASSET PATH.';
    }
  });

  /* =====================================================
     KEYBOARD NAVIGATION
  ===================================================== */

  document.addEventListener('keydown', event => {

    if (event.key === 'Escape') {

      if ($('#imageModal')?.classList.contains('active')) {
        closeModal();
        return;
      }

      if (currentScreen === 'eventDetailScreen') {
        playButtonSound('back');
        showScreen('editorScreen');

      } else if (currentScreen === 'editorScreen') {
        playButtonSound('back');
        showScreen('menu');

      } else if (currentScreen === 'menu') {
        playButtonSound('back');
        showScreen('aboutScreen');

      } else if (currentScreen === 'aboutScreen') {
        playButtonSound('back');
        showScreen('intro');
      }
    }

    if (
      event.key === 'Enter' &&
      currentScreen === 'intro'
    ) {
      startGame();
    }

    if (
      event.key === 'Enter' &&
      currentScreen === 'aboutScreen'
    ) {
      selectMission();
    }

    if (
      event.key === 'Enter' &&
      currentScreen === 'eventDetailScreen' &&
      activeEvent
    ) {
      playButtonSound('click');
    }

  });

  /* =====================================================
     PIXEL CURSOR
     Single cursor system — no duplicate variables
  ===================================================== */

  const pixelCursor = $('#pixelCursor');

  if (pixelCursor) {

    pixelCursor.style.pointerEvents = 'none';

    if (window.matchMedia('(pointer: fine)').matches) {

      document.addEventListener('pointermove', event => {
        pixelCursor.style.left = `${event.clientX}px`;
        pixelCursor.style.top = `${event.clientY}px`;
      });

      document.addEventListener('pointerover', event => {
        if (
          event.target.closest(
            'button, a, .event-card, .contribution-preview'
          )
        ) {
          document.body.classList.add('cursor-hover');
        }
      });

      document.addEventListener('pointerout', event => {
        const interactive = event.target.closest(
          'button, a, .event-card, .contribution-preview'
        );

        const nextInteractive = event.relatedTarget?.closest?.(
          'button, a, .event-card, .contribution-preview'
        );

        if (interactive && !nextInteractive) {
          document.body.classList.remove('cursor-hover');
        }
      });

    } else {

      pixelCursor.style.display = 'none';

    }
  }

  /* =====================================================
     PARTICLES
  ===================================================== */

  const canvas = $('#particles');
  const ctx = canvas?.getContext('2d');

  let particles = [];

  function resizeCanvas() {
    if (!canvas || !ctx) return;

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    particles = Array.from(
      {
        length: Math.min(
          65,
          Math.floor(window.innerWidth / 18)
        )
      },
      () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.35 + 0.08,
        alpha: Math.random() * 0.55 + 0.12
      })
    );
  }

  function drawParticles() {
    if (!ctx || !canvas) return;

    ctx.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

    particles.forEach(particle => {

      particle.y -= particle.speed;

      if (particle.y < -4) {
        particle.y = window.innerHeight + 4;
        particle.x = Math.random() * window.innerWidth;
      }

      ctx.fillStyle =
        `rgba(0, 246, 255, ${particle.alpha})`;

      ctx.fillRect(
        particle.x,
        particle.y,
        particle.size,
        particle.size
      );

    });

    requestAnimationFrame(drawParticles);
  }

  /* =====================================================
     INITIALIZE
  ===================================================== */

  function initialize() {

    // Calculate event statuses using Monterrey's timezone.
    // This runs once when the page loads.

    updateEventStatuses();

    updateMissionCounters();

    renderEvents();

    createMusicControls();

    if (canvas && ctx) {
      resizeCanvas();

      window.addEventListener(
        'resize',
        resizeCanvas
      );

      drawParticles();
    }

    showScreen('intro');
  }

  initialize();

})();
