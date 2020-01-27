import React, { Component } from "react";
import "./EditStudent.css";
import axios from "axios";
import { withRouter } from "react-router";
import { toast, ToastContainer } from "react-toastify";

class EditStudent extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    age: "",
    response: ""
  };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  async componentDidMount() {
    try {
      let search = this.props.location.search;
      let id = search.substring(1, search.length);
      const updateStudent = await axios(`/api/students/${id}`);
      const { name, email, age } = updateStudent.data.student;
      this.setState({ id, name, email, age });
    } catch (err) {
      this.setState({ response: "Student not found!" });
    }
  }

  updateStudentHandler = async e => {
    e.preventDefault();
    try {
      const student = await axios.put(`/api/students/${this.state.id}`, {
        name: this.refs.name.value,
        email: this.refs.email.value,
        age: this.refs.age.value
      });
      toast(student.data.message, { type: toast.TYPE.INFO, autoClose: 3000 });
      this.props.rerenderParentCallback();
    } catch (err) {
      toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  render() {
    if (this.state.response === "Student not found!")
      return <h1>Student not found!</h1>;
    return (
      <div className="Edit-Student-Wrapper">
        <h1>Edit page</h1>
        <form onSubmit={this.updateStudentHandler}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Name..."
            value={this.state.name}
            name="name"
            onChange={this.onChangeHandler}
            ref="name"
            required
            className="Edit-Student-Input"
            id="name"
          />
          <label htmlFor="email">
            Email: <b>(must be a valid email)</b>
          </label>
          <input
            type="email"
            placeholder="Enter your email here"
            value={this.state.email}
            name="email"
            required
            onChange={this.onChangeHandler}
            ref="email"
            className="Edit-Student-Input"
            id="email"
          />
          <label htmlFor="age">Age: </label>
          <input
            type="number"
            placeholder="Enter the student's age"
            value={this.state.age}
            name="age"
            min="1"
            max="120"
            required
            onChange={this.onChangeHandler}
            ref="age"
            className="Edit-Student-Input"
            id="age"
          />
          <button
            type="submit"
            className="Edit-Student-Submit fa fa-pencil"
          ></button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default withRouter(EditStudent);
