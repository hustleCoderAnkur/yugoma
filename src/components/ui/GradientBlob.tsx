type GradientBlobProps = {
    className?: string;
};

export default function GradientBlob({
    className = "",
}: GradientBlobProps) {
    return (
        <div
            className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
        />
    );
}