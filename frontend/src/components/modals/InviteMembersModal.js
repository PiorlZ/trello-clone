import React, { useState } from "react";
import { backendUrl } from "../../static/js/const";
import { authAxios } from "../../static/js/util";

const getInviteMembersPosition = () => {
    const inviteElem = document.querySelector(".team__members-header button");
    if (!inviteElem) return null;
    return {
        top:
            inviteElem.getBoundingClientRect().y +
            inviteElem.getBoundingClientRect().height +
            10 +
            "px",
        left: inviteElem.getBoundingClientRect().x + "px",
    };
};

const InviteMembersModal = ({ project, setShowModal }) => {
    const [members, setMembers] = useState("");

    const handleInvite = async () => {
        const invitedMembers =
            members !== ""
                ? members.split(",").map((user) => user.trim()) // usernames and emails
                : [];

        try {
            await authAxios.post(
                backendUrl + `/projects/${project.id}/invite/`,
                {
                    users: invitedMembers,
                }
            );
        } catch (error) {
            console.log(error);
            console.log('123');
        }
        setShowModal(false);
    };

    return (
        <div
            className="label-modal label-modal--shadow"
            style={getInviteMembersPosition()}
        >
            <div className="label-modal__header">
                <p>Добавить Участников</p>
                <button onClick={() => setShowModal(false)}>
                    <i className="fal fa-times"></i>
                </button>
            </div>
            <div className="label-modal__content">
                <p className="label-modal__invite-header">
                    <i class="fal fa-user"></i>
                    Введите юзернейм или почту пользователя
                </p>
                <input
                    className="label-modal__input"
                    type="text"
                    name="members"
                    placeholder="например piorlz@email.com"
                    value={members}
                    onChange={(e) => setMembers(e.target.value)}
                />
                {members.trim() !== "" ? (
                    <button className="btn" onClick={handleInvite}>
                        Пригласить в проект
                    </button>
                ) : (
                    <button className="btn btn--disabled" disabled>
                        Пригласить в проект
                    </button>
                )}
            </div>
        </div>
    );
};

export default InviteMembersModal;
