import Fastify, {FastifyRequest, FastifyReply} from 'fastify';
import { MultipartFile, MultipartValue } from '@fastify/multipart';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { uploadsDir, ensureUploadDir } from './utils.js';
import { FileValidator, ValidationResult } from './validator.js';

const fastify = Fastify({ logger: true });

// Register multipart plugin for file uploads
await fastify.register(import('@fastify/multipart'));

// Create uploads directory
await ensureUploadDir();

// Set up validator
const validator: FileValidator = new FileValidator();

fastify.post('/api/profile', async (request: FastifyRequest, reply: FastifyReply) => {
  // On utilise parts() pour itérer sur les champs et le fichier
  const parts: AsyncIterableIterator<MultipartFile | MultipartValue> = request.parts();

  let fileData: MultipartFile | undefined;
  const fields: Record<string, string> = {};

  for await (const part of parts) {
    if (part.type === 'file') {
      fileData = part;
    } else {
      // On stocke les champs textes (username, email...)
      fields[part.fieldname] = part.value as string;
    }
  }

  let uniqueFilename: string | null = null;
  let filepath: string | null = null;

  // 1. Validation et Sauvegarde UNIQUEMENT si un fichier est présent
  if (fileData) {
    const validation: ValidationResult = validator.validateFile(fileData.filename);

    if (!validation.valid) {
      return reply.code(400).send({
        error: 'File validation failed',
        details: validation.errors
      });
    }

    const ext: string = fileData.filename.substring(fileData.filename.lastIndexOf('.'));
    uniqueFilename = `${randomUUID()}${ext}`;
    filepath = path.join(uploadsDir, uniqueFilename);

    try {
      await pipeline(fileData.file, createWriteStream(filepath));
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: 'Failed to save file' });
    }
  }

  // 2. Récupération des champs (qu'il y ait un fichier ou non)
  const { email, username, password, passwordConfirm } = fields;

  return reply.code(201).send({
    success: true,
    message: "Your account successfully updated.",
    file: fileData ? {
      originalFilename: fileData.filename,
      storedFilename: uniqueFilename,
      mimetype: fileData.mimetype,
      path: filepath
    } : null,
    fields: {
      email,
      username,
      password,
      passwordConfirm
    }
  });
});

fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  return { message: 'Fastify File Upload Service is ready' };
});

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: 3000,host: '0.0.0.0' });
    console.log('Fastify file upload server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();