import React,{useState, useEffect} from 'react';
import { Container, Form, Button, Alert, Card, Row, Col, Table } from 'react-bootstrap';
import ContentModal from './Modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
let taskID = 1;
const Todo = () => {
    let taskArray = [];
    let taskObject = {};
    let taskDate = "";
    
    const [startDate, setStartDate] = useState(new Date());
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [showModal, setShowModal] = useState(false);
    let statusArray = ["Draft", "In Progress", "Completed"];
    const columns = [
        { field: 'id', headerName: 'ID', width: 170, editable: true, hide: true },
  { field: 'task', headerName: 'Task', width: 170, editable: true },
        { field: 'date', headerName: 'Date', width: 300, editable: true, type: 'dateTime' },
        { field: 'description', headerName: 'Description', width: 300, height: 100, editable: true, hide: true },
        { field: 'status', headerName: 'Status', width: 300, editable: true, type: 'singleSelect', valueOptions: statusArray }
  
];

    function addTodo() {
        console.log(status);
        taskObject = {
            id: taskID++,
            task: task,
            date: new Date(startDate).toString().split('GMT')[0],
            description: description,
            status: status
        }
        setTodos([...todos, taskObject]);
    }
    function modalShow() {
        setShowModal(true);
    }
    function modalHide() {
        setShowModal(false);
    }
    useEffect(() => {
        localStorage.setItem("myTodos", JSON.stringify(todos));
    },[todos])
    return (
        <div className="todo">
            <Container>
                <Row>
                    <Col md={4}>
                    <Form className="py-3 my-5">
                    
                    
                    <Form.Group controlId="formBasicTask">
                       
                                <Form.Control type="text"
                                    value={task}
                                    onChange={e => setTask(e.target.value)}
                                    placeholder="Add your task here" />
                    </Form.Group>

                    <Form.Group >
                        <DatePicker placeholder="Select Date and Time"
                            className="form-control formBasicDate"
                            
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    showTimeSelect
                            dateFormat="Pp"
                            excludeOutOfBoundsTimes
                            minDate={new Date()}
                            //  excludeTimes={[
                            //      new Date(2021, 11, 21, 22, 30, 0, 0),
                            //      new Date(2021, 11, 21, 21, 30, 0, 0),
                            //      new Date(2021, 11, 21, 23, 30, 0, 0),
                            //      new Date(2021, 11, 21, 12, 30, 0, 0),
                            //      new Date(2021, 11, 21, 11, 30, 0, 0),
                            //      new Date(2021, 11, 21, 9, 30, 0, 0),
                            //      new Date(2021, 11, 21, 8, 30, 0, 0)
                            // ]}
                    // filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
                    isClearable
                    showYearDropdown
                scrollableMonthYearDropdown/>
                    </Form.Group>

                             <Form.Group controlId="formBasicTask">
                       
                                <Form.Control as="textarea"
                                    value={description} rows={5}
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="Description" />
                    </Form.Group>

                    <Form.Group controlId="formBasicStatus">
                       
                                <Form.Control as="select" value={status} onChange={e => setStatus(e.target.value)}>
                                    {
                                        statusArray.map((value, index) => (
                                            <option key={index} value={value}>{ value }</option>
                                        ))
                                }
                                </Form.Control>
                    </Form.Group>
                            
                    <Form.Group className="btnAdd">
                    <Button className="btn btn-dark addBtn" size="lg" onClick={addTodo}>
                        Add
                    </Button>
                    </Form.Group>
                    
                    </Form>
                    </Col>
                    <Col md={8}>
                            <div className='dvTodos py-4 my-4'>
                            <Table >
                                    <thead>
                                <tr>
                                    <th>Id</th>
                                        <th>Task</th> 
                                        <th>Date</th>
                                        <th>Description</th>
                                        
                                        </tr>
                                        
                                    </thead>     
                                    <tbody>
                                {todos.map((todo, index) => (
                                 
                                    <tr key={todo.id}>
                                        <td>{ todo.id }</td>
                                        <td>{todo.task}</td>
                                        <td>{todo.date}</td>
                                    <td>{todo.description}</td>
                                    <td><i style={{ color: 'blue' }} className="fas fa-edit" ><button onClick={()=> setShowModal(true)}>Edit</button></i></td>
                                    <td><i style={{ color: 'red' }} className="fas fa-trash"></i></td>
                                    </tr>  
                            ))}   
                </tbody>
               </Table>
            </div>
                         {/* <div className="dvTodos py-3 my-5" >
                                <DataGrid rows={todos} columns={columns} 
                                pageSize={5} rowsPerPageOptions={[2, 5, 7]} 
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                                checkboxSelection
                    />
                    </div> */}
                    </Col>

                </Row>
                <Row>
                    <ContentModal showmodal={showModal} handleShow={ modalShow } handleClose={ modalHide }/>
                     
                </Row>
               
            </Container> 


           
        </div>
    )
}

export default Todo;