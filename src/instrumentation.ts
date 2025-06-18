import { prisma } from '@/lib/prisma';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('Running startup tasks...');

    if (process.env.GAME_START_TIME || process.env.GAME_END_TIME) {
      const envStart = process.env.GAME_START_TIME;
      const envEnd = process.env.GAME_END_TIME;

      const startDate = envStart ? new Date(envStart) : undefined;
      const endDate = envEnd ? new Date(envEnd) : undefined;

      if ((startDate && isNaN(startDate.getTime())) || (endDate && isNaN(endDate.getTime()))) {
        console.error('Invalid GAME_START_TIME or GAME_END_TIME values');
      } else {
        const existingConfig = await prisma.gameConfig.findFirst();
        if (existingConfig) {
          await prisma.gameConfig.update({
            where: { id: existingConfig.id },
            data: {
              ...(startDate ? { startTime: startDate } : {}),
              ...(envEnd !== undefined ? { endTime: endDate ?? null } : {}),
            },
          });
        } else if (startDate) {
          await prisma.gameConfig.create({
            data: {
              startTime: startDate,
              endTime: endDate ?? null,
              isActive: true,
            },
          });
        }
      }
    }

    if (process.env.INGEST_CHALLENGES_AT_STARTUP === 'true') {
      // Run challenge ingestion
      const { ChallengeIngestionService } = await import('@/lib/challenge-ingestion');
      const challengeIngestion = new ChallengeIngestionService();
      await challengeIngestion.ingestChallenges();
    }

    console.log('Startup tasks completed');
  }
}