import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button, Form, Col, Row } from 'react-bootstrap';
import '../../css/style.css';
import { loginAction } from '../../actions/action';
function Login(props) {
    const [isValid, setIsValid] = useState(null);
    const [login, setLogin] = useState({username:"",password:""})
    
    const handleLoginChange = (e) => {
        let tempLogin = Object.assign({}, login, {[e.target.name]: e.target.value});
        setLogin(tempLogin);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        props.login(login);
    }
    if(isValid === false){
        alert("Invalid Login")
    }
    return (
        <>
            {props.authState ? <Navigate to="/dashboard" /> : <div className="form-layout">
                <div className={"panel-heading"}>
                    <div className="panel-heading-left">
                        <h3>Sign up now</h3>
                        <p>Get access to your orders and chat for support.</p>
                    </div>
                </div>
                <div id="divLogin" className={"bgImage panel-body"}>
                    <Form horizontal="true" onSubmit={handleSubmit}>
                        <Form.Group controlId="formHorizontalUsername" className="mb-2">
                            <Col sm={12}>
                                <Form.Control size="lg" name="username" className="input-lg" onChange={handleLoginChange} type="text" placeholder="Enter Username" autoComplete='off' required/>
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="formHorizontalPassword" className="mb-2">
                            <Col sm={12}>
                                <Form.Control size="lg" name="password" className="input-lg" onChange={handleLoginChange} type="password" placeholder="Password" autoComplete='off' required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={4}>
                                <Button className="ml1 ms-4" variant="success" type="submit"> Sign in </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        authState: state.login.isAuthed
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(loginAction(data))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
