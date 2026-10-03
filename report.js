import { quadrants, questions } from "./questions.js";

function quadrantRows(assessment) {
  return Object.entries(quadrants)
    .map(([key, meta]) => {
      const item = assessment.quadrants[key];
      const evidence = item.evidence.length ? item.evidence.join("；") : "暂无足够回答";
      return `| ${meta.label} | ${item.levelLabel} | ${item.phaseLabel} | ${evidence} |`;
    })
    .join("\n");
}

function answerLines(answers) {
  return questions
    .map((question) => {
      const answer = answers[question.id];
      if (answer === undefined || answer === null || answer === "") {
        return null;
      }
      const value =
        question.type === "choice"
          ? question.options.find((option) => option.level === answer)?.label
          : answer;
      return `- ${question.prompt}\n  ${value}`;
    })
    .filter(Boolean)
    .join("\n");
}

export function generateReport(answers, assessment) {
  return `# Human 3.0 自我评估报告

## 一句话总评

目前更接近跨象限的过渡阶段，主要约束是：${assessment.primaryConstraint}

## 四象限评估

| 象限 | 当前层级 | 阶段 | 行为证据 |
|---|---|---|---|
${quadrantRows(assessment)}

## 主要约束

${assessment.primaryConstraint}

## 30 天行动

- 身体：建立最低运动量，规律记录健康指标。
- 现金流：明确价格边界，主动跟进潜在客户。
- 产品：只验证一个最小付费产品，不继续堆资料。
- 内容：每周至少公开输出 3 次。

## 90 天行动

- 验证 20 到 50 个付费用户。
- 形成一个可自动交付的数字产品。
- 建立固定复盘节奏。
- 让收入结构出现第二来源。

## 6 到 12 个月行动

- 把已验证产品做成产品阶梯。
- 建立内容、私域和复购系统。
- 降低对纯时间收入的依赖。
- 建立现金缓冲和身体底盘。

## 最小行动实验

优先选择一个小而具体的行动，先验证它是否能改善当前主要约束，再扩大投入。

## 原始回答

${answerLines(answers)}
`;
}

export function generateAiPrompt(answers, assessment) {
  return `请基于下面这份 Human 3.0 初步报告继续分析我。

要求：
1. 每次只问一个问题。
2. 优先追问矛盾、回避、身份和环境。
3. 不要空泛鼓励。
4. 最终输出完整人生规划，包括 30 天、90 天、6 到 12 个月行动。

初步报告：

${generateReport(answers, assessment)}

请从最重要的问题开始，继续一次只问一个问题。
`;
}
