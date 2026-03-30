import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import styles from "../Styles/main.module.scss";
import classNames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("danger");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required.")
      .email("Invalid email format"),
    name: Yup.string().required("First name is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords need to match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      createUser(values);
    },
  });

  const createUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setMessage("User created successfully!, Navigating to login...");
      setAlertVariant("success");
      setShowAlert(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
      console.log("User created", userData);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error creating user");
      setAlertVariant("danger");
      setShowAlert(true);
      console.error("Error creating user", err.response?.data || err.message);
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
            Name
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Email
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
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

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Confirm Password
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.confirmPassword}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </div>
        <div className="d-flex justify-content-center">
          <span>
            Already have a account? <Link to={"/"}>Log in</Link> instead
          </span>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
