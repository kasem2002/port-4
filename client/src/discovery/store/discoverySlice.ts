import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_LANG } from "@/store/languageSlice";
import type {
  BriefAsset,
  BriefProduct,
  BriefReview,
  BriefTeamMember,
  ClientBrief,
  FileRef,
  Lang,
  WeekDay,
} from "@/types";

/**
 * `crypto.randomUUID` needs a secure context, which a plain-HTTP deployment
 * won't have. This keeps ids working there too.
 */
function makeId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const emptyProduct = (): BriefProduct => ({
  id: makeId(),
  name: "",
  description: "",
  price: "",
  image: null,
  featured: false,
});

const emptyReview = (): BriefReview => ({
  id: makeId(),
  customerName: "",
  text: "",
  rating: 5,
});

const emptyTeamMember = (): BriefTeamMember => ({
  id: makeId(),
  name: "",
  position: "",
  bio: "",
  photo: null,
});

const DAYS: WeekDay[] = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];

export const emptyBrief = (): ClientBrief => ({
  // Overwritten from the active language when the form mounts; this only
  // matters for the instant before that runs.
  locale: DEFAULT_LANG,
  business: {
    name: "",
    type: "",
    typeOther: "",
    duration: "",
    location: "",
    hasBranches: "",
    branchCount: 1,
    description: "",
  },
  goals: {
    reasons: [],
    reasonOther: "",
    primaryGoal: "",
    primaryGoalOther: "",
    targetAudience: [],
    audienceOther: "",
    audienceDescription: "",
  },
  services: {
    offeringType: "",
    quantity: "",
    products: [],
    showPrices: "",
    hasPackages: "",
    packageDetails: "",
    hasOffers: "",
    offerDetails: "",
  },
  website: {
    sections: [],
    sectionOther: "",
    features: [],
    featureOther: "",
    languages: [],
    languageOther: "",
    rtl: "",
  },
  brand: {
    hasLogo: "",
    logo: null,
    hasColors: "",
    colors: ["#D85A30"],
    visualStyle: [],
    desiredFeeling: [],
    feelingOther: "",
  },
  design: {
    animationLevel: 3,
    threeDLevel: "",
    interactions: [],
    interactionOther: "",
    avoid: [],
    avoidOther: "",
    references: [""],
  },
  content: { availability: "", photos: "", videos: "" },
  trust: {
    differentiators: "",
    competitiveAdvantage: "",
    trustFactors: [],
    trustFactorOther: "",
    hasReviews: "",
    reviews: [],
  },
  team: { showTeam: "", members: [] },
  contact: {
    whatsapp: "",
    phone: "",
    email: "",
    instagram: "",
    facebook: "",
    otherSocial: "",
    maps: "",
    address: "",
  },
  businessHours: DAYS.map((day) => ({ day, closed: false, open: "09:00", close: "18:00" })),
  assets: [],
  final: {
    primaryAction: "",
    keywords: ["", "", ""],
    mustInclude: "",
    mustAvoid: "",
    additionalNotes: "",
  },
});

/** 0–4 are the authoring steps, 5 is review, 6 is the success screen. */
export type DiscoveryStep = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface DiscoveryState {
  step: number;
  /** Highest step reached, so the progress bar allows jumping back. */
  furthestStep: number;
  form: ClientBrief;
  /** Keyed by dot-path, e.g. `business.name`. */
  errors: Record<string, string>;
  touchedSteps: string[];
  status: "idle" | "submitting" | "success" | "error";
  /** Set once the server accepts the brief. */
  submittedAt: string | null;
}

const initialState: DiscoveryState = {
  step: 0,
  furthestStep: 0,
  form: emptyBrief(),
  errors: {},
  touchedSteps: [],
  status: "idle",
  submittedAt: null,
};

/** Writes `value` at a dot-path inside the draft, creating objects as needed. */
function setDeep(target: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let cursor = target;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i] as string;
    if (cursor[key] == null) cursor[key] = {};
    cursor = cursor[key] as Record<string, unknown>;
  }
  cursor[keys[keys.length - 1] as string] = value;
}

function readDeep(target: Record<string, unknown>, path: string): unknown {
  let cursor: unknown = target;
  for (const key of path.split(".")) {
    if (cursor == null) return undefined;
    cursor = (cursor as Record<string, unknown>)[key];
  }
  return cursor;
}

