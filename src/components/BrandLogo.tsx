import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export function BrandLogo({ priority = false }: { priority?: boolean }) {
  return (
    <Link href="/" className="brand-link" aria-label={SITE.name}>
      <Image
        src="/logo-aurex.png"
        alt={`${SITE.name} Logo`}
        width={50}
        height={50}
        className="brand-logo brand-logo--header"
        priority={priority}
      />
    </Link>
  );
}
