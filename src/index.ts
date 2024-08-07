import {Context, Schema, Logger, h, Service} from 'koishi'
import {} from 'koishi-plugin-monetary'

export const name = 'modelscope-xzjosh-bert-vits2'
export const inject = {
  required: ['database'],
  optional: ['monetary'],
}
export const usage = `## 🎮 使用

使用格式：\`bertVit.角色名 <文本>\`

示例：
\`\`\`
bertVit.冰糖 你好，我是冰糖，很高兴认识你！
\`\`\`

## 🌼 指令

本插件支持以下角色的语音合成：

- 冰糖
- 陈泽
- 坏女人星瞳
- 梅西
- 珈乐
- 乃琳
- 七海
- 永雏塔菲
- 东雪莲
- 明前奶绿
- 尼奈
- 科比
- 丁真
- 炫神
- 电棍
- 阿梓
- 星瞳
- 孙笑川
- 向晚
- 嘉然
- 剑魔
- 贝拉
- 扇宝
- 恬豆
- 黑桃影
- 外卖姐姐扇宝
- 鹿鸣
- 文静

每个角色都可以使用 \`bertVit.角色名 <文本>\` 的格式进行语音合成。

## 🐱 QQ 群

- 956758505
`

// pz* pzx*
export interface Config {
  maxTextCharacterLimit: number;
  userTextToSpeechIntervalLimit: number;
  perInvocationCurrencyCost: number;
  shouldSendPostPurchaseNotification: boolean;
  vitsCharacterVoice: string;
}

export const Config: Schema<Config> = Schema.object({
  maxTextCharacterLimit: Schema.number().min(1).default(500).description(`文本长度限制。`),
  userTextToSpeechIntervalLimit: Schema.number().min(0).default(0).description(`用户语音合成间隔限制（秒）。`),
  perInvocationCurrencyCost: Schema.number().min(0).default(0).description(`每次语音合成消耗的货币数量，需加载 monetary 服务。`),
  shouldSendPostPurchaseNotification: Schema.boolean().default(false).description(`是否在用户消费后发送提示消息。`),
  vitsCharacterVoice: Schema.union(['冰糖', '陈泽', '坏女人星瞳', '梅西', '珈乐', '乃琳', '七海', '永雏塔菲', '东雪莲', '明前奶绿', '尼奈', '科比', '丁真', '炫神', '电棍', '阿梓', '星瞳', '孙笑川', '向晚', '嘉然', '剑魔', '贝拉', '扇宝', '恬豆', '黑桃影', '外卖姐姐扇宝', '鹿鸣', '文静']).default('文静').description(`提供 Vits 服务的角色语音。`),
}) as any

// smb*
declare module 'koishi' {
  interface Tables {
    bert_vits_user_log_table: BertVitsUserLogTable;
  }
}

// jk*
export interface BertVitsUserLogTable {
  id: number;
  userId: string;
  timestamp: string;
}

interface Studio {
  author: string;
  name: string;
  model: string;
  speaker: string;
  SDPRatio: number;
  Noise: number;
  NoiseW: number;
  Length: number;
  language: string;
  xStudioToken?: string;
}

interface ResponseData {
  data: null;
  is_file: boolean;
  name: string;
  orig_name: string;
}

interface Response {
  average_duration: number;
  data: [string, ResponseData];
  duration: number;
  is_generating: boolean;
  modelscope_request_id: string;
}

// fw*
declare module 'koishi' {
  interface Context {
    vits: VitsService
  }
}

interface VitsOptions {
  speaker_id?: number;
  input: string;
}

class VitsService extends Service {
  constructor(ctx: Context, config: Config) {
    super(ctx, 'vits', true);
    this.config = config
  }

  async say(options: VitsOptions) {
    const foundStudio = findStudioByName(this.config.vitsCharacterVoice);
    const response = await sendStudioRequest(options.input, foundStudio);
    const url = generateUrl(foundStudio, response);
    return h.audio(url);
  }
  //
}

