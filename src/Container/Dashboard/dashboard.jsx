import React, { Component } from "react";
import { Box, Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import withRouter from "../../navigation/withRouter";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SubjectManager from "../StudentDetails/subject";
import CourseManager from "../StudentDetails/course";
import BatchManager from "../StudentDetails/batch";
import StudentManager from "../StudentDetails/student";
import ZPrimaryButton from "../../Component/ZButton/zPrimaryButton.jsx";
import style from "../../utils/Constant/style";
import label from "../../utils/Constant/label";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      courses: [],
      batches: [],
      students: [],
    };
  }

  // === Subject ===
  addSubject = (name) => {
    const normalized = name.trim();
    if (!normalized) return "Subject name required";
    if (this.state.subjects.some(s => s.name.toLowerCase() === normalized.toLowerCase()))
      return "Duplicate subject";

    this.setState(prev => ({
      subjects: [...prev.subjects, { id: uuidv4(), name: normalized }]
    }));
    return null;
  };
  deleteSubject = (id) => this.setState(prev => ({
    subjects: prev.subjects.filter(s => s.id !== id)
  }));

  addCourse = (name, subjectIds) => {
    const normalized = name.trim();
    if (!normalized) return "Course name required";
    if (subjectIds.length < 1) return "Select at least 1 subject";
    if (this.state.courses.some(c => c.name.toLowerCase() === normalized.toLowerCase()))
      return "Duplicate course";

    this.setState(prev => ({
      courses: [...prev.courses, { id: uuidv4(), name: normalized, subjectIds }]
    }));
    return null;
  };
  deleteCourse = (id) => this.setState(prev => ({
    courses: prev.courses.filter(c => c.id !== id)
  }));

  // === Batch ===
  addBatch = (batchObj) => {
    const { name, courseId, startDate, endDate } = batchObj;

    if (!name || !courseId) return "Batch name & course required";

    const normalized = String(name).trim();

    const duplicate = this.state.batches.some(
      b =>
        b.courseId === courseId &&
        b.name.toLowerCase() === normalized.toLowerCase()
    );

    if (duplicate) return "Duplicate batch under same course";

    this.setState(prev => ({
      batches: [
        ...prev.batches,
        {
          id: uuidv4(),
          name: normalized,
          courseId,
          startDate,
          endDate
        }
      ]
    }));

    return null;
  };
  // === Student ===
  addStudent = (name, courseId, batchId) => {
    if (!name.trim() || !courseId || !batchId) return "All fields required";
    if (this.state.students.some(s => s.name.toLowerCase() === name.trim().toLowerCase() && s.batchId === batchId))
      return "Duplicate student entry";

    this.setState(prev => ({
      students: [...prev.students, { id: uuidv4(), name: name.trim(), courseId, batchId }]
    }));
    return null;
  };
  deleteStudent = (id) => this.setState(prev => ({
    students: prev.students.filter(s => s.id !== id)
  }));

  // === Submit Dashboard ===
  handleDashboardSubmit = () => {
    const { subjects, courses, batches, students } = this.state;
    if (subjects.length === 0) return toast.error(label.addSubject);
    if (courses.length === 0) return toast.error(label.addCourse);
    if (batches.length === 0) return toast.error(label.addBatch);
    if (students.length === 0) return toast.error(label.addStudent);

    const formattedStudents = students.map(student => {
      const course = courses.find(c => c.id === student.courseId);
      const batch = batches.find(b => b.id === student.batchId);
      return { ...student, courseName: course?.name, batchName: batch?.name, startDate: batch?.startDate, endDate: batch?.endDate };
    });

    toast.success(label.formSubmit);
    setTimeout(() => {
      this.props.navigate("/Table", { state: { students: formattedStudents } });
    }, 1000);
  };

  render() {
    return (
      <div className="container">
        <h1>{label.trainingManagement}</h1>

        <Box sx={style.userBox}>
          <SubjectManager
            subjects={this.state.subjects}
            addSubject={this.addSubject}
            deleteSubject={this.deleteSubject}
          />
        </Box>

        <Box sx={style.userBox}>
          <CourseManager
            subjects={this.state.subjects}
            courses={this.state.courses}
            addCourse={this.addCourse}
            deleteCourse={this.deleteCourse}
          />
        </Box>

        <Box sx={style.userBox}>
          <BatchManager
            courses={this.state.courses}
            batches={this.state.batches}
            addBatch={this.addBatch}
            deleteBatch={this.deleteBatch}
          />
        </Box>

        <Box sx={style.userBox}>
          <StudentManager
            students={this.state.students}
            courses={this.state.courses}
            batches={this.state.batches}
            addStudent={this.addStudent}
            deleteStudent={this.deleteStudent}
          />
        </Box>

        <div>
          <ZPrimaryButton
            onClick={this.handleDashboardSubmit}
            label={label.button.submit}
          />
        </div>

        <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
      </div>
    );
  }
}

export default withRouter(Dashboard);