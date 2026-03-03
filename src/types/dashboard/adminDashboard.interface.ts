export interface IPageHeader {
    title: string;
    subtitle: string;
    generatedAt: string;
}

export interface ICoreStats {
    totalStudents: number;
    totalInstructors: number;
    totalCourses: number;
    totalRevenue: number;
    totalRevenueDisplay: string;
}

export interface ITodayAttendance {
    percentage: number;
    presentStudents: number;
    isEstimated: boolean;
    note: string;
}

export interface ISystemHealth {
    status: string;
    note: string;
    checkedAt: string;
}

export interface IAttendanceAndEnrollment {
    todayAttendance: ITodayAttendance;
    activeEnrollments: number;
    systemHealth: ISystemHealth;
}

export interface IOngoingCourse {
    batchId: string;
    title: string;
    instructor: string;
    progress: string;
    progressPercentage: number;
}

export interface ITodaysClass {
    id: string;
    course: string;
    batchName: string;
    instructor: string;
    room: string;
    time: string;
    startTime: string;
    duration: number;
}

export interface ITopPerformingCourse {
    courseId: string;
    name: string;
    students: number;
    revenue: number;
    revenueDisplay: string;
}

export interface IRecentEnrollment {
    student: string;
    course: string;
    status: string;
    date: string;
    enrolledAt: string;
}

export interface IAdminDashboardData {
    pageHeader: IPageHeader;
    coreStats: ICoreStats;
    attendanceAndEnrollment: IAttendanceAndEnrollment;
    ongoingCourses: IOngoingCourse[];
    todaysClasses: ITodaysClass[];
    topPerformingCourses: ITopPerformingCourse[];
    recentEnrollments: IRecentEnrollment[];
}

export const EMPTY_ADMIN_DASHBOARD_DATA: IAdminDashboardData = {
    pageHeader: {
        title: "LMS System Overview",
        subtitle: "Complete analytics, attendance & course tracking",
        generatedAt: new Date(0).toISOString(),
    },
    coreStats: {
        totalStudents: 0,
        totalInstructors: 0,
        totalCourses: 0,
        totalRevenue: 0,
        totalRevenueDisplay: "$0.00",
    },
    attendanceAndEnrollment: {
        todayAttendance: {
            percentage: 0,
            presentStudents: 0,
            isEstimated: true,
            note: "No attendance data available.",
        },
        activeEnrollments: 0,
        systemHealth: {
            status: "Operational",
            note: "No issues detected",
            checkedAt: new Date(0).toISOString(),
        },
    },
    ongoingCourses: [],
    todaysClasses: [],
    topPerformingCourses: [],
    recentEnrollments: [],
};
