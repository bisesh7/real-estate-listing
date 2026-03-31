import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import styles from "../Styles/main.module.scss";
import classNames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("danger");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      loginUser(values);
    },
  });

  const loginUser = async (userData) => {
    try {
      const response = await axios.post("/api/auth/login", userData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage("Login successful");
      setAlertVariant("success");
      setShowAlert(true);

      setTimeout(() => {
        navigate("/listings");
      }, 2000);

      console.log("User logged in", userData);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error logging in");
      setAlertVariant("danger");
      setShowAlert(true);
      console.error("Error logging in", err.response?.data || err.message);
    }
  };

  return (
    <div
      className={classNames(
        styles.signupContainer,
        "d-flex",
        "justify-content-center",
        "align-items-center",
      )}
    >
      <Form
        noValidate
        className={styles.signupComponent}
        onSubmit={formik.handleSubmit}
      >
        {showAlert && (
          <Alert
            variant={alertVariant}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {message}
          </Alert>
        )}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Email
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Password
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Log In
          </Button>{" "}
        </div>
        <div className="d-flex justify-content-center">
          <span>
            Don't have an account? <Link to={"/signup"}>Sign Up</Link> instead
          </span>
        </div>
      </Form>
    </div>
  );
};
