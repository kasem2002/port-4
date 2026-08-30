import { useState } from 'react';
import { Panel } from '../fields.jsx';
import { getFirebaseConfig, setFirebaseConfig, testConnection } from '../../lib/firestore.js';

// Compact template so the user knows exactly what to paste.
const TEMPLATE = `{
  "apiKey": "…",
  "authDomain": "your-app.firebaseapp.com",
  "projectId": "your-app",
  "storageBucket": "your-app.appspot.com",
  "messagingSenderId": "…",
  "appId": "…"
}`;

const RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /submissions/{doc} {
      allow create: if true;                  // anyone can submit
      allow read, delete: if false;           // dashboard uses admin/anon
    }
  }
}`;

export default function LiveSyncSettings() {
  const existing = getFirebaseConfig();
  const [raw, setRaw] = useState(existing ? JSON.stringify(existing, null, 2) : '');
  const [status, setStatus] = useState(null); // { kind, msg }
  const [testing, setTesting] = useState(false);

  const save = () => {
    setStatus(null);
    if (!raw.trim()) {
      setFirebaseConfig(null);
      setStatus({ kind: 'ok', msg: 'Config cleared. Submissions will only save locally.' });
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      if (!parsed.apiKey || !parsed.projectId) {
        setStatus({ kind: 'err', msg: 'That config is missing apiKey or projectId.' });
        return;
      }
      setFirebaseConfig(parsed);
      setStatus({ kind: 'ok', msg: 'Saved. Try the connection test to confirm.' });
    } catch (e) {
      setStatus({ kind: 'err', msg: `Not valid JSON: ${e.message}` });
    }
  };

  const test = async () => {
    setStatus(null);
    setTesting(true);
    const res = await testConnection();
    setTesting(false);
    if (res.ok) setStatus({ kind: 'ok', msg: 'Connected. Live sync is on.' });
    else setStatus({ kind: 'err', msg: `Connection failed: ${res.error}` });
  };

  return (
    <>
      <Panel
        title="Live sync"
        description="Connect the submissions dashboard to a Firestore database so every client submission — from any device — appears here in real time."
        actions={
          <ConnectionBadge configured={!!existing} />
        }
      >
        <div>
          <label className="block font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-600 mb-2">
            Firebase config (paste as JSON)
          </label>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            spellCheck={false}
            placeholder={TEMPLATE}
            rows={10}
            className="w-full rounded-lg border border-ink-900/12 bg-paper-100/40 px-3.5 py-2.5 font-mono text-[12.5px] text-ink-950 outline-none transition-colors focus:border-brand-orange focus:bg-paper-50 resize-none leading-relaxed"
            dir="ltr"
          />
          <p className="mt-2 text-[12.5px] text-ink-500">
            Get this from Firebase Console → Project settings → General → Your apps → Web app → SDK setup & config.
            Only paste values from the <span className="font-mono">firebaseConfig</span> object.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={save}
            className="rounded-full bg-ink-950 text-paper-50 px-4 py-2 text-[13px] font-medium hover:bg-brand-orange transition-colors"
          >
            Save config
          </button>
          <button
            type="button"
            onClick={test}
            disabled={testing || !existing}
            className="rounded-full border border-ink-900/12 bg-paper-50 px-4 py-2 text-[13px] font-medium text-ink-900 hover:border-ink-900/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {testing ? 'Testing…' : 'Test connection'}
          </button>
          {existing && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Disconnect from Firebase? Local submissions stay put.')) {
                  setFirebaseConfig(null);
                  setRaw('');
                  setStatus({ kind: 'ok', msg: 'Disconnected.' });
                }
              }}
              className="ml-auto text-[12.5px] text-ink-500 hover:text-brand-orangeDeep transition-colors"
            >
              Disconnect
            </button>
          )}
        </div>

        {status && (
          <div
            className={`rounded-xl px-4 py-3 text-[13px] ${
              status.kind === 'ok'
                ? 'border border-brand-green/30 bg-brand-green/10 text-brand-greenDeep'
                : 'border border-brand-orangeDeep/30 bg-brand-orange/8 text-brand-orangeDeep'
            }`}
          >
            {status.msg}
          </div>
        )}
      </Panel>

      <Panel
        title="Setup — Firebase"
        description="One-time, ~5 minutes. Do this in your browser, then paste the config above."
      >
        <ol className="list-decimal list-inside space-y-2 text-[13.5px] text-ink-800 leading-relaxed">
          <li>
            Go to{' '}
            <a
              href="https://console.firebase.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange underline"
            >
              console.firebase.google.com
            </a>{' '}
            and click <b>Add project</b>. Name it anything (e.g. <span className="font-mono">port-4</span>). Analytics is optional.
          </li>
          <li>
            In the new project, click the <b>Web icon (&lt;/&gt;)</b> to register a web app. Give it a nickname and skip the hosting option.
          </li>
          <li>
            Firebase shows you a <span className="font-mono">firebaseConfig</span> object with 6 lines. Copy the values into the JSON box above, save, then test.
          </li>
          <li>
            In the left sidebar go to <b>Build → Firestore Database → Create database</b>. Pick a region close to you. Start in <b>production mode</b>.
          </li>
          <li>
            Open the <b>Rules</b> tab and paste the rules below. Publish. This lets anyone submit a brief but nobody read them without your key.
          </li>
        </ol>

        <div>
          <label className="block font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-600 mb-2">
            Firestore rules
          </label>
          <pre className="rounded-lg border border-ink-900/12 bg-ink-950 text-paper-50 p-4 overflow-x-auto font-mono text-[12px] leading-relaxed" dir="ltr">
{RULES}
          </pre>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(RULES)}
            className="mt-2 text-[12px] text-ink-500 hover:text-brand-orange transition-colors"
          >
            Copy rules
          </button>
        </div>

        <p className="text-[12.5px] text-ink-500">
          The <b>allow read, delete: if false</b> rule means the public web can't list or delete submissions —
          but your dashboard still can, because it runs with the same client SDK from your browser. If you'd
          like tighter security later, we can move it behind Firebase Auth.
        </p>
      </Panel>
    </>
  );
}

function ConnectionBadge({ configured }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] border ${
        configured
          ? 'border-brand-green/30 bg-brand-green/10 text-brand-greenDeep'
          : 'border-ink-900/10 bg-paper-50 text-ink-500'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${configured ? 'bg-brand-green' : 'bg-ink-400'}`}
      />
      {configured ? 'Live' : 'Local only'}
    </span>
  );
}
