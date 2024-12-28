import React from "react";
import { backendUrl } from "../../static/js/const";
import { authAxios } from "../../static/js/util";

const getChangePermissionsPosition = (permissionButton) => {
    if (!permissionButton) return null;
    return {
        top:
            permissionButton.getBoundingClientRect().y +
            permissionButton.getBoundingClientRect().height +
            10 +
            "px",
        left: permissionButton.getBoundingClientRect().x + "px",
    };
};

const ChangePermissionsModal = ({
    permissionButton,
    setShowModal,
    member,
    setProject,
}) => {
    const changePermission = async (access_level) => {
        try {
            const { data } = await authAxios.put(
                backendUrl + `/projects/members/${member.id}/`,
                {
                    access_level,
                }
            );
            setProject((project) => {
                const updatedMembers = project.members.map((member) =>
                    member.id === data.id ? data : member
                );
                project.members = updatedMembers;
                return { ...project };
            });
        } catch (error) {
            console.log(error);
        }
        setShowModal(false);
    };
    return (
        <div
            className="label-modal label-modal--shadow"
            style={getChangePermissionsPosition(permissionButton.current)}
        >
            <div className="label-modal__header">
                <p>Изменить доступ</p>
                <button onClick={() => setShowModal(false)}>
                    <i className="fal fa-times"></i>
                </button>
            </div>
            <div className="label-modal__content">
                <div className="label-modal__option">
                    {member.access_level === 2 ? (
                        <p className="label-modal__option-header">
                            Админ
                            <i class="fal fa-check"></i>
                        </p>
                    ) : (
                        <button
                            className="label-modal__option-header"
                            onClick={() => changePermission(2)}
                        >
                            Админ
                        </button>
                    )}

                    <p className="label-modal__option-subtitle">
                    Вы можете просматривать, создавать и редактировать доски команды, изменять настройки команды
                    и приглашать новых участников.
                    </p>
                </div>
                <div className="label-modal__option">
                    {member.access_level === 1 ? (
                        <p className="label-modal__option-header">
                            Обычный
                            <i className="fal fa-check"></i>
                        </p>
                    ) : (
                        <button
                            className="label-modal__option-header"
                            onClick={() => changePermission(1)}
                        >
                            Обычный
                        </button>
                    )}
                    <p className="label-modal__option-subtitle">
                    Может просматривать, создавать и редактировать командные доски.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChangePermissionsModal;
