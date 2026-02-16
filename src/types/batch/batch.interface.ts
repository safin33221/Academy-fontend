export interface IBatch {
    id: string;
    name: string;
    slug: string;
    startDate: string;
    maxStudents: number;
    enrolledCount: number;
    status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
    isActive: boolean;
    price?: number
    createdAt: Date;
    updatedAt: Date

    course: {
        id: string;
        title: string;
    };
}