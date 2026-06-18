export default function Eyebrow({ children }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-gray-600 backdrop-blur-sm">
            {children}
        </span>
    );
}