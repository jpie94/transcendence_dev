import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));

// export const uploadsDir: string = path.join(__dirname, 'uploads');
export const uploadsDir = '/data/uploads';


export const ensureUploadDir = async (): Promise<void> => {
  await fs.mkdir(uploadsDir, { recursive: true });
};
