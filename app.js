import { questions } from "./questions.js";
import { scoreAnswers } from "./assessment.js";
import { localStore } from "./storage.js";
import { generateAiPrompt, generateReport } from "./report.js";

const state = {
  currentQuestion: 0,
  answers: {},
  assessment: null
};

let shareInProgress = false;

const elements = {};

function cacheElements() {
  for (const id of [
    "entry",
    "test",
    "report",
    "dashboard",
    "start-test",
    "view-dashboard",
    "progress-text",
    "progress-bar",
    "question",
    "prev-question",
    "skip-question",
    "next-question",
    "save-local",
    "report-content",
    "copy-report",
    "copy-prompt",
    "download-report",
    "print-report",
    "share-report",
    "copy-link",
    "export-json",
    "import-json",
    "import-file",
    "open-chatgpt",
    "open-claude",
    "qr-link",
    "clear-local",
    "copy-fallback"
  ]) {
    elements[id] = document.getElementById(id);
  }
}

function showView(name) {
  for (const view of ["entry", "test", "report", "dashboard"]) {
    const section = elements[view];
    if (section) {
      section.hidden = view !== name;
    }
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startTest() {
  const saved = localStore.load();
  if (saved?.answers) {
    state.answers = saved.answers;
    state.currentQuestion = Math.min(saved.currentQuestion ?? 0, questions.length - 1);
  }
  showView("test");
  renderQuestion();
}

function currentQuestion() {
  return questions[state.currentQuestion];
}

function renderQuestion() {
  const question = currentQuestion();
  const number = state.currentQuestion + 1;
  const progress = Math.round((number / questions.length) * 100);
  elements["progress-text"].textContent = `第 ${number} 题 / 共 ${questions.length} 题`;
  elements["progress-bar"].style.width = `${progress}%`;
  elements["prev-question"].disabled = state.currentQuestion === 0;
  elements["next-question"].textContent =
    state.currentQuestion === questions.length - 1 ? "完成并生成报告" : "下一题";

  if (question.type === "choice") {
    renderChoiceQuestion(question);
  } else {
    renderTextQuestion(question);
  }

  elements.question.classList.remove("question-panel");
  void elements.question.offsetWidth;
  elements.question.classList.add("question-panel");
}

function renderChoiceQuestion(question) {
  const current = state.answers[question.id];
  elements.question.innerHTML = `
    <h2>${escapeHtml(question.prompt)}</h2>
    <p class="question-hint">请选择最接近你真实行为的一项，不要选理想状态。</p>
    <div class="choice-list">
      ${question.options
        .map(
          (option) => `
        <label class="choice-option">
          <input type="radio" name="${question.id}" value="${option.level}" ${
            current === option.level ? "checked" : ""
          } />
          <span>${escapeHtml(option.label)}</span>
        </label>
      `
        )
        .join("")}
    </div>
  `;
  elements.question.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.answers[question.id] = Number(event.target.value);
    });
  });
}

function renderTextQuestion(question) {
  elements.question.innerHTML = `
    <h2>${escapeHtml(question.prompt)}</h2>
    <p class="question-hint">可以用几句话回答。跳过不会影响后续报告生成。</p>
    <textarea id="text-answer" class="text-answer" aria-label="${escapeHtml(
      question.prompt
    )}">${escapeHtml(state.answers[question.id] ?? "")}</textarea>
  `;
  elements.question.querySelector("#text-answer").addEventListener("input", (event) => {
    state.answers[question.id] = event.target.value;
  });
}

function goNext() {
  if (state.currentQuestion === questions.length - 1) {
    finishTest();
    return;
  }
  state.currentQuestion += 1;
  renderQuestion();
}

function goPrevious() {
  if (state.currentQuestion === 0) {
    return;
  }
  state.currentQuestion -= 1;
  renderQuestion();
}

function skipQuestion() {
  goNext();
}

function saveLocal() {
  const saved = localStore.save({
    answers: state.answers,
    currentQuestion: state.currentQuestion,
    savedAt: new Date().toISOString()
  });
  flashButton(elements["save-local"], saved ? "已保存到本机" : "当前环境不支持保存");
}

function clearLocal() {
  const confirmed = window.confirm("确认清除当前浏览器中的 Human 3.0 测试记录吗？");
  if (!confirmed) {
    return;
  }
  localStore.clear();
  state.answers = {};
  state.currentQuestion = 0;
  state.assessment = null;
  elements["report-content"].textContent = "";
  flashButton(elements["clear-local"], "本地记录已清除");
}

function finishTest() {
  state.assessment = scoreAnswers(state.answers);
  const report = generateReport(state.answers, state.assessment);
  elements["report-content"].textContent = report;
  showView("report");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    elements["copy-fallback"].value = text;
    elements["copy-fallback"].select();
    document.execCommand("copy");
    return true;
  }
}

