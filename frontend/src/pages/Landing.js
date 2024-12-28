import React from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

import bgImage from "../static/img/bg1.jpg";

const Landing = () => {
    useDocumentTitle("Trello");
    return (
        <div className="landing-banner">
            <img className="landing-banner__image" style={{background:"black"}} />
            <div className="landing-banner__content">
                <h1 className="landing-banner__title">
                Trello позволяет вам работать более слаженно и выполнять больше задач
                </h1>
                <h4 className="landing-banner__subtitle">
                Доски, списки и карточки Trello позволяют вам организовывать свои проекты и расставлять приоритеты увлекательным, гибким и полезным способом.
                </h4>
                <Link to="/register" className="btn">
                    Зарегистрироваться бесплатно
                </Link>
            </div>
        </div>
    );
};

export default Landing;
