import Department from "./components/department/Department";
import Goal from "./components/goals/Goal";
import MonthlyReport from "./components/monthlyReport/MonthlyReport";
import Report from "./components/report/Report";
import ReportTypes from "./components/reportTypes/ReportTypes";
import SBU from "./components/sbu/Sbu";
import Score from "./components/score/Score";
import Staff from "./components/staff/Staff";
import Task from "./components/task/Task";
import Unit from "./components/Unit/Unit";
import { departmentData, goals, report, reportTP, sbu, score, staff, task, unit } from "./dashArray";
import { department, ediDepartment, editGoal, editReport, editReportTypes, editSbu, editScore, editStaff, editTask, editUnit, goal,setReport, setReportTypes, setSbu, setScore, setStaff, setTask, setUnit } from "./services/api"

export const RoutesArr = [
    {
        path:"/department",
        page:<Department/>,
        editPageLink:"/department/:goal",
        editEndPoint:ediDepartment,
        departmentData:departmentData,
        Edittitle:"Edit Department",
        newPageLink:"/department/new",
        AddEndpoint:department,
        addDepartmentData:departmentData,
        title:"Add new Department"
    },
    {
        path:"/goal",
        page:<Goal/>,
        editEndPoint:editGoal,
        departmentData:goals,
        Edittitle:"Edit Goal",
        editPageLink:"/goal/:goal",
        newPageLink:"/goal/new",
        AddEndpoint:goal,
        addDepartmentData:goals,
        title:"Add new Goal"
    },
    {
        path:"/reports",
        page:<Report/>,
        editEndPoint:editReport,
        departmentData:report,
        Edittitle:"Edit Report",
        editPageLink:"/reports/:goal",
        newPageLink:"/reports/new",
        AddEndpoint:setReport,
        addDepartmentData:report,
        title:"Add new Report"
    },
    {
        path:"/score",
        page:<Score/>,
        editEndPoint:editScore,
        departmentData:score,
        Edittitle:"Edit Score",
        editPageLink:"/score/:goal",
        newPageLink:"/score/new",
        AddEndpoint:setScore,
        addDepartmentData:score,
        title:"Add new Score"
    },
    {
        path:"/sbu",
        page:<SBU/>,
        editEndPoint:editSbu,
        departmentData:sbu,
        Edittitle:"Edit SBU",
        editPageLink:"/sbu/:goal",
        newPageLink:"/sbu/new",
        AddEndpoint:setSbu,
        addDepartmentData:sbu,
        title:"Add new SBU"
    },
    {
        path:"/reportTypes",
        page:<ReportTypes/>,
        editEndPoint:editReportTypes,
        departmentData:reportTP,
        Edittitle:"Edit Report Type",
        editPageLink:"/reportTypes/:goal",
        newPageLink:"/reportTypes/new",
        AddEndpoint:setReportTypes,
        addDepartmentData:reportTP,
        title:"Add new Report Type"
    },
    {
        path:"/task",
        page:<Task/>,
        editEndPoint:editTask,
        departmentData:task,
        Edittitle:"Edit task",
        editPageLink:"/task/:goal",
        newPageLink:"/task/new",
        AddEndpoint:setTask,
        addDepartmentData:task,
        title:"Add new Task"
    },
    {
        path:"/unit",
        page:<Unit/>,
        editEndPoint:editUnit ,
        departmentData:unit,
        Edittitle:"Edit unit",
        editPageLink:"/unit/:goal",
        newPageLink:"/unit/new",
        AddEndpoint:setUnit,
        addDepartmentData:unit,
        title:"Add new Unit"
    },
    {
        path:"/staff",
        page:<Staff/>,
        editEndPoint:editStaff,
        departmentData:staff,
        Edittitle:"Edit Staff",
        editPageLink:"/staff/:goal",
        newPageLink:"/staff/new",
        AddEndpoint:setStaff,
        addDepartmentData:staff,
        title:"Add new Staff"
    },
    {
        path:"/monthlyreport",
        page:<MonthlyReport/>,
        editEndPoint:editStaff,
        departmentData:staff,
        Edittitle:"Edit Staff",
        editPageLink:"/staff/:goal",
        newPageLink:"/staff/new",
        AddEndpoint:setStaff,
        addDepartmentData:staff,
        title:"Add new Staff"
    }
    
]
    