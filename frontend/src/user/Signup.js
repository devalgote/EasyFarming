import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
        role: "",
        error: "",
        success: false
    });

    const { name, email, password, location, role, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password, location, role }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    location: "",
                    role:"",
                    error: "",
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <div className="auth-wrapper-up">
            <div className="auth-inner-up">
                <form>
                    <h3>Sign Up</h3>
                    <div className="form-group">
                        <label >Name</label>
                        <input
                            onChange={handleChange("name")}
                            type="text"
                            className="form-control"
                            placeholder="Name" 
                            value={name}
                        />
                    </div>

                    <div className="form-group">
                        <label >Email</label>
                        <input
                            onChange={handleChange("email")}
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            onChange={handleChange("password")}
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                        />
                    </div>
                    <div className="form-group">
                        <label >Location</label>
                        <input
                            onChange={handleChange("location")}
                            type="text"
                            className="form-control"
                            placeholder="location" 
                            value={location}
                        />
                    </div>
                    <div className="form-group">
                        <label >Select</label>
                            <select
                                onChange={handleChange("role")}
                                className="form-control"
                                placeholder="Choose "
                            >
                    <option type="number" value={""}>Choose One</option>
                    <option type="number" value={"1"}>Farmer</option>
                    <option type="numer" value={"0"}>Customer</option>
                </select>
            </div>
                    <button onClick={clickSubmit} className="btn btn-secondary btn-lg btn-block">Submit</button>
                </form>
            </div>
        </div>
    );


    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );


    return (
        <Layout
            title=" "
            description=" "
            className="container col-md-4 offset-md-4" >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
	);
};

export default Signup;
