import React, { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { backendUrl } from "../../static/js/const";
import { useForm } from "react-hook-form";

const TabOne = ({ display, register }) => {
  const style = display ? { display: "block" } : { display: "none" };
  return (
    <div style={style}>
      <input
        className="sidebar-input border--gray border--onHoverBlue"
        type="text"
        name="first_name"
        placeholder="Имя"
        ref={register({ required: true })}
      />
      <input
        className="sidebar-input border--gray border--onHoverBlue"
        type="text"
        name="last_name"
        placeholder="Фамилия"
        ref={register({ required: true })}
      />
      <input
        className="sidebar-input border--gray border--onHoverBlue"
        type="text"
        name="username"
        placeholder="Имя пользователя"
        ref={register({ required: true })}
      />
    </div>
  );
};

const TabTwo = ({ display, register }) => {
  const style = display ? { display: "block" } : { display: "none" };
  return (
    <div style={style}>
      <input
        className="sidebar-input border--gray border--onHoverBlue"
        type="email"
        name="email"
        placeholder="Email"
        ref={register({ required: true })}
      />
      <input
        className="sidebar-input border--gray border--onHoverBlue"
        type="password"
        name="password"
        placeholder="Пароль"
        ref={register({ required: true })}
      />
    </div>
  );
};

const RegisterForm = ({setErrMsgs}) => {
  const { register, handleSubmit, watch } = useForm();
  const [isTabOne, setIsTabOne] = useState(true);
  const firstName = watch("first_name", "");
  const lastName = watch("last_name", "");
  const username = watch("username", "");
  const email = watch("email", "");
  const passw = watch("password", "");
  const history = useHistory();

  const onSubmit = async (data) => {
    const url = `${backendUrl}/register/`;
    try {
      await axios.post(url, data);
      history.push("/login");
    } catch (err) {
      if (err.response?.status === 400) {
          setErrMsgs({signup: true , err: true, msgs: err.response.data});
      }else {
          setErrMsgs({signup: false, err: true, msgs: { Connection: 'Refused', Server: 'Maybe Down'}});
      }
    }
  };

  const validTabContent = () => {
    if (isTabOne)
      return [firstName, lastName, username]
        .map((x) => x.trim() !== "")
        .reduce((a, b) => a && b, true);
    else return passw.trim() !== "" && passw.length >= 8 && email.trim() !== "";
  };

  const getClass = () => {
    let str = "btn";
    if (!validTabContent()) {
      str += " btn--disabled";
    }
    return str;
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login-fieldset">
        <TabOne display={isTabOne} register={register} />
        <TabTwo display={!isTabOne} register={register} />
        <div className="buttons">
          {!isTabOne ? (
            <button
              id="prev"
              className="btn"
              onClick={() => setIsTabOne(true)}
              style={{ marginRight: "1em" }}
            >
              Вернуться
            </button>
          ) : null}
          <button
            id="next"
            className={getClass()}
            onClick={() => setIsTabOne(false)}
            disabled={!validTabContent()}
          >
            {isTabOne ? "Продолжить" : "Зарегистрироваться"}
          </button>
        </div>
      </div>
    </form>
    </>
  );
};

export default RegisterForm;
