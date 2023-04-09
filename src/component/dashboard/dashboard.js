import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { getUser, removeUser, addUser, logout } from '../../actions/action';
import '../../App.css';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Dashboard() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({name:"",username:"",password:""})
    const [userData, setUserData] = useState([])
    
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        addUser(login);
    }

    const handleUpdate =(user)=>{
        navigate('/editUser',{state:user});  
    }

    function onFnf(message){
        alert(message);
    }

    const handleLoginChange = (e) => {
        let tempLogin = Object.assign({}, login, {[e.target.name]: e.target.value});
        setLogin(tempLogin);
    }

    const handleDeleteUser = (user) => {
        const request = user
        const temp = async () =>{
            const resObj = await removeUser(request.id);
            await getUserList();
            if(resObj.status==200){
                setTimeout(function() { onFnf("Deleted Successfully"); }, 500);
            }
            else{
                setTimeout(function() { onFnf("Invalid"); }, 500);
            }
        } 
        temp()
    }

    const getUserList = async () => {
        const response = await getUser();
        setUserData(response);
        console.log(response)
    };
    const onLogout = (event) => {
        event.preventDefault()
        dispatch(logout())
        navigate('/');
    }

    useEffect(() => {
        getUserList()
    }, [])
    return (
        <div>
            <div className="container">
                <div className={"row bgClass"} style={{ "marginTop": "15px", "marginBottom": "45px" }}>
                    <div className=''>
                        <Link to={{ pathname: '/addUser' }} >
                            <Button className="ml1 ms-4" variant="success" type="button" > Add User </Button>
                        </Link>
                        <Button className="ml1 ms-4" variant="success" type="button" onClick={(event) => onLogout(event)}> Log Out </Button>
                    </div>
                </div>
                <div className={"row bgClass"} style={{ "marginTop": "15px", "marginBottom": "45px" }}>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userData?.map((employee) => {
                            return (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.username}</td>
                                <td>
                                    <Button className="ml1 ms-4" variant="success" type="button" onClick={() => handleUpdate(employee)}> Update </Button>
                                    <Button className="ml1 ms-4" variant="danger" type="button" onClick={() => handleDeleteUser(employee)}> Delete </Button>
                                </td>
                            </tr>
                            )
                        })
                        }
                        </tbody>
                    </table> 
                </div>
            </div>
        </div>
    )
}
export default Dashboard;