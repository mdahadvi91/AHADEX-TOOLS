import { useLocation } from "react-router-dom";
import { AuroraBlobs } from "./AuroraBlobs";
import { ParticleField } from "./ParticleField";
import { FallingPetals } from "./FallingPetals";
import { ImageBackground } from "./ImageBackground";

export function CinematicBackground() {
  const { pathname } = useLocation();
  const isToolPage = pathname.startsWith("/tools/");

  return (
    <>
      {isToolPage ? <ImageBackground /> : <AuroraBlobs />}
      <FallingPetals />
      <ParticleField />
    </>
  );
}

export { AuroraBlobs, ParticleField, FallingPetals, ImageBackground };
