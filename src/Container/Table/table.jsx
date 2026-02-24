import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ZTable from "../../Component/ZTable/zTable";
import withRouter from "../../navigation/withRouter";
import label from '../../utils/Constant/label'
import style from '../../utils/Constant/style'
class Table extends Component {
  constructor(props) {
    super(props);
    const students = props.location?.state?.students || [];
    this.state = {
      rows: students.map(s => ({
        ID: s.id,
        studentName: s.name,
        courseName: s.courseName,
        batchName: s.batchName,
        startDate: s.startDate
          ? new Date(s.startDate).toLocaleDateString("en-GB")
          : "",
        endDate: s.endDate
          ? new Date(s.endDate).toLocaleDateString("en-GB")
          : "",
        IsActive: true
      })),
      columns: [
        { field: "studentName", label: "Student Name" },
        { field: "courseName", label: "Course Name" },
        { field: "batchName", label: "Batch Name" },
        { field: "startDate", label: "Start Date" },
        { field: "endDate", label: "End Date" },
        { field: "Action", label: "Action" }
      ],
    };
  }

  handleEdit = (row) => {
    const newName = prompt(label.newStudent, row.studentName);
    const newCourseName = prompt(label.newCourse, row.courseName);
    const newBatchName = prompt(label.newBatch, row.batchName);
    if (newName && newCourseName && newBatchName) {
      this.setState(prev => ({
        rows: prev.rows.map(r =>
          r.id === row.id ? {
            ...r, studentName: newName,
            courseName: newCourseName,
            batchName: newBatchName,
          } : r
        )
      }));
      toast.success(label.update);
    }
  };
  handleDelete = (row) => {
    this.setState(prev => ({
      rows: prev.rows.filter(r => r.id !== row.id)
    }));
    toast.success(label.deleteSuccess);
  };

  render() {
    return (
      <Box sx={style.card}>
        <ZTable
          title="Student Table"
          rows={this.state.rows}
          columns={this.state.columns}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          addNewRoute="/Dashboard"
          navigate={this.props.navigate}
        />

        <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
      </Box>
    );
  }
}

export default withRouter(Table);