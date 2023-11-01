import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import banner from '../assets/banner.png';
import './Login.css';
import { FormattedMessage, useIntl } from "react-intl";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const intl = useIntl();

    const handleEmailChange = (e) => {
        setFormData({ ...formData, email: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setFormData({ ...formData, password: e.target.value });
    };

    const handleCancel = () => {
        setFormData({ email: "", password: "" });
    };

    async function handleLogin() {
        const response = await fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: formData.email,
                password: formData.password
            })
        });

        const data = await response.json();

        if (response.status === 200) {
            navigate("/Home", { state: { userRole: "admin" } });
        } else {
            const errorMessage = data.message === "The provided credentials are incorrect."
                ? intl.formatMessage({ id: "login.error" })
                : data.message;
            setError(errorMessage || "No se pudo iniciar sesión");
        }
    }

    return (
        <div>
            <div>
                <h2 className="titulo">
                    <FormattedMessage id="login.title" />
                </h2>
                <hr />
            </div>
            <img src={banner} alt="Banner" className="banner-image" />
            <hr />
            <div>
          <div className="login_container mt-3">
            <b className="text-iniciarSesion">
              <FormattedMessage id="login.login" />
            </b>
          </div>
          <div className="login_container mt-3 login_custom-container">
            <div className="row justify-content-center">
            <div className="col-md-6">
              <form className="login_form">
                <div className="form-group text-left-label">
                  <label>
                    <FormattedMessage id="login.username" />
                  </label>
                  <input
                    className="form-control"
                    value={formData.email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-group text-left-label">
                  <label>
                    <FormattedMessage id="login.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="button-group">
                  <button type="button" className="btn btn-success" onClick={handleLogin}>
                    <FormattedMessage id="login.enter" />
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleCancel}>
                    <FormattedMessage id="login.cancel" />
                  </button>
                </div>
                {error && <div className="error-message" style={{textAlign: 'left'}}>{error}</div>}
              </form>
            </div>
            </div>
          </div>
      </div>
      <div className="contact-info">
          <FormattedMessage id="login.contact" />
      </div>
        </div>
    );
}

export default Login;