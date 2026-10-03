export const quadrants = {
  mind: {
    label: "Mind 心智",
    shortLabel: "心智",
    description: "认知、情绪、思维模式、自我意识和学习能力。"
  },
  body: {
    label: "Body 身体",
    shortLabel: "身体",
    description: "健康、睡眠、运动、精力、饮食和压力恢复。"
  },
  spirit: {
    label: "Spirit 精神",
    shortLabel: "精神",
    description: "价值观、意义感、关系、家庭、社区和人生方向。"
  },
  vocation: {
    label: "Vocation 事业",
    shortLabel: "事业",
    description: "工作、收入、技能、商业能力、系统和自由度。"
  }
};

export const questions = [
  {
    id: "mind_conflict",
    quadrant: "mind",
    type: "choice",
    prompt: "当遇到和你原有观点冲突的新信息时，你通常怎么做？",
    options: [
      { label: "先看它是否符合我原来的判断", level: 1 },
      { label: "会思考，但多数时候仍坚持自己的方法", level: 2 },
      { label: "主动寻找其中可能正确的部分，再更新判断", level: 3 }
    ]
  },
  {
    id: "mind_criticism",
    quadrant: "mind",
    type: "choice",
    prompt: "别人指出你的问题时，你第一反应更接近哪一种？",
    options: [
      { label: "容易不舒服，先想解释或反驳", level: 1 },
      { label: "表面接受，内心会先保护自己", level: 2 },
      { label: "先分辨哪些是真的，再决定怎么调整", level: 3 }
    ]
  },
  {
    id: "mind_emotion",
    quadrant: "mind",
    type: "choice",
    prompt: "焦虑、羞耻或压力出现时，你通常怎么处理？",
    options: [
      { label: "被情绪推着走，靠回避或拖延缓解", level: 1 },
      { label: "知道自己在逃避，但很难立刻行动", level: 2 },
      { label: "能命名情绪，并做一个最小有效动作", level: 3 }
    ]
  },
  {
    id: "mind_public",
    quadrant: "mind",
    type: "choice",
    prompt: "你是否持续公开表达、分享或交付自己的观点？",
    options: [
      { label: "很少公开，怕被评价或觉得没必要", level: 1 },
      { label: "偶尔发布，但没有稳定节奏", level: 2 },
      { label: "有稳定输出，并能根据反馈迭代", level: 3 }
    ]
  },
  {
    id: "mind_text",
    quadrant: "mind",
    type: "text",
    prompt: "最近半年，你学过什么？其中哪些已经变成实际行动或外部结果？"
  },
  {
    id: "body_sleep",
    quadrant: "body",
    type: "choice",
    prompt: "你的睡眠通常是什么状态？",
    options: [
      { label: "经常熬夜或睡不够，白天靠硬撑", level: 1 },
      { label: "想调整，但作息不稳定", level: 2 },
      { label: "大部分时间稳定，能恢复精力", level: 3 }
    ]
  },
  {
    id: "body_exercise",
    quadrant: "body",
    type: "choice",
    prompt: "你过去一个月的运动情况更接近哪一种？",
    options: [
      { label: "基本不运动", level: 1 },
      { label: "偶尔运动，但不成系统", level: 2 },
      { label: "规律运动，有最基本的身体训练", level: 3 }
    ]
  },
  {
    id: "body_bp",
    quadrant: "body",
    type: "choice",
    prompt: "如果你有长期健康指标风险，你会怎么处理？",
    options: [
      { label: "很少监测，靠感觉判断", level: 1 },
      { label: "知道要注意，但记录不规律", level: 2 },
      { label: "规律记录，并按专业建议处理", level: 3 }
    ]
  },
  {
    id: "body_energy",
    quadrant: "body",
    type: "choice",
    prompt: "你一天中的精力通常什么时候最好？",
    options: [
      { label: "经常疲惫，精力忽高忽低", level: 1 },
      { label: "有高峰期，但常被杂事打断", level: 2 },
      { label: "大致知道自己的节奏，并会保护高能时段", level: 3 }
    ]
  },
  {
    id: "body_text",
    quadrant: "body",
    type: "text",
    prompt: "过去一年，身体给过你哪些明确信号？你做过什么处理？"
  },
  {
    id: "spirit_relationship",
    quadrant: "spirit",
    type: "choice",
    prompt: "你现在身边有没有可以稳定倾诉、交流和支持的人？",
    options: [
      { label: "几乎没有，大部分事自己扛", level: 1 },
      { label: "有一两个，但不常联系", level: 2 },
      { label: "有稳定的高质量连接", level: 3 }
    ]
  },
  {
    id: "spirit_meaning",
    quadrant: "spirit",
    type: "choice",
    prompt: "你现在的意义感主要来自哪里？",
    options: [
      { label: "主要来自外部认可、责任和生存压力", level: 1 },
      { label: "来自个人成长、成就和证明自己", level: 2 },
      { label: "来自创造、贡献和更长期的方向", level: 3 }
    ]
  },
  {
    id: "spirit_vulnerability",
    quadrant: "spirit",
    type: "choice",
    prompt: "你是否能在可信的人面前表达脆弱和真实困难？",
    options: [
      { label: "很难，习惯保持形象", level: 1 },
      { label: "偶尔可以，但会保留很多", level: 2 },
      { label: "可以在少数可信关系中真实表达", level: 3 }
    ]
  },
  {
    id: "spirit_direction",
    quadrant: "spirit",
    type: "choice",
    prompt: "你对未来三到五年的方向有多清楚？",
    options: [
      { label: "不清楚，主要先应付眼前", level: 1 },
      { label: "有方向，但经常摇摆和调整", level: 2 },
      { label: "方向清楚，能据此做取舍", level: 3 }
    ]
  },
  {
    id: "spirit_text",
    quadrant: "spirit",
    type: "text",
    prompt: "如果三年后不用为现金流焦虑，你理想中的普通一周是什么样？"
  },
  {
    id: "vocation_income",
    quadrant: "vocation",
    type: "choice",
    prompt: "你的收入结构更接近哪一种？",
    options: [
      { label: "主要靠出售时间，一停就没有收入", level: 1 },
      { label: "有技能和客户，但还缺系统和复利", level: 2 },
      { label: "有系统、产品和不同收入来源", level: 3 }
    ]
  },
  {
    id: "vocation_followup",
    quadrant: "vocation",
    type: "choice",
    prompt: "有潜在客户或询价者时，你通常怎么跟进？",
    options: [
      { label: "很少主动跟进，怕显得销售", level: 1 },
      { label: "偶尔跟进，但不稳定", level: 2 },
      { label: "有固定流程，能低压力持续跟进", level: 3 }
    ]
  },
  {
    id: "vocation_pricing",
    quadrant: "vocation",
    type: "choice",
    prompt: "你对自己定价的感受更接近哪一种？",
    options: [
      { label: "经常不好意思收钱，容易主动降价", level: 1 },
      { label: "知道该收费，但遇到关系就妥协", level: 2 },
      { label: "能用清晰边界表达价值和价格", level: 3 }
    ]
  },
  {
    id: "vocation_product",
    quadrant: "vocation",
    type: "choice",
    prompt: "你有没有一个已经产生真实付费的数字产品或标准服务？",
    options: [
      { label: "没有，仍在准备和搭建", level: 1 },
      { label: "有雏形，但成交很少", level: 2 },
      { label: "有稳定成交，并知道如何优化", level: 3 }
    ]
  },
  {
    id: "vocation_experiment",
    quadrant: "vocation",
    type: "choice",
    prompt: "如果要在 30 天内验证一个小钱产品，你现在的状态更接近哪一种？",
    options: [
      { label: "想法很多，但不知道先卖什么", level: 1 },
      { label: "有可选方向，但还没正式开卖", level: 2 },
      { label: "已有产品，能直接进入销售和迭代", level: 3 }
    ]
  },
  {
    id: "vocation_text",
    quadrant: "vocation",
    type: "text",
    prompt: "你现在可以打包出售的技能、经验和资料有哪些？"
  },
  {
    id: "diagnostic_avoidance",
    quadrant: "vocation",
    type: "text",
    prompt: "你最反复拖延或回避的具体动作是什么？"
  },
  {
    id: "diagnostic_antivision",
    quadrant: "spirit",
    type: "text",
    prompt: "如果三年后一切没有实质变化，你最怕看到什么？"
  }
];

export function getChoiceQuestions() {
  return questions.filter((question) => question.type === "choice");
}