// qjcl*
const logger = new Logger(name)
const studios: Studio[] = [
  {
    author: 'xzjosh',
    name: '冰糖',
    model: 'BT-Bert-VITS2-2.3',
    speaker: '冰糖IO',
    SDPRatio: 0.6,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '陈泽',
    model: 'Ze-Bert-VITS2-2.3',
    speaker: '陈泽',
    SDPRatio: 0.6,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '坏女人星瞳',
    model: 'badXT-Bert-VITS2-2.3',
    speaker: '坏女人星瞳',
    SDPRatio: 0.6,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '梅西',
    model: 'Messi-Bert-VITS2-2.3',
    speaker: 'Messi',
    SDPRatio: 0.6,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '珈乐',
    model: 'Carol-Bert-VITS2-2.3',
    speaker: '珈乐',
    SDPRatio: 0.5,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '乃琳',
    model: 'Queen-Bert-VITS2-2.3',
    speaker: '乃琳',
    SDPRatio: 0.5,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '七海',
    model: 'Nana7mi-Bert-VITS2-2.3',
    speaker: '七海',
    SDPRatio: 0.5,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '永雏塔菲',
    model: 'Taffy-Bert-VITS2-2.3',
    speaker: '永雏塔菲',
    SDPRatio: 0.5,
    Noise: 0.6,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  }, {
    author: 'xzjosh',
    name: '东雪莲',
    model: 'Azuma-Bert-VITS2-2.3',
    speaker: '东雪莲',
    SDPRatio: 0.5,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  }, {
    author: 'xzjosh',
    name: '明前奶绿',
    model: 'LAPLACE-Bert-VITS2-2.3',
    speaker: '明前奶绿',
    SDPRatio: 0.5,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '尼奈',
    model: 'nine-Bert-VITS2-2.3',
    speaker: '尼奈',
    SDPRatio: 0.5,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '科比',
    model: 'Kobe-Bert-VITS2-2.3',
    speaker: '科比',
    SDPRatio: 0.5,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '丁真',
    model: 'DZ-Bert-VITS2-2.3',
    speaker: '丁真',
    SDPRatio: 0.5,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '炫神',
    model: 'Xuan-Bert-VITS2-2.3',
    speaker: '炫神',
    SDPRatio: 0.5,
    Noise: 0.6,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '电棍',
    model: 'otto-Bert-VITS2-2.3',
    speaker: 'otto',
    SDPRatio: 0.5,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'ck123111',
    name: '阿梓',
    model: 'Azusa-Bert-VITS2',
    speaker: '阿梓',
    SDPRatio: 0.5,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '星瞳',
    model: '2568-Bert-VITS2',
    speaker: '星瞳',
    SDPRatio: 0.2,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '孙笑川',
    model: 'SXC-Bert-VITS2',
    speaker: '孙笑川',
    SDPRatio: 0.2,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '向晚',
    model: 'Ava-Bert-VITS2',
    speaker: 'Ava',
    SDPRatio: 0.2,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '嘉然',
    model: 'Diana-Bert-VITS2',
    speaker: 'Diana',
    SDPRatio: 0.2,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '剑魔',
    model: 'Aatrox-Bert-VITS2',
    speaker: 'Aatrox',
    SDPRatio: 0.2,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '贝拉',
    model: 'Bella-Bert-VITS2',
    speaker: 'Bella',
    SDPRatio: 0.2,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '扇宝',
    model: 'ShanBao-Bert-VITS2',
    speaker: 'ShanBao',
    SDPRatio: 0.2,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '恬豆',
    model: 'Bekki-Bert-VITS2',
    speaker: 'Bekki',
    SDPRatio: 0.2,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '黑桃影',
    model: 'Echo-Bert-VITS2',
    speaker: 'Echo',
    SDPRatio: 0.2,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '外卖姐姐扇宝',
    model: 'maimai-Bert-VITS2',
    speaker: 'WaiMai',
    SDPRatio: 0.2,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '鹿鸣',
    model: 'Lumi-Bert-VITS2',
    speaker: 'Lumi',
    SDPRatio: 0.2,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  {
    author: 'xzjosh',
    name: '文静',
    model: 'Wenjing-Bert-VITS2',
    speaker: 'Wenjing',
    SDPRatio: 0.2,
    Noise: 0.5,
    NoiseW: 0.9,
    Length: 1,
    language: 'auto',

  },
  // ...
]

// zhs*
export async function apply(ctx: Context, config: Config) {
  ctx.plugin(VitsService, config)
  // tzb*
  ctx.model.extend('bert_vits_user_log_table', {
    id: 'unsigned',
    userId: 'string',
    timestamp: 'string',
  }, {primary: 'id', autoInc: true})

  // zl*
  ctx.command('bertVit', 'AI语音合成帮助')
    .action(async ({session}) => {
      await session.execute(`bertVit -h`);
    });

  for (const studio of studios) {
    // bertvit* bt*
    ctx.command(`bertVit.${studio.name} <text:text>`, `AI${studio.name}语音合成`)
      .action(async ({session}, text) => {
        const {userId, timestamp, user} = session;
        if (!text) {
          await session.send(`缺少文本参数。`);
          return;
        }
        if (text.length > config.maxTextCharacterLimit) {
          await session.send(`文本长度超过限制（${config.maxTextCharacterLimit}）。`);
          return;
        }
        if (config.userTextToSpeechIntervalLimit > 0) {
          const userLog = await ctx.database.get('bert_vits_user_log_table', {userId});
          if (userLog.length === 0) {
            await ctx.database.create('bert_vits_user_log_table', {userId, timestamp: String(timestamp)});
          } else {
            const lastTimestamp = Number(userLog[0].timestamp)
            const timeDifference = calculateTimeDifference(lastTimestamp, timestamp)
            const remainingWaitTime = Math.floor(config.userTextToSpeechIntervalLimit - timeDifference);
            if (timeDifference < config.userTextToSpeechIntervalLimit) {
              await session.send(`请等待 ${remainingWaitTime} 秒后再使用语音合成功能。`);
              return;
            }
            await ctx.database.set('bert_vits_user_log_table', {userId}, {timestamp: String(timestamp)});
          }
        }
        if (config.perInvocationCurrencyCost > 0) {
          if (!ctx.monetary) {
            return `需加载 monetary 服务。`
          }
          // @ts-ignore
          const uid = user.id
          const getUserMonetary = await ctx.database.get('monetary', {uid});
          if (getUserMonetary.length === 0) {
            await ctx.database.create('monetary', {uid, value: 0, currency: 'default'});
            return `您的余额为 0，语音合成需 ${config.perInvocationCurrencyCost}。`
          }
          const userMonetary = getUserMonetary[0];
          const userMoney = userMonetary.value;
          if (userMoney < config.perInvocationCurrencyCost) {
            return `您的余额为 ${userMoney}，语音合成需 ${config.perInvocationCurrencyCost}。`
          }
          await ctx.database.set('monetary', {uid}, {value: userMoney - config.perInvocationCurrencyCost});
          if (config.shouldSendPostPurchaseNotification) {
            await session.send(`请求成功，消费 ${config.perInvocationCurrencyCost}，剩余 ${userMoney - config.perInvocationCurrencyCost}。`);
          }
        }
        try {
          const response = await sendStudioRequest(text, studio);
          const url = generateUrl(studio, response);
          return h.audio(url);
        } catch (error) {
          return `AI ${studio.name}语音合成失败，请重试。`
        }
      });
  }

} // apply

// qjhs*
function calculateTimeDifference(previousTimestamp: number, currentTimestamp: number): number {
  return (currentTimestamp - previousTimestamp) / 1000;
}

function findStudioByName(name: string): Studio | undefined {
  return studios.find(studio => studio.name === name);
}

async function getToken(): Promise<string> {
  const url = 'https://www.modelscope.cn/api/v1/studios/token';
  const headers = {
    'Cookie': 't=090f6e697c1d60a81d7f5b226738bb6e; h_uid=2217158702449; m_session_id=35910835-8295-4da7-8cd4-025e4f4eb3cd; csrf_session=MTcyMTgxMjQ1OXxEdi1CQkFFQ180SUFBUkFCRUFBQU12LUNBQUVHYzNSeWFXNW5EQW9BQ0dOemNtWlRZV3gwQm5OMGNtbHVad3dTQUJCSFZUbGhiRFY2YTFSMWFWUnZXbU5xfF75rWiyp0hmp211EgY693namxillAM8rcujtM60hgQB; csrf_token=7ta9xcnVH002DRTKrPV21b4JLuA%3D; acw_tc=0bcd4cd217227387236874791ea0d1755bff373017648fc0b563e66a4434d3; tfstk=fkXiUBiYU1R1oVoYS9v_MCNq6WFp1V9XfZHvkKL4Te8IWVHO0tbcPavxBP9O0xYhlILwWEH2mNQIBFkxMSbc0N8Z5lsYi-bhPCr4fIKVK_XihAOVn6McVi6TfKE6CG9X3zU8eZj1fK_yPqnYJMr2cZahOnyRfGiEjqrRT8hcZVdbjE72_BSe0elqQZlZLkx2DVlqQZSUxnTebER23BJem3K20X-Y_F6VL9zwHCpH8_f5KhAw9G8E3H6HjCYPbjHq3mtMsUSw-zb_SPAFcIXjcxAPb__X4NuaoE6hYO5Pzyh97_xc2sjaQvJOCG5ygTzjgavGoQWwtmkMdGLHKHWzDbTdKFQVIBr-EIpFeQJN9Wa9MdxluO_imx7PvgB6Ot4o8E19Vp-chulDoISyUXlrZHkXYoBEGjOwAHY7TPXtVvTYeiZ3xbrX_Ht6ykqnGjOwAHY8xkczcC-BfUC..; isg=BGtrOlVRiRwA19b3-efjJE7Q-o9VgH8C2KEqkt3oR6oBfIveZVAPUgna0jwSx9f6'
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Success && data.Data && data.Data.Token) {
      return data.Data.Token;
    } else {
      throw new Error('未能从响应中获取令牌。');
    }
  } catch (error) {
    logger.error('获取令牌时出错：', error);
    throw error;
  }
}

