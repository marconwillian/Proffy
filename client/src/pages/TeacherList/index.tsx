import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

function TeacherList(){
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers">
                    <Select 
                        label="Matéria" 
                        name="subject"
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

                    <Input name="Hora" label="Hora" type="time"/>
                </form>
            </PageHeader>

            <main>
                <TeacherItem />

                <TeacherItem />

                <TeacherItem />
            </main>
        </div>
        )
};

export default TeacherList;