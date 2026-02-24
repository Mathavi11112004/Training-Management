import React, { Component } from "react";
import withRouter from "../../navigation/withRouter";
import style from "../../utils/Constant/style";
import ZTextbox from "../../Component/ZTextBox/zTextBox";
import ZPrimaryButton from "../../Component/ZButton/zPrimaryButton";
import ZDropdown from "../../Component/ZDropDown/zdropDown";
import label from "../../utils/Constant/label";
import { Grid } from "@mui/material";

class StudentManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: "",
      courseId: "",
      batchId: "",
      error: ""
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "studentName") {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        this.setState({ studentName: value, error: "" });
      } else {
        this.setState({ error: label.error.letter });
      }
    } else {
      this.setState({ [name]: value, error: "" });
      if (name === "courseId") this.setState({ batchId: "" });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { studentName, courseId, batchId } = this.state;
    const { addStudent } = this.props;

    if (!studentName.trim() || !courseId || !batchId) {
      this.setState({ error: label.error.field });
      return;
    }

    const result = addStudent(studentName.trim(), courseId, batchId);

    if (result) this.setState({ error: result });
    else this.setState({ studentName: "", courseId: "", batchId: "", error: "" });
  };

  handleDelete = (id) => {
    if (!window.confirm(label.bConfirmDelete)) return;
    this.props.deleteStudent(id);
  };

  render() {
    const { courses = [], batches = [], students = [] } = this.props;
    const { studentName, courseId, batchId, error } = this.state;

    const filteredBatches = batches.filter((b) => b.courseId === courseId);

    return (
      <div style={style.card}>
        <h2>{label.studentManagement}</h2>

        <form onSubmit={this.handleSubmit} noValidate>
          <Grid container spacing={2}>
            <ZTextbox
              name="studentName"
              label={label.student}
              placeholder={label.placeholder.student}
              value={studentName}
              onChange={this.handleChange}
              required
              fullWidth
            />

            <ZDropdown
              name="courseId"
              label={label.course}
              value={courseId}
              onChange={this.handleChange}
              options={courses.map(course => ({
                value: course.id,
                label: course.name,
              }))}
              required
            />

            <ZDropdown
              name="batchId"
              label={label.batch}
              value={batchId}
              onChange={this.handleChange}
              options={filteredBatches.map(batch => ({
                value: batch.id,
                label: `${batch.name} (${batch.startDate} - ${batch.endDate})`,
              }))}
              required
            />

            <Grid item xs={12} sm={4}>
              <ZPrimaryButton
                label={label.button.student}
                fullWidth
              />
            </Grid>
          </Grid>
        </form>

        {error && <p style={style.reqerror}>{error}</p>}

        {/* Student List */}
        <div>
          {students.map((student) => {
            const studentCourse = courses.find((c) => c.id === student.courseId);
            const studentBatch = batches.find((b) => b.id === student.batchId);

            return (
              <div key={student.id} style={style.delete}>
                <div>
                  <strong>{student.name}</strong>
                  <div>
                    {studentCourse?.name} | {studentBatch?.name} ({studentBatch?.startDate} - {studentBatch?.endDate})
                  </div>
                </div>

                <ZPrimaryButton
                  label={label.button.delete}
                  color='error'
                  onClick={() => this.handleDelete(student.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(StudentManager);