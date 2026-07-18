import { promises as fs } from "fs";
import path from "path";

export type CandidaturaRecord = {
  id: string;
  createdAt: string;
  nome: string;
  telefono: string;
  email: string;
  ruoli: string[];
  esperienza: string;
  disponibilitaContrattuale: string[];
  certHaccp: string;
  certSicurezza: string;
  messaggio: string;
  privacyConsent: boolean;
  cvFileName: string | null;
  cvStoredPath: string | null;
};

const DATA_DIR = path.join(process.cwd(), "data");
const CV_DIR = path.join(DATA_DIR, "cv");
const JSON_PATH = path.join(DATA_DIR, "candidature.json");

async function ensureDirs() {
  await fs.mkdir(CV_DIR, { recursive: true });
  try {
    await fs.access(JSON_PATH);
  } catch {
    await fs.writeFile(JSON_PATH, "[]", "utf8");
  }
}

export async function saveCandidatura(
  record: Omit<CandidaturaRecord, "id" | "createdAt" | "cvStoredPath"> & {
    cv?: { buffer: Buffer; fileName: string } | null;
  },
): Promise<CandidaturaRecord> {
  await ensureDirs();

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = new Date().toISOString();
  let cvStoredPath: string | null = null;
  let cvFileName: string | null = record.cvFileName;

  if (record.cv) {
    const safeName = record.cv.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storedName = `${id}-${safeName}`;
    cvStoredPath = path.join(CV_DIR, storedName);
    await fs.writeFile(cvStoredPath, record.cv.buffer);
    cvFileName = record.cv.fileName;
  }

  const entry: CandidaturaRecord = {
    id,
    createdAt,
    nome: record.nome,
    telefono: record.telefono,
    email: record.email,
    ruoli: record.ruoli,
    esperienza: record.esperienza,
    disponibilitaContrattuale: record.disponibilitaContrattuale,
    certHaccp: record.certHaccp,
    certSicurezza: record.certSicurezza,
    messaggio: record.messaggio,
    privacyConsent: record.privacyConsent,
    cvFileName,
    cvStoredPath,
  };

  const raw = await fs.readFile(JSON_PATH, "utf8");
  const list = JSON.parse(raw || "[]") as CandidaturaRecord[];
  list.push(entry);
  await fs.writeFile(JSON_PATH, JSON.stringify(list, null, 2), "utf8");

  return entry;
}
