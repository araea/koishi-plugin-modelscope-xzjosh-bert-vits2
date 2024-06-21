import {Context, Schema, Logger, h} from 'koishi'

export const name = 'modelscope-xzjosh-bert-vits2'
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

export interface Config {
}

export const Config: Schema<Config> = Schema.object({})

// jk*
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

export function apply(ctx: Context) {
  // cl*
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
    },    {
      author: 'xzjosh',
      name: '东雪莲',
      model: 'Azuma-Bert-VITS2-2.3',
      speaker: '东雪莲',
      SDPRatio: 0.5,
      Noise: 0.5,
      NoiseW: 0.9,
      Length: 1,
      language: 'auto',
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
    },    {
      author: 'xzjosh',
      name: '明前奶绿',
      model: 'LAPLACE-Bert-VITS2-2.3',
      speaker: '明前奶绿',
      SDPRatio: 0.5,
      Noise: 0.5,
      NoiseW: 0.9,
      Length: 1,
      language: 'auto',
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
    },
    {
      author: 'xzjosh',
      name: '阿梓',
      model: 'Azusa-Bert-VITS2-2.3',
      speaker: '阿梓',
      SDPRatio: 0.5,
      Noise: 0.5,
      NoiseW: 0.9,
      Length: 1,
      language: 'auto',
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
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
      xStudioToken: '95fd469f-c15a-4730-b9b0-8dde923c5395',
    },
    // ...
  ]

  // zl*
  ctx.command('bertVit', 'AI语音合成帮助')
    .action(async ({session}) => {
      await session.execute(`bertVit -h`);
    });

  for (const studio of studios) {
    ctx.command(`bertVit.${studio.name} <text:text>`, `AI${studio.name}语音合成`)
      .action(async ({session}, text) => {
        if (!text) {
          await session.send(`缺少文本参数。`);
          return;
        }
        const response = await sendStudioRequest(text, studio);
        const url = generateUrl(studio, response);
        return h.audio(url);
      });
  }

  // hs*
  function generateUrl(studio: Studio, response: Response): string {
    const baseUrl = 'https://s5k.cn/api/v1/studio';
    const fileName = response.data[1].name;
    return `${baseUrl}/${studio.author}/${studio.model}/gradio/file=${fileName}`;
  }

  async function sendStudioRequest(text: string, studio: Studio): Promise<Response> {
    const requestId = studio.xStudioToken || generateRequestId();
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
}
