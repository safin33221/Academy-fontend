export function StatCard({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
}) {
    return (
        <div className="flex items-center gap-4 rounded-xl border p-5 shadow-sm">
            <div className="bg-muted p-3 rounded-lg">
                {icon}
            </div>
            <div>
                <p className="text-sm text-muted-foreground">
                    {title}
                </p>
                <p className="text-lg font-semibold">
                    {value}
                </p>
            </div>
        </div>
    );
}