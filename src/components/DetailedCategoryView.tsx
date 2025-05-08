import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Box, Cylinder, Edges, Sphere, Text } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';

interface Challenge {
  id: string;
  title: string;
  isSolved: boolean;
  isLocked: boolean;
  solvedBy: { teamId: string; teamColor: string }[];
}

interface DetailedCategoryViewProps {
  challenges: Challenge[];
  hoveredChallenge: string | null;
  setHoveredChallenge: (id: string | null) => void;
}

export default function DetailedCategoryView({
  challenges,
  hoveredChallenge,
  setHoveredChallenge
}: DetailedCategoryViewProps) {
  const groupRef = useRef<THREE.Group>(null);
  const router = useRouter();

  // Calculate grid dimensions
  const challengesPerRow = 2;
  const spacing = 0.35; // Vertical spacing between rows
  const startX = -0.5; // Left column
  const startY = -0.8; // Start near the bottom of the main box
  const startZ = 0;

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation instead of rotation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  // Create challenge boxes arranged in two columns
  const createChallengeGrid = () => {
    return challenges.map((challenge, index) => {
      const row = Math.floor(index / challengesPerRow);
      const col = index % challengesPerRow;
      const x = startX + (col * 1.0); // 1.0 units between columns
      const y = startY + (row * spacing);

      const getChallengeColor = () => {
        if (challenge.isLocked) return "gold";
        if (challenge.isSolved) return "#00ff00";
        return hoveredChallenge === challenge.id ? "#4a90e2" : "#ffffff";
      };

      const getChallengeText = () => {
        if (challenge.isLocked) return "🔒 Locked";
        if (challenge.isSolved) return "✓ Solved";
        return challenge.title;
      };

      return (
        <group key={challenge.id}>
          <mesh
            position={[x, y, startZ]}
            onClick={() => !challenge.isLocked && router.push(`/challenges/${challenge.id}`)}
            onPointerOver={() => setHoveredChallenge(challenge.id)}
            onPointerOut={() => setHoveredChallenge(null)}
          >
            <boxGeometry args={[0.8, 0.25, 1.9]} />
            <meshBasicMaterial
              color={getChallengeColor()}
              wireframe={!challenge.isSolved && hoveredChallenge !== challenge.id}
            />
          </mesh>
          {hoveredChallenge === challenge.id && (
            <Billboard>

              <Text
                position={[0, 1.5, startZ]}
                fontSize={0.6}
                color="white"
                anchorX="center"
                anchorY="middle"
                maxWidth={6}
                font="/orbital-ctf/SquadaOne-Regular.ttf"
              >
                {getChallengeText()}
              </Text>
            </Billboard>
          )}
        </group>
      );
    });
  };

  return (
    <group ref={groupRef}>
      {/* main box */}
      <Box args={[2, 2, 2]} position={[0, 0, 0]}>
        <meshBasicMaterial visible={false} />
        <Edges color="#6b6b6b" threshold={15} />
      </Box>
      {/* accent boxes */}
      <Box args={[1, 0.5, 0.2]} position={[0.3, 0.4, -1.1]}>
        <meshBasicMaterial visible={false} />
        <Edges color="#6b6b6b" threshold={15} />
      </Box>
      <Box args={[1, 0.2, 0.4]} position={[0, -1.1, 0.6]}>
        <meshBasicMaterial visible={false} />
        <Edges color="#6b6b6b" threshold={15} />
      </Box>
      {/* solar panel connection boxes */}
      <Box args={[0.3, 0.1, 0.1]} position={[-1.15, 0, 0]}>
        <meshBasicMaterial visible={false} />
        <Edges color="#6b6b6b" threshold={15} />
      </Box>
      <Box args={[0.3, 0.1, 0.1]} position={[1.15, 0, 0]}>
        <meshBasicMaterial visible={false} />
        <Edges color="#6b6b6b" threshold={15} />
      </Box>
      {/* Left solar panel */}
      <Box args={[5, 0.05, 1.5]} position={[-3.8, 0, 0]} rotation={[0.4, 0, 0]}>
        <meshBasicMaterial visible={false} />
        <Edges color="#6b6b6b" threshold={15} />
      </Box>
      <Box args={[1.3, 0.01, 1.3]} position={[-2.1, 0, 0]} rotation={[0.4, 0, 0]}>
        <meshBasicMaterial visible={false} />
        <Edges color="#6b6b6b" threshold={15} />
      </Box>
      <Box args={[1.3, 0.01, 1.3]} position={[-3.8, 0, 0]} rotation={[0.4, 0, 0]}>
        <meshBasicMaterial visible={false} />
        <Edges color="#6b6b6b" threshold={15} />
      </Box>
      <Box args={[1.3, 0.01, 1.3]} position={[-5.5, 0, 0]} rotation={[0.4, 0, 0]}>
        <meshBasicMaterial visible={false} />
        <Edges color="#6b6b6b" threshold={15} />
      </Box>
      {/* Right solar panel */}
      <Box args={[5, 0.05, 1.5]} position={[3.8, 0, 0]} rotation={[-0.4, 0, 0]}>
        <meshBasicMaterial visible={false} />
        <Edges color="#6b6b6b" threshold={15} />
      </Box>
      <Box args={[1.3, 0.01, 1.3]} position={[2.1, 0, 0]} rotation={[-0.4, 0, 0]}>
        <meshBasicMaterial visible={false} />
        <Edges color="#6b6b6b" threshold={15} />
      </Box>
      <Box args={[1.3, 0.01, 1.3]} position={[3.8, 0, 0]} rotation={[-0.4, 0, 0]}>
        <meshBasicMaterial visible={false} />
        <Edges color="#6b6b6b" threshold={15} />
      </Box>
      <Box args={[1.3, 0.01, 1.3]} position={[5.5, 0, 0]} rotation={[-0.4, 0, 0]}>
        <meshBasicMaterial visible={false} />
        <Edges color="#6b6b6b" threshold={15} />
      </Box>
      {/* satellite dish */}
      <group position={[0, 0, 1.2]}>
        <Sphere args={[0.9, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]}
          rotation={[1.7, 0, 0]}
        >
          <meshBasicMaterial visible={false} />
          <Edges color="#6b6b6b" threshold={15} />
        </Sphere>
        <Cylinder
          args={[0.08, 0.08, 0.3, 8]}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial visible={false} />
          <Edges color="#6b6b6b" threshold={15} />
        </Cylinder>
      </group>

      {/* Challenge boxes */}
      {createChallengeGrid()}
    </group>
  );
}