/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICourse } from "../course/course.interface";

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
    enrollments: any
    thumbnail: string

    course: ICourse
}