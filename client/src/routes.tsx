import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" component={LandingPage} exact />
            <Route path="/study" component={TeacherList} exact />
            <Route path="/give-classes" component={TeacherForm} exact />
        </BrowserRouter>
    );
}

export default Routes;