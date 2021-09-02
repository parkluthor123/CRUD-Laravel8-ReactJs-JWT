import React from "react"
import { Link } from "react-router-dom"

export default function Home()
{
    return(
        <>
            <br />
            <main>
                <div className="container">
                    <div className="jumbotron">
                        <h1>Bem vindo!</h1>
                        <p>Crud de produtos, para cadastrar, visualizar, deletar ou editar, selecione alguma das opções abaixo:</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <Link to="/cadastrar">
                                <div className="btn-select-home">
                                    <span><i className="fas fa-plus"></i> Cadastrar</span>
                                </div>
                            </Link>
                        </div>
                    
                        <div className="col-md-6 mx-auto">
                            <Link to="/visualizar">
                                <div className="btn-select-home">
                                    <span><i className="far fa-eye"></i>Visualizar</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>   
    )
}