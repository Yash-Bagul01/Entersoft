import { headers } from "next/headers";
import { PRODUCTION_URL } from "@/config/routes";

const APPROVED_PRODUCTION_HOSTNAME = new URL(PRODUCTION_URL).hostname;

function hostnameFromHeader(value: string | null): string | null {
  if (!value) return null;
  const first = value.split(",")[0]?.trim();
  if (!first) return null;
  try {
    return new URL(`http://${first}`).hostname;
  } catch {
    return null;
  }
}

/**
 * SEO06 / M16. Index only a request whose Host is the approved production
 * hostname. METADATA_BASE is not consulted: a preview or local server can
 * still use the production metadata base and must stay noindex.
 */
export async function isApprovedProductionRequest(): Promise<boolean> {
  const headerStore = await headers();
  return hostnameFromHeader(headerStore.get("host")) === APPROVED_PRODUCTION_HOSTNAME;
}
