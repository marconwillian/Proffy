import React, { FormEvent, useState } from 'react';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';


function TeacherList(){
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');


    async function searchTeachers(event: FormEvent){
        event.preventDefault();
        
        const response = await api.get('classes', {
                params: {
                    subject,
                    week_day,
                    time
                }
            });
        console.log(response.data);
        setTeachers(response.data.classes);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        label="Matéria" 
                        name="subject"
                        onChange={({target}) => { setSubject(target.value)}}
                        value={subject}
                        options={[
                            {value: 'Artes'},
                            {value: 'Biologia'},
                            {value: 'Ciências'},
                            {value: 'Educação física'},
                            {value: 'Física'},
                            {value: 'Geografia'},
                            {value: 'História'},
                            {value: 'Matemática'},
                            {value: 'Português'},
                            {value: 'Química'}
                        ]}
                    />

                    <Select 
                        label="Dia da semana" 
                        name="week_day"
                        onChange={({target}) => { setWeekDay(target.value)}}
                        value={week_day}
                        options={[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda'},
                            {value: '2', label: 'Terça'},
                            {value: '3', label: 'Quarta'},
                            {value: '4', label: 'Quinta'},
                            {value: '5', label: 'Sexta'},
                            {value: '6', label: 'Sábado'}
                        ]}
                    />

                    <Input
                        name="Hora"
                        label="Hora"
                        type="time"
                        value={time}
                        onChange={({target}) => { setTime(target.value)} }
                    />
                    
                    <button type="submit">Buscar</button>

                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
        )
};

export default TeacherList;