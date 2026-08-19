// src/components/CoasterThumb.tsx

// Purpose: Renders a coaster's photo if one exists in the database,
// or a branded gradient placeholder (showing its track type) if it
// doesn't, so the UI never shows a broken image for un-photographed rides.

interface CoasterThumbProps {
  imageUrl: string | null;
  name: string;
  type: string;
  className?: string;
}

export default function CoasterThumb({
  imageUrl,
  name,
  type,
  className = '',
}: CoasterThumbProps) {
  if (imageUrl) {
    return <img src={imageUrl} alt={name} className={`object-cover ${className}`} />;
  }

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-navy-800 to-royal text-white ${className}`}
    >
      <span className="font-display text-lg tracking-wide opacity-70">{type}</span>
    </div>
  );
}