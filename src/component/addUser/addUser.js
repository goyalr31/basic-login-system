import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { getUser, removeUser, addUser, editUser } from '../../actions/action';
import { Navigate, useLocation } from 'react-router-dom';
import '../../App.css';
import '../../css/style.css';

function AddUser() {
    const [isValid, setIsValid] = useState(null);
    const [user, setUser] = useState({name:"", username:"", password:""})
    
    const location = useLocation()?.state;
    // console.log(location)
    
    function onFnf(message){
        alert(message);
    }
    const handleLoginChange = (e) => {
        let tempLogin = Object.assign({}, user, {[e.target.name]: e.target.value});
        setUser(tempLogin);
    }
            
    const handleSubmit = async(event) => {
        event.preventDefault();
        if(location!=null || location!=undefined){
            const response = await editUser(user)
            setIsValid(true)
            console.log(response)
            if(response.status==200){
                setTimeout(function() { onFnf("User Updated Successfully"); }, 100);
            }
            else{
                setTimeout(function() { onFnf("Invalid"); }, 100);
            }
        }
        else{
            const response = await addUser(user)
            setIsValid(true)
            console.log(response)
            if(response.status==201){
                setTimeout(function() { onFnf("User Added Successfully"); }, 100);
            }
            else{
                setTimeout(function() { onFnf("Invalid"); }, 100);
            }
        }
    }
    useEffect(() => {
        if (location!=null || location!=undefined){
            const userData = location
            setUser(userData)
        }
    }, [])
    return (
        <>
            {isValid ? <Navigate to="/dashboard" /> : 
            <div className={"form-layout m-4"}>
                <div id="divLogin" className={"bgImage panel-body"}>
                    <Form horizontal="true" onSubmit={handleSubmit}>
                        <Form.Group controlId="formHorizontalFullname" className="mb-2">
                            <Col sm={12}>
                                <Form.Control size="lg" name="name" defaultValue={user?.name} className="input-lg" onChange={handleLoginChange} type="text" placeholder="Enter Full Name" autoComplete='off'required />
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="formHorizontalUsername" className="mb-2">
                            <Col sm={12}>
                                <Form.Control size="lg" name="username" defaultValue={user?.username} className="input-lg" onChange={handleLoginChange} type="text" placeholder="Enter Username" autoComplete='off' required/>
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="formHorizontalPassword" className="mb-2">
                            <Col sm={12}>
                                <Form.Control size="lg" name="password" defaultValue={user?.password} className="input-lg" onChange={handleLoginChange} type="password" placeholder="Password" autoComplete='off' required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={4}>
                                <Button className="ml1 ms-4" variant="success" type="submit"> Save </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>} 
        </>
    )
}
export default AddUser;
