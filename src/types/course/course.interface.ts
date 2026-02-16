export interface ICurriculum {
    id: string;
    title: string;
    content: string;
    order: number;
    courseId: string;
}
export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export interface ILearning {
    id: string;
    content: string;
    courseId: string;
}

export interface IRequirement {
    id: string;
    content: string;
    courseId: string;
}

export interface IReview {
    id: string;
    rating: number;
    comment: string;
    userId: string;
    courseId: string;
    createdAt: string;
}

export interface IFAQ {
    id: string;
    question: string;
    answer: string;
    courseId: string;
}

export interface ICourse {
    id: string;
    slug: string;
    title: string;

    shortDescription: string;
    fullDescription: string;

    price: number;
    discountPrice: number | null;

    level: CourseLevel;
    category: string;

    duration: number;       // hours
    totalClasses: number;

    rating: number;
    reviewCount: number;

    isPremium: boolean;
    isFeatured: boolean;

    createdAt: string;
    updatedAt: string;

    // Relations
    curriculum: ICurriculum[];
    learnings: ILearning[];
    requirements: IRequirement[];
    reviews: IReview[];
    faqs: IFAQ[];
}