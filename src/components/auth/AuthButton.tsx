export default function AuthButton({
  children,
  type = "button",
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className="w-full rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] py-2.5 text-[15px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0 active:shadow-[0_4px_12px_-4px_rgba(201,125,74,0.5)] cursor-pointer"
    >
      {children}
    </button>
  );
}
