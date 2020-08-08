import React, {FormEvent, useState} from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css';

function TeacherForm(){
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: ''}
    ]);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems, 
            {
                week_day: 0,
                from: '',
                to: '',
            }
        ])
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const newArrayScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position) {
                return {...scheduleItem, [field]: value}
            }
            return scheduleItem;
        });
        
        setScheduleItems(newArrayScheduleItems);

    }

    function handleCreateClass(event: FormEvent){
        event.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        })
            .then(() => {
                alert('Cadastro realizado com sucesso!')
                history.push('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader  
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo, é preencher esse formulário de inscrição."
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            label="Nome completo" 
                            name="name" 
                            value={name}
                            onChange={({target})=> {setName(target.value)}}
                        />
                        <Input 
                            label="Avatar"
                            name="avatar"
                            value={avatar}
                            onChange={({target})=> {setAvatar(target.value)}}
                        />
                        <Input 
                            label="WhatsApp"
                            name="whatsapp"
                            value={whatsapp}
                            onChange={({target})=> {setWhatsapp(target.value)}}
                        />
                        <Textarea 
                            label="Biografia"
                            name="bio"
                            value={bio}
                            onChange={({target})=> {setBio(target.value)}}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a Aula</legend>

                        <Select 
                            label="Matéria" 
                            name="subject"
                            value={subject}
                            onChange={({target})=> {setSubject(target.value)}}
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
                        <Input 
                            label="Custo da sua hora por aula" 
                            name="cost"
                            value={cost}
                            onChange={({target})=> { setCost(target.value)}}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) =>(
                            <div className="schedule-item" key={index}>
                                <Select 
                                    label="Dia da semana" 
                                    name="week_day"
                                    onChange={({target}) => setScheduleItemValue(index, 'week_day', target.value)}
                                    value={scheduleItem.week_day}
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
                                    name="from" 
                                    label="Das" 
                                    type="time"
                                    value={scheduleItem.from}
                                    onChange={({target}) => setScheduleItemValue(index, 'from', target.value)}
                                    />
                                <Input 
                                    name="to" 
                                    label="Time" 
                                    type="time"
                                    value={scheduleItem.to}
                                    onChange={({target}) => setScheduleItemValue(index, 'to', target.value)}
                                    />
                            </div>
                        ))}
                    </fieldset>


                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
        )
};

export default TeacherForm;