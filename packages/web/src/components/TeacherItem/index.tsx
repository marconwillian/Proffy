import React from 'react';

import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '@proffy/api';

export interface Teacher {
    id: number;
    user_id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}
interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItems: React.FunctionComponent<TeacherItemProps> = ({teacher}) => {

    function createNewConnection(){
        api.post('connections', {
            user_id: teacher.id
        })
    }

    return (
        <article className="teacher-item" >
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
                {teacher.bio}
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>{teacher.cost}</strong>
                </p>
                <a onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}?text=Gostária de saber mais sobre sua aula de ${teacher.subject}`} target="_blank">
                    <img src={whatsappIcon} alt="WhatsApp"/>
                    Entrar em contado
                </a>
            </footer>
        </article>
    )
}

export default TeacherItems;