const discoverySlice = createSlice({
  name: "discovery",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
      if (action.payload > state.furthestStep) state.furthestStep = action.payload;
    },
    markStepTouched(state, action: PayloadAction<number>) {
      const key = String(action.payload);
      if (!state.touchedSteps.includes(key)) state.touchedSteps.push(key);
    },
    setLocale(state, action: PayloadAction<Lang>) {
      state.form.locale = action.payload;
    },

    setField(state, action: PayloadAction<{ path: string; value: unknown }>) {
      setDeep(state.form as unknown as Record<string, unknown>, action.payload.path, action.payload.value);
    },
    toggleArrayField(state, action: PayloadAction<{ path: string; value: string }>) {
      const { path, value } = action.payload;
      const current = (readDeep(state.form as unknown as Record<string, unknown>, path) as string[]) ?? [];
      const index = current.indexOf(value);
      const next = index === -1 ? [...current, value] : current.filter((v) => v !== value);
      setDeep(state.form as unknown as Record<string, unknown>, path, next);
    },

    // Products
    addProduct(state) {
      state.form.services.products.push(emptyProduct());
    },
    updateProduct(state, action: PayloadAction<{ id: string; patch: Partial<BriefProduct> }>) {
      const product = state.form.services.products.find((p) => p.id === action.payload.id);
      if (product) Object.assign(product, action.payload.patch);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.form.services.products = state.form.services.products.filter(
        (p) => p.id !== action.payload,
      );
    },

    // Reviews
    addReview(state) {
      state.form.trust.reviews.push(emptyReview());
    },
    updateReview(state, action: PayloadAction<{ id: string; patch: Partial<BriefReview> }>) {
      const review = state.form.trust.reviews.find((r) => r.id === action.payload.id);
      if (review) Object.assign(review, action.payload.patch);
    },
    removeReview(state, action: PayloadAction<string>) {
      state.form.trust.reviews = state.form.trust.reviews.filter((r) => r.id !== action.payload);
    },

    // Team
    addTeamMember(state) {
      state.form.team.members.push(emptyTeamMember());
    },
    updateTeamMember(state, action: PayloadAction<{ id: string; patch: Partial<BriefTeamMember> }>) {
      const member = state.form.team.members.find((m) => m.id === action.payload.id);
      if (member) Object.assign(member, action.payload.patch);
    },
    removeTeamMember(state, action: PayloadAction<string>) {
      state.form.team.members = state.form.team.members.filter((m) => m.id !== action.payload);
    },

    // Reference URLs
    addReference(state) {
      state.form.design.references.push("");
    },
    updateReference(state, action: PayloadAction<{ index: number; value: string }>) {
      state.form.design.references[action.payload.index] = action.payload.value;
    },
    removeReference(state, action: PayloadAction<number>) {
      state.form.design.references.splice(action.payload, 1);
      // Always leave one empty row so the field never disappears entirely.
      if (state.form.design.references.length === 0) state.form.design.references.push("");
    },

    // Business hours
    updateHours(
      state,
      action: PayloadAction<{ day: WeekDay; patch: Partial<{ closed: boolean; open: string; close: string }> }>,
    ) {
      const row = state.form.businessHours.find((h) => h.day === action.payload.day);
      if (row) Object.assign(row, action.payload.patch);
    },

    updateKeyword(state, action: PayloadAction<{ index: number; value: string }>) {
      state.form.final.keywords[action.payload.index] = action.payload.value;
    },

    // Assets — these hold server URLs, not file bytes.
    addAsset(state, action: PayloadAction<Omit<BriefAsset, "id" | "category"> & { category?: string }>) {
      state.form.assets.push({
        id: makeId(),
        category: action.payload.category ?? "other",
        url: action.payload.url,
        originalName: action.payload.originalName,
        mimeType: action.payload.mimeType,
        size: action.payload.size,
      });
    },
    removeAsset(state, action: PayloadAction<string>) {
      state.form.assets = state.form.assets.filter((a) => a.id !== action.payload);
    },

    setLogo(state, action: PayloadAction<FileRef | null>) {
      state.form.brand.logo = action.payload;
    },

    setErrors(state, action: PayloadAction<Record<string, string>>) {
      state.errors = action.payload;
    },
    clearError(state, action: PayloadAction<string>) {
      delete state.errors[action.payload];
    },

    setStatus(state, action: PayloadAction<DiscoveryState["status"]>) {
      state.status = action.payload;
    },
    markSubmitted(state, action: PayloadAction<string>) {
      state.status = "success";
      state.submittedAt = action.payload;
      state.step = 6;
    },

    resetDiscovery() {
      return { ...initialState, form: emptyBrief() };
    },
  },
});

export const {
  setStep,
  markStepTouched,
  setLocale,
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
  setLogo,
  setErrors,
  clearError,
  setStatus,
  markSubmitted,
  resetDiscovery,
} = discoverySlice.actions;

export default discoverySlice.reducer;
