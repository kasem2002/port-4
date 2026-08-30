import ProjectVisual from './ProjectVisual.jsx';

// Renders whatever media the project has set — an uploaded image, a URL,
// or inline SVG — and falls back to the built-in abstract ProjectVisual
// keyed by `fallbackId` when nothing has been uploaded yet.
export default function ProjectImage({ image, fallbackId, alt = '' }) {
  const trimmed = (image || '').trim();

  if (trimmed.startsWith('<svg')) {
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
