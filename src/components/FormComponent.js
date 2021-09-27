import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

class FormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{ name: "" }],
      clickedSubmit: false,
      showModal: false,
      changeData: [{ name: "" }],
    };
  }

  toogleAdd = () => {
    this.setState({
      showModal: true,
    });
  };

  handleChange = (i, e) => {
    let changeData = this.state.changeData;
    changeData[i][e.target.name] = e.target.value;
    this.setState({ changeData });
  };

  addInput() {
    this.setState({
      changeData: [...this.state.changeData, { name: "" }],
    });
  }

  removeFormFields(i) {
    let changeData = this.state.changeData;
    changeData.splice(i, 1);
    this.setState({ changeData });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = [...this.state.changeData];

    this.setState({
      clickedSubmit: true,
      showModal: false,
      data: updatedData,
    });
  };

  render() {
    return (
      <div>
        <h1>Form</h1>

        <div className="add-item-btn">
          <Button variant="primary" onClick={this.toogleAdd}>
            Add Item
          </Button>
        </div>

        {this.state.showModal && (
          <form onSubmit={this.handleSubmit} className="form-group">
            {this.state.changeData.map((item, index) => (
              <div className="form-inline" key={index}>
                <label>Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={item.name || ""}
                  onChange={(e) => this.handleChange(index, e)}
                />
                <button
                  className="btn-add-remove"
                  type="button"
                  onClick={() => this.addInput()}
                >
                  Add
                </button>

                {index ? (
                  <button
                    type="button"
                    className="btn-add-remove"
                    onClick={() => this.removeFormFields(index)}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            ))}

            <div className="button-section">
              <button className="button submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}

        {this.state.clickedSubmit && (
          <div className="item-lists">
            <h3>Item Lists</h3>
            <div className="table-list">
              <Table>
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {this.state.data?.map((item, index) => (
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <button className="btn btn-info">Edit</button>
                        <button className="btn btn-danger">Remove</button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FormComponent;
