import type { Submission } from "@/types";

/**
 * Shapes a submission for handing to another system — the AI step that turns
 * a brief into a site specification.
 *
 * Deliberately keeps the canonical English option values rather than display
 * labels: a brief filled in Arabic exports identical keys to one filled in
 * English, so whatever consumes this doesn't need to know either language.
 * File references are absolutized so the URLs resolve outside this dashboard.
 */
export function briefToJson(submission: Submission): string {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  const absolute = (url: string) => (url.startsWith("http") ? url : `${origin}${url}`);

  const payload = {
    meta: {
      id: submission.id,
      businessName: submission.businessName,
      submittedAt: submission.submittedAt,
      /** Language the client filled the form in. */
      filledIn: submission.locale,
      status: submission.status,
    },
    brief: submission.data,
    files: submission.files.map((file) => ({
      field: file.field,
      url: absolute(file.url),
      originalName: file.originalName,
      mimeType: file.mimeType,
      size: file.size,
    })),
  };

  return JSON.stringify(payload, null, 2);
}

/** Just the brief body, for pasting somewhere that doesn't want the wrapper. */
export function briefBodyToJson(submission: Submission): string {
  return JSON.stringify(submission.data, null, 2);
}
