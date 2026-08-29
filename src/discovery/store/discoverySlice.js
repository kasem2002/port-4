import { createSlice } from '@reduxjs/toolkit';

// -----------------------------------------------------------------------------
// Structured data model for a client project brief. This is intentionally verbose
// so that downstream tooling (an AI website generator) can key off named fields
// rather than needing to parse free text.
// -----------------------------------------------------------------------------

const emptyProduct = () => ({
  id: crypto.randomUUID(),
  name: '',
  description: '',
  price: '',
  image: null,
  featured: false,
});

const emptyReview = () => ({
  id: crypto.randomUUID(),
  customerName: '',
  text: '',
  rating: 5,
});

const emptyTeamMember = () => ({
  id: crypto.randomUUID(),
  name: '',
  position: '',
  bio: '',
  photo: null,
});

const emptyAsset = () => ({
  id: crypto.randomUUID(),
  name: '',
  size: 0,
  type: '',
  category: 'other',
  dataUrl: null,
});

const DAYS = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];

const initialForm = {
  meta: {
    submittedAt: null,
    version: 1,
  },
  business: {
    name: '',
    type: '',
    typeOther: '',
    duration: '',
    location: '',
    hasBranches: '',
    branchCount: 1,
    description: '',
  },
  goals: {
    reasons: [],
    reasonOther: '',
    primaryGoal: '',
    primaryGoalOther: '',
    targetAudience: [],
    audienceOther: '',
    audienceDescription: '',
  },
  services: {
    offeringType: '',
    quantity: '',
    products: [],
    showPrices: '',
    hasPackages: '',
    packageDetails: '',
    hasOffers: '',
    offerDetails: '',
  },
  website: {
    sections: [],
    sectionOther: '',
    features: [],
    featureOther: '',
    languages: [],
    languageOther: '',
    rtl: '',
  },
  brand: {
    hasLogo: '',
    logo: null,
    hasColors: '',
    colors: ['#D85A30'],
    visualStyle: [],
    desiredFeeling: [],
    feelingOther: '',
  },
  design: {
    animationLevel: 3,
    threeDLevel: '',
    interactions: [],
    interactionOther: '',
    avoid: [],
    avoidOther: '',
    references: [''],
  },
  content: {
    availability: '',
    photos: '',
    videos: '',
  },
  trust: {
    differentiators: '',
    competitiveAdvantage: '',
    trustFactors: [],
    trustFactorOther: '',
    hasReviews: '',
    reviews: [],
  },
  team: {
    showTeam: '',
    members: [],
  },
  contact: {
    whatsapp: '',
    phone: '',
    email: '',
    instagram: '',
    facebook: '',
    otherSocial: '',
    maps: '',
    address: '',
  },
  businessHours: DAYS.map((day) => ({
    day,
    closed: false,
    open: '09:00',
    close: '18:00',
  })),
  assets: [],
  final: {
    primaryAction: '',
    keywords: ['', '', ''],
    mustInclude: '',
    mustAvoid: '',
    additionalNotes: '',
  },
};

const initialState = {
  step: 0,          // 0..4 = steps, 5 = review, 6 = success
  furthestStep: 0,  // to prevent regression of progress bar
  form: initialForm,
  errors: {},       // { 'business.name': 'Please tell us your business name' }
  touchedSteps: [], // ['0', '1'] — for showing errors only after visit
  status: 'idle',   // 'idle' | 'submitting' | 'success'
};

// -----------------------------------------------------------------------------
// Slice
// -----------------------------------------------------------------------------

// Set a value at a dot-path within `form`. Creates intermediate objects only
// if needed; arrays are indexed with numeric keys.
function setDeep(obj, path, value) {
  const keys = path.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (cur[k] == null) cur[k] = {};
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
}

function toggleInArray(arr, value) {
  const i = arr.indexOf(value);
  if (i === -1) return [...arr, value];
  const out = [...arr];
  out.splice(i, 1);
  return out;
}

