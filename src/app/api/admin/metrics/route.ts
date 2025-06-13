import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const [
      totalTeams,
      totalUsers,
      totalChallenges,
      totalSubmissions,
      challenges,
      teamScoreSum
    ] = await Promise.all([
      prisma.team.count(),
      prisma.user.count(),
      prisma.challenge.count(),
      prisma.submission.count(),
      prisma.challenge.findMany({
        select: {
          points: true,
          flags: { select: { points: true } },
          multipleFlags: true
        }
      }),
      prisma.team.aggregate({ _sum: { score: true } })
    ]);

    let totalPossiblePoints = 0;
    for (const ch of challenges) {
      if (ch.multipleFlags && ch.flags.length > 0) {
        totalPossiblePoints += ch.flags.reduce((sum, f) => sum + f.points, 0);
      } else {
        totalPossiblePoints += ch.points;
      }
    }

    const totalPointsEarned = teamScoreSum._sum.score ?? 0;

    return NextResponse.json({
      totalTeams,
      totalUsers,
      totalChallenges,
      totalSubmissions,
      totalPossiblePoints,
      totalPointsEarned
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
