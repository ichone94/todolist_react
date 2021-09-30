import React from "react";
import axios from "axios";

const API_URL = "http://localhost:2001/"
class TodoList extends React.Component {
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
        axios.get(`${API_URL}toDo`)
        .then((response)=>{
            console.log(response.data);
            this.setState({ dbTodo: response.data })
        })
        .catch((error)=> {
            console.log(error);
        })
    }

    printToDo = () => {
        return this.state.dbTodo.map((value, index) => {
            if (this.state.selectedId == value.id) {
                return(
                    <tr>
                    <th>{index+1}</th>
                    <td><input type="text" defaultValue={value.kegiatan} ref="editKegiatan"/></td>
                    <td><input type="text" defaultValue={value.detail} ref="editDetail"/></td>
                    <td>
                        <button className="btn btn-outline-warning btn-sm" type="button" onClick={this.btnCancel}>Cancel</button>
                        <button className="btn btn-primary btn-sm" type="button" onClick={this.btnSubmit}>Save</button>
                    </td>
                </tr>
                )
            }else {
                return(
                <tr>
                    <th>{index+1}</th>
                    <td>{value.kegiatan}</td>
                    <td>{value.detail}</td>
                    <td>
                        <button className="btn btn-danger btn-sm" type="button" onClick={()=>this.btnDelete(value.id)}>Delete</button>
                        <button className="btn btn-warning btn-sm" type="button" onClick={()=>this.btnEdit(value.id)}>Edit</button>
                    </td>
                </tr>
                )

            }
            
        })
    }

    btnSubmit = (id) => {
        let kegiatan = this.refs.editKegiatan.value;
        let detail = this.refs.editDetail.value;

        axios.patch(`${API_URL}toDo/${this.state.selectedId}`, {
            kegiatan,
            detail
        }).then((response)=>{
            this.getData()
            this.setState({selectedId: null})
        }).catch((error)=>{
            console.log(error);
        })
        
        
        // let temp = [...this.state.dbTodo]
        // temp[this.state.selectedIndex].kegiatan = this.refs.editKegiatan.value
        // temp[this.state.selectedIndex].detail = this.refs.editDetail.value
        // this.setState ({
        //     dbTodo: temp,
        //     selectedId: null
        // })

    }

    btnEdit = (id) => {
        this.setState({ selectedId: id })
    }

    btnCancel = () => {
        this.setState ({selectedId : null})
    }

    btnDelete = (id) => {
        axios.delete(`${API_URL}toDo/${id}`)
        .then((response)=> {
            this.getData()
        }).catch((error) => {
            console.log(error);
        })
    }

    btnAdd = () => {
        let kegiatan = this.refs.addKegiatan.value;
        let detail = this.refs.addDetail.value;

        axios.post(`${API_URL}toDo`,{
            kegiatan,
            detail
        }).then((response)=>{
            this.getData();
        }).catch((error)=> {
            console.log(error);
        })

        // let temp = [...this.state.dbTodo];

        // temp.push({kegiatan,detail})

        // this.setState({dbTodo:temp})

        // this.state.dbTodo.push({kegiatan, detail})
        // this.setState({dbTodo:this.state.dbTodo})
    }


    render() {
        return (
            <div style={{width:'70vw', margin:"auto", border:"1px solid black", overflow:"auto"}}>
                <h2 style={{textAlign:'center'}}>To Do list</h2>
                <table className="table" style={{ margin:'auto' }}>
                    <thead className="thead-dark">
                        <th>No</th>
                        <th>Kegiatan</th>
                        <th>Detail</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {this.printToDo(TodoList)}
                    </tbody>
                    <tfoot>
                        <th>#</th>
                        <th><input type="text" placeholder="Kegiatan Baru" ref="addKegiatan"/></th>
                        <th><input type="text" placeholder="Detail" ref="addDetail"/></th>
                        <td><button className="btn btn-primary btn-sm" type="button" onClick={this.btnAdd}>Add</button></td>
                    </tfoot>
                </table>
            </div>
        );
    }
}
export default TodoList;