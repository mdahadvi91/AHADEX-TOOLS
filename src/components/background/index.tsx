import { ParticleField } from "./ParticleField";
import { FallingPetals } from "./FallingPetals";
import { RotatingBackground } from "./RotatingBackground";
import { AuroraBlobs } from "./AuroraBlobs";

export function CinematicBackground() {
  return (
    <>
      <RotatingBackground />
      <FallingPetals />
      <ParticleField />
    </>
  );
}

export { AuroraBlobs, ParticleField, FallingPetals, RotatingBackground };