function generateUrl(studio: Studio, response: Response): string {
  const baseUrl = 'https://s5k.cn/api/v1/studio';
  const fileName = response.data[1].name;
  return `${baseUrl}/${studio.author}/${studio.model}/gradio/file=${fileName}`;
}

async function sendStudioRequest(text: string, studio: Studio): Promise<Response> {
  // const requestId = studio.xStudioToken || generateRequestId();
  const requestId = await getToken();
  const sessionHash = generateSessionHash();
  const url = `https://s5k.cn/api/v1/studio/${studio.author}/${studio.model}/gradio/run/predict`;
  const headers = {
    'Content-Type': 'application/json',
    'x-studio-token': requestId
  };

  const body = {
    data: [
      text,
      studio.speaker,
      studio.SDPRatio,
      studio.Noise,
      studio.NoiseW,
      studio.Length,
      studio.language,
      null,
      "Happy",
      "Text prompt",
      "",
      0.7
    ],
    event_data: null,
    fn_index: 0,
    dataType: ["textbox", "dropdown", "slider", "slider", "slider", "slider", "dropdown", "audio", "textbox", "radio", "textbox", "slider"],
    session_hash: sessionHash
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    logger.error(`AI ${studio.name}语音合成时出现了一个问题：`, error);
    throw error;
  }
}

function generateRequestId(): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const sections = [8, 4, 4, 4, 12];

  const generateSection = (length: number): string => {
    return Array.from({length}, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  };

  return sections.map(generateSection).join('-');
}

function generateSessionHash(): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}
