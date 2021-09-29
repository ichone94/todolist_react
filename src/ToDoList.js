import React from "react";
import axios from "axios";

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbTodo:[],
            selectedIndex: null
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        axios.get(`http://localhost:2001/toDo`)
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
            if (this.state.selectedIndex == index) {
                return(
                    <tr>
                    <th>{index+1}</th>
                    <td><input type="text" defaultValue={value.kegiatan} ref="editKegiatan"/></td>
                    <td><input type="text" defaultValue={value.detail} ref="editDetail"/></td>
                    <td>
                        <button type="button" onClick={this.btnCancel}>Cancel</button>
                        <button type="button" onClick={this.btnSubmit}>Save</button>
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
                        <button type="button" onClick={()=>this.btnDelete(index)}>Delete</button>
                        <button type="button" onClick={()=>this.btnEdit(index)}>Edit</button>
                    </td>
                </tr>
                )

            }
            
        })
    }

    btnSubmit = (idx) => {
        let temp = [...this.state.dbTodo]
        temp[this.state.selectedIndex].kegiatan = this.refs.editKegiatan.value
        temp[this.state.selectedIndex].detail = this.refs.editDetail.value
        this.setState ({
            dbTodo: temp,
            selectedIndex: null
        })

    }

    btnEdit = (idx) => {
        this.setState({ selectedIndex: idx })
    }

    btnCancel = () => {
        this.setState ({selectedIndex : null})
    }

    btnDelete = (idx) => {
        let temp = [...this.state.dbTodo]
        temp.splice(idx, 1)
        this.setState({ dbTodo: temp  })
    }

    btnAdd = () => {
        let kegiatan = this.refs.addKegiatan.value;
        let detail = this.refs.addDetail.value;
        let temp = [...this.state.dbTodo];

        temp.push({kegiatan,detail})

        this.setState({dbTodo:temp})

        // this.state.dbTodo.push({kegiatan, detail})
        // this.setState({dbTodo:this.state.dbTodo})
    }


    render() {
        return (
            <div style={{width:'70vw', margin:"auto", border:"1px solid black"}}>
                <h2 style={{textAlign:'center'}}>To Do list</h2>
                <table style={{ margin:'auto' }}>
                    <thead>
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
                        <td><button type="button" onClick={this.btnAdd}>Add</button></td>
                    </tfoot>
                </table>
            </div>
        );
    }
}
export default TodoList;