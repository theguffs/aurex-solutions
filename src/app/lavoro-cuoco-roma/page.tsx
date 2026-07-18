import { RoleLanding, buildRoleMetadata } from "@/components/RoleLanding";

const SLUG = "lavoro-cuoco-roma";

export const metadata = buildRoleMetadata(SLUG);

export default function Page() {
  return <RoleLanding slug={SLUG} roleId="cuoco" />;
}
