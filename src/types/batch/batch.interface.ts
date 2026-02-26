/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICourse } from "../course/course.interface";
export type BatchStatus =
    | "UPCOMING"
    | "ONGOING"
    | "COMPLETED"
    | "CANCELLED";
export interface IBatch {
    id: string;
    name: string;
    slug: string;
    courseId: string
    maxStudents: number;
    enrolledCount: number;
    status: BatchStatus
    isActive: boolean;
    price?: number
    createdAt: Date;
    updatedAt: Date
    enrollments: any
    thumbnail: string

    course: ICourse
    instructors: any

    // Dates
    enrollmentStart: string;
    enrollmentEnd: string;
    startDate: string;
    endDate: string;
}