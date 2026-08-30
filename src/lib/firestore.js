// Thin wrapper around the Firebase Firestore modular SDK.
//
// Config is stored in localStorage under `port4:firebase` so the owner can
// paste it once through the dashboard without a rebuild. The Firebase app is
// initialized lazily on first use and cached; changing the config forces a
// re-init so a fresh config takes effect without a page reload.

import { initializeApp, getApps, deleteApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
  doc,
} from 'firebase/firestore';

const CONFIG_KEY = 'port4:firebase';
const COLLECTION = 'submissions';

let _app = null;
let _db = null;
let _appConfigHash = null;

// --- config storage --------------------------------------------------------

export function getFirebaseConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return null;
    const cfg = JSON.parse(raw);
    if (!cfg || typeof cfg !== 'object') return null;
    // Bare minimum for Firestore.
    if (!cfg.apiKey || !cfg.projectId) return null;
    return cfg;
  } catch {
    return null;
  }
}

export function setFirebaseConfig(cfg) {
  if (!cfg) {
    localStorage.removeItem(CONFIG_KEY);
  } else {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  }
  // Invalidate cache so next call picks up the new config.
  _app = null;
  _db = null;
  _appConfigHash = null;
}

export function isConfigured() {
  return !!getFirebaseConfig();
}

// --- app init --------------------------------------------------------------

function hashCfg(cfg) {
  return `${cfg.apiKey}|${cfg.projectId}|${cfg.appId || ''}`;
}

function ensureApp() {
  const cfg = getFirebaseConfig();
  if (!cfg) throw new Error('Firebase is not configured yet.');
  const h = hashCfg(cfg);
  if (_app && _appConfigHash === h) return _app;
  // Tear down any previous app so switching projects works cleanly.
  if (_app) {
    try { deleteApp(_app); } catch { /* noop */ }
  }
  const existing = getApps().find((a) => a.name === 'port4');
  _app = existing || initializeApp(cfg, 'port4');
  _appConfigHash = h;
  _db = null;
  return _app;
}

function ensureDb() {
  if (_db) return _db;
  _db = getFirestore(ensureApp());
  return _db;
}

// --- API -------------------------------------------------------------------

// Write a brief to Firestore. Returns the created doc's Firestore id.
export async function submitBrief(brief) {
  const db = ensureDb();
  const ref = await addDoc(collection(db, COLLECTION), {
    ...brief,
    _serverReceivedAt: serverTimestamp(),
  });
  return ref.id;
}

// Subscribe to the collection ordered by submittedAt desc. Returns an
// unsubscribe function. `onData` receives an array of briefs, each shaped
// exactly like a local brief plus `_docId` (the Firestore document id).
export function subscribeSubmissions(onData, onError) {
  const db = ensureDb();
  const q = query(collection(db, COLLECTION), orderBy('submittedAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({ ...d.data(), _docId: d.id }));
      onData(items);
    },
    (err) => onError && onError(err),
  );
}

// Delete a brief by Firestore doc id.
export async function deleteBrief(docId) {
  const db = ensureDb();
  await deleteDoc(doc(db, COLLECTION, docId));
}

// Small connectivity probe. Attempts to open + close a listener. Used by the
// settings panel to confirm the config actually works.
export async function testConnection() {
  return new Promise((resolve) => {
    let done = false;
    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        resolve({ ok: false, error: 'Timed out waiting for Firestore.' });
      }
    }, 6000);
    try {
      const unsub = subscribeSubmissions(
        () => {
          if (done) return;
          done = true;
          clearTimeout(timer);
          try { unsub(); } catch { /* noop */ }
          resolve({ ok: true });
        },
        (err) => {
          if (done) return;
          done = true;
          clearTimeout(timer);
          resolve({ ok: false, error: err?.message || String(err) });
        },
      );
    } catch (err) {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve({ ok: false, error: err?.message || String(err) });
    }
  });
}
