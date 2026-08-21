import { redirect } from "next/navigation";

/**
 * Permanent Redirect for Legacy Cloud Security Route
 * Preserves legacy links, bookmarks, and external references to /services/managed-cloud-security
 * by redirecting cleanly to the new Cloud Resilience Hub at /services/cloud-resilience.
 */
export default function LegacyManagedCloudSecurityRedirect() {
  redirect("/services/cloud-resilience");
}
