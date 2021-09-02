import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function Editar()
{
    // resposta da requisição
    const [data, setData] = useState([]);
    
    // Pega email
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);
    
    const [password, setPassword] = useState('');
    
    // caso alguma informação seja incorreta

    const [notLogged, setNotLogged] = useState('');

    // Status na hora de apagar
    const [status, setStatus] = useState({
        type: '',
        mensagem: '',
    });

    // mostra o loading enquanto faz a requisição
    const showLoading = ()=>{
        setLoading(true);
    }
    
    // fecha o loading enquanto faz a requisição
    const hideLoading = ()=>{
        setLoading(false);
    }

    const logar = async (e) => {
        e.preventDefault()
        showLoading();
        await fetch("http://localhost:8000/api/login",{
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Accept' : 'application/json',
            },
            body: JSON.stringify({email, password})
        })
        .then((response)=>response.json())
        .then((responseJson) => {
            console.log(responseJson)
            hideLoading();
            if(responseJson.access_token)
            {
                Cookies.set("token", responseJson.access_token);
            }
            else
            {
                setNotLogged("Dados incorretos");
            }
            getProdutos();
        })
    }

    // Visualizar Produtos
    const getProdutos = async ()=>{
        showLoading();
        fetch("http://localhost:8000/api/data", {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get("token"), 
            }
        })
        .then((response)=>response.json())
        .then((responseJson) =>{ 
            setData(responseJson)
            hideLoading();
            console.log(data)            
        })
    }



    // Deletar dados
    const deleteData = async (id) =>{
        showLoading();
        console.log(id);
        // Esperando a a função fetch se conectar com o BD
        await fetch("http://localhost:8000/api/data/deletar/" + id,{
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({id})
        })
        .then((response)=> response.json())
        // Função que mostrará se os dados foram enviados certinho
        // obs* A Mensagem é configurada no retorno da função no Laravel no ApiController
        .then((responseJson) => {
            // console.log(responseJson)
            hideLoading();
            // Personalizando mensagem de erro e de sucesso
            if(responseJson.faillure)
            {
                setStatus({
                    type: 'erro',
                    mensagem: responseJson.faillure,
                })
            }
            else
            {
                setStatus({
                    type: 'sucesso',
                    mensagem: responseJson.success,
                })
                getProdutos();
            }
        })
        // Caso não consiga fazer a conexão com a API
        .catch(
            ()=>{
                setStatus({
                    type: 'erro',
                    mensagem: 'Erro, tente mais tarde!'
                })
            }
        )
    }

    useEffect(()=>{ 
        getProdutos();   
    },[])

    return(
        <>
            <div className="loadingApi" style={loading != true ? {display: "none"} : {display: "flex"}}>
                <span className="circle"></span>
            </div>  
            <div className={Cookies.get("token") != undefined ? "session-none" : "session-login"}>
                <form onSubmit={logar}>
                    <div className="login">
                        <label htmlFor="login">Login</label>
                        <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Digite o login"/>
                    </div>
                    <div className="senha">
                        <label htmlFor="senha">Senha</label>
                        <input type="text" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Digite a senha"/>
                    </div>
                    {<label style={{color: "#b22"}}>{notLogged}</label>}
                    <div className="form-group">
                        <button type="submit" className="btn btn-info">Logar</button>
                    </div>
                </form>
            </div>
            <main className={Cookies.get("token") != undefined ? "" : "unlogged"}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="text-center">Visualizar produto</h1>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="container">
                    {status.type === 'erro' ? <div className="alert alert-danger">{status.mensagem}</div> : ''}
                    {status.type === 'sucesso' ? <div className="alert alert-danger">{status.mensagem}</div> : ''}
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nome do Produto</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(data).map(produto => (
                                <tr key={produto.id}>
                                    <th scope="row">{produto.id}</th>
                                    <td>{produto.nome}</td>
                                    <td>{produto.modelo}</td>
                                    <td>{produto.marca}</td>
                                    <td>{produto.qtd}</td>
                                    <td><span style={{color: "#337ab7", display: "flex", cursor: "pointer"}} onClick={()=>deleteData(produto.id)}>Apagar</span></td>
                                    <td><a href={"/editar/"+produto.id}>Editar</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <div className="row">
                        <div className="col-md-12" style={{display: "flex", justifyContent: "space-between"}}>
                            <a href="/" className="btn btn-success">Voltar</a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}