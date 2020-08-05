import React from 'react';

import './styles.css';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

function Landing() {
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div id="logo-container">
                    <img src={logoImg} alt="Proffy" />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
                <img 
                    src={landingImg} 
                    alt="" 
                    className="hero-image" 
                />
                <div className="buttons-container">
                    <a href="http://localhost:3000/" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </a>

                    <a href="http://localhost:3000/" className="study">
                        <img src={giveClassesIcon} alt="Dar Aula"/>
                        Dar Aula
                    </a>
                </div>

                <span>
                    Total de 200 conexões já realizadas <img src={purpleHeartIcon} alt="Coração Roxo" />
                </span>
            </div>
        </div>
        )
};

export default Landing;