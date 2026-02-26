import BatchCreateForm from "@/components/module/admin/batchManagement/CreateBatchFrom";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllCourse } from "@/services/course/getAllCourse";
import { getAllUsers } from "@/services/user/getAllUser";
import { ICourse } from "@/types/course/course.interface";
import { IUser, IUserRole } from "@/types/user/user";

export default async function page() {
    const finalParams = {
        role: `${IUserRole.INSTRUCTOR}`
    };
    const queryString = queryStringFormatter(finalParams);
    const res = await getAllCourse()
    const resUsers = await getAllUsers(queryString)

    const courses: ICourse[] = res?.data
    const instructors: IUser[] = resUsers?.data

    return (
        <div>
            <BatchCreateForm courses={courses} instructors={instructors} />
        </div>
    );
};
