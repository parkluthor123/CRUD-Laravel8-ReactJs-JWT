import React from 'react'
import './dist/css/bootstrap.min.css'
import './dist/css/style.css'
import Home from './home'
import Header from './Layouts/header'
import Footer from './Layouts/footer'
import Cadastrar from './cadastrar'
import Visualizar from './visualizar'
import Editar from './editar'

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom"

export default()=>{
    const textStyle={
        color: "#fff",
        textTransform: "uppercase",
    }
    return(
        <>
        <Header/>
        <Router >
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/cadastrar">
                    <Cadastrar />
                </Route>
                <Route exact path="/visualizar">
                    <Visualizar />
                </Route>
                <Route exact path="/editar/:id" component={Editar}/>
            </Switch>
        </Router>
        <Footer/>
        </>
    )
}