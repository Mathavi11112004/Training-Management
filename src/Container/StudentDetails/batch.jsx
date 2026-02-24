// src/Pages/BatchManager/BatchManager.jsx
import React, { Component } from "react";
import { Grid } from "@mui/material";
import ZTextbox from "../../Component/ZTextBox/zTextBox";
import ZDropdown from "../../Component/ZDropDown/zdropDown";
import ZPrimaryButton from "../../Component/ZButton/zPrimaryButton";
import ZDatePicker from "../../Component/ZDatePicker/zDatePicker";
import style from "../../utils/Constant/style";
import label from "../../utils/Constant/label";
import withRouter from "../../navigation/withRouter";

class BatchManager extends Component {
  state = {
    batchName: "",
    courseId: "",
    startDate: "",
    endDate: "",
    error: "",
  };

  handleBatchNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      this.setState({ batchName: value, error: "" });
    } else {
      this.setState({ error: label.error.letter });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { batchName, courseId, startDate, endDate } = this.state;
    const { addBatch } = this.props;

    const cleanedName = String(batchName || "").trim();

    if (!cleanedName || !courseId || !startDate || !endDate) {
      this.setState({ error: label.error.field });
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      this.setState({ error: label.error.date });
      return;
    }

    const batchObj = {
      name: cleanedName,
      courseId,
      startDate,
      endDate,
    };

    addBatch(batchObj);

    this.setState({
      batchName: "",
      courseId: "",
      startDate: "",
      endDate: "",
      error: "",
    });
  };

  handleDelete = (id) => {
    this.props.deleteBatch(id);
  };

  render() {
    const { courses = [], batches = [] } = this.props;
    const { batchName, courseId, startDate, endDate, error } = this.state;

    return (
      <div style={style.card}>
        <form onSubmit={this.handleSubmit} noValidate>
          <Grid container spacing={2}>
            <ZTextbox
              name="batchName"
              label={label.batch}
              value={batchName}
              onChange={this.handleBatchNameChange}
              fullWidth
              required
            />

            <ZDropdown
              name="courseId"
              value={courseId}
              label={label.course}
              onChange={this.handleChange}
              required
              options={courses.map((course) => ({
                value: course.id,
                label: course.name,
              }))}
            />

            <Grid item xs={6}>
              <ZDatePicker
                label={label.start}
                required={true}
                value={startDate}
                onChange={(val) =>
                  this.setState({ startDate: val, error: "" })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <ZDatePicker
                label={label.end}
                required={true}
                value={endDate}
                onChange={(val) =>
                  this.setState({ endDate: val, error: "" })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <ZPrimaryButton label={label.button.batch} fullWidth />
            </Grid>
          </Grid>
        </form>

        {error && <p style={style.error}>{error}</p>}

        <div style={{ marginTop: 24 }}>
          {batches.map((batch) => {
            const course = courses.find((c) => c.id === batch.courseId);
            return (
              <div key={batch.id} style={style.delete}>
                <div>
                  <strong>{batch.name}</strong>
                  <div>
                    {course?.name || "-"} | {batch.startDate} - {batch.endDate}
                  </div>
                </div>
                <ZPrimaryButton
                  label={label.button.delete}
                  color="error"
                  onClick={() => this.handleDelete(batch.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(BatchManager);