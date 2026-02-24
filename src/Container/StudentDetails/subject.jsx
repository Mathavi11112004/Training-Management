import React, { Component } from "react";
import label from '../../utils/Constant/label';
import ZPrimaryButton from "../../Component/ZButton/zPrimaryButton";
import ZTextbox from "../../Component/ZTextBox/zTextBox";
import style from "../../utils/Constant/style";
import { Grid } from "@mui/material";

class SubjectManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectName: "",
      error: "",
      loading: false,
    };
  }

  handleChange = (e) => {
    const lettersOnly = e.target.value.replace(/[^a-zA-Z ]/g, "");
    this.setState({ subjectName: lettersOnly, error: "" });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { subjectName } = this.state;
    const { addSubject } = this.props;

    const trimmed = subjectName.trim();

    if (!trimmed) {
      this.setState({ error: label.required.subject });
      return;
    }
    const lettersRegex = /^[A-Za-z ]+$/;
    if (!lettersRegex.test(trimmed)) {
      this.setState({ error: label.error.letter });
      return;
    }

    this.setState({ loading: true });
    setTimeout(() => {
      const result = addSubject(trimmed);
      if (result) {
        this.setState({ error: result, loading: false });
      } else {
        this.setState({ subjectName: "", error: "", loading: false });
      }
    }, 300);
  };

  handleDelete = (id) => {
    const { deleteSubject } = this.props;
    if (!window.confirm(label.confirmDelete)) return;

    const result = deleteSubject(id);
    if (result) alert(result);
  };

  render() {
    const { subjects } = this.props;
    const { subjectName, error, loading } = this.state;

    return (
      <div>
        <h2>{label.subjectManagement}</h2>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <ZTextbox
              label={label.subject}
              required
              placeholder={label.placeholder.subjectName}
              inputProps={{ maxLength: 30 }}
              value={subjectName}
              onChange={this.handleChange}
              fullWidth
            />
            {error && <p style={style.reqerror}>{error}</p>}

            <Grid item xs={12} sm={4}>
              <ZPrimaryButton
                label={label.subject}
                fullWidth
              />
            </Grid>
          </Grid>
        </form>

        <div style={{ marginTop: 20 }}>
          {subjects.length === 0 ? (
            <p>{label.sAvailable}</p>
          ) : (
            subjects.map((subject) => (
              <div key={subject.id} style={style.delete}>
                <span>{subject.name}</span>
                <ZPrimaryButton
                  label={label.button.delete}
                  onClick={() => this.handleDelete(subject.id)}
                  color="error"
                />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default SubjectManager;