const discoverySlice = createSlice({
  name: 'discovery',
  initialState,
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
      if (action.payload > state.furthestStep) state.furthestStep = action.payload;
    },
    markStepTouched(state, action) {
      const s = String(action.payload);
      if (!state.touchedSteps.includes(s)) state.touchedSteps.push(s);
    },
    setField(state, action) {
      const { path, value } = action.payload;
      setDeep(state.form, `${path}`, value);
    },
    toggleArrayField(state, action) {
      const { path, value } = action.payload;
      const keys = path.split('.');
      let cur = state.form;
      for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
      const last = keys[keys.length - 1];
      cur[last] = toggleInArray(cur[last] || [], value);
    },
    addProduct(state) {
      state.form.services.products.push(emptyProduct());
    },
    updateProduct(state, action) {
      const { id, patch } = action.payload;
      const p = state.form.services.products.find((x) => x.id === id);
      if (p) Object.assign(p, patch);
    },
    removeProduct(state, action) {
      state.form.services.products = state.form.services.products.filter(
        (x) => x.id !== action.payload,
      );
    },
    addReview(state) {
      state.form.trust.reviews.push(emptyReview());
    },
    updateReview(state, action) {
      const { id, patch } = action.payload;
      const r = state.form.trust.reviews.find((x) => x.id === id);
      if (r) Object.assign(r, patch);
    },
    removeReview(state, action) {
      state.form.trust.reviews = state.form.trust.reviews.filter(
        (x) => x.id !== action.payload,
      );
    },
    addTeamMember(state) {
      state.form.team.members.push(emptyTeamMember());
    },
    updateTeamMember(state, action) {
      const { id, patch } = action.payload;
      const m = state.form.team.members.find((x) => x.id === id);
      if (m) Object.assign(m, patch);
    },
    removeTeamMember(state, action) {
      state.form.team.members = state.form.team.members.filter(
        (x) => x.id !== action.payload,
      );
    },
    addReference(state) {
      state.form.design.references.push('');
    },
    updateReference(state, action) {
      const { index, value } = action.payload;
      state.form.design.references[index] = value;
    },
    removeReference(state, action) {
      state.form.design.references.splice(action.payload, 1);
      if (state.form.design.references.length === 0) {
        state.form.design.references.push('');
      }
    },
    updateHours(state, action) {
      const { day, patch } = action.payload;
      const h = state.form.businessHours.find((x) => x.day === day);
      if (h) Object.assign(h, patch);
    },
    updateKeyword(state, action) {
      const { index, value } = action.payload;
      state.form.final.keywords[index] = value;
    },
    addAsset(state, action) {
      state.form.assets.push({ ...emptyAsset(), ...action.payload });
    },
    removeAsset(state, action) {
      state.form.assets = state.form.assets.filter((x) => x.id !== action.payload);
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    clearError(state, action) {
      const path = action.payload;
      const next = { ...state.errors };
      delete next[path];
      state.errors = next;
    },
    setStatus(state, action) {
      state.status = action.payload;
      if (action.payload === 'success') {
        state.form.meta.submittedAt = new Date().toISOString();
      }
    },
    hydrateDiscovery(state, action) {
      const payload = action.payload || {};
      if (payload.form) state.form = { ...initialForm, ...payload.form };
      if (typeof payload.step === 'number') state.step = payload.step;
      if (typeof payload.furthestStep === 'number') state.furthestStep = payload.furthestStep;
      if (Array.isArray(payload.touchedSteps)) state.touchedSteps = payload.touchedSteps;
    },
    resetDiscovery() {
      return initialState;
    },
  },
});

export const {
  setStep,
  markStepTouched,
  setField,
  toggleArrayField,
  addProduct,
  updateProduct,
  removeProduct,
  addReview,
  updateReview,
  removeReview,
  addTeamMember,
  updateTeamMember,
  removeTeamMember,
  addReference,
  updateReference,
  removeReference,
  updateHours,
  updateKeyword,
  addAsset,
  removeAsset,
  setErrors,
  clearError,
  setStatus,
  hydrateDiscovery,
  resetDiscovery,
} = discoverySlice.actions;

export default discoverySlice.reducer;

// Selector helpers used across step components.
export const selectField = (path) => (state) => {
  const keys = path.split('.');
  let cur = state.discovery.form;
  for (const k of keys) {
    if (cur == null) return undefined;
    cur = cur[k];
  }
  return cur;
};
