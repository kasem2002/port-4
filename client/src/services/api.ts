import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/store";
import type {
  AboutBullet,
  AdminUser,
  BudgetRange,
  ClientBrief,
  Inquiry,
  LoginResponse,
  MarqueeItem,
  NavItem,
  Overview,
  Partner,
  ProcessStep,
  Project,
  ProjectType,
  Service,
  SiteContent,
  SiteSettings,
  SocialLink,
  Stat,
  Submission,
  SubmissionStats,
  SubmissionSummary,
  TeamRole,
  UploadedFile,
} from "@/types";

/** Tag names used for cache invalidation across the dashboard. */
const TAGS = [
  "Content",
  "Settings",
  "Nav",
  "Social",
  "Marquee",
  "Stat",
  "AboutBullet",
  "TeamRole",
  "Service",
  "ProcessStep",
  "Project",
  "Partner",
  "ProjectType",
  "Budget",
  "Submission",
  "Inquiry",
  "Overview",
] as const;

type Tag = (typeof TAGS)[number];

/** `providesTags` for a collection: each row plus a LIST sentinel. */
function listTags<T extends { id: string }>(tag: Tag) {
  return (result: T[] | undefined) =>
    result
      ? [...result.map((r) => ({ type: tag, id: r.id })), { type: tag, id: "LIST" as const }]
      : [{ type: tag, id: "LIST" as const }];
}

/**
 * Editing content changes what the public site renders, so every content
 * mutation also invalidates the aggregate `Content` cache.
 */
