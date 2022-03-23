import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";

import { useFormValidation } from "../../../hooks/useFormValidation";
import { AdminForgotPassword } from "../../../redux/actions/authAct";
import Spinner from "../../../components/Loader";

import PublicLayout from "../../../components/Layout/Public/PublicLayout";
import Header from "../../../components/Header/Header";
import InputField from "../../../components/InputField/Input";
import { PublicButton } from "../../../components/Button/Button";
import CustomModal from "../../../components/Modal/Modal";

export const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

const stateSchema = {
  email: {
    value: "",
    error: "",
  },
};

const validateSchema = {
  email: {
    required: true,
    validator: {
      regEx: isEmail,
      error: "Invalid email address",
    },
  },
};

const ForgotPassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const forgotState = useSelector((state) => state.forgotPasswordRes);

  const { state, disable, handleChange } = useFormValidation(
    stateSchema,
    validateSchema
    // handleSend
  );

  const { email } = state;
  const body = {
    email: email.value,
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      dispatch(AdminForgotPassword(body));
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    if (forgotState?.status === 200) {
      const data = forgotState?.data?.data;
      data && setShowModal(true);

      setLoading(false);
    }
  }, [forgotState]);

  return (
    <PublicLayout password="true">
      <section className="login_container">
        <Header
          headerIcon={<RiLockPasswordLine />}
          headerTitle="Forgot Password"
          headerSubtitle="A verification reset password link will be sent to your email address"
        />
        <hr />
        <form className="form" noValidate>
          <div className="form_group">
            <InputField
              id="email"
              type="email"
              value={email.value}
              name="email"
              label="Enter Your Email Address"
              onChange={handleChange}
              leftIcon={<AiOutlineMail />}
            />
            {email.error ? (
              <span className="error">{email.error}</span>
            ) : email.value ? (
              <span style={{ color: "green" }} className="error">
                Email ✔
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="footer">
            <PublicButton
              btntitle="Reset Password"
              type="outline"
              onClick={handleSubmit}
              disabled={disable}
            />
          </div>
          <Spinner visible={loading} />
        </form>
        <CustomModal
          visible={showModal}
          style={{
            width: "50%",
            top: "100px",
          }}
          closeModal={() => setShowModal(false)}
          children={
            <div>
              <div className="modal_icon">
                <RiLockPasswordLine />
              </div>
              <h1>Check Your Mail</h1>
              <p>
                A Password resent Link has been sent to your mail for
                verification, Kindly check your email Lanre********@gmail.com
              </p>
              <PublicButton
                btntitle="Okay, Thank you"
                type="fill"
                onClick={() => setShowModal(false)}
              />
            </div>
          }
        />
      </section>
    </PublicLayout>
  );
};

export default ForgotPassword;
