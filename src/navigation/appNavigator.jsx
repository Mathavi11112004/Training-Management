import { Routes, Route } from "react-router-dom";
import ZTable from '../Container/Table/table'
import CourseManager from '../Container/StudentDetails/course'
import Dashboard from "../Container/Dashboard/dashboard";
import SubjectManager from "../Container/StudentDetails/subject";
import StudentManager from '../Container/StudentDetails/student'
import BatchManager from '../Container/StudentDetails/batch'
import Table from '../Container/Table/table'
const AppNavigator = () => {
  return (
    <Routes>
          <Route path="/" element={<ZTable />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Table" element={<Table />} />
          <Route path="/SubjectManager" element={<SubjectManager />} />
          <Route path="/CourseManager" element={<CourseManager/>}/>
          <Route path="/StudentManager" element={<StudentManager />} />
          <Route path="/BatchManager" element={<BatchManager/>}/>
    </Routes>
  );
};
export default AppNavigator;