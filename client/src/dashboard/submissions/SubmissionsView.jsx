import { useState, useRef, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Panel } from '../fields.jsx';
import {
  importSubmission,
  removeSubmission,
  markSeen,
  clearAll,
} from '../../discovery/store/submissionsSlice.js';
import { downloadBrief } from '../../discovery/data/briefFile.js';
import { isConfigured, subscribeSubmissions, deleteBrief as fsDelete } from '../../lib/firestore.js';
import SubmissionDetail from './SubmissionDetail.jsx';

async function parseBriefFile(file) {
  const text = await file.text();
  const data = JSON.parse(text);
  if (!data || !data.form || !data.id) throw new Error('Not a valid brief file');
  return data;
}

export default function SubmissionsView() {
  const dispatch = useDispatch();
  const localItems = useSelector((s) => s.submissions?.items ?? []);
  const seen = useSelector((s) => s.submissions?.seen ?? {});
  const [openId, setOpenId] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Firestore live-sync layer. `live` = null until we know; boolean once set.
  const [live, setLive] = useState(null);
  const [remoteItems, setRemoteItems] = useState([]);
  const [syncError, setSyncError] = useState(null);

  useEffect(() => {
    if (!isConfigured()) {
      setLive(false);
      return;
    }
    let unsub = null;
    try {
      unsub = subscribeSubmissions(
        (rows) => {
          setLive(true);
          setSyncError(null);
          setRemoteItems(rows);
        },
        (err) => {
          setLive(false);
          setSyncError(err?.message || String(err));
        },
      );
    } catch (err) {
      setLive(false);
      setSyncError(err?.message || String(err));
    }
    return () => { try { unsub && unsub(); } catch { /* noop */ } };
  }, []);

  // Merge remote + local, de-duped by brief id, newest-first.
  const items = useMemo(() => {
    const byId = new Map();
    for (const it of remoteItems) byId.set(it.id, it);
    for (const it of localItems) if (!byId.has(it.id)) byId.set(it.id, it);
    return Array.from(byId.values()).sort(
      (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt),
    );
  }, [remoteItems, localItems]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (b) =>
        (b.businessName || '').toLowerCase().includes(q) ||
        (b.form?.business?.type || '').toLowerCase().includes(q) ||
        (b.form?.contact?.email || '').toLowerCase().includes(q) ||
        (b.form?.contact?.whatsapp || '').includes(q),
    );
  }, [items, query]);

  const handleFiles = async (fileList) => {
    setError('');
    const arr = Array.from(fileList || []);
    if (!arr.length) return;
    for (const f of arr) {
      try {
        const brief = await parseBriefFile(f);
        dispatch(importSubmission(brief));
      } catch {
        setError(`Couldn't read "${f.name}" — is it a .port4brief file?`);
      }
    }
  };

  const openBrief = (id) => {
    setOpenId(id);
    dispatch(markSeen(id));
  };
  const opened = items.find((b) => b.id === openId);

  const briefWord = items.length === 1 ? 'brief' : 'briefs';

  return (
    <>
      <Panel
        title="Client submissions"
        description={
          live
            ? 'Live-synced with your Firestore. Any new brief submitted from anywhere appears here in real time.'
            : 'Drop the .port4brief files your clients send you here. Connect live sync to receive them automatically.'
        }
        actions={
          <div className="flex items-center gap-2">
            <LiveBadge state={live} />
            <span className="rounded-full border border-ink-900/10 bg-paper-50 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-600">
              {items.length} {briefWord}
            </span>
          </div>
        }
      >
        {live === false && (
          <div className="rounded-xl border border-brand-orange/25 bg-brand-orange/8 px-4 py-3 flex items-start gap-3">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-orange text-paper-50 shrink-0 mt-0.5 font-mono text-[11px]">
              i
            </span>
            <div className="min-w-0 flex-1 text-[13px] text-ink-900">
              <p className="font-medium">
                Live sync isn't set up yet.
              </p>
              <p className="mt-1 text-ink-700">
                Right now submissions only reach this dashboard if you manually drop a
                <span className="font-mono"> .port4brief</span> file. Connect a Firestore project to receive briefs
                automatically from any device.{' '}
                <Link to="/dashboard/live-sync" className="text-brand-orange underline">
                  Set up live sync →
                </Link>
              </p>
            </div>
          </div>
        )}
        {syncError && (
          <div className="rounded-xl border border-brand-orangeDeep/30 bg-brand-orange/8 px-4 py-3 text-[13px] text-brand-orangeDeep">
            Live sync error: {syncError}. Falling back to local submissions only.
          </div>
        )}
        <label
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
          className={`block rounded-xl border-2 border-dashed p-5 cursor-pointer transition-all ${
            dragging
              ? 'border-brand-orange bg-brand-orange/5'
              : 'border-ink-900/15 bg-paper-100/40 hover:border-ink-900/30'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".port4brief,application/json,.json"
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-950 text-paper-50 shrink-0">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 16V4M6 10l6-6 6 6M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="text-[13.5px] font-medium text-ink-950">Drop .port4brief files here</p>
              <p className="text-[12.5px] text-ink-500">Or click to browse — you can drop multiple.</p>
            </div>
          </div>
          {error && <p className="mt-3 text-[13px] text-brand-orangeDeep">{error}</p>}
        </label>

        <div className="flex items-center justify-between gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by business, type, email, phone…"
            className="flex-1 max-w-md rounded-lg border border-ink-900/12 bg-paper-100/40 px-3.5 py-2 text-[13.5px] outline-none transition-colors focus:border-brand-orange focus:bg-paper-50"
          />
          {items.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Delete every imported brief? This cannot be undone.')) {
                  dispatch(clearAll());
                }
              }}
              className="text-[12.5px] text-ink-500 hover:text-brand-orangeDeep transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-ink-900/15 bg-paper-100/40 p-8 text-center">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
              {items.length === 0 ? 'No submissions yet' : 'No matches for that filter'}
            </p>
            {items.length === 0 && (
              <p className="mt-2 text-[13px] text-ink-600 max-w-md mx-auto">
                When a client submits the form at <span className="font-mono text-ink-950">/discovery</span>,
                a .port4brief file is generated. Drop it above to view it here.
              </p>
            )}
          </div>
        ) : (
          <ul className="space-y-2">
            {filtered.map((b) => (
              <SubmissionRow
                key={b.id}
                brief={b}
                unseen={!seen[b.id]}
                onOpen={() => openBrief(b.id)}
                onDownload={() => downloadBrief(b)}
                onDelete={async () => {
                  if (!window.confirm(`Delete brief from ${b.businessName}?`)) return;
                  // Try Firestore first if this row came from live sync; local
                  // fallback covers files dropped in via .port4brief.
                  if (b._docId) {
                    try { await fsDelete(b._docId); }
                    catch (err) { alert(`Couldn't delete from Firestore: ${err?.message || err}`); return; }
                  }
                  dispatch(removeSubmission(b.id));
                  if (openId === b.id) setOpenId(null);
                }}
              />
            ))}
          </ul>
        )}
      </Panel>

      {/* Detail modal */}
      <AnimatePresence>
        {opened && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink-950/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              className="fixed inset-y-4 right-4 left-4 md:left-auto md:w-[720px] rounded-3xl bg-paper-100 border border-ink-900/10 shadow-panel overflow-hidden flex flex-col"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <header className="sticky top-0 z-10 bg-paper-100/95 backdrop-blur border-b border-ink-900/10 p-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-orange">
                    Client brief
                  </p>
                  <h2 className="mt-1 font-display text-[1.6rem] tracking-tighter2 text-ink-950 truncate">
                    {opened.businessName}
                  </h2>
                  <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500">
                    {new Date(opened.submittedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => downloadBrief(opened)}
                    className="rounded-full border border-ink-900/10 bg-paper-50 px-3 py-1.5 text-[12px] hover:border-brand-orange hover:text-brand-orange transition-colors"
                    title="Download brief file"
                  >
                    Export
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenId(null)}
                    className="grid h-8 w-8 place-items-center rounded-full border border-ink-900/10 bg-paper-50 text-ink-600 hover:border-ink-900/25 hover:text-ink-950 transition-colors"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              </header>
              <div className="p-5 overflow-y-auto flex-1">
                <SubmissionDetail brief={opened} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LiveBadge({ state }) {
  if (state === null) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-paper-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-400 animate-pulse" />
        Connecting
      </span>
    );
  }
  if (state) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/30 bg-brand-green/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-greenDeep">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-paper-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
      <span className="h-1.5 w-1.5 rounded-full bg-ink-400" />
      Local only
    </span>
  );
}

