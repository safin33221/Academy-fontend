import AttendanceReports from "@/components/module/admin/dashboard/AttendanceReports";
import { getAttendanceReports } from "@/services/dashboard/attendanceReports";
import {
    EMPTY_ATTENDANCE_REPORTS_DATA,
    IAttendanceReportsData,
} from "@/types/dashboard/attendanceReports.interface";

export default async function Page() {
    const res = await getAttendanceReports();
    const attendanceReports: IAttendanceReportsData =
        (res?.data as IAttendanceReportsData) ?? EMPTY_ATTENDANCE_REPORTS_DATA;

    return (
        <div>
            <AttendanceReports attendanceReports={attendanceReports} />
        </div>
    );
}
