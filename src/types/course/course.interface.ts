/* eslint-disable @typescript-eslint/no-explicit-any */
export type CourseAccess = "FREE" | "PAID";
export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type CourseType = "ONLINE" | "OFFLINE";

export interface IModule {
    id: string;
    title: string;
    courseId: string;
}

export interface ICourse {
    id: string;
    title: string;
    slug: string;
    description: string;

    // SEO
    metaTitle: string;
    metaDescription: string;

    // Media
    thumbnail: string;

    // Pricing
    price: number;
    discountPrice: number | null;
    access: CourseAccess;
    isPremium: boolean;

    // Course Info
    level: CourseLevel;
    type: CourseType;
    durationInWeeks: number;
    certificateEnabled: boolean;

    // Stats
    totalEnrollments: number;
    totalReviews: number;
    averageRating: number;

    // Relations
    modules: IModule[];
    batches: any[];   // replace with IBatch[] if defined
    coupons: any[];   // replace with ICoupon[] if defined

    // Moderation
    status: CourseStatus;
    approved: boolean;
    isDeleted: boolean;

    // Timestamps
    createdAt: string;
    updatedAt: string;
}