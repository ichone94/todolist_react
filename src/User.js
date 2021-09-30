import React from "react";
import axios from "axios";

const API_URL = "http://localhost:2001/users"

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbTodo:[],
            selectedId: null
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}`)
        .then((response)=>{
            console.log(response.data);
            this.setState({ dbTodo: response.data })
        })
        .catch((error)=> {
            console.log(error);
        })
    }

    printUser= () => {
        return this.state.dbTodo.map((value, index) => {
            if (this.state.selectedId == value.id) {
                return(
                    <tr>
                    <th>{index+1}</th>
                    <td><input type="text" defaultValue={value.name} ref="editNama"/></td>
                    <td><input type="email" defaultValue={value.email} ref="editEmail"/></td>
                    <td><input type="password" defaultValue={value.password} ref="editPassword"/></td>
                    <td>{value.role}</td>
                    <td>
                        <button className="btn btn-outline-warning btn-sm mr-2" type="button" onClick={this.btnCancel}>Cancel</button>
                        <button className="btn btn-primary btn-sm" type="button" onClick={this.btnSubmit}>Save</button>
                    </td>
                </tr>
                )
            }else {
                return(
                <tr>
                    <th>{index+1}</th>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>{value.password}</td>
                    <td>{value.role}</td>
                    <td>
                        <button className="btn btn-danger btn-sm mr-2" type="button" onClick={()=>this.btnDelete(value.id)}>Delete</button>
                        <button className="btn btn-warning btn-sm" type="button" onClick={()=>this.btnEdit(value.id)}>Edit</button>
                    </td>
                </tr>
                )

            }
            
        })
    }

    btnAdd = () => {
        let name = this.refs.addNama.value;
        let email = this.refs.addEmail.value;
        let password = this.refs.addPassword.value;
        let role = this.refs.addRole.value;

        axios.post(`${API_URL}`,{
            name,
            email,
            password,
            role
        }).then((response)=>{
            this.getData();
        }).catch((error)=> {
            console.log(error);
        })

    }

    btnDelete = (id) => {
        axios.delete(`${API_URL}/${id}`)
        .then((response)=> {
            this.getData()
        }).catch((error) => {
            console.log(error);
        })
    }

    btnEdit = (id) => {
        this.setState({ selectedId: id })
    }

    btnCancel = () => {
        this.setState ({selectedId : null})
    }

    btnSubmit = (id) => {
        let name = this.refs.editNama.value;
        let email = this.refs.editEmail.value;
        let password = this.refs.editPassword.value;

        axios.patch(`${API_URL}/${this.state.selectedId}`, {
            name,
            email,
            password
        }).then((response)=>{
            this.getData()
            this.setState({selectedId: null})
        }).catch((error)=>{
            console.log(error);
        })
        

    }

    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-6 mx-auto">
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <h2 className="mb-3">Form Registrasi</h2>
                                <div className="row">
                                    <div className="col-12">
                                        <form>
                                            <div className="form-group">
                                                <label for="nama">Nama</label>
                                                <input type="text" className="form-control" ref="addNama"/>
                                            </div>
                                            <div className="form-group">
                                                <label for="email">Email</label>
                                                <input type="email" className="form-control" ref="addEmail"/>
                                            </div>
                                            <div className="form-group">
                                                <label for="nama">Password</label>
                                                <input type="password" className="form-control" ref="addPassword"/>
                                            </div>
                                            <div className="form-group d-none">
                                                <label for="nama">Role</label>
                                                <input type="text" value="User" ref="addRole"/>
                                            </div>
                                            <button className="btn btn-primary" onClick={this.btnAdd}>Submit</button>
                                        </form>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-12 mx-auto">
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <h2 className="mb-3">List User</h2>
                                <div className="row">
                                    <div className="col-12">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">No</th>
                                                    <th scope="col">Nama</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Password</th>
                                                    <th scope="col">Role</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.printUser(User)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




export default User;