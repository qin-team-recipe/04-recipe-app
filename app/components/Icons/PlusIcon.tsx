type Props = { className?: string };

export function PlusIcon({ className = "stroke-[#6F6E77]" }: Props) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14">
      <path d="M6.99996 1.16675V12.8334M1.16663 7.00008H12.8333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
