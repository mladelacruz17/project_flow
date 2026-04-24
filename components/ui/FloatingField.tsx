interface Props {
  label: string;
  children: React.ReactNode;
}

/**
 * FloatingField
 * 
 * A reusable wrapper for inputs with a floating label.
 * Uses composition so it works with any input/textarea/select.
 */
export default function FloatingField({
  label,
  children
}: Props) {
  return (
    <div className="relative w-full">
      {/* LABEL */}
      <span className="absolute -top-2 left-2 text-[10px] bg-white dark:bg-zinc-950 px-1 text-zinc-500">
        {label}
      </span>

      {/* INPUT */}
      {children}
    </div>
  );
}