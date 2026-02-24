import React, { Component } from "react";
import withRouter from "../../navigation/withRouter";
import style from "../../utils/Constant/style";
import ZTextbox from "../../Component/ZTextBox/zTextBox";
import ZPrimaryButton from "../../Component/ZButton/zPrimaryButton";
import ZCheckbox from "../../Component/ZCheckBox/zCheckbox";
import label from "../../utils/Constant/label";
import { Grid } from "@mui/material";

class CourseManager extends Component {
  state = {
    courseName: "",
    selectedSubjects: [],
    error: "",
    loading: false,
  };


  handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      this.setState({ courseName: value, error: "" });
    } else {
      this.setState({ error: label.error.letter });
    }
  };

  handleSubjectChange = (id, checked) => {
    this.setState((prev) => {
      let selected = [...prev.selectedSubjects];
      if (checked && !selected.includes(id)) selected.push(id);
      else selected = selected.filter((sid) => sid !== id);
      return { selectedSubjects: selected, error: "" };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { courseName, selectedSubjects } = this.state;
    const { addCourse } = this.props;

    if (!courseName.trim()) {
      return this.setState({ error: label.required.course });
    }

    if (selectedSubjects.length < 2) {
      return this.setState({ error: label.error.minimum });
    }

    this.setState({ loading: true });

    setTimeout(() => {
      const result = addCourse(courseName.trim(), selectedSubjects);
      if (result) this.setState({ error: result, loading: false });
      else
        this.setState({
          courseName: "",
          selectedSubjects: [],
          error: "",
          loading: false,
        });
    }, 300);
  };

  handleDelete = (id) => {
    const { deleteCourse } = this.props;
    if (!window.confirm(label.confirmDelete)) return;

    const result = deleteCourse(id);
    if (result) alert(result);
  };

  render() {
    const { subjects = [], courses = [] } = this.props;
    const { courseName, selectedSubjects, error, loading } = this.state;

    return (
      <div>
        <h2>{label.courseManagement}</h2>

        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <ZTextbox
              label={label.course}
              required
              placeholder={label.placeholder.course}
              inputProps={{ maxLength: 30 }}
              value={courseName}
              onChange={this.handleNameChange}
              fullWidth
            />
           
            {error && <p style={style.reqerror}>{error}</p>}
            
            <div>
              <p>{label.selectMinimum}</p>
              {subjects.length === 0 ? (
                <p>{label.addSubject}</p>
              ) : (
                subjects.map((sub) => (
                  <div key={sub.id} style={style.checkBox}>
                    <ZCheckbox
                      label={sub.name}
                      checked={selectedSubjects.includes(sub.id)}
                      onChange={(e, checked) =>
                        this.handleSubjectChange(sub.id, checked)
                      }
                    />
                  </div>
                ))
              )}
            </div>
          </Grid>

          <Grid style={{ marginTop: 16 }}>
            <ZPrimaryButton label={label.button.course} disabled={loading} />
          </Grid>
        </form>



        <div style={{ marginTop: 24 }}>
          {courses.length === 0 ? (
            <p>{label.sAvailable}</p>
          ) : (
            courses.map((course) => (
              <div key={course.id} style={style.delete}>
                <strong>{course.name}</strong>
                <div>
                  {course.subjectIds.map((id) => {
                    const sub = subjects.find((s) => s.id === id);
                    return sub ? <span key={id}> {sub.name} </span> : null;
                  })}
                </div>

                <ZPrimaryButton
                  label={label.button.delete}
                  color="error"
                  onClick={() => this.handleDelete(course.id)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(CourseManager);