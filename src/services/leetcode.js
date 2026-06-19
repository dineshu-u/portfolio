const USERNAME = import.meta.env.VITE_LEETCODE_USERNAME || 'dineshu_u';

const todayKey = () => new Date().toISOString().slice(0, 10);
const cacheKey = (username) => `leetcode-stats:${username}:${todayKey()}`;

const normalizeStatsApi = (data, username) => ({
  username,
  totalSolved: Number(data.totalSolved ?? data.solvedProblem ?? 0),
  easySolved: Number(data.easySolved ?? 0),
  mediumSolved: Number(data.mediumSolved ?? 0),
  hardSolved: Number(data.hardSolved ?? 0),
  ranking: data.ranking ?? data.globalRanking ?? '—',
  acceptanceRate: data.acceptanceRate ?? data.acceptance_rate ?? '—',
  contributionPoints: data.contributionPoints ?? '—',
  reputation: data.reputation ?? '—',
  source: 'leetcode-stats-api',
  updatedAt: new Date().toISOString()
});

const normalizeAlfaApi = (data, username) => ({
  username,
  totalSolved: Number(data.totalSolved ?? 0),
  easySolved: Number(data.easySolved ?? 0),
  mediumSolved: Number(data.mediumSolved ?? 0),
  hardSolved: Number(data.hardSolved ?? 0),
  ranking: data.ranking ?? '—',
  acceptanceRate: data.acceptanceRate ?? '—',
  contributionPoints: data.contributionPoint ?? data.contributionPoints ?? '—',
  reputation: data.reputation ?? '—',
  source: 'alfa-leetcode-api',
  updatedAt: new Date().toISOString()
});

const providers = [
  {
    url: (username) => `https://leetcode-stats-api.herokuapp.com/${encodeURIComponent(username)}`,
    normalize: normalizeStatsApi,
    isValid: (data) => data && data.status !== 'error' && (data.totalSolved !== undefined || data.solvedProblem !== undefined)
  },
  {
    url: (username) => `https://alfa-leetcode-api.onrender.com/userProfile/${encodeURIComponent(username)}`,
    normalize: normalizeAlfaApi,
    isValid: (data) => data && data.errors === undefined && data.totalSolved !== undefined
  }
];

export async function fetchDailyLeetCodeStats(username = USERNAME, { force = false } = {}) {
  const key = cacheKey(username);

  if (!force) {
    const cached = localStorage.getItem(key);
    if (cached) return { ...JSON.parse(cached), cached: true };
  }

  let lastError = null;

  for (const provider of providers) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8500);
      const response = await fetch(provider.url(username), {
        signal: controller.signal,
        headers: { Accept: 'application/json' }
      });
      clearTimeout(timer);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!provider.isValid(data)) throw new Error(data.message || 'Invalid LeetCode response');

      const normalized = provider.normalize(data, username);
      localStorage.setItem(key, JSON.stringify(normalized));
      cleanupOldLeetCodeCache(username, key);
      return normalized;
    } catch (error) {
      lastError = error;
    }
  }

  const previous = findMostRecentCache(username);
  if (previous) {
    return {
      ...previous,
      stale: true,
      error: lastError?.message || 'LeetCode providers unavailable'
    };
  }

  return {
    username,
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    ranking: 'Connect username',
    acceptanceRate: '—',
    contributionPoints: '—',
    reputation: '—',
    source: 'fallback',
    updatedAt: new Date().toISOString(),
    error: lastError?.message || 'Unable to fetch LeetCode stats'
  };
}

function cleanupOldLeetCodeCache(username, activeKey) {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(`leetcode-stats:${username}:`) && key !== activeKey)
    .forEach((key) => localStorage.removeItem(key));
}

function findMostRecentCache(username) {
  const match = Object.keys(localStorage)
    .filter((key) => key.startsWith(`leetcode-stats:${username}:`))
    .sort()
    .pop();

  if (!match) return null;
  try {
    return JSON.parse(localStorage.getItem(match));
  } catch {
    return null;
  }
}

export const leetCodeUsername = USERNAME;
