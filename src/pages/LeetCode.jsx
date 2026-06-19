import { useEffect, useMemo, useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import MetricRing from '../components/MetricRing.jsx';
import { fetchDailyLeetCodeStats, leetCodeUsername } from '../services/leetcode.js';

export default function LeetCode() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async (force = false) => {
    setLoading(true);
    const data = await fetchDailyLeetCodeStats(leetCodeUsername, { force });
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    loadStats(false);
  }, []);

  const maxDifficulty = useMemo(() => {
    if (!stats) return 1;
    return Math.max(stats.easySolved, stats.mediumSolved, stats.hardSolved, 1);
  }, [stats]);

  const updatedText = stats?.updatedAt
    ? new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(stats.updatedAt))
    : 'Fetching latest count';

  return (
    <section id="leetcode" className="section leetcode-section">
      <div className="container leetcode-layout">
        <div>
          <SectionHeader
            eyebrow="LeetCode"
            title="Daily refreshed problem-solving count."
            description="The website fetches LeetCode stats once per day for the configured username, caches the result for that date, and refreshes automatically on the next calendar day."
          />
          <div className="leetcode-actions">
            <a className="btn secondary" href={`https://leetcode.com/${leetCodeUsername}/`} target="_blank" rel="noreferrer">
              View LeetCode Profile
            </a>
            <button className="btn ghost" type="button" onClick={() => loadStats(true)} disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh now'}
            </button>
          </div>
          {stats?.error && (
            <p className="inline-warning">
              Live API fallback active: {stats.error}. Set <code>VITE_LEETCODE_USERNAME</code> in Firebase/Vite env if the username is different.
            </p>
          )}
        </div>

        <div className="leetcode-card">
          <div className="leetcode-card-head">
            <div>
              <span>Username</span>
              <strong>{leetCodeUsername}</strong>
            </div>
            <div className={`status-chip ${stats?.stale ? 'stale' : ''}`}>{stats?.stale ? 'Stale cache' : 'Daily live'}</div>
          </div>

          <div className="total-solved">
            <span>Total Solved</span>
            <strong>{loading ? '...' : stats?.totalSolved ?? 0}</strong>
            <small>Last updated: {updatedText}</small>
          </div>

          <div className="rings-grid">
            <MetricRing label="Easy" value={loading ? '...' : stats?.easySolved ?? 0} max={maxDifficulty} className="easy" />
            <MetricRing label="Medium" value={loading ? '...' : stats?.mediumSolved ?? 0} max={maxDifficulty} className="medium" />
            <MetricRing label="Hard" value={loading ? '...' : stats?.hardSolved ?? 0} max={maxDifficulty} className="hard" />
          </div>

          <div className="leetcode-meta">
            <div><span>Ranking</span><strong>{loading ? '...' : stats?.ranking ?? '—'}</strong></div>
            <div><span>Acceptance</span><strong>{loading ? '...' : stats?.acceptanceRate ?? '—'}</strong></div>
            <div><span>Source</span><strong>{loading ? '...' : stats?.source ?? '—'}</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}
