/* ============================================================
   味语 WeiYu — 应用逻辑
   单文件：状态管理 / 路由 / 渲染 / 激励机制 / localStorage
   ============================================================ */
(function () {
  'use strict';

  const STORAGE_KEY = 'weiyu-state-v1';
  const XP_PER_LEVEL = 100;

  /* ----------------------------- 状态 ----------------------------- */
  const defaultState = () => ({
    xp: 0,
    targetLang: 'en',
    incentive: true,
    cooked: {},          // itemId -> 次数
    lessonsDone: {},     // lessonId -> true
    learnedVocab: [],    // 已学过的单词 id
    quizPassed: 0,
    quizPerfect: 0,
    notes: {},           // itemId -> 备注文本
    custom: []           // 用户自定义菜谱
  });

  let state = load();
  let currentView = 'home';

  const ui = {
    recipesFilter: 'all', recipesQuery: '',
    cocktailsFilter: 'all', cocktailsQuery: '',
    learnPhase: 'list',       // list | flash | quiz
    currentLesson: null,
    flashIndex: 0, flashFlipped: false,
    quiz: null,
    editingCustom: null,      // 'new' 或 custom id
    openItemId: null
  };

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return Object.assign(defaultState(), parsed);
    } catch (e) {
      return defaultState();
    }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  /* ----------------------------- 工具 ----------------------------- */
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s)
    .replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // 取目标语言字段，回退 en -> zh
  function t(field) {
    if (!field) return '';
    return field[state.targetLang] ?? field.en ?? field.zh ?? '';
  }
  function levelFromXp(xp) { return 1 + Math.floor(xp / XP_PER_LEVEL); }
  function xpProgress(xp) { return xp % XP_PER_LEVEL; }
  function isUnlocked(item) { return !state.incentive || state.xp >= (item.unlockXp || 0); }
  function allItems() { return DATA.recipes.concat(DATA.cocktails); }
  function findItem(id) {
    return allItems().find((x) => x.id === id) || (state.custom || []).find((x) => x.id === id) || null;
  }
  function kindOf(id) { return id.startsWith('c-') ? 'cocktail' : 'recipe'; }

  function uniqueSortedGates() {
    const set = new Set();
    allItems().forEach((it) => { if (it.unlockXp > 0) set.add(it.unlockXp); });
    return Array.from(set).sort((a, b) => a - b);
  }

  /* ----------------------------- XP / 激励 ----------------------------- */
  function addXp(n, reason, anchorEl) {
    if (!n) return;
    const oldLevel = levelFromXp(state.xp);
    state.xp += n;
    save();
    floatXp('+' + n, anchorEl);
    updateXpUI();
    const newLevel = levelFromXp(state.xp);
    if (newLevel > oldLevel) {
      state.level = newLevel; save();
      showLevelUp(newLevel);
    }
    // 解锁检测
    const newly = allItems().filter((it) => it.unlockXp > 0 && state.xp >= it.unlockXp && state.xp - n < it.unlockXp);
    if (newly.length) {
      toast(`解锁了 ${newly.length} 个新内容！去看看吧`, 'good');
      if (currentView === 'recipes' || currentView === 'cocktails' || currentView === 'rewards') render();
    }
    checkAchievements();
  }

  function checkAchievements() {
    const got = (id) => state.achievements && state.achievements[id];
    if (!state.achievements) state.achievements = {};
    const uniqueCooked = Object.keys(state.cooked).filter((k) => state.cooked[k] > 0);
    const cookRecipes = uniqueCooked.filter((k) => k.startsWith('r-')).length;
    const cookCocktails = uniqueCooked.filter((k) => k.startsWith('c-')).length;
    const checks = {
      'a-first-cook': uniqueCooked.length >= 1,
      'a-chef-5': cookRecipes >= 5,
      'a-bartender': cookCocktails >= 1,
      'a-vocab-10': state.learnedVocab.length >= 10,
      'a-quiz-master': state.quizPerfect >= 3,
      'a-xp-500': state.xp >= 500
    };
    let changed = false;
    Object.keys(checks).forEach((id) => {
      if (checks[id] && !state.achievements[id]) {
        state.achievements[id] = true; changed = true;
        const a = DATA.achievements.find((x) => x.id === id);
        if (a) setTimeout(() => toast(`🏆 解锁成就：${a.title.zh}`, 'good'), 400);
      }
    });
    if (changed) { save(); if (currentView === 'rewards') render(); }
  }

  /* ----------------------------- Toast / 浮动 / 升级 ----------------------------- */
  function toast(msg, type) {
    const root = $('toast-root');
    const el = document.createElement('div');
    el.className = 'toast' + (type ? ' toast--' + type : '');
    el.textContent = msg;
    root.appendChild(el);
    setTimeout(() => { el.classList.add('is-out'); setTimeout(() => el.remove(), 320); }, 2200);
  }

  function floatXp(text, anchorEl) {
    const root = $('float-root');
    const el = document.createElement('div');
    el.className = 'float-xp';
    el.textContent = text;
    let x, y;
    const anchor = anchorEl || (document.querySelector('.xp-ring__lvl')?.offsetParent ? $('xp-ring-sidebar') : null);
    if (anchor && anchor.getBoundingClientRect) {
      const r = anchor.getBoundingClientRect();
      x = r.left + r.width / 2; y = r.top;
    } else {
      x = window.innerWidth / 2; y = window.innerHeight / 2;
    }
    el.style.left = (x - 20) + 'px';
    el.style.top = (y - 10) + 'px';
    root.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  function showLevelUp(lvl) {
    let el = document.querySelector('.levelup');
    if (!el) {
      el = document.createElement('div');
      el.className = 'levelup';
      el.innerHTML = `<div class="levelup__card"><div class="levelup__star">⭐</div><h2>升级到 Lv.${lvl}</h2><p>继续学习，解锁更多菜谱与配方</p></div>`;
      document.body.appendChild(el);
    } else {
      el.querySelector('h2').textContent = `升级到 Lv.${lvl}`;
    }
    requestAnimationFrame(() => el.classList.add('is-show'));
    setTimeout(() => { el.classList.remove('is-show'); }, 1600);
  }

  /* ----------------------------- XP UI ----------------------------- */
  function updateXpUI() {
    const lvl = levelFromXp(state.xp);
    const prog = xpProgress(state.xp);
    const lvlEl = $('xp-lvl-sidebar'), numEl = $('xp-num-sidebar'), fillEl = $('xp-fill-sidebar');
    if (lvlEl) lvlEl.textContent = 'Lv.' + lvl;
    if (numEl) numEl.textContent = state.xp + ' XP';
    if (fillEl) fillEl.style.width = (prog / XP_PER_LEVEL * 100) + '%';
  }

  /* ----------------------------- 路由 ----------------------------- */
  const TITLES = { home: '首页', recipes: '菜谱', cocktails: '调酒', learn: '学习', kitchen: '我的厨房', rewards: '成就激励' };

  function go(view) {
    currentView = view;
    if (view === 'learn') { ui.learnPhase = 'list'; ui.currentLesson = null; ui.quiz = null; }
    updateNav();
    render();
    closeMobileSidebar();
    const root = $('view-root');
    if (root) root.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function updateNav() {
    document.querySelectorAll('.nav__item, .tabbar__item').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.view === currentView);
    });
    $('page-title').textContent = TITLES[currentView] || '';
  }
  function render() {
    const root = $('view-root');
    root.innerHTML = renderers[currentView]();
    bindViewInputs();
    updateXpUI();
  }

  const renderers = {
    home: renderHome,
    recipes: () => renderCatalog('recipe'),
    cocktails: () => renderCatalog('cocktail'),
    learn: renderLearn,
    kitchen: renderKitchen,
    rewards: renderRewards
  };

  /* ----------------------------- 首页 ----------------------------- */
  function renderHome() {
    const cookedCount = Object.keys(state.cooked).filter((k) => state.cooked[k] > 0).length;
    const doneLessons = Object.keys(state.learnedVocab).length ? state.learnedVocab.length : 0;
    const unlockedCount = allItems().filter(isUnlocked).length;
    const lvl = levelFromXp(state.xp);

    const featuredRecipes = DATA.recipes.filter(isUnlocked).slice(0, 3);
    const featuredCocktails = DATA.cocktails.filter(isUnlocked).slice(0, 2);
    const nextLesson = DATA.lessons.find((l) => !state.lessonsDone[l.id]) || DATA.lessons[0];

    return `
      <section class="hero">
        <div class="hero__copy">
          <span class="hero__kicker">🌶️ 语言 + 美食 · 沉浸式学习</span>
          <h1>在餐桌上<em>学一门语言</em><br/>用菜谱记住单词</h1>
          <p class="hero__sub">浏览菜谱、调制饮品，顺便把英语和日语融进每一次切菜与烹饪。达成学习目标，解锁更多独家菜谱与配方。</p>
          <div class="hero__cta">
            <button class="btn btn--primary" data-view-go="recipes">开始探索菜谱 →</button>
            <button class="btn btn--learn" data-view-go="learn">背几个单词</button>
          </div>
        </div>
        <div class="hero__art" aria-hidden="true"></div>
      </section>

      <div class="stats">
        <div class="stat stat--a"><div class="stat__label">当前等级</div><div class="stat__num">Lv.${lvl}</div><div class="stat__hint">距离下一级 ${XP_PER_LEVEL - xpProgress(state.xp)} XP</div></div>
        <div class="stat stat--b"><div class="stat__label">累计经验</div><div class="stat__num">${state.xp}</div><div class="stat__hint">XP · 做饭/学习都能赚</div></div>
        <div class="stat stat--c"><div class="stat__label">已解锁内容</div><div class="stat__num">${unlockedCount}<span style="font-size:16px;color:var(--ink-3)">/${allItems().length}</span></div><div class="stat__hint">菜谱 + 调酒配方</div></div>
        <div class="stat stat--d"><div class="stat__label">已学单词</div><div class="stat__num">${state.learnedVocab.length}</div><div class="stat__hint">做过 ${cookedCount} 道菜</div></div>
      </div>

      <div class="split">
        <div>
          <div class="section-head" style="margin-top:30px">
            <h2>🍳 今日推荐菜谱</h2>
            <button class="link" data-view-go="recipes">查看全部 →</button>
          </div>
          <div class="grid">${featuredRecipes.map(itemCard).join('')}</div>
        </div>
        <div>
          <div class="section-head" style="margin-top:30px">
            <h2>🍸 来一杯</h2>
            <button class="link" data-view-go="cocktails">全部调酒 →</button>
          </div>
          <div class="grid">${featuredCocktails.map(itemCard).join('')}</div>
          <div class="section-head" style="margin-top:30px">
            <h2>📚 继续学习</h2>
            <button class="link" data-view-go="learn">全部课程 →</button>
          </div>
          ${nextLesson ? lessonCard(nextLesson) : ''}
        </div>
      </div>
    `;
  }

  /* ----------------------------- 目录页（菜谱 / 调酒） ----------------------------- */
  function renderCatalog(kind) {
    const list = kind === 'recipe' ? DATA.recipes : DATA.cocktails;
    const filter = kind === 'recipe' ? ui.recipesFilter : ui.cocktailsFilter;
    const query = (kind === 'recipe' ? ui.recipesQuery : ui.cocktailsQuery).trim().toLowerCase();
    const cuisines = ['all', ...new Set(list.map((x) => x.cuisine))];

    let filtered = list;
    if (filter !== 'all') filtered = filtered.filter((x) => x.cuisine === filter || x.category === filter);
    if (query) {
      filtered = filtered.filter((x) =>
        (x.name.zh + x.name.en + x.name.ja + ' ' + (x.tags || []).join(' ')).toLowerCase().includes(query)
      );
    }

    const lockedHint = state.incentive
      ? `<span class="pill pill--lock">🔒 激励模式：部分内容需累积 XP 解锁</span>`
      : `<span class="pill pill--learn">✨ 自由模式：全部内容已开放</span>`;

    const chips = cuisines.map((c) => {
      const label = c === 'all' ? (kind === 'recipe' ? '全部' : '全部') : c;
      return `<button class="chip ${filter === c ? 'is-active' : ''}" data-catalog-filter="${kind}:${c}">${label}</button>`;
    }).join('');

    const cards = filtered.map(itemCard).join('') || emptyBlock('没有找到匹配的内容', '试试换个关键词或分类');

    return `
      <div class="toolbar">
        <div class="search"><input id="search-${kind}" placeholder="搜索${kind === 'recipe' ? '菜谱' : '调酒'}名称、标签…" value="${esc(query)}" /></div>
        <div class="chiprow">${chips}</div>
        ${lockedHint}
      </div>
      <div class="grid">${cards}</div>
    `;
  }

  function itemCard(item) {
    const unlocked = isUnlocked(item);
    const cooked = state.cooked[item.id] > 0;
    const diff = ['', '入门', '进阶', '挑战'][item.difficulty] || '';
    return `
      <article class="rcard ${unlocked ? '' : 'is-locked'}" data-open="${item.id}">
        <div class="rcard__art" style="background:${item.color}">
          <span>${item.emoji}</span>
          <div class="rcard__tags">
            <span class="pill">${item.cuisine || item.category || ''}</span>
            ${cooked ? '<span class="pill pill--learn">✓ 做过</span>' : ''}
          </div>
          ${unlocked ? '' : `<div class="rcard__lock"><span class="pill pill--lock">🔒 ${item.unlockXp} XP</span></div>`}
        </div>
        <div class="rcard__body">
          <div class="rcard__name">${esc(item.name.zh)}<small>${esc(t(item.name))}</small></div>
          <div class="rcard__meta">
            <span>⏱ <b>${item.time}分</b></span>
            <span>📊 <b>${diff}</b></span>
            <span class="rcard__xp" style="margin-left:auto">+${item.xpReward} XP</span>
          </div>
        </div>
      </article>
    `;
  }

  /* ----------------------------- 学习 ----------------------------- */
  function renderLearn() {
    if (ui.learnPhase === 'flash') return renderFlash();
    if (ui.learnPhase === 'quiz') return renderQuiz();
    // list
    const basic = DATA.lessons.filter((l) => l.group === 'basic');
    const food = DATA.lessons.filter((l) => l.group !== 'basic');
    return `
      <div class="section-head">
        <div>
          <h2>把语言煮进味道里</h2>
          <p>从日常基础到餐桌词汇，用抽认卡记住、测验巩固。切换目标语言，英语和日语都能学。完成课程即可获得 XP。</p>
        </div>
        <span class="pill pill--learn">目标语言：${state.targetLang === 'en' ? 'English' : '日本語'}</span>
      </div>
      <div class="section-head" style="margin-top:6px">
        <div><h2>🌱 基础语言</h2><p>日常会话最常用的句子与表达，从零开口</p></div>
      </div>
      <div class="lesson-grid">${basic.map(lessonCard).join('')}</div>
      <div class="section-head" style="margin-top:30px">
        <div><h2>🍳 美食语言</h2><p>围绕餐桌的食材、动作与味道词汇</p></div>
      </div>
      <div class="lesson-grid">${food.map(lessonCard).join('')}</div>
      <div class="section-head">
        <div><h2>🎯 综合测验</h2><p>从全部词库随机抽题，检验你的学习成果。</p></div>
      </div>
      <div class="card" style="padding:24px;display:flex;align-items:center;gap:18px;flex-wrap:wrap">
        <div style="font-size:40px">🧠</div>
        <div style="flex:1;min-width:200px">
          <div style="font-family:var(--font-display);font-size:18px;font-weight:600">5 题快速测验</div>
          <div style="font-size:13px;color:var(--ink-2)">随机抽题 · 答对 80% 即通过并获得 XP</div>
        </div>
        <button class="btn btn--learn" data-action="start-quiz">开始测验</button>
      </div>
    `;
  }

  function lessonCard(lesson) {
    const done = !!state.lessonsDone[lesson.id];
    return `
      <article class="lcard" data-lesson="${lesson.id}">
        <div class="lcard__top">
          <div class="lcard__icon" style="background:${lesson.color}">${lesson.icon}</div>
          <div>
            <div class="lcard__title">${esc(lesson.title.zh)}<small>${esc(t(lesson.title))}</small></div>
          </div>
        </div>
        <div class="lcard__desc">${esc(lesson.desc.zh)}</div>
        <div class="vocab-row">${lesson.vocabIds.slice(0, 5).map((v) => `<span class="vocab-chip">${esc(DATA.vocab[v]?.[state.targetLang] || v)}</span>`).join('')}${lesson.vocabIds.length > 5 ? `<span class="pill">+${lesson.vocabIds.length - 5}</span>` : ''}</div>
        <div class="lcard__count">${lesson.vocabIds.length} 个单词 · 含抽认卡 + 测验</div>
        ${done ? '<div class="lcard__done"><span class="pill pill--learn">✓ 已完成</span></div>' : ''}
      </article>
    `;
  }

  function renderFlash() {
    const lesson = ui.currentLesson;
    if (!lesson) { ui.learnPhase = 'list'; return renderLearn(); }
    const ids = lesson.vocabIds;
    const idx = Math.min(ui.flashIndex, ids.length - 1);
    const v = DATA.vocab[ids[idx]];
    const otherLang = state.targetLang === 'en' ? 'ja' : 'en';
    return `
      <div class="section-head">
        <div><h2>${esc(lesson.title.zh)} · 抽认卡</h2><p>点击卡片翻面 · 键盘 ← → 切换 · 空格翻面</p></div>
        <button class="btn btn--ghost btn--sm" data-action="back-learn">← 返回课程</button>
      </div>
      <div class="flash-wrap">
        <div class="flash ${ui.flashFlipped ? 'is-flipped' : ''}" data-action="flip">
          <div class="flash__face flash__front">
            <div class="flash__word">${esc(v[state.targetLang])}</div>
            <div class="flash__pron">${esc(v.pron?.[state.targetLang] || '')}</div>
            <div class="flash__hint">点击查看释义</div>
          </div>
          <div class="flash__face flash__back">
            <div class="flash__zh">${esc(v.zh)}</div>
            <div class="flash__orig">${esc(v[otherLang])}</div>
            <div class="flash__hint">再点一次翻回</div>
          </div>
        </div>
      </div>
      <div class="flash-nav">
        <button class="btn btn--ghost btn--sm" data-action="flash-prev">← 上一个</button>
        <span class="flash-progress">${idx + 1} / ${ids.length}</span>
        <button class="btn btn--ghost btn--sm" data-action="flash-next">下一个 →</button>
      </div>
      <div style="text-align:center;margin-top:18px">
        ${idx === ids.length - 1
          ? `<button class="btn btn--learn" data-action="finish-lesson">完成课程 · +30 XP</button>`
          : `<button class="btn btn--ghost btn--sm" data-action="start-quiz-lesson">用本课单词测验</button>`}
      </div>
    `;
  }

  function renderQuiz() {
    const q = ui.quiz;
    if (!q || q.i >= q.questions.length) return renderQuizResult();
    const cur = q.questions[q.i];
    const v = DATA.vocab[cur.vocabId];
    const prompt = cur.promptLang === 'target' ? v[state.targetLang] : v.zh;
    const promptLabel = cur.promptLang === 'target' ? '这个词的中文意思是？' : `对应的${state.targetLang === 'en' ? '英文' : '日文'}是？`;
    const opts = cur.options.map((opt, i) => {
      let cls = 'quiz-opt';
      if (q.answered) {
        if (i === cur.answer) cls += ' is-correct';
        else if (i === q.picked) cls += ' is-wrong';
      }
      return `<button class="${cls}" data-quiz-opt="${i}" ${q.answered ? 'disabled' : ''}>${esc(opt)}</button>`;
    }).join('');
    const pct = (q.i / q.questions.length) * 100;
    return `
      <div class="section-head">
        <div><h2>🎯 测验</h2><p>${q.fromLesson ? `来自「${q.fromLesson.title.zh}」` : '综合词库'} · 共 ${q.questions.length} 题</p></div>
        <button class="btn btn--ghost btn--sm" data-action="back-learn">← 退出</button>
      </div>
      <div class="quiz-card">
        <div class="quiz-bar"><span style="width:${pct}%"></span></div>
        <div class="quiz-q">${esc(prompt)}<small>${promptLabel} · 第 ${q.i + 1} / ${q.questions.length} 题</small></div>
        <div class="quiz-opts">${opts}</div>
        <div class="quiz-foot">
          <span class="pill pill--gold">当前得分 ${q.score}</span>
          ${q.answered ? '<button class="btn btn--primary btn--sm" data-action="quiz-next">' + (q.i === q.questions.length - 1 ? '查看结果' : '下一题 →') + '</button>' : ''}
        </div>
      </div>
    `;
  }

  function renderQuizResult() {
    const q = ui.quiz;
    const total = q.questions.length;
    const pct = Math.round(q.score / total * 100);
    const passed = pct >= 80;
    const perfect = q.score === total;
    const reward = perfect ? 50 : (passed ? 40 : 0);
    if (!q.awarded) {
      q.awarded = true;
      if (passed) {
        state.quizPassed++;
        if (perfect) state.quizPerfect++;
        save();
        addXp(reward, 'quiz');
      } else {
        toast('差一点点就通过啦，再试一次！', '');
      }
    }
    return `
      <div class="section-head"><div><h2>测验结果</h2></div></div>
      <div class="quiz-card" style="text-align:center">
        <div style="font-size:54px">${perfect ? '🏆' : (passed ? '🎉' : '💪')}</div>
        <div style="font-family:var(--font-display);font-size:30px;font-weight:700;margin:6px 0">${q.score} / ${total} · ${pct}分</div>
        <div style="color:var(--ink-2);font-size:14px">${perfect ? '满分！太棒了！' : (passed ? '通过测验，继续保持！' : '未达到 80 分，复习一下再来挑战吧')}</div>
        ${reward ? `<div style="margin-top:8px"><span class="pill pill--gold">+${reward} XP 已到账</span></div>` : ''}
        <div style="margin-top:22px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn--learn" data-action="start-quiz">再来一次</button>
          <button class="btn btn--ghost" data-action="back-learn">返回学习</button>
        </div>
      </div>
    `;
  }

  /* ----------------------------- 我的厨房 ----------------------------- */
  function renderKitchen() {
    const noteItems = allItems().filter((it) => state.notes[it.id]);
    const custom = state.custom || [];
    const customCards = custom.map(customCard).join('') || emptyBlock('还没有自定义菜谱', '点击右上角创建你的第一道菜谱');
    const noteCards = noteItems.map(noteCard).join('') || '<div class="empty" style="padding:30px"><div class="empty__icon">📝</div><div class="empty__title">还没有备注</div><div style="font-size:13px">在任意菜谱详情里写下你的心得，就会出现在这里</div></div>';

    return `
      <div class="section-head">
        <div><h2>我的厨房</h2><p>管理你的自定义菜谱与在系统菜谱上写下的备注。</p></div>
        <button class="btn btn--primary" data-action="new-custom">+ 新建菜谱</button>
      </div>

      <h3 style="font-family:var(--font-display);font-size:18px;margin:24px 0 14px">📒 我的自定义菜谱 <span class="pill" style="margin-left:6px">${custom.length}</span></h3>
      <div class="kitchen-grid">${customCards}</div>

      <h3 style="font-family:var(--font-display);font-size:18px;margin:30px 0 14px">📝 我的备注 <span class="pill" style="margin-left:6px">${noteItems.length}</span></h3>
      <div class="kitchen-grid">${noteCards}</div>
    `;
  }

  function customCard(c) {
    return `
      <article class="kcard">
        <button class="kcard__del" data-del-custom="${c.id}" title="删除">✕</button>
        <div class="kcard__head">
          <div class="kcard__emoji">${esc(c.emoji || '🍽️')}</div>
          <div>
            <div class="kcard__title">${esc(c.name?.zh || '未命名')}<small>${esc(c.name?.[state.targetLang] || '')} · 自定义</small></div>
          </div>
        </div>
        ${c.note ? `<div class="kcard__note">${esc(c.note)}</div>` : ''}
        <div style="font-size:12px;color:var(--ink-3)">${(c.ingredients||[]).length} 种食材 · ${(c.steps||[]).length} 个步骤</div>
        <div class="kcard__actions">
          <button class="btn btn--ghost btn--sm" data-open="${c.id}">查看</button>
          <button class="btn btn--soft btn--sm" data-edit-custom="${c.id}">编辑</button>
        </div>
      </article>
    `;
  }

  function noteCard(itemId) {
    const item = findItem(itemId);
    if (!item) return '';
    return `
      <article class="kcard">
        <div class="kcard__head">
          <div class="kcard__emoji">${item.emoji}</div>
          <div>
            <div class="kcard__title">${esc(item.name.zh)}<small>${esc(t(item.name))}</small></div>
          </div>
        </div>
        <div class="kcard__note">${esc(state.notes[itemId])}</div>
        <div class="kcard__actions">
          <button class="btn btn--ghost btn--sm" data-open="${item.id}">查看菜谱</button>
        </div>
      </article>
    `;
  }

  function emptyBlock(title, sub) {
    return `<div class="empty"><div class="empty__icon">🍽️</div><div class="empty__title">${esc(title)}</div><div style="font-size:13px">${esc(sub)}</div></div>`;
  }

  /* ----------------------------- 成就激励 ----------------------------- */
  function renderRewards() {
    const gates = uniqueSortedGates();
    const maxGate = gates.length ? gates[gates.length - 1] : 500;
    const barPct = Math.min(100, state.xp / maxGate * 100);

    const gateHtml = gates.map((g) => {
      const open = state.xp >= g;
      const names = allItems().filter((it) => it.unlockXp === g).map((it) => it.name.zh).join('、');
      return `<div class="gate ${open ? 'is-open' : ''}"><b>${g} XP</b>${open ? '✓ 已解锁' : '🔒 未解锁'}<div style="font-size:10px;margin-top:3px;opacity:.8">${esc(names)}</div></div>`;
    }).join('');

    const lockedItems = allItems().filter((it) => !isUnlocked(it));
    const lockedHtml = lockedItems.length
      ? lockedItems.map((it) => `<div class="gate"><b>${it.unlockXp} XP</b>${it.emoji} ${esc(it.name.zh)}<div style="font-size:10px;margin-top:3px;opacity:.8">还差 ${it.unlockXp - state.xp} XP</div></div>`).join('')
      : '<div class="pill pill--learn">🎉 全部内容已解锁！</div>';

    const achHtml = DATA.achievements.map((a) => {
      const done = state.achievements && state.achievements[a.id];
      return `<div class="acard ${done ? 'is-done' : ''}"><div class="acard__icon">${a.icon}</div><div class="acard__title">${esc(a.title.zh)}</div><div class="acard__desc">${esc(a.desc.zh)}</div>${done ? '<span class="pill pill--learn" style="margin-top:8px">已获得</span>' : '<span class="pill" style="margin-top:8px">未解锁</span>'}</div>`;
    }).join('');

    const tips = [
      { icon: '🍳', text: '标记"我做过这道菜"，首次可获得菜谱 XP 奖励' },
      { icon: '📚', text: '完成任意课程的抽认卡，+30 XP' },
      { icon: '🎯', text: '测验达到 80 分 +40 XP，满分 +50 XP' },
      { icon: '📝', text: '给菜谱写备注、创建自定义菜谱也能赚 XP' }
    ].map((t) => `<div style="display:flex;gap:10px;align-items:flex-start;font-size:13px;color:var(--ink-2)"><span style="font-size:18px">${t.icon}</span><span>${t.text}</span></div>`).join('');

    return `
      <div class="section-head">
        <div><h2>成就与激励</h2><p>${state.incentive ? '激励模式已开启：累积 XP 即可逐步解锁更多菜谱与调酒配方。' : '当前为自由模式，所有内容可直接浏览；仍可累积 XP 获得成就。'}</p></div>
        <span class="pill pill--gold">⭐ ${state.xp} XP · Lv.${levelFromXp(state.xp)}</span>
      </div>

      <div class="unlock-track">
        <div class="unlock-track__head">
          <h3>解锁进度</h3>
          <span style="font-size:12px;color:var(--ink-2)">${state.xp} / ${maxGate} XP</span>
        </div>
        <div class="unlock-bar"><div class="unlock-bar__fill" style="width:${barPct}%"></div></div>
        <div class="unlock-gates">${gateHtml}</div>
      </div>

      <div class="split">
        <div>
          <div class="section-head" style="margin-top:0"><h2>🏆 我的成就</h2></div>
          <div class="achieve-grid">${achHtml}</div>
        </div>
        <div>
          <div class="section-head" style="margin-top:0"><h2>🔒 待解锁内容</h2></div>
          <div class="unlock-gates" style="margin-top:0">${lockedHtml}</div>
          <div class="section-head" style="margin-top:24px"><h2>💡 如何获得 XP</h2></div>
          <div class="card" style="padding:18px;display:flex;flex-direction:column;gap:12px">${tips}</div>
        </div>
      </div>
    `;
  }

  /* ----------------------------- 模态框 ----------------------------- */
  function openModal(html) {
    const root = $('modal-root');
    root.innerHTML = `<div class="modal is-open"><div class="modal__panel">${html}</div></div>`;
    const modal = root.querySelector('.modal');
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    bindViewInputs(); // 绑定模态框内的备注输入等
  }
  function closeModal() {
    // 关闭时兜底保存备注，确保无论输入如何进入文本框都不丢失
    const note = $('note-area');
    if (note && ui.openItemId) {
      state.notes[ui.openItemId] = note.value;
      save();
    }
    $('modal-root').innerHTML = '';
    ui.openItemId = null;
  }

  function openItem(id) {
    const item = findItem(id);
    if (!item) { toast('内容不存在', ''); return; }
    if (!isUnlocked(item)) {
      toast(`需要 ${item.unlockXp} XP 解锁，当前 ${state.xp} XP`, '');
      go('rewards');
      return;
    }
    ui.openItemId = id;
    const isCustom = id.startsWith('u-');
    const cooked = state.cooked[id] > 0;
    const cookLabel = kindOf(id) === 'cocktail' ? '我调过这杯酒' : '我做过这道菜';
    const note = state.notes[id] || '';
    const vocabChips = (item.vocab || []).map((v) => DATA.vocab[v] ? `<span class="vocab-chip" data-vocab-peek="${v}">${esc(DATA.vocab[v][state.targetLang])}</span>` : '').join('');

    openModal(`
      <div class="modal__head" style="background:linear-gradient(135deg, ${item.color}, #fff)">
        <button class="modal__close" data-action="close-modal" aria-label="关闭">✕</button>
        <span class="emoji">${item.emoji}</span>
      </div>
      <div class="modal__body">
        <h2 class="modal__title">${esc(item.name.zh)}<small>${esc(item.name.en)} · ${esc(item.name.ja)}</small></h2>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
          <span class="pill">${item.cuisine || item.category || ''}</span>
          ${(item.tags || []).map((t) => `<span class="pill">${esc(t)}</span>`).join('')}
          <span class="pill pill--gold">+${item.xpReward} XP</span>
        </div>
        <p class="modal__intro">${esc(t(item.intro))}</p>
        <div class="modal__grid">
          <div class="modal__block">
            <h4>食材 · Ingredients</h4>
            <ul class="ing-list">${(item.ingredients || []).map((ing) => `<li><span class="tgt">${esc(ing[state.targetLang] || ing.en)} <span style="color:var(--ink-3);font-weight:400">/ ${esc(ing.zh)}</span></span><span class="amt">${esc(ing.amount)}</span></li>`).join('')}</ul>
          </div>
          <div class="modal__block">
            <h4>步骤 · Steps</h4>
            <ol class="step-list">${(item.steps || []).map((s) => `<li><div style="font-weight:600">${esc(t(s))}</div><div style="font-size:12px;color:var(--ink-3);margin-top:2px">${esc(s.zh)}</div></li>`).join('')}</ol>
          </div>
        </div>
        ${vocabChips ? `<div class="modal__block" style="margin-top:18px"><h4>本课单词 · Tap to peek</h4><div class="vocab-row">${vocabChips}</div></div>` : ''}
        <div class="modal__foot">
          <div class="note-box" style="flex:1">
            <div class="note-box__label">📝 我的备注（做菜心得、替换食材…）</div>
            <textarea id="note-area" data-item-id="${id}" placeholder="写下你的备注，会自动保存到「我的厨房」">${esc(note)}</textarea>
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            ${cooked ? '<span class="pill pill--learn">✓ 已记录</span>' : ''}
            <button class="btn ${cooked ? 'btn--soft' : 'btn--primary'}" data-action="cook-item" data-item-id="${id}">${cooked ? '再做一次 +5 XP' : cookLabel + ' +' + item.xpReward + ' XP'}</button>
          </div>
        </div>
      </div>
    `);
  }

  /* ----------------------------- 自定义菜谱表单 ----------------------------- */
  function openCustomForm(id) {
    const isNew = id === 'new';
    const c = isNew ? { name: { zh: '', en: '', ja: '' }, emoji: '🍽️', color: '#FFE0CC', ingredients: [], steps: [], note: '' }
      : (state.custom.find((x) => x.id === id) || { name: { zh: '', en: '', ja: '' }, emoji: '🍽️', ingredients: [], steps: [], note: '' });
    ui.editingCustom = isNew ? 'new' : id;

    const ingRows = (c.ingredients.length ? c.ingredients : [{ zh: '', en: '', ja: '', amount: '' }])
      .map((ing, i) => ingRow(ing, i)).join('');
    const stepRows = (c.steps.length ? c.steps : [{ zh: '', en: '', ja: '' }])
      .map((s, i) => stepRow(s, i)).join('');

    openModal(`
      <div class="modal__body" style="max-height:88vh">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <h2 style="margin:0;font-family:var(--font-display)">${isNew ? '新建自定义菜谱' : '编辑菜谱'}</h2>
          <button class="modal__close" data-action="close-modal" style="position:static">✕</button>
        </div>
        <div class="form" id="custom-form">
          <div class="row2">
            <label>菜名（中文）<input name="nameZh" value="${esc(c.name.zh)}" placeholder="例如：我的私房意面" /></label>
            <label>图标 emoji<input name="emoji" value="${esc(c.emoji)}" maxlength="4" /></label>
          </div>
          <div class="row2">
            <label>English name<input name="nameEn" value="${esc(c.name.en)}" /></label>
            <label>日本語名<input name="nameJa" value="${esc(c.name.ja)}" /></label>
          </div>
          <div id="ing-list">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:12px;font-weight:700;color:var(--ink-2)">食材</span>
              <button type="button" class="btn btn--ghost btn--sm" data-action="add-ing">+ 添加食材</button>
            </div>
            ${ingRows}
          </div>
          <div id="step-list">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:12px;font-weight:700;color:var(--ink-2)">步骤</span>
              <button type="button" class="btn btn--ghost btn--sm" data-action="add-step">+ 添加步骤</button>
            </div>
            ${stepRows}
          </div>
          <label>备注 / 心得<textarea name="note" rows="2" placeholder="你的独门秘诀…">${esc(c.note || '')}</textarea></label>
          <div style="display:flex;gap:10px;justify-content:flex-end">
            <button type="button" class="btn btn--ghost" data-action="close-modal">取消</button>
            <button type="button" class="btn btn--primary" data-action="save-custom">保存菜谱</button>
          </div>
        </div>
      </div>
    `);
  }

  function ingRow(ing, i) {
    return `<div class="row2 ing-row" data-idx="${i}" style="grid-template-columns:1fr 1fr 1fr 1fr">
      <input name="ingZh" value="${esc(ing.zh || '')}" placeholder="中文" />
      <input name="ingEn" value="${esc(ing.en || '')}" placeholder="English" />
      <input name="ingJa" value="${esc(ing.ja || '')}" placeholder="日本語" />
      <input name="ingAmt" value="${esc(ing.amount || '')}" placeholder="用量" />
    </div>`;
  }
  function stepRow(s, i) {
    return `<div class="step-row" data-idx="${i}">
      <textarea name="stepZh" rows="2" placeholder="步骤（中文）">${esc(s.zh || '')}</textarea>
      <div class="row2" style="margin-top:6px">
        <input name="stepEn" value="${esc(s.en || '')}" placeholder="English" />
        <input name="stepJa" value="${esc(s.ja || '')}" placeholder="日本語" />
      </div>
    </div>`;
  }

  function collectCustomForm() {
    const form = $('custom-form');
    if (!form) return null;
    const val = (n) => form.querySelector(`[name="${n}"]`)?.value || '';
    const ingredients = [];
    form.querySelectorAll('.ing-row').forEach((row) => {
      const zh = row.querySelector('[name="ingZh"]').value.trim();
      const en = row.querySelector('[name="ingEn"]').value.trim();
      const ja = row.querySelector('[name="ingJa"]').value.trim();
      const amount = row.querySelector('[name="ingAmt"]').value.trim();
      if (zh || en || ja) ingredients.push({ zh, en, ja, amount });
    });
    const steps = [];
    form.querySelectorAll('.step-row').forEach((row) => {
      const zh = row.querySelector('[name="stepZh"]').value.trim();
      const en = row.querySelector('[name="stepEn"]').value.trim();
      const ja = row.querySelector('[name="stepJa"]').value.trim();
      if (zh || en || ja) steps.push({ zh, en, ja });
    });
    return {
      name: { zh: val('nameZh'), en: val('nameEn'), ja: val('nameJa') },
      emoji: val('emoji') || '🍽️',
      ingredients, steps,
      note: val('note')
    };
  }

  /* ----------------------------- 测验生成 ----------------------------- */
  function buildQuiz(vocabIds, fromLesson) {
    const pool = (vocabIds && vocabIds.length ? vocabIds : Object.keys(DATA.vocab)).slice();
    shuffle(pool);
    const pickN = Math.min(5, pool.length);
    const questions = pool.slice(0, pickN).map((vid) => {
      const v = DATA.vocab[vid];
      const others = Object.keys(DATA.vocab).filter((k) => k !== vid);
      shuffle(others);
      const distractors = others.slice(0, 3).map((k) => DATA.vocab[k]);
      const promptLang = Math.random() < 0.5 ? 'target' : 'zh';
      // 选项：若问 target->zh，选项为中文释义；否则为 target 词
      const correctText = promptLang === 'target' ? v.zh : v[state.targetLang];
      const wrongTexts = distractors.map((d) => promptLang === 'target' ? d.zh : d[state.targetLang]);
      const options = [correctText, ...wrongTexts];
      shuffle(options);
      return { vocabId: vid, promptLang, options, answer: options.indexOf(correctText) };
    });
    return { questions, i: 0, score: 0, answered: false, picked: -1, awarded: false, fromLesson };
  }
  function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } }

  /* ----------------------------- 事件绑定 ----------------------------- */
  function bindViewInputs() {
    // 搜索框
    const sr = $('search-recipe');
    if (sr) sr.addEventListener('input', (e) => { ui.recipesQuery = e.target.value; render(); focusSearch('search-recipe'); });
    const sc = $('search-cocktail');
    if (sc) sc.addEventListener('input', (e) => { ui.cocktailsQuery = e.target.value; render(); focusSearch('search-cocktail'); });

    // 备注自动保存
    const note = $('note-area');
    if (note && ui.openItemId) {
      note.addEventListener('input', (e) => {
        state.notes[ui.openItemId] = e.target.value;
        save();
      });
    }
  }
  function focusSearch(id) {
    const el = $(id); if (el) { const v = el.value; el.focus(); el.setSelectionRange(v.length, v.length); }
  }

  // 全局事件委托
  document.addEventListener('click', (e) => {
    const tgt = e.target.closest('[data-view-go], .nav__item, .tabbar__item, [data-open], [data-lesson], [data-action], [data-catalog-filter], [data-quiz-opt], [data-del-custom], [data-edit-custom], [data-vocab-peek], .modal__close');
    if (!tgt) return;

    if (tgt.dataset.viewGo) { go(tgt.dataset.viewGo); return; }
    if (tgt.classList.contains('nav__item') || tgt.classList.contains('tabbar__item')) { go(tgt.dataset.view); return; }
    if (tgt.dataset.open) { openItem(tgt.dataset.open); return; }
    if (tgt.dataset.lesson) { ui.currentLesson = DATA.lessons.find((l) => l.id === tgt.dataset.lesson); ui.learnPhase = 'flash'; ui.flashIndex = 0; ui.flashFlipped = false; render(); return; }
    if (tgt.dataset.catalogFilter) {
      const [kind, val] = tgt.dataset.catalogFilter.split(':');
      if (kind === 'recipe') ui.recipesFilter = val; else ui.cocktailsFilter = val;
      render(); return;
    }
    if (tgt.dataset.vocabPeek) {
      const v = DATA.vocab[tgt.dataset.vocabPeek];
      if (v) toast(`${v[state.targetLang]} = ${v.zh}（${v[state.targetLang === 'en' ? 'ja' : 'en']}）`, 'good');
      return;
    }
    if (tgt.dataset.delCustom) {
      if (confirm('确定删除这个自定义菜谱吗？')) {
        state.custom = state.custom.filter((x) => x.id !== tgt.dataset.delCustom);
        save(); render(); toast('已删除', '');
      }
      return;
    }
    if (tgt.dataset.editCustom) { openCustomForm(tgt.dataset.editCustom); return; }

    const action = tgt.dataset.action;
    if (!action) return;
    switch (action) {
      case 'close-modal': closeModal(); break;
      case 'cook-item': {
        const id = tgt.dataset.itemId;
        const item = findItem(id);
        if (!item) break;
        const first = !state.cooked[id];
        state.cooked[id] = (state.cooked[id] || 0) + 1;
        save();
        addXp(first ? item.xpReward : 5, 'cook', tgt);
        toast(first ? `记录成功！+${item.xpReward} XP` : '已记录，再来一次 +5 XP', 'xp');
        checkAchievements();
        // 刷新模态框里的按钮状态
        const btn = document.querySelector('[data-action="cook-item"]');
        if (btn) { btn.textContent = '再做一次 +5 XP'; btn.classList.remove('btn--primary'); btn.classList.add('btn--soft'); }
        break;
      }
      case 'back-learn': ui.learnPhase = 'list'; ui.quiz = null; ui.currentLesson = null; render(); break;
      case 'flip': ui.flashFlipped = !ui.flashFlipped; render(); break;
      case 'flash-prev': ui.flashIndex = Math.max(0, ui.flashIndex - 1); ui.flashFlipped = false; render(); break;
      case 'flash-next': {
        const ids = ui.currentLesson.vocabIds;
        ui.flashIndex = Math.min(ids.length - 1, ui.flashIndex + 1);
        ui.flashFlipped = false; render(); break;
      }
      case 'finish-lesson': {
        const lesson = ui.currentLesson;
        if (!state.lessonsDone[lesson.id]) {
          state.lessonsDone[lesson.id] = true;
          const before = state.learnedVocab.length;
          lesson.vocabIds.forEach((vid) => { if (!state.learnedVocab.includes(vid)) state.learnedVocab.push(vid); });
          save();
          addXp(30, 'lesson');
          toast(`完成「${lesson.title.zh}」！+30 XP`, 'good');
          checkAchievements();
        } else {
          toast('这节课已经完成过啦', '');
        }
        ui.learnPhase = 'list'; ui.currentLesson = null; render();
        break;
      }
      case 'start-quiz': ui.quiz = buildQuiz(null, null); ui.learnPhase = 'quiz'; render(); break;
      case 'start-quiz-lesson': ui.quiz = buildQuiz(ui.currentLesson.vocabIds, ui.currentLesson); ui.learnPhase = 'quiz'; render(); break;
      case 'quiz-next': ui.quiz.i++; ui.quiz.answered = false; ui.quiz.picked = -1; render(); break;
      case 'new-custom': openCustomForm('new'); break;
      case 'add-ing': {
        const list = document.getElementById('ing-list');
        const rows = list.querySelectorAll('.ing-row');
        const row = document.createElement('div');
        row.className = 'row2 ing-row';
        row.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';
        row.dataset.idx = rows.length;
        row.innerHTML = ingRow({ zh: '', en: '', ja: '', amount: '' }, rows.length).replace(/<div class="row2 ing-row"[^>]*>/, '').replace(/<\/div>\s*$/, '');
        // simpler: rebuild via template
        list.insertAdjacentHTML('beforeend', `<div class="row2 ing-row" data-idx="${rows.length}" style="grid-template-columns:1fr 1fr 1fr 1fr"><input name="ingZh" placeholder="中文"/><input name="ingEn" placeholder="English"/><input name="ingJa" placeholder="日本語"/><input name="ingAmt" placeholder="用量"/></div>`);
        break;
      }
      case 'add-step': {
        const list = document.getElementById('step-list');
        const rows = list.querySelectorAll('.step-row');
        list.insertAdjacentHTML('beforeend', `<div class="step-row" data-idx="${rows.length}"><textarea name="stepZh" rows="2" placeholder="步骤（中文）"></textarea><div class="row2" style="margin-top:6px"><input name="stepEn" placeholder="English"/><input name="stepJa" placeholder="日本語"/></div></div>`);
        break;
      }
      case 'save-custom': {
        const data = collectCustomForm();
        if (!data || !data.name.zh) { toast('请填写菜名', ''); break; }
        data.color = '#FFE0CC'; data.xpReward = 0; data.unlockXp = 0; data.difficulty = 1; data.time = 0; data.vocab = [];
        if (ui.editingCustom === 'new') {
          data.id = 'u-' + Date.now();
          data.cuisine = '自定义'; data.category = '自定义'; data.tags = ['我的菜谱'];
          state.custom = state.custom || [];
          state.custom.unshift(data);
          addXp(25, 'custom');
          toast('菜谱已创建 +25 XP', 'good');
        } else {
          const idx = state.custom.findIndex((x) => x.id === ui.editingCustom);
          if (idx >= 0) state.custom[idx] = Object.assign({}, state.custom[idx], data);
          toast('已保存', 'good');
        }
        save(); checkAchievements();
        closeModal(); render();
        break;
      }
    }
  });

  // 测验选项
  document.addEventListener('click', (e) => {
    const opt = e.target.closest('[data-quiz-opt]');
    if (!opt || !ui.quiz || ui.quiz.answered) return;
    const i = +opt.dataset.quizOpt;
    const cur = ui.quiz.questions[ui.quiz.i];
    ui.quiz.answered = true; ui.quiz.picked = i;
    if (i === cur.answer) ui.quiz.score++;
    render();
  });

  // 键盘：抽认卡
  document.addEventListener('keydown', (e) => {
    if (ui.learnPhase === 'flash') {
      if (e.key === ' ') { e.preventDefault(); ui.flashFlipped = !ui.flashFlipped; render(); }
      else if (e.key === 'ArrowRight') { const ids = ui.currentLesson.vocabIds; ui.flashIndex = Math.min(ids.length - 1, ui.flashIndex + 1); ui.flashFlipped = false; render(); }
      else if (e.key === 'ArrowLeft') { ui.flashIndex = Math.max(0, ui.flashIndex - 1); ui.flashFlipped = false; render(); }
    }
    if (e.key === 'Escape') closeModal();
  });

  // 语言切换
  document.querySelectorAll('.seg__btn').forEach((b) => {
    b.addEventListener('click', () => {
      state.targetLang = b.dataset.lang;
      save();
      document.querySelectorAll('.seg__btn').forEach((x) => x.classList.toggle('is-active', x.dataset.lang === state.targetLang));
      render();
      toast(`学习目标语言：${state.targetLang === 'en' ? 'English' : '日本語'}`, '');
    });
  });

  // 激励模式切换
  $('incentive-toggle').addEventListener('change', (e) => {
    state.incentive = e.target.checked; save();
    toast(state.incentive ? '激励模式已开启：攒 XP 解锁内容' : '已切换为自由模式', 'good');
    render();
  });

  // 移动端侧边栏
  const menuBtn = $('menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const sb = $('sidebar');
      sb.classList.add('is-open-mobile');
      const scrim = document.createElement('div');
      scrim.className = 'scrim';
      scrim.addEventListener('click', closeMobileSidebar);
      document.body.appendChild(scrim);
    });
  }
  function closeMobileSidebar() {
    $('sidebar')?.classList.remove('is-open-mobile');
    document.querySelectorAll('.scrim').forEach((s) => s.remove());
  }

  /* ----------------------------- 启动 ----------------------------- */
  function init() {
    // 同步语言按钮
    document.querySelectorAll('.seg__btn').forEach((x) => x.classList.toggle('is-active', x.dataset.lang === state.targetLang));
    $('incentive-toggle').checked = state.incentive;
    updateNav();
    render();
  }
  init();
})();
