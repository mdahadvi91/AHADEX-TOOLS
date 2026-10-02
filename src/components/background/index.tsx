import { AuroraBlobs } from "./AuroraBlobs";
import { ParticleField } from "./ParticleField";
import { FallingPetals } from "./FallingPetals";
import { ImageBackground } from "./ImageBackground";

export function CinematicBackground() {
  return (
    <>
      <ImageBackground />
      <FallingPetals />
      <ParticleField />
    </>
  );
}

export { AuroraBlobs, ParticleField, FallingPetals, ImageBackground };
