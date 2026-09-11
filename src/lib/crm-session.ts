import "server-only";
import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Server-side sign-in for the CRM.
 *
 * The CRM holds real customers' names, phone numbers and email addresses, so
 * the password lives in CRM_PASSWORD and never reaches the browser, the
 * session is an httpOnly cookie the page cannot read, and the check happens
 * where the data is fetched rather than in the UI. Every server action that
 * touches CRM data calls requireCrm() first — a gate on the page with open
 * endpoints is not a gate.
 */

const COOKIE = "ark_crm";

function configured() {
  const secret = process.env.CRM_PASSWORD;
  return secret && secret.length >= 8 ? secret : null;
}

export function crmConfigured() {
  return !!configured();
}

function token(secret: string) {
  // The cookie carries a derivative, so reading it off a machine does not hand
  // over the password itself.
  return createHash("sha256").update(`ark-crm:${secret}`).digest("hex");
}

function same(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function checkPassword(entered: string) {
  const secret = configured();
  return !!secret && same(entered, secret);
}

export async function startCrmSession() {
  const secret = configured();
  if (!secret) return;
  (await cookies()).set(COOKIE, token(secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function endCrmSession() {
  (await cookies()).delete(COOKIE);
}

export async function isCrmSignedIn() {
  const secret = configured();
  if (!secret) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  return !!value && same(value, token(secret));
}

/** Guard for server actions. Throws instead of returning data to strangers. */
export async function requireCrm() {
  if (!(await isCrmSignedIn())) throw new Error("Not signed in");
}
