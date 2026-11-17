import { Router } from 'express';
import { serverEnv } from '../config/env.ts';
import { isOpenAIConfigured } from '../services/aiProvider.ts';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  const openAiConfigured = isOpenAIConfigured();
  const mapsConfigured = Boolean(
    process.env.VITE_GOOGLE_MAPS_API_KEY?.trim() ||
      process.env.GOOGLE_MAPS_API_KEY?.trim(),
  );

  res.json({
    ok: true,
    service: 'wandor-api',
    firebaseConfigured: Boolean(serverEnv.firebaseProjectId),
    mapsConfigured,
    aiProvider: openAiConfigured ? 'openai' : 'unconfigured',
    openAiConfigured,
    openAiModel: serverEnv.openAiModel,
    timestamp: new Date().toISOString(),
  });
});
