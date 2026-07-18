import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationForm } from "@/components/ApplicationForm";
import { JsonLd } from "@/components/JsonLd";
import { getRoleBySlug, type RoleId } from "@/lib/roles";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  roleJobJsonLd,
} from "@/lib/seo";
import { SITE } from "@/lib/site";
import { notFound } from "next/navigation";

type Props = {
  slug: string;
  roleId: RoleId;
};

export function buildRoleMetadata(slug: string): Metadata {
  const role = getRoleBySlug(slug);
  if (!role) return {};

  return buildPageMetadata({
    title: role.title,
    description: role.description,
    path: `/${role.slug}`,
    keywords: [...role.keywords],
  });
}

export function RoleLanding({ slug, roleId }: Props) {
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  return (
    <>
      <JsonLd data={roleJobJsonLd(slug)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: role.title, path: `/${role.slug}` },
        ])}
      />

      <section className="page-hero">
        <div className="shell">
          <p className="muted" style={{ marginBottom: "0.75rem" }}>
            <Link href="/">{SITE.name}</Link> · {role.label}
          </p>
          <h1>{role.title}</h1>
          <p>{role.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell seo-role-copy">
          <h2>Perché candidarti con {SITE.name}</h2>
          <p>{role.seoBody}</p>
          <ul className="seo-role-points">
            <li>Selezione riservata, senza bacheca pubblica di annunci.</li>
            <li>Focus hospitality e Ho.Re.Ca. a Roma e in Italia.</li>
            <li>Ti contattiamo solo se c’è una posizione in linea.</li>
          </ul>
        </div>
      </section>

      <section className="form-section">
        <div className="shell">
          <h2 className="form-section-title">Invia la candidatura da {role.label}</h2>
          <ApplicationForm defaultRuoli={[roleId]} />
        </div>
      </section>
    </>
  );
}
