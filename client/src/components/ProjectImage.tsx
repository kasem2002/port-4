import ProjectVisual from "@/components/ProjectVisual";

interface ProjectImageProps {
  /** Inline SVG, an image URL/data URI, or empty for the generated visual. */
  image: string;
  /** Seeds the fallback artwork so each project gets a distinct pattern. */
  fallbackId: string;
  alt?: string;
}

export default function ProjectImage({ image, fallbackId, alt = "" }: ProjectImageProps) {
  const trimmed = (image || "").trim();

  if (trimmed.startsWith("<svg")) {
    return (
      <div
        className="project-image-svg absolute inset-0 flex items-center justify-center bg-paper-100"
        dangerouslySetInnerHTML={{ __html: trimmed }}
      />
    );
  }

  if (trimmed) {
    return (
      <img
        src={trimmed}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return <ProjectVisual id={fallbackId} className="absolute inset-0" />;
}