async function copyReport() {
  const report = elements["report-content"].textContent.trim();
  await copyText(report);
  flashButton(elements["copy-report"], "报告已复制");
}

async function copyPrompt() {
  const assessment = state.assessment ?? scoreAnswers(state.answers);
  const prompt = generateAiPrompt(state.answers, assessment);
  await copyText(prompt);
  flashButton(elements["copy-prompt"], "提示词已复制");
}

function printReport() {
  window.print();
}

async function shareReport() {
  if (shareInProgress) {
    return;
  }
  const report = elements["report-content"].textContent.trim();
  await copyText(`${report}\n\n${window.location.href}`);
  flashButton(elements["share-report"], "分享内容已复制");

  const isMobileShare = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (navigator.share && isMobileShare) {
    shareInProgress = true;
    try {
      await navigator.share({
        title: "Human 3.0 自我评估报告",
        text: report.slice(0, 1200),
        url: window.location.href
      });
      return;
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }
    } finally {
      shareInProgress = false;
    }
  }
}

async function copyPublicLink() {
  await copyText(window.location.href);
  flashButton(elements["copy-link"], "链接已复制");
}

function updateQrLink() {
  const qrUrl = new URL("https://api.qrserver.com/v1/create-qr-code/");
  qrUrl.searchParams.set("size", "240x240");
  qrUrl.searchParams.set("data", window.location.href);
  elements["qr-link"].href = qrUrl.toString();
}

function exportSessionJson() {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    answers: state.answers,
    currentQuestion: state.currentQuestion,
    assessment: state.assessment ?? scoreAnswers(state.answers)
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "human3-assessment-session.json";
  link.click();
  URL.revokeObjectURL(url);
}

async function importSession(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }
  try {
    const payload = JSON.parse(await file.text());
    if (!payload.answers || typeof payload.answers !== "object") {
      throw new Error("Invalid session file");
    }
    state.answers = payload.answers;
    state.currentQuestion = Math.min(
      Number(payload.currentQuestion) || 0,
      questions.length - 1
    );
    state.assessment = scoreAnswers(state.answers);
    elements["report-content"].textContent = generateReport(
      state.answers,
      state.assessment
    );
    showView("report");
    flashButton(elements["import-json"], "记录已导入");
  } catch {
    window.alert("这个文件无法识别，请选择由本页面导出的 JSON 文件。");
  } finally {
    event.target.value = "";
  }
}

async function openAiTarget(target) {
  await copyPrompt();
  const url = target === "claude" ? "https://claude.ai/new" : "https://chatgpt.com/";
  window.open(url, "_blank", "noopener,noreferrer");
}

function downloadReport() {
  const report = elements["report-content"].textContent.trim() || "还没有生成报告。";
  const blob = new Blob([report], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "human3-assessment-report.md";
  link.click();
  URL.revokeObjectURL(url);
}

function flashButton(button, text) {
  const original = button.textContent;
  button.textContent = text;
  window.setTimeout(() => {
    button.textContent = original;
  }, 1500);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function initApp() {
  cacheElements();

  elements["start-test"].addEventListener("click", startTest);
  elements["view-dashboard"].addEventListener("click", () => showView("dashboard"));
  elements["prev-question"].addEventListener("click", goPrevious);
  elements["skip-question"].addEventListener("click", skipQuestion);
  elements["next-question"].addEventListener("click", goNext);
  elements["save-local"].addEventListener("click", saveLocal);
  elements["copy-report"].addEventListener("click", copyReport);
  elements["copy-prompt"].addEventListener("click", copyPrompt);
  elements["download-report"].addEventListener("click", downloadReport);
  elements["print-report"].addEventListener("click", printReport);
  elements["share-report"].addEventListener("click", shareReport);
  elements["copy-link"].addEventListener("click", copyPublicLink);
  elements["export-json"].addEventListener("click", exportSessionJson);
  elements["import-json"].addEventListener("click", () => {
    elements["import-file"].click();
  });
  elements["import-file"].addEventListener("change", importSession);
  elements["open-chatgpt"].addEventListener("click", () => openAiTarget("chatgpt"));
  elements["open-claude"].addEventListener("click", () => openAiTarget("claude"));
  elements["clear-local"].addEventListener("click", clearLocal);
  updateQrLink();

  document.querySelectorAll("[data-view-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.viewTarget;
      if (target === "test") {
        startTest();
        return;
      }
      const targetSection = document.getElementById(target);
      if (targetSection) {
        showView(target === "sources" ? "dashboard" : target);
        if (target === "sources") {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  const saved = localStore.load();
  if (saved?.answers && Object.keys(saved.answers).length) {
    elements["start-test"].textContent = "继续上次测试";
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
}

if (typeof document !== "undefined") {
  initApp();
}
