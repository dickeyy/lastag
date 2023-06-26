export default function HeroFeature({
    text,
    title,
}: {
    text: string
    title: string
}) {
    return (
        <div className="flex flex-col items-center justify-center bg-zinc-700 p-5 rounded-lg">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-xl">{text}</p>
        </div>
    )
}