/**
 * ============================================================================
 * SMART EXAM PREP — CORE LOGIC
 * Built with Apple Design & Emil Kowalski Principles:
 * - Fluid response, zero layout shift (tabular figures)
 * - Restrained, clean interface without AI template tells
 * ============================================================================
 */

let appData = {
  subjects: []
};

// Seed data: 4 User Subjects and Exam Dates
const DEFAULT_SEED_DATA = {
  subjects: [
    {
      id: 'subj-1',
      name: 'Software Engineering',
      examDate: '2026-12-04',
      units: [
        {
          id: 'u-1',
          title: 'Software Development Life Cycle & Agile',
          topics: [
            { id: 't-1', title: 'Requirements Engineering & User Stories', estHours: 2.5, status: 'completed' },
            { id: 't-2', title: 'Agile, Scrum & Sprint Planning', estHours: 2.0, status: 'in-progress' },
            { id: 't-3', title: 'Waterfall, Spiral & Iterative Models', estHours: 1.5, status: 'not-started' }
          ]
        },
        {
          id: 'u-2',
          title: 'Design Patterns & Architecture',
          topics: [
            { id: 't-4', title: 'SOLID Principles & Clean Architecture', estHours: 3.0, status: 'not-started' },
            { id: 't-5', title: 'Creational & Structural Design Patterns', estHours: 2.5, status: 'not-started' }
          ]
        },
        {
          id: 'u-3',
          title: 'Testing, QA & Maintenance',
          topics: [
            { id: 't-6', title: 'Unit, Integration & Regression Testing', estHours: 2.0, status: 'not-started' },
            { id: 't-7', title: 'CI/CD Pipelines & DevOps Fundamentals', estHours: 2.0, status: 'not-started' }
          ]
        }
      ]
    },
    {
      id: 'subj-2',
      name: 'Economics and Accounting for Engineers',
      examDate: '2026-12-04',
      units: [
        {
          id: 'u-4',
          title: 'Engineering Economics & Cost Analysis',
          topics: [
            { id: 't-8', title: 'Time Value of Money & Cash Flow Diagrams', estHours: 2.5, status: 'completed' },
            { id: 't-9', title: 'Present Worth, Annual Worth & IRR Analysis', estHours: 3.0, status: 'in-progress' },
            { id: 't-10', title: 'Depreciation Methods (SLM, DDB) & Tax Impact', estHours: 2.0, status: 'not-started' }
          ]
        },
        {
          id: 'u-5',
          title: 'Financial & Cost Accounting',
          topics: [
            { id: 't-11', title: 'Balance Sheet, Income Statement & Cash Flows', estHours: 2.5, status: 'not-started' },
            { id: 't-12', title: 'Cost Classification: Fixed, Variable & Marginal', estHours: 2.0, status: 'not-started' },
            { id: 't-13', title: 'Break-Even Analysis & Margin of Safety', estHours: 2.0, status: 'not-started' }
          ]
        }
      ]
    },
    {
      id: 'subj-3',
      name: 'Java Programming',
      examDate: '2026-12-05',
      units: [
        {
          id: 'u-6',
          title: 'Core OOP & Memory Management',
          topics: [
            { id: 't-14', title: 'Inheritance, Polymorphism & Abstract Classes', estHours: 2.5, status: 'completed' },
            { id: 't-15', title: 'JVM Architecture, Memory Model & GC', estHours: 3.0, status: 'in-progress' },
            { id: 't-16', title: 'Exception Handling & Custom Exceptions', estHours: 1.5, status: 'not-started' }
          ]
        },
        {
          id: 'u-7',
          title: 'Collections Framework & Generics',
          topics: [
            { id: 't-17', title: 'Lists, Sets, Maps & Queue Implementations', estHours: 2.5, status: 'not-started' },
            { id: 't-18', title: 'Comparable, Comparator & Generics', estHours: 2.0, status: 'not-started' }
          ]
        },
        {
          id: 'u-8',
          title: 'Multithreading & Concurrency',
          topics: [
            { id: 't-19', title: 'Thread Lifecycle, Synchronization & Locks', estHours: 3.0, status: 'not-started' },
            { id: 't-20', title: 'ExecutorService, Callables & Futures', estHours: 2.5, status: 'not-started' }
          ]
        }
      ]
    },
    {
      id: 'subj-4',
      name: 'Discrete Mathematics',
      examDate: '2026-12-05',
      units: [
        {
          id: 'u-9',
          title: 'Logic, Proofs & Sets',
          topics: [
            { id: 't-21', title: 'Propositional & Predicate Logic, Truth Tables', estHours: 2.0, status: 'completed' },
            { id: 't-22', title: 'Direct Proofs, Contradiction & Induction', estHours: 2.5, status: 'in-progress' },
            { id: 't-23', title: 'Relations, Equivalence Classes & Orders', estHours: 2.0, status: 'not-started' }
          ]
        },
        {
          id: 'u-10',
          title: 'Combinatorics & Graph Theory',
          topics: [
            { id: 't-24', title: 'Permutations, Combinations & Pigeonhole Principle', estHours: 2.5, status: 'not-started' },
            { id: 't-25', title: 'Graphs, Trees, Traversals & Euler/Hamilton Paths', estHours: 3.0, status: 'not-started' },
            { id: 't-26', title: 'Recurrence Relations & Generating Functions', estHours: 2.5, status: 'not-started' }
          ]
        }
      ]
    }
  ]
};

