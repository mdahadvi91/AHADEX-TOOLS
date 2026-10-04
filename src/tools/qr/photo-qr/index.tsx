import { useToolAnalytics } from "@hooks/useToolAnalytics";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@contexts/LanguageContext";
import { getPlatform } from "./options";
import { composePhoto, generatePreview } from "./logic";
import { Hero } from "./Hero";
import { Workspace } from "./Workspace";
import { SettingsPanel } from "./SettingsPanel";
import { PreviewPanel } from "./PreviewPanel";
import { PrivacyNote } from "./PrivacyNote";
import { Intro } from "./Intro";
import { HowTo } from "./HowTo";
import { Features } from "./Features";
import { FAQ } from "./FAQ";
import { RelatedTools } from "./RelatedTools";
import { photoQrData } from "./data";
import { photoQrContent } from "./content";
import type { Position, QrBackground } from "./types";

export default function PhotoQrTool() {
  useToolAnalytics("photo-qr");
  const { language } = useLanguage();
  const content = photoQrContent[language];

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [platformId, setPlatformId] = useState<string>("whatsapp");
  const [values, setValues] = useState<Record<string, string>>({});
  const [position, setPosition] = useState<Position>("bottom-right");
  const [sizePercent, setSizePercent] = useState(20);
  const [padding, setPadding] = useState(10);
  const [qrBackground, setQrBackground] = useState<QrBackground>("rounded");

  const [preview, setPreview] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewTimerRef = useRef<number | null>(null);

  const platform = useMemo(
    () => getPlatform(platformId) ?? getPlatform("whatsapp")!,
    [platformId]
  );

  const payload = useMemo(() => {
    try {
      return platform.buildPayload(values);
    } catch {
      return "";
    }
  }, [platform, values]);

  const canPreview = Boolean(photoFile && payload);

  const handlePlatformChange = (id: string) => {
    setPlatformId(id);
    setValues({});
  };

  const handleValueChange = (key: string, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  useEffect(() => {
    if (!canPreview || !photoFile) {
      setPreview(null);
      return;
    }
    if (previewTimerRef.current) window.clearTimeout(previewTimerRef.current);

    previewTimerRef.current = window.setTimeout(async () => {
      setGenerating(true);
      try {
        const url = await generatePreview({
          photoFile,
          platform,
          values,
          position,
          sizePercent,
          padding,
          qrBackground,
        });
        setPreview(url);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Preview failed");
      } finally {
        setGenerating(false);
      }
    }, 250);

    return () => {
      if (previewTimerRef.current) window.clearTimeout(previewTimerRef.current);
    };
  }, [
    photoFile,
    platform,
    values,
    position,
    sizePercent,
    padding,
    qrBackground,
    canPreview,
  ]);

  const handleDownload = async () => {
    if (!photoFile || !payload) return;
    setGenerating(true);
    try {
      const blob = await composePhoto({
        photoFile,
        platform,
        values,
        position,
        sizePercent,
        padding,
        qrBackground,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${photoQrData.slug}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Download failed");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8">
      <Hero />

      <Workspace
        settingsPanel={
          <SettingsPanel
            platformId={platformId}
            onPlatformChange={handlePlatformChange}
            values={values}
            onValueChange={handleValueChange}
            position={position}
            onPositionChange={setPosition}
            sizePercent={sizePercent}
            onSizeChange={setSizePercent}
            padding={padding}
            onPaddingChange={setPadding}
            qrBackground={qrBackground}
            onQrBackgroundChange={setQrBackground}
            onDownload={handleDownload}
            canDownload={canPreview}
            generating={generating}
            error={error}
          />
        }
        previewPanel={
          <PreviewPanel
            photoFile={photoFile}
            onPhotoChange={setPhotoFile}
            onPhotoClear={() => {
              setPhotoFile(null);
              setPreview(null);
            }}
            preview={preview}
            generating={generating}
            hasPayload={Boolean(payload)}
            platform={platform}
            onError={(msg) => setError(msg)}
          />
        }
      />

      <PrivacyNote text={content.privacyNote} />

      <Intro />

      <div className="max-w-3xl">
        <HowTo steps={content.howTo} />
        <Features features={content.features} />
        <FAQ faqs={content.faq} />
      </div>

      <RelatedTools toolIds={photoQrData.relatedTools} />
    </div>
  );
}