function SubmissionRow({ brief, unseen, onOpen, onDownload, onDelete }) {
  const f = brief.form || {};
  const primary = f.goals?.primaryGoal || '—';
  const type = f.business?.type || '—';
  const contact = f.contact?.whatsapp || f.contact?.phone || f.contact?.email || '';
  return (
    <li className="rounded-xl border border-ink-900/10 bg-paper-50 hover:border-ink-900/25 transition-colors">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={onOpen}
          className="flex items-center gap-3 min-w-0 flex-1 text-left"
        >
          {unseen && <span className="h-2 w-2 rounded-full bg-brand-orange shrink-0" aria-label="Unread" />}
          <div className="min-w-0">
            <p className="text-[14px] font-medium text-ink-950 truncate">{brief.businessName}</p>
            <p className="mt-0.5 text-[12px] text-ink-600 truncate">
              {type} · {primary}{contact ? ` · ${contact}` : ''}
            </p>
          </div>
        </button>
        <span className="hidden md:inline font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-500 shrink-0">
          {new Date(brief.submittedAt).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onDownload}
            title="Download brief file"
            className="grid h-7 w-7 place-items-center rounded-md border border-ink-900/10 text-ink-600 hover:text-ink-900 hover:bg-paper-100 transition-colors"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M8 2v9m0 0l-3-3m3 3l3-3M3 14h10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onDelete}
            title="Delete brief"
            className="grid h-7 w-7 place-items-center rounded-md text-ink-600 hover:bg-red-50 hover:text-red-700 border border-transparent hover:border-red-200 transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </li>
  );
}