/* ============================================================================
   DATE & COUNTDOWN UTILITIES
   ============================================================================ */
function parseDateString(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
}

function formatDateDisplay(dateStr) {
  const d = parseDateString(dateStr);
  if (!d || isNaN(d.getTime())) return 'Date not set';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getDaysRemaining(dateStr) {
  const target = parseDateString(dateStr);
  if (!target) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

/* ============================================================================
   MODULE 1: FOCUS CLOCK (SF PRO DISPLAY)
   ============================================================================ */
const TimerModule = (function() {
  let timeRemaining = 25 * 60; // 25 minutes in seconds
  let currentMode = 'study';
  let timerInterval = null;
  let isRunning = false;
  let audioContext = null;

  const clockEl = document.getElementById('clock-digits');
  const toggleBtn = document.getElementById('btn-timer-toggle');
  const resetBtn = document.getElementById('btn-timer-reset');
  const segmentStudyBtn = document.getElementById('btn-segment-study');
  const segmentBreakBtn = document.getElementById('btn-segment-break');

  function init() {
    updateClockDisplay();

    if (toggleBtn) toggleBtn.addEventListener('click', toggleTimer);
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);
    if (segmentStudyBtn) segmentStudyBtn.addEventListener('click', () => setMode('study'));
    if (segmentBreakBtn) segmentBreakBtn.addEventListener('click', () => setMode('break'));
  }

  function setMode(mode) {
    if (isRunning) pauseTimer();
    currentMode = mode;
    timeRemaining = (mode === 'study') ? 25 * 60 : 5 * 60;

    if (segmentStudyBtn) segmentStudyBtn.classList.toggle('active', mode === 'study');
    if (segmentBreakBtn) segmentBreakBtn.classList.toggle('active', mode === 'break');

    updateClockDisplay();
  }

  function toggleTimer() {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }

  function startTimer() {
    isRunning = true;
    toggleBtn.textContent = 'Pause';
    toggleBtn.classList.replace('btn-primary', 'btn-secondary');

    timerInterval = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        updateClockDisplay();
      } else {
        completeTimer();
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    toggleBtn.textContent = 'Start';
    toggleBtn.classList.replace('btn-secondary', 'btn-primary');
  }

  function resetTimer() {
    pauseTimer();
    timeRemaining = (currentMode === 'study') ? 25 * 60 : 5 * 60;
    updateClockDisplay();
  }

  function completeTimer() {
    pauseTimer();
    playGentleChime();

    if (currentMode === 'study') {
      ToastModule.show('Study session complete. Take a 5-minute break.');
      setMode('break');
    } else {
      ToastModule.show('Break over. Ready for the next session.');
      setMode('study');
    }
  }

  function updateClockDisplay() {
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    if (clockEl) clockEl.textContent = formatted;
    document.title = isRunning ? `(${formatted}) Exam Prep` : 'Exam Prep';
  }

  // Synthesized gentle bell chime via native Web Audio API
  function playGentleChime() {
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, audioContext.currentTime + 0.12);

      gain.gain.setValueAtTime(0.18, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.1);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + 1.15);
    } catch (e) {
      // Audio fallback
    }
  }

  return { init };
})();

