import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const gameConfig = await prisma.gameConfig.findFirst({
      where: {
        isActive: true,
      },
    });

    if (!gameConfig) {
      return NextResponse.json({
        isActive: false,
        startTime: null,
        endTime: null,
        hasEndTime: true,
      });
    }

    // Ensure dates are in ISO format
    return NextResponse.json({
      ...gameConfig,
      startTime: gameConfig.startTime.toISOString(),
      endTime: gameConfig.endTime?.toISOString() || null,
      hasEndTime: gameConfig.endTime !== null,
    });
  } catch (error) {
    console.error('Error fetching game config:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { startTime, endTime, isActive, hasEndTime } = data;

    // Parse dates consistently using UTC
    const startDate = new Date(startTime);
    const endDate = hasEndTime ? (endTime ? new Date(endTime) : null) : null;

    // Validate dates
    if (hasEndTime) {
      if (!endDate) {
        return NextResponse.json(
          { error: 'End time is required when hasEndTime is true' },
          { status: 400 }
        );
      }

      if (startDate >= endDate) {
        return NextResponse.json(
          { error: 'Start time must be before end time' },
          { status: 400 }
        );
      }
    }

    // Find existing config
    const existingConfig = await prisma.gameConfig.findFirst();

    let gameConfig;
    if (existingConfig) {
      // Update existing config
      gameConfig = await prisma.gameConfig.update({
        where: { id: existingConfig.id },
        data: {
          startTime: startDate,
          endTime: endDate,
          isActive,
        },
      });
    } else {
      // Create new config
      gameConfig = await prisma.gameConfig.create({
        data: {
          startTime: startDate,
          endTime: endDate,
          isActive,
        },
      });
    }

    // Return dates in ISO format
    return NextResponse.json({
      ...gameConfig,
      startTime: gameConfig.startTime.toISOString(),
      endTime: gameConfig.endTime?.toISOString() || null,
      hasEndTime: gameConfig.endTime !== null
    });
  } catch (error) {
    console.error('Error updating game config:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}