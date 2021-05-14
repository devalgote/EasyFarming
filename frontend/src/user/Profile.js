import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        location:"",
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { name, email, password, location, error, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password, location }).then(
            data => {
                if (data.error) {
                    console.lgo(data.error);
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            name: data.name,
                            email: data.email,
                            location: data.location,
                            success: true
                        });
                    });
                }
            }
        );
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/" />;
        }
    };

    const profileUpdate = (name, email, password, location) => (
        <div className="auth-wrapper">
            <div className="auth-inner-left">
                <form>
                    <h3>Update Details</h3>
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
                    <button onClick={clickSubmit} className="btn btn-secondary btn-lg btn-block">Submit</button>
                </form>
            </div>
        </div>
    );

    return (
        <Layout
            title="Profile Update"
            description=" "
            className="container-fluid"
        >
            <div className="col-4 ml-10">
                {profileUpdate(name, email, password, location)}
                {redirectUser(success)}
            </div>
        </Layout>
    );
};

export default Profile;
