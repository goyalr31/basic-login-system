import React from 'react';
import Login from './login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/style.css';
function LoginForm(props) {
    return (
        <div>
            <div className="container" id="wrap">
                <div className={"row bgClass"} style={{ "marginTop": "15px", "marginBottom": "45px" }}>
                    <div className={"col-lg-5 offset-lg-7"}>
                        <Login history={props.history} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginForm;