/* ============================================================================
   MODULE 2: CURRICULUM (SUBJECTS -> CHAPTERS -> TOPICS)
   ============================================================================ */
const SyllabusModule = (function() {
  const container = document.getElementById('syllabus-container');
  const countEl = document.getElementById('mastery-count-text');
  const percentEl = document.getElementById('mastery-percent-text');
  const barEl = document.getElementById('mastery-track-fill');

  function render() {
    if (!container) return;
    container.innerHTML = '';

    if (!appData.subjects || appData.subjects.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:36px; color:var(--text-muted); font-size:13px; font-weight:600;">
          No subjects added. Click <strong>+ Add Subject</strong> to start.
        </div>
      `;
      updateMasteryProgress();
      return;
    }

    appData.subjects.forEach(subject => {
      const subjectSection = document.createElement('div');
      subjectSection.className = 'subject-item';

      // 1. Calculate individual subject tracking progress
      let subTotal = 0;
      let subDone = 0;
      (subject.units || []).forEach(u => {
        (u.topics || []).forEach(t => {
          subTotal++;
          if (t.status === 'completed') subDone++;
        });
      });
      const subPercent = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : 0;

      // 2. Countdown tag for this subject
      const diffDays = getDaysRemaining(subject.examDate);
      let countdownTagHtml = '';
      if (diffDays !== null) {
        if (diffDays === 0) {
          countdownTagHtml = `<span class="countdown-tag urgent">Today</span>`;
        } else if (diffDays === 1) {
          countdownTagHtml = `<span class="countdown-tag urgent">Tomorrow</span>`;
        } else if (diffDays > 1) {
          countdownTagHtml = `<span class="countdown-tag">${diffDays} days left</span>`;
        } else {
          countdownTagHtml = `<span class="countdown-tag passed">Exam passed</span>`;
        }
      }

      // 3. Subject Header Row
      const header = document.createElement('div');
      header.className = 'subject-header-row';
      header.innerHTML = `
        <div class="subject-title-area">
          <span class="subject-name-text">${subject.name}</span>
          <!-- Individual subject mastery tracking badge -->
          <div class="subject-progress-badge" title="${subDone} of ${subTotal} topics completed">
            <span>${subDone}/${subTotal} completed (${subPercent}%)</span>
            <span class="subject-mini-track">
              <span class="subject-mini-fill" style="width: ${subPercent}%;"></span>
            </span>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <!-- Exam date showcase beside subject -->
          <div class="subject-exam-badge">
            <span>${formatDateDisplay(subject.examDate)}</span>
            ${countdownTagHtml}
          </div>
          <div class="subject-actions">
            <button class="btn btn-secondary btn-sm btn-add-chapter" data-subj-id="${subject.id}">
              + Chapter
            </button>
            <button class="btn btn-secondary btn-sm btn-add-topic" data-subj-id="${subject.id}">
              + Topic
            </button>
            <button class="btn-icon-delete btn-delete-subj" title="Delete subject">
              ✕
            </button>
          </div>
        </div>
      `;

      header.querySelector('.btn-add-chapter').addEventListener('click', () => {
        ModalModule.openChapterModal(subject.id);
      });
      header.querySelector('.btn-add-topic').addEventListener('click', () => {
        ModalModule.openTopicModal(subject.id);
      });
      header.querySelector('.btn-delete-subj').addEventListener('click', () => {
        deleteSubject(subject.id);
      });

      subjectSection.appendChild(header);

      // 4. Chapters & Units Container
      const chaptersWrapper = document.createElement('div');
      chaptersWrapper.className = 'chapters-wrapper';

      const units = subject.units || [];
      if (units.length === 0) {
        chaptersWrapper.innerHTML = `
          <div style="font-size:12.5px; color:var(--text-muted); padding:6px 2px; font-weight:550;">
            No chapters yet. Click <strong>+ Chapter</strong> to organize topics.
          </div>
        `;
      } else {
        units.forEach((unit, unitIndex) => {
          const chapterCard = document.createElement('div');
          chapterCard.className = 'chapter-card';

          // Chapter Header with "UNIT-number left of unit name"
          const chapterHeader = document.createElement('div');
          chapterHeader.className = 'chapter-header';
          chapterHeader.innerHTML = `
            <div class="unit-title-group">
              <span class="unit-number-tag">UNIT ${unitIndex + 1}</span>
              <span class="chapter-title">${unit.title}</span>
            </div>
            <div class="chapter-actions">
              <button class="btn btn-ghost btn-sm btn-unit-add-topic" style="font-size:11.5px; padding:2px 8px;">
                + Topic
              </button>
              <button class="btn-icon-delete btn-unit-delete" title="Delete chapter">
                ✕
              </button>
            </div>
          `;

          chapterHeader.querySelector('.btn-unit-add-topic').addEventListener('click', () => {
            ModalModule.openTopicModal(subject.id, unit.id);
          });
          chapterHeader.querySelector('.btn-unit-delete').addEventListener('click', () => {
            deleteChapter(subject.id, unit.id);
          });

          chapterCard.appendChild(chapterHeader);

          // Topics within this unit
          const topicsList = document.createElement('div');
          topicsList.className = 'topics-list';

          const topics = unit.topics || [];
          if (topics.length === 0) {
            topicsList.innerHTML = `
              <div style="font-size:12px; color:var(--text-muted); padding:8px 0; font-weight:500;">
                No topics in this chapter.
              </div>
            `;
          } else {
            topics.forEach(topic => {
              const row = document.createElement('div');
              row.className = 'topic-item';

              let statusClass = 'not-started';
              let statusText = 'To Do';
              if (topic.status === 'in-progress') {
                statusClass = 'in-progress';
                statusText = 'In Progress';
              } else if (topic.status === 'completed') {
                statusClass = 'completed';
                statusText = 'Completed';
              }

              row.innerHTML = `
                <div class="topic-left">
                  <span class="topic-text">${topic.title}</span>
                  <span class="topic-hours">${topic.estHours || 2}h</span>
                </div>
                <div class="topic-right">
                  <button class="status-tag ${statusClass}" title="Click to cycle status">
                    ${statusText}
                  </button>
                  <button class="btn-icon-delete btn-topic-delete" title="Delete topic">
                    ✕
                  </button>
                </div>
              `;

              row.querySelector('.status-tag').addEventListener('click', () => {
                cycleTopicStatus(topic.id);
              });
              row.querySelector('.btn-topic-delete').addEventListener('click', () => {
                deleteTopic(subject.id, unit.id, topic.id);
              });

              topicsList.appendChild(row);
            });
          }

          chapterCard.appendChild(topicsList);
          chaptersWrapper.appendChild(chapterCard);
        });
      }

      subjectSection.appendChild(chaptersWrapper);
      container.appendChild(subjectSection);
    });

    updateMasteryProgress();
  }

  function cycleTopicStatus(topicId) {
    appData.subjects.forEach(subject => {
      (subject.units || []).forEach(unit => {
        (unit.topics || []).forEach(topic => {
          if (topic.id === topicId) {
            if (topic.status === 'not-started') {
              topic.status = 'in-progress';
            } else if (topic.status === 'in-progress') {
              topic.status = 'completed';
            } else {
              topic.status = 'not-started';
            }
          }
        });
      });
    });

    saveData();
    render();
    QueueModule.render();
  }

  function deleteSubject(subjectId) {
    const sub = appData.subjects.find(s => s.id === subjectId);
    if (!sub) return;
    if (confirm(`Delete subject "${sub.name}"?`)) {
      appData.subjects = appData.subjects.filter(s => s.id !== subjectId);
      saveData();
      render();
      QueueModule.render();
      ToastModule.show(`Deleted ${sub.name}`);
    }
  }

  function deleteChapter(subjectId, unitId) {
    const sub = appData.subjects.find(s => s.id === subjectId);
    if (!sub) return;
    sub.units = (sub.units || []).filter(u => u.id !== unitId);
    saveData();
    render();
    QueueModule.render();
    ToastModule.show('Chapter deleted');
  }

  function deleteTopic(subjectId, unitId, topicId) {
    const sub = appData.subjects.find(s => s.id === subjectId);
    if (!sub) return;
    const unit = (sub.units || []).find(u => u.id === unitId);
    if (!unit) return;
    unit.topics = (unit.topics || []).filter(t => t.id !== topicId);
    saveData();
    render();
    QueueModule.render();
  }

  function updateMasteryProgress() {
    let total = 0;
    let completed = 0;

    (appData.subjects || []).forEach(sub => {
      (sub.units || []).forEach(u => {
        (u.topics || []).forEach(t => {
          total++;
          if (t.status === 'completed') completed++;
        });
      });
    });

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (countEl) countEl.textContent = `${completed} of ${total} topics completed`;
    if (percentEl) percentEl.textContent = `${percent}%`;
    if (barEl) barEl.style.width = `${percent}%`;
  }

  return { render };
})();

/* ============================================================================
   MODULE 3: UPCOMING QUEUE & EARLIEST EXAM COUNTDOWN
   ============================================================================ */
const QueueModule = (function() {
  const container = document.getElementById('queue-list-container');
  const earliestExamBadge = document.getElementById('earliest-exam-badge');

  function render() {
    updateEarliestExam();

    if (!container) return;
    container.innerHTML = '';

    const queueItems = [];
    (appData.subjects || []).forEach(subject => {
      (subject.units || []).forEach(unit => {
        (unit.topics || []).forEach(topic => {
          if (topic.status === 'in-progress') {
            queueItems.unshift({ subjectName: subject.name, unitTitle: unit.title, topic });
          } else if (topic.status === 'not-started' && queueItems.length < 5) {
            queueItems.push({ subjectName: subject.name, unitTitle: unit.title, topic });
          }
        });
      });
    });

    if (queueItems.length === 0) {
      container.innerHTML = `
        <div class="queue-empty-state">
          All pending topics completed. Add new topics below.
        </div>
      `;
      return;
    }

    queueItems.slice(0, 5).forEach(item => {
      const row = document.createElement('div');
      row.className = 'queue-row';

      let statusBadge = item.topic.status === 'in-progress' 
        ? '<span class="status-tag in-progress">In Progress</span>'
        : '<span class="status-tag not-started">To Do</span>';

      row.innerHTML = `
        <div class="queue-row-info">
          <div class="queue-row-title">${item.topic.title}</div>
          <div class="queue-row-meta">
            <span>${item.subjectName}</span>
            <span>·</span>
            <span>${item.unitTitle}</span>
            <span>·</span>
            <span>${item.topic.estHours || 2}h</span>
          </div>
        </div>
        <div class="queue-row-action">
          ${statusBadge}
        </div>
      `;

      row.querySelector('.status-tag').addEventListener('click', () => {
        cycleTopicStatus(item.topic.id);
      });

      container.appendChild(row);
    });
  }

  function updateEarliestExam() {
    if (!earliestExamBadge) return;

    let minDays = Infinity;
    let earliestSubject = null;

    (appData.subjects || []).forEach(sub => {
      if (sub.examDate) {
        const diff = getDaysRemaining(sub.examDate);
        if (diff !== null && diff >= 0 && diff < minDays) {
          minDays = diff;
          earliestSubject = sub;
        }
      }
    });

    if (earliestSubject && minDays !== Infinity) {
      if (minDays === 0) {
        earliestExamBadge.innerHTML = `Earliest: <strong>${earliestSubject.name} is Today</strong>`;
        earliestExamBadge.classList.add('highlight');
      } else if (minDays === 1) {
        earliestExamBadge.innerHTML = `Earliest: <strong>${earliestSubject.name} is Tomorrow</strong>`;
        earliestExamBadge.classList.add('highlight');
      } else {
        earliestExamBadge.innerHTML = `Earliest Exam: <strong>${earliestSubject.name}</strong> · ${minDays} days left`;
        earliestExamBadge.classList.remove('highlight');
      }
    } else {
      earliestExamBadge.innerHTML = `No upcoming exams`;
      earliestExamBadge.classList.remove('highlight');
    }
  }

  return { render };
})();

/* ============================================================================
   MODALS CONTROLLER
   ============================================================================ */
const ModalModule = (function() {
  // Add Subject Modal
  const subjectModal = document.getElementById('modal-add-subject');
  const openSubjectBtn = document.getElementById('btn-open-subject-modal');
  const closeSubjectBtn = document.getElementById('btn-close-subject-modal');
  const cancelSubjectBtn = document.getElementById('btn-cancel-subject-modal');
  const subjectForm = document.getElementById('form-add-subject');

  // Add Chapter Modal
  const chapterModal = document.getElementById('modal-add-chapter');
  const closeChapterBtn = document.getElementById('btn-close-chapter-modal');
  const cancelChapterBtn = document.getElementById('btn-cancel-chapter-modal');
  const chapterForm = document.getElementById('form-add-chapter');
  const chapterSubSelect = document.getElementById('select-chapter-subject');

  // Add Topic Modal
  const topicModal = document.getElementById('modal-add-topic');
  const openTopicBtn = document.getElementById('btn-open-topic-modal');
  const closeTopicBtn = document.getElementById('btn-close-topic-modal');
  const cancelTopicBtn = document.getElementById('btn-cancel-topic-modal');
  const topicForm = document.getElementById('form-add-topic');
  const topicSubSelect = document.getElementById('select-topic-subject');
  const topicUnitSelect = document.getElementById('select-topic-unit');

  function init() {
    if (openSubjectBtn) openSubjectBtn.addEventListener('click', openSubjectModal);
    if (closeSubjectBtn) closeSubjectBtn.addEventListener('click', () => close(subjectModal, subjectForm));
    if (cancelSubjectBtn) cancelSubjectBtn.addEventListener('click', () => close(subjectModal, subjectForm));
    if (subjectForm) subjectForm.addEventListener('submit', handleSubjectSubmit);

    if (closeChapterBtn) closeChapterBtn.addEventListener('click', () => close(chapterModal, chapterForm));
    if (cancelChapterBtn) cancelChapterBtn.addEventListener('click', () => close(chapterModal, chapterForm));
    if (chapterForm) chapterForm.addEventListener('submit', handleChapterSubmit);

    if (openTopicBtn) openTopicBtn.addEventListener('click', () => openTopicModal());
    if (closeTopicBtn) closeTopicBtn.addEventListener('click', () => close(topicModal, topicForm));
    if (cancelTopicBtn) cancelTopicBtn.addEventListener('click', () => close(topicModal, topicForm));
    if (topicForm) topicForm.addEventListener('submit', handleTopicSubmit);

    if (topicSubSelect) {
      topicSubSelect.addEventListener('change', () => {
        populateTopicUnitDropdown(topicSubSelect.value);
      });
    }

    [subjectModal, chapterModal, topicModal].forEach(m => {
      if (m) {
        m.addEventListener('click', (e) => {
          if (e.target === m) m.classList.remove('active');
        });
      }
    });
  }

  function close(modal, form) {
    if (modal) modal.classList.remove('active');
    if (form) form.reset();
  }

  // Subject Modal
  function openSubjectModal() {
    subjectModal.classList.add('active');
    document.getElementById('input-subject-name').focus();
  }

  function handleSubjectSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('input-subject-name').value.trim();
    const examDate = document.getElementById('input-subject-date').value;

    if (!name) return;

    appData.subjects.push({
      id: 'subj-' + Date.now(),
      name,
      examDate: examDate || null,
      units: []
    });

    saveData();
    SyllabusModule.render();
    QueueModule.render();
    close(subjectModal, subjectForm);
    ToastModule.show(`Added subject "${name}"`);
  }

  // Chapter Modal
  function openChapterModal(preselectedSubjectId = null) {
    if (!appData.subjects || appData.subjects.length === 0) {
      openSubjectModal();
      return;
    }

    chapterSubSelect.innerHTML = '';
    appData.subjects.forEach(sub => {
      const opt = document.createElement('option');
      opt.value = sub.id;
      opt.textContent = sub.name;
      if (preselectedSubjectId && sub.id === preselectedSubjectId) {
        opt.selected = true;
      }
      chapterSubSelect.appendChild(opt);
    });

    chapterModal.classList.add('active');
    document.getElementById('input-chapter-title').focus();
  }

  function handleChapterSubmit(e) {
    e.preventDefault();
    const subjectId = chapterSubSelect.value;
    const title = document.getElementById('input-chapter-title').value.trim();

    if (!title) return;

    const targetSub = appData.subjects.find(s => s.id === subjectId);
    if (targetSub) {
      if (!targetSub.units) targetSub.units = [];
      targetSub.units.push({
        id: 'u-' + Date.now(),
        title,
        topics: []
      });

      saveData();
      SyllabusModule.render();
      QueueModule.render();
      close(chapterModal, chapterForm);
      ToastModule.show(`Added chapter "${title}"`);
    }
  }

  // Topic Modal
  function openTopicModal(preselectedSubjectId = null, preselectedUnitId = null) {
    if (!appData.subjects || appData.subjects.length === 0) {
      openSubjectModal();
      return;
    }

    topicSubSelect.innerHTML = '';
    appData.subjects.forEach(sub => {
      const opt = document.createElement('option');
      opt.value = sub.id;
      opt.textContent = sub.name;
      if (preselectedSubjectId && sub.id === preselectedSubjectId) {
        opt.selected = true;
      }
      topicSubSelect.appendChild(opt);
    });

    const activeSubjId = topicSubSelect.value;
    populateTopicUnitDropdown(activeSubjId, preselectedUnitId);

    topicModal.classList.add('active');
    document.getElementById('input-topic-title').focus();
  }

  function populateTopicUnitDropdown(subjectId, preselectedUnitId = null) {
    topicUnitSelect.innerHTML = '';
    const sub = appData.subjects.find(s => s.id === subjectId);
    const units = (sub && sub.units) ? sub.units : [];

    if (units.length === 0) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = 'General / Default Chapter';
      topicUnitSelect.appendChild(opt);
    } else {
      units.forEach(u => {
        const opt = document.createElement('option');
        opt.value = u.id;
        opt.textContent = u.title;
        if (preselectedUnitId && u.id === preselectedUnitId) {
          opt.selected = true;
        }
        topicUnitSelect.appendChild(opt);
      });
    }
  }

  function handleTopicSubmit(e) {
    e.preventDefault();
    const subjectId = topicSubSelect.value;
    const unitId = topicUnitSelect.value;
    const title = document.getElementById('input-topic-title').value.trim();
    const estHours = parseFloat(document.getElementById('input-topic-hours').value) || 2.0;

    if (!title) return;

    const targetSub = appData.subjects.find(s => s.id === subjectId);
    if (targetSub) {
      if (!targetSub.units || targetSub.units.length === 0) {
        targetSub.units = [{
          id: 'u-' + Date.now(),
          title: 'General',
          topics: []
        }];
      }

      let targetUnit = targetSub.units.find(u => u.id === unitId);
      if (!targetUnit) {
        targetUnit = targetSub.units[0];
      }

      targetUnit.topics.push({
        id: 't-' + Date.now(),
        title,
        estHours,
        status: 'not-started'
      });

      saveData();
      SyllabusModule.render();
      QueueModule.render();
      close(topicModal, topicForm);
      ToastModule.show(`Added topic "${title}"`);
    }
  }

  return { init, openSubjectModal, openChapterModal, openTopicModal };
})();

/* ============================================================================
   MINIMAL TOAST
   ============================================================================ */
const ToastModule = (function() {
  const toastEl = document.getElementById('toast-notice');
  let timer = null;

  function show(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2600);
  }

  return { show };
})();

/* ============================================================================
   STORAGE & BOOTSTRAP
   ============================================================================ */
function loadData() {
  const stored = localStorage.getItem('smart_exam_prep_v6');
  if (stored) {
    try {
      appData = JSON.parse(stored);
      return;
    } catch (e) {
      console.warn('Storage parse error:', e);
    }
  }

  appData = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
  saveData();
}

function saveData() {
  localStorage.setItem('smart_exam_prep_v6', JSON.stringify(appData));
}

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  TimerModule.init();
  SyllabusModule.render();
  QueueModule.render();
  ModalModule.init();
});
