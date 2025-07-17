import React from "react";

// Component Button với hiệu ứng lan tỏa
const RippleButton = ({ label }: { label: string }) => {
  const handleRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - radius;
    const y = event.clientY - rect.top - radius;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className =
      "absolute bg-white/30 rounded-full transform scale-0 animate-ripple";

    button.appendChild(ripple);

    // Xóa ripple sau khi animation kết thúc
    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  };

  return (
    <button
      onClick={handleRipple}
      className="relative rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 overflow-hidden"
      type="button"
    >
      <span className="relative z-10">{label}</span>
    </button>
  );
};

export default RippleButton;