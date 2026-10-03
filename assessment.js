import { quadrants, questions } from "./questions.js";

const quadrantKeys = Object.keys(quadrants);

function average(values) {
  if (!values.length) {
    return 1.5;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function levelFromAverage(value) {
  if (value < 1.8) {
    return "Level 1.0";
  }
  if (value < 2.4) {
    return "Level 1.0 偏高，进入 Level 2.0 初段";
  }
  if (value < 2.8) {
    return "Level 2.0";
  }
  return "Level 3.0 初现";
}

function phaseFromAverage(value) {
  if (value < 1.8) {
    return "Dissonance";
  }
  if (value < 2.4) {
    return "Uncertainty";
  }
  return "Discovery";
}

function selectedOptionText(question, answer) {
  if (question.type === "text") {
    return typeof answer === "string" ? answer.trim() : "";
  }
  return question.options.find((option) => option.level === answer)?.label ?? "";
}

function buildEvidence(quadrantKey, answers) {
  return questions
    .filter((question) => question.quadrant === quadrantKey)
    .map((question) => selectedOptionText(question, answers[question.id]))
    .filter(Boolean)
    .slice(0, 3);
}

function detectPrimaryConstraint(answers) {
  if (
    answers.vocation_income === 1 ||
    answers.vocation_followup === 1 ||
    answers.vocation_pricing === 1
  ) {
    return "已有的能力没有稳定转化成收入或资源，交易、定价和持续行动是首要缺口。";
  }
  if (answers.body_bp === 1 || answers.body_exercise === 1 || answers.body_sleep === 1) {
    return "身体基础和健康指标没有稳定管理，精力系统会限制其他象限。";
  }
  if (answers.mind_public === 1 || answers.mind_emotion === 1) {
    return "公开表达和情绪处理不足，市场反馈无法形成稳定循环。";
  }
  if (answers.vocation_product === 1 || answers.vocation_experiment === 1) {
    return "仍停留在准备和搭建阶段，缺少真实付费验证。";
  }
  return "主要约束需要结合文字回答进一步识别，但当前系统已经具备持续推进基础。";
}

export function scoreAnswers(answers = {}) {
  const scored = {};

  for (const quadrantKey of quadrantKeys) {
    const values = questions
      .filter((question) => question.quadrant === quadrantKey && question.type === "choice")
      .map((question) => answers[question.id])
      .filter((value) => typeof value === "number");
    const value = average(values);
    const evidence = buildEvidence(quadrantKey, answers);

    scored[quadrantKey] = {
      average: Number(value.toFixed(2)),
      levelLabel: levelFromAverage(value),
      phaseLabel: phaseFromAverage(value),
      evidence
    };
  }

  return {
    quadrants: scored,
    primaryConstraint: detectPrimaryConstraint(answers)
  };
}
