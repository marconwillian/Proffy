import React from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css';

function TeacherForm(){
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader  
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo, é preencher esse formulário de inscrição."
            />
            <main>
                <fieldset>
                    <legend>Seus dados</legend>

                    <Input label="Nome completo" name="name" />
                    <Input label="Avatar" name="avatar" />
                    <Input label="WhatsApp" name="whatsapp" />
                    <Textarea label="Biografia" name="bio"/>
                </fieldset>
                <fieldset>
                    <legend>Sobre a Aula</legend>

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
                    <Input label="Custo da sua hora por aula" name="cost" />
                </fieldset>
                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type="button">
                            + Novo horário
                        </button>
                    </legend>

                    <div className="schedule-item">
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
                        <Input name="from" label="Das" type="time"/>
                        <Input name="to" label="Time" type="time"/>
                    </div>
                </fieldset>


                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                    <button type="button">Salvar cadastro</button>
                </footer>
            </main>
        </div>
        )
};

export default TeacherForm;