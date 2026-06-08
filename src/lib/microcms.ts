import { createClient } from 'microcms-js-sdk';

// ─── microCMS クライアント初期化 ────────────────────────────────
if (!import.meta.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN が設定されていません。.env.local を確認してください。');
}
if (!import.meta.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY が設定されていません。.env.local を確認してください。');
}

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// ─── カテゴリーの型定義 ─────────────────────────────────────────
export type NewsCategory = 'お知らせ' | '実績' | '新着情報';

// ─── ニュース記事の型定義 ────────────────────────────────────────
export type NewsItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  category: NewsCategory;
  body?: string;
};

// ─── microCMS レスポンスの型 ─────────────────────────────────────
export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

// ─── 日付フォーマットユーティリティ ─────────────────────────────
export const formatDate = (isoString: string): string => {
  return isoString.slice(0, 10).replace(/-/g, '.');
};

export const formatDatetime = (isoString: string): string => {
  return isoString.slice(0, 10);
};

// ─── meta description 用テキスト整形 ───────────────────────────
export const toMetaDescription = (html: string, maxLength = 130): string => {
  const plain = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength - 1) + '…';
};

export const buildNewsMetaDescription = (article: Pick<NewsItem, 'title' | 'category' | 'body'>): string => {
  if (article.body) {
    const plain = article.body.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (plain.length >= 40) return toMetaDescription(article.body);
  }
  const suffix = '。株式会社イトピック（茨城県水戸市）のお知らせです。詳細はこちらからご確認ください。';
  const prefix = `【${article.category}】${article.title}`;
  const fallback = prefix + suffix;
  if (fallback.length <= 130) return fallback;
  const maxTitleLen = 130 - suffix.length - `【${article.category}】`.length - 1;
  const trimmedTitle = article.title.slice(0, Math.max(maxTitleLen, 10));
  return `【${article.category}】${trimmedTitle}…${suffix}`.slice(0, 130);
};

// ─── ニュース一覧取得（全件） ──────────────────────────────────
export const getAllNews = async (): Promise<MicroCMSListResponse<NewsItem>> => {
  try {
    return await client.getList<NewsItem>({
      endpoint: 'news',
      queries: {
        orders: '-publishedAt',
        limit: 100,
      },
    });
  } catch (e) {
    console.warn('[microCMS] getAllNews に失敗しました。APIキーを確認してください。', e);
    return { contents: [], totalCount: 0, offset: 0, limit: 100 };
  }
};

// ─── ニュース最新N件取得（トップページ用） ────────────────────
export const getLatestNews = async (limit = 3): Promise<NewsItem[]> => {
  try {
    const res = await client.getList<NewsItem>({
      endpoint: 'news',
      queries: {
        orders: '-publishedAt',
        limit,
      },
    });
    return res.contents;
  } catch (e) {
    console.warn('[microCMS] getLatestNews に失敗しました。APIキーを確認してください。', e);
    return [];
  }
};

// ─── 個別記事取得（詳細ページ用） ─────────────────────────────
export const getNewsById = async (id: string): Promise<NewsItem | null> => {
  try {
    return await client.getListDetail<NewsItem>({
      endpoint: 'news',
      contentId: id,
    });
  } catch (e) {
    console.warn(`[microCMS] getNewsById(${id}) に失敗しました。`, e);
    return null;
  }
};

// ─── 全記事IDリスト取得（getStaticPaths 用） ──────────────────
export const getAllNewsIds = async (): Promise<string[]> => {
  try {
    const res = await client.getList<NewsItem>({
      endpoint: 'news',
      queries: { limit: 100, fields: 'id' },
    });
    return res.contents.map((item) => item.id);
  } catch (e) {
    console.warn('[microCMS] getAllNewsIds に失敗しました。', e);
    return [];
  }
};
