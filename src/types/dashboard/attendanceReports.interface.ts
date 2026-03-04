export interface IAttendanceReportsPageHeader {
    title: string;
    subtitle: string;
    generatedAt: string;
}

export interface IAttendanceReportsClassSummary {
    totalClasses: number;
    todayClasses: number;
    startedTodayClasses: number;
    upcomingTodayClasses: number;
    conductedClasses: number;
    ongoingClasses: number;
    endedClasses: number;
    upcomingClasses: number;
}

export interface IAttendanceReportsAttendanceSummary {
    expectedStudents: number;
    presentStudents: number;
    absentStudents: number;
    attendanceRate: number;
    averageClassAttendanceRate: number;
    classesWithAttendanceRecords: number;
    classesWithoutAttendanceRecords: number;
}

export interface IAttendanceReportsDailyTrendItem {
    date: string;
    totalClasses: number;
    expectedStudents: number;
    presentStudents: number;
    absentStudents: number;
    attendanceRate: number;
}

export interface IAttendanceReportsClassAttendanceItem {
    classId: string;
    title: string;
    course: string;
    batchName: string;
    instructor: string;
    status: string;
    startTime: string;
    expectedStudents: number;
    presentStudents: number;
    absentStudents: number;
    attendanceRate: number;
}

export interface IAttendanceReportsTodayAttendance {
    totalTodayClasses: number;
    startedTodayClasses: number;
    upcomingTodayClasses: number;
    expectedStudents: number;
    presentStudents: number;
    absentStudents: number;
    attendanceRate: number;
    classes: IAttendanceReportsClassAttendanceItem[];
}

export interface IAttendanceReportsRecentClassAttendanceItem
    extends IAttendanceReportsClassAttendanceItem {
    batchSlug: string;
    sessionCount: number;
    durationMinutes: number;
    totalDurationMinutes: number;
    unknownParticipants: number;
    zoomMeetingId: string;
}

export interface IAttendanceReportsData {
    pageHeader: IAttendanceReportsPageHeader;
    classSummary: IAttendanceReportsClassSummary;
    attendanceSummary: IAttendanceReportsAttendanceSummary;
    dailyTrendLast7Days: IAttendanceReportsDailyTrendItem[];
    recentClassAttendance: IAttendanceReportsRecentClassAttendanceItem[];
    todayAttendance: IAttendanceReportsTodayAttendance;
}

export const EMPTY_ATTENDANCE_REPORTS_DATA: IAttendanceReportsData = {
    pageHeader: {
        title: "Class & Attendance Full Overview",
        subtitle: "Admin view of class execution and participation analytics",
        generatedAt: new Date(0).toISOString(),
    },
    classSummary: {
        totalClasses: 0,
        todayClasses: 0,
        startedTodayClasses: 0,
        upcomingTodayClasses: 0,
        conductedClasses: 0,
        ongoingClasses: 0,
        endedClasses: 0,
        upcomingClasses: 0,
    },
    attendanceSummary: {
        expectedStudents: 0,
        presentStudents: 0,
        absentStudents: 0,
        attendanceRate: 0,
        averageClassAttendanceRate: 0,
        classesWithAttendanceRecords: 0,
        classesWithoutAttendanceRecords: 0,
    },
    dailyTrendLast7Days: [],
    recentClassAttendance: [],
    todayAttendance: {
        totalTodayClasses: 0,
        startedTodayClasses: 0,
        upcomingTodayClasses: 0,
        expectedStudents: 0,
        presentStudents: 0,
        absentStudents: 0,
        attendanceRate: 0,
        classes: [],
    },
};
