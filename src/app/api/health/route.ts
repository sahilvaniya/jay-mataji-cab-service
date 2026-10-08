export const dynamic = "force-dynamic";

/** App health. The site is static + client-side — no database to check. */
export async function GET() {
  return Response.json({ ok: true, service: "mahesh-chavda-taxi" });
}
