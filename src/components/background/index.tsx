import { AuroraBlobs } from "./AuroraBlobs";
import { ParticleField } from "./ParticleField";
import { FallingPetals } from "./FallingPetals";

export function CinematicBackground() {
  return (
    <>
      {/* Layer 1: Aurora gradient blobs (deepest) */}
      <AuroraBlobs />

      {/* Layer 2: Falling petals */}
      <FallingPetals />

      {/* Layer 3: Interactive particles (topmost) */}
      <ParticleField />
    </>
  );
}

export { AuroraBlobs, ParticleField, FallingPetals };
