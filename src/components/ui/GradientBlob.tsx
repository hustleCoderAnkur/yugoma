export default function GradientBlob({ className }) {
    return (
        <div
            className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
        />
    );
}