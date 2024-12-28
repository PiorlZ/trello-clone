import React, { useEffect } from "react";
import board from "../../static/img/board.svg";
import greenface from "../../static/img/greenface.svg";
import { modalBlurHandler, authAxios } from "../../static/js/util";
import { backendUrl } from "../../static/js/const";

import { useForm } from "react-hook-form";

const CreateTeamModal = ({ setShowModal, addProject }) => {
    useEffect(modalBlurHandler(setShowModal), []);
    const { register, handleSubmit, errors, watch } = useForm();
    const titleValue = watch("title", "");

    const animateFaces = () => {
        const face1 = document.querySelector(".create-team__face--1");
        if (titleValue !== "") {
            face1.style.top = "230px";
            face1.style.left = "60px";
        }
    };

    const onSubmit = async (data) => {
        const invitedMembers =
            data.members !== ""
                ? data.members.split(",").map((user) => user.trim()) // usernames and emails
                : [];

        try {
            const { data: resData } = await authAxios.post(
                backendUrl + "/projects/",
                data
            );
            if (invitedMembers.length !== 0) {
                await authAxios.post(
                    backendUrl + `/projects/${resData.id}/invite/`,
                    {
                        users: invitedMembers,
                    }
                );
            }
            addProject(resData);
        } catch (error) {
            console.log(error);
        }
        setShowModal(false);
    };

    return (
        <div className="create-team">
            <div className="create-team__form">
                <p className="create-team__title">Создать команду</p>
                <p className="create-team__subtitle">
                Повысьте свою производительность, упростив
                доступ к информационным доскам для всех в одном месте.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="title">Имя команды</label>
                    <input
                        name="title"
                        ref={register({ required: true })}
                        type="text"
                        placeholder="Имя команды"
                        onBlur={animateFaces}
                    />

                    <label htmlFor="description">Описание команды</label>
                    <textarea
                        name="description"
                        ref={register}
                        placeholder="Расскажите своим участникам в нескольких словах о команде"
                    ></textarea>

                    <label htmlFor="members">Пригласить участников</label>
                    <input
                        name="members"
                        ref={register}
                        type="text"
                        placeholder="Введите имя или почту пользователя"
                    />

                    {titleValue.trim() !== "" ? (
                        <button type="submit" className="btn">
                            Создать команду
                        </button>
                    ) : (
                        <button className="btn btn--disabled" disabled>
                            Создать команду
                        </button>
                    )}
                </form>
            </div>
            <div className="create-team__bg">
                <button onClick={() => setShowModal(false)}>
                    <i className="fal fa-times"></i>
                </button>
                <img className="create-team__img" src={board} />
                <img
                    className="create-team__face create-team__face--1"
                    src={greenface}
                />
            </div>
        </div>
    );
};

export default CreateTeamModal;