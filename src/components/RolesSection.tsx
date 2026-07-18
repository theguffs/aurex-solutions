import Link from "next/link";
import { ROLES } from "@/lib/roles";

export function RolesSection() {
  return (
    <section className="section" id="ruoli">
      <div className="shell">
        <h2>Profili che selezioniamo</h2>
        <p className="section-lead">
          Quattro ruoli hospitality a Roma. Scegli il tuo e lascia i contatti.
        </p>
        <ul className="role-list">
          {ROLES.map((role) => (
            <li key={role.id}>
              <Link href={`/${role.slug}`} className="role-row">
                <span className="role-name">{role.label}</span>
                <span className="role-blurb">{role.blurb}</span>
                <span className="role-go">Candidati</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