function writeTags(tag: Tag) {
  return [{ type: tag, id: "LIST" as const }, "Content" as const];
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: TAGS,
  endpoints: (builder) => ({
    // ─── Auth ────────────────────────────────────────────────────────────────
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    getMe: builder.query<AdminUser, void>({
      query: () => "/auth/me",
    }),
    changePassword: builder.mutation<void, { currentPassword: string; newPassword: string }>({
      query: (body) => ({ url: "/auth/password", method: "POST", body }),
    }),

    // ─── Public site ─────────────────────────────────────────────────────────
    getSiteContent: builder.query<SiteContent, void>({
      query: () => "/content",
      providesTags: ["Content"],
    }),

    // ─── Settings ────────────────────────────────────────────────────────────
    getSettings: builder.query<SiteSettings, void>({
      query: () => "/settings",
      providesTags: ["Settings"],
    }),
    updateSettings: builder.mutation<SiteSettings, Partial<SiteSettings>>({
      query: (body) => ({ url: "/settings", method: "PUT", body }),
      invalidatesTags: ["Settings", "Content"],
    }),

    // ─── Navigation ──────────────────────────────────────────────────────────
    getNav: builder.query<NavItem[], void>({
      query: () => "/nav",
      providesTags: listTags<NavItem>("Nav"),
    }),
    createNavItem: builder.mutation<NavItem, Partial<NavItem>>({
      query: (body) => ({ url: "/nav", method: "POST", body }),
      invalidatesTags: writeTags("Nav"),
    }),
    updateNavItem: builder.mutation<NavItem, { id: string; body: Partial<NavItem> }>({
      query: ({ id, body }) => ({ url: `/nav/${id}`, method: "PATCH", body }),
      invalidatesTags: writeTags("Nav"),
    }),
    deleteNavItem: builder.mutation<void, string>({
      query: (id) => ({ url: `/nav/${id}`, method: "DELETE" }),
      invalidatesTags: writeTags("Nav"),
    }),
    reorderNav: builder.mutation<NavItem[], string[]>({
      query: (ids) => ({ url: "/nav/reorder", method: "POST", body: { ids } }),
      invalidatesTags: writeTags("Nav"),
    }),

    // ─── Social links ────────────────────────────────────────────────────────
    getSocial: builder.query<SocialLink[], void>({
      query: () => "/social",
      providesTags: listTags<SocialLink>("Social"),
    }),
    createSocialLink: builder.mutation<SocialLink, Partial<SocialLink>>({
      query: (body) => ({ url: "/social", method: "POST", body }),
      invalidatesTags: writeTags("Social"),
    }),
    updateSocialLink: builder.mutation<SocialLink, { id: string; body: Partial<SocialLink> }>({
      query: ({ id, body }) => ({ url: `/social/${id}`, method: "PATCH", body }),
      invalidatesTags: writeTags("Social"),
    }),
    deleteSocialLink: builder.mutation<void, string>({
      query: (id) => ({ url: `/social/${id}`, method: "DELETE" }),
      invalidatesTags: writeTags("Social"),
    }),
    reorderSocial: builder.mutation<SocialLink[], string[]>({
      query: (ids) => ({ url: "/social/reorder", method: "POST", body: { ids } }),
      invalidatesTags: writeTags("Social"),
    }),

    // ─── Marquee ─────────────────────────────────────────────────────────────
    getMarquee: builder.query<MarqueeItem[], void>({
      query: () => "/marquee",
      providesTags: listTags<MarqueeItem>("Marquee"),
    }),
    createMarqueeItem: builder.mutation<MarqueeItem, Partial<MarqueeItem>>({
      query: (body) => ({ url: "/marquee", method: "POST", body }),
      invalidatesTags: writeTags("Marquee"),
    }),
    updateMarqueeItem: builder.mutation<MarqueeItem, { id: string; body: Partial<MarqueeItem> }>({
      query: ({ id, body }) => ({ url: `/marquee/${id}`, method: "PATCH", body }),
      invalidatesTags: writeTags("Marquee"),
    }),
    deleteMarqueeItem: builder.mutation<void, string>({
      query: (id) => ({ url: `/marquee/${id}`, method: "DELETE" }),
      invalidatesTags: writeTags("Marquee"),
    }),
    reorderMarquee: builder.mutation<MarqueeItem[], string[]>({
      query: (ids) => ({ url: "/marquee/reorder", method: "POST", body: { ids } }),
      invalidatesTags: writeTags("Marquee"),
    }),

    // ─── Stats ───────────────────────────────────────────────────────────────
    getStats: builder.query<Stat[], void>({
      query: () => "/stats",
      providesTags: listTags<Stat>("Stat"),
    }),
    createStat: builder.mutation<Stat, Partial<Stat>>({
      query: (body) => ({ url: "/stats", method: "POST", body }),
      invalidatesTags: writeTags("Stat"),
    }),
    updateStat: builder.mutation<Stat, { id: string; body: Partial<Stat> }>({
      query: ({ id, body }) => ({ url: `/stats/${id}`, method: "PATCH", body }),
      invalidatesTags: writeTags("Stat"),
    }),
    deleteStat: builder.mutation<void, string>({
      query: (id) => ({ url: `/stats/${id}`, method: "DELETE" }),
      invalidatesTags: writeTags("Stat"),
    }),
    reorderStats: builder.mutation<Stat[], string[]>({
      query: (ids) => ({ url: "/stats/reorder", method: "POST", body: { ids } }),
      invalidatesTags: writeTags("Stat"),
    }),

    // ─── About bullets ───────────────────────────────────────────────────────
    getAboutBullets: builder.query<AboutBullet[], void>({
      query: () => "/about-bullets",
      providesTags: listTags<AboutBullet>("AboutBullet"),
    }),
    createAboutBullet: builder.mutation<AboutBullet, Partial<AboutBullet>>({
      query: (body) => ({ url: "/about-bullets", method: "POST", body }),
      invalidatesTags: writeTags("AboutBullet"),
    }),
    updateAboutBullet: builder.mutation<AboutBullet, { id: string; body: Partial<AboutBullet> }>({
      query: ({ id, body }) => ({ url: `/about-bullets/${id}`, method: "PATCH", body }),
      invalidatesTags: writeTags("AboutBullet"),
    }),
    deleteAboutBullet: builder.mutation<void, string>({
      query: (id) => ({ url: `/about-bullets/${id}`, method: "DELETE" }),
      invalidatesTags: writeTags("AboutBullet"),
    }),
    reorderAboutBullets: builder.mutation<AboutBullet[], string[]>({
      query: (ids) => ({ url: "/about-bullets/reorder", method: "POST", body: { ids } }),
      invalidatesTags: writeTags("AboutBullet"),
    }),

    // ─── Team roles ──────────────────────────────────────────────────────────
    getTeamRoles: builder.query<TeamRole[], void>({
      query: () => "/team-roles",
      providesTags: listTags<TeamRole>("TeamRole"),
    }),
    createTeamRole: builder.mutation<TeamRole, Partial<TeamRole>>({
      query: (body) => ({ url: "/team-roles", method: "POST", body }),
      invalidatesTags: writeTags("TeamRole"),
    }),
    updateTeamRole: builder.mutation<TeamRole, { id: string; body: Partial<TeamRole> }>({
      query: ({ id, body }) => ({ url: `/team-roles/${id}`, method: "PATCH", body }),
      invalidatesTags: writeTags("TeamRole"),
    }),
    deleteTeamRole: builder.mutation<void, string>({
      query: (id) => ({ url: `/team-roles/${id}`, method: "DELETE" }),
      invalidatesTags: writeTags("TeamRole"),
    }),
    reorderTeamRoles: builder.mutation<TeamRole[], string[]>({
      query: (ids) => ({ url: "/team-roles/reorder", method: "POST", body: { ids } }),
      invalidatesTags: writeTags("TeamRole"),
    }),

    // ─── Services ────────────────────────────────────────────────────────────
    getServices: builder.query<Service[], void>({
      query: () => "/services",
      providesTags: listTags<Service>("Service"),
    }),
    createService: builder.mutation<Service, Partial<Service>>({
      query: (body) => ({ url: "/services", method: "POST", body }),
      invalidatesTags: writeTags("Service"),
    }),
    updateService: builder.mutation<Service, { id: string; body: Partial<Service> }>({
      query: ({ id, body }) => ({ url: `/services/${id}`, method: "PATCH", body }),
      invalidatesTags: writeTags("Service"),
    }),
    deleteService: builder.mutation<void, string>({
      query: (id) => ({ url: `/services/${id}`, method: "DELETE" }),
      invalidatesTags: writeTags("Service"),
    }),
    reorderServices: builder.mutation<Service[], string[]>({
      query: (ids) => ({ url: "/services/reorder", method: "POST", body: { ids } }),
      invalidatesTags: writeTags("Service"),
    }),

    // ─── Process steps ───────────────────────────────────────────────────────
    getProcessSteps: builder.query<ProcessStep[], void>({
      query: () => "/process",
      providesTags: listTags<ProcessStep>("ProcessStep"),
    }),
    createProcessStep: builder.mutation<ProcessStep, Partial<ProcessStep>>({
      query: (body) => ({ url: "/process", method: "POST", body }),
      invalidatesTags: writeTags("ProcessStep"),
    }),
    updateProcessStep: builder.mutation<ProcessStep, { id: string; body: Partial<ProcessStep> }>({
      query: ({ id, body }) => ({ url: `/process/${id}`, method: "PATCH", body }),
      invalidatesTags: writeTags("ProcessStep"),
    }),
    deleteProcessStep: builder.mutation<void, string>({
      query: (id) => ({ url: `/process/${id}`, method: "DELETE" }),
      invalidatesTags: writeTags("ProcessStep"),
    }),
    reorderProcessSteps: builder.mutation<ProcessStep[], string[]>({
      query: (ids) => ({ url: "/process/reorder", method: "POST", body: { ids } }),
      invalidatesTags: writeTags("ProcessStep"),
    }),

    // ─── Projects ────────────────────────────────────────────────────────────
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",
      providesTags: listTags<Project>("Project"),
    }),
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (body) => ({ url: "/projects", method: "POST", body }),
      invalidatesTags: writeTags("Project"),
    }),
    updateProject: builder.mutation<Project, { id: string; body: Partial<Project> }>({
      query: ({ id, body }) => ({ url: `/projects/${id}`, method: "PATCH", body }),
      invalidatesTags: writeTags("Project"),
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({ url: `/projects/${id}`, method: "DELETE" }),
      invalidatesTags: writeTags("Project"),
    }),
    reorderProjects: builder.mutation<Project[], string[]>({
      query: (ids) => ({ url: "/projects/reorder", method: "POST", body: { ids } }),
      invalidatesTags: writeTags("Project"),
    }),

    // ─── Partners ────────────────────────────────────────────────────────────
    getPartners: builder.query<Partner[], void>({
      query: () => "/partners",
      providesTags: listTags<Partner>("Partner"),
    }),
    createPartner: builder.mutation<Partner, Partial<Partner>>({
      query: (body) => ({ url: "/partners", method: "POST", body }),
      invalidatesTags: writeTags("Partner"),
    }),
    updatePartner: builder.mutation<Partner, { id: string; body: Partial<Partner> }>({
      query: ({ id, body }) => ({ url: `/partners/${id}`, method: "PATCH", body }),
      invalidatesTags: writeTags("Partner"),
    }),
    deletePartner: builder.mutation<void, string>({
      query: (id) => ({ url: `/partners/${id}`, method: "DELETE" }),
      invalidatesTags: writeTags("Partner"),
    }),
    reorderPartners: builder.mutation<Partner[], string[]>({
      query: (ids) => ({ url: "/partners/reorder", method: "POST", body: { ids } }),
      invalidatesTags: writeTags("Partner"),
    }),

    // ─── Contact form chips ──────────────────────────────────────────────────
    getProjectTypes: builder.query<ProjectType[], void>({
      query: () => "/project-types",
      providesTags: listTags<ProjectType>("ProjectType"),
    }),
    createProjectType: builder.mutation<ProjectType, Partial<ProjectType>>({
      query: (body) => ({ url: "/project-types", method: "POST", body }),
      invalidatesTags: writeTags("ProjectType"),
    }),
    updateProjectType: builder.mutation<ProjectType, { id: string; body: Partial<ProjectType> }>({
      query: ({ id, body }) => ({ url: `/project-types/${id}`, method: "PATCH", body }),
      invalidatesTags: writeTags("ProjectType"),
    }),
    deleteProjectType: builder.mutation<void, string>({
      query: (id) => ({ url: `/project-types/${id}`, method: "DELETE" }),
      invalidatesTags: writeTags("ProjectType"),
    }),

    getBudgets: builder.query<BudgetRange[], void>({
      query: () => "/budgets",
      providesTags: listTags<BudgetRange>("Budget"),
    }),
    createBudget: builder.mutation<BudgetRange, Partial<BudgetRange>>({
      query: (body) => ({ url: "/budgets", method: "POST", body }),
      invalidatesTags: writeTags("Budget"),
    }),
    updateBudget: builder.mutation<BudgetRange, { id: string; body: Partial<BudgetRange> }>({
      query: ({ id, body }) => ({ url: `/budgets/${id}`, method: "PATCH", body }),
      invalidatesTags: writeTags("Budget"),
    }),
    deleteBudget: builder.mutation<void, string>({
      query: (id) => ({ url: `/budgets/${id}`, method: "DELETE" }),
      invalidatesTags: writeTags("Budget"),
    }),

    // ─── Submissions ─────────────────────────────────────────────────────────
    /** Public — a client anywhere submits their brief. */
    createSubmission: builder.mutation<{ id: string; submittedAt: string }, ClientBrief>({
      query: (body) => ({ url: "/submissions", method: "POST", body }),
      invalidatesTags: [{ type: "Submission", id: "LIST" }, "Overview"],
    }),
    getSubmissions: builder.query<SubmissionSummary[], { status?: string; search?: string } | void>({
      query: (params) => ({ url: "/submissions", params: params ?? undefined }),
      providesTags: listTags<SubmissionSummary>("Submission"),
    }),
    getSubmission: builder.query<Submission, string>({
      query: (id) => `/submissions/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Submission", id }],
    }),
    getSubmissionStats: builder.query<SubmissionStats, void>({
      query: () => "/submissions/stats",
      providesTags: [{ type: "Submission", id: "LIST" }],
    }),
    updateSubmission: builder.mutation<
      Submission,
      { id: string; status?: string; isRead?: boolean }
    >({
      query: ({ id, ...body }) => ({ url: `/submissions/${id}`, method: "PATCH", body }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: "Submission", id },
        { type: "Submission", id: "LIST" },
        "Overview",
      ],
    }),
    deleteSubmission: builder.mutation<void, string>({
      query: (id) => ({ url: `/submissions/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Submission", id: "LIST" }, "Overview"],
    }),

    // ─── Inquiries ───────────────────────────────────────────────────────────
    createInquiry: builder.mutation<{ id: string }, Omit<Inquiry, "id" | "status" | "isRead" | "createdAt" | "updatedAt">>({
      query: (body) => ({ url: "/inquiries", method: "POST", body }),
      invalidatesTags: [{ type: "Inquiry", id: "LIST" }, "Overview"],
    }),
    getInquiries: builder.query<Inquiry[], { status?: string; search?: string } | void>({
      query: (params) => ({ url: "/inquiries", params: params ?? undefined }),
      providesTags: listTags<Inquiry>("Inquiry"),
    }),
    updateInquiry: builder.mutation<Inquiry, { id: string; status?: string; isRead?: boolean }>({
      query: ({ id, ...body }) => ({ url: `/inquiries/${id}`, method: "PATCH", body }),
      invalidatesTags: [{ type: "Inquiry", id: "LIST" }, "Overview"],
    }),
    deleteInquiry: builder.mutation<void, string>({
      query: (id) => ({ url: `/inquiries/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Inquiry", id: "LIST" }, "Overview"],
    }),

    // ─── Overview ────────────────────────────────────────────────────────────
    getOverview: builder.query<Overview, void>({
      query: () => "/overview",
      providesTags: ["Overview"],
    }),

    // ─── Uploads ─────────────────────────────────────────────────────────────
    uploadFile: builder.mutation<UploadedFile, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return { url: "/uploads", method: "POST", body: formData };
      },
    }),
    uploadFiles: builder.mutation<UploadedFile[], File[]>({
      query: (files) => {
        const formData = new FormData();
        files.forEach((f) => formData.append("files", f));
        return { url: "/uploads/batch", method: "POST", body: formData };
      },
    }),
  }),
});

export const {
  // Auth
  useLoginMutation,
  useGetMeQuery,
  useChangePasswordMutation,
  // Public site
  useGetSiteContentQuery,
  // Settings
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  // Nav
  useGetNavQuery,
  useCreateNavItemMutation,
  useUpdateNavItemMutation,
  useDeleteNavItemMutation,
  useReorderNavMutation,
  // Social
  useGetSocialQuery,
  useCreateSocialLinkMutation,
  useUpdateSocialLinkMutation,
  useDeleteSocialLinkMutation,
  useReorderSocialMutation,
  // Marquee
  useGetMarqueeQuery,
  useCreateMarqueeItemMutation,
  useUpdateMarqueeItemMutation,
  useDeleteMarqueeItemMutation,
  useReorderMarqueeMutation,
  // Stats
  useGetStatsQuery,
  useCreateStatMutation,
  useUpdateStatMutation,
  useDeleteStatMutation,
  useReorderStatsMutation,
  // About
  useGetAboutBulletsQuery,
  useCreateAboutBulletMutation,
  useUpdateAboutBulletMutation,
  useDeleteAboutBulletMutation,
  useReorderAboutBulletsMutation,
  useGetTeamRolesQuery,
  useCreateTeamRoleMutation,
  useUpdateTeamRoleMutation,
  useDeleteTeamRoleMutation,
  useReorderTeamRolesMutation,
  // Services
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useReorderServicesMutation,
  // Process
  useGetProcessStepsQuery,
  useCreateProcessStepMutation,
  useUpdateProcessStepMutation,
  useDeleteProcessStepMutation,
  useReorderProcessStepsMutation,
  // Projects
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useReorderProjectsMutation,
  // Partners
  useGetPartnersQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
  useReorderPartnersMutation,
  // Contact chips
  useGetProjectTypesQuery,
  useCreateProjectTypeMutation,
  useUpdateProjectTypeMutation,
  useDeleteProjectTypeMutation,
  useGetBudgetsQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
  // Submissions
  useCreateSubmissionMutation,
  useGetSubmissionsQuery,
  useGetSubmissionQuery,
  useGetSubmissionStatsQuery,
  useUpdateSubmissionMutation,
  useDeleteSubmissionMutation,
  // Inquiries
  useCreateInquiryMutation,
  useGetInquiriesQuery,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
  // Overview
  useGetOverviewQuery,
  // Uploads
  useUploadFileMutation,
  useUploadFilesMutation,
} = api;
