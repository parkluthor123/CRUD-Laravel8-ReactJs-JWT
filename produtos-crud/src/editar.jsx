import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';

export default function Update(props)
{
    const [id] =  useState(props.match.params.id);
    
    // Altera o estado dos inputs
    const [nome, setNome] = useState('');
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [qtd, setQtd] = useState('');
    
    // Altera o estado do loading
    const [loading, setLoading] = useState(false);

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

    // SUBMIT - Atualiza os dados
    const editProduto = async (e)=>{
        e.preventDefault();
        showLoading();
        await fetch("http://localhost:8000/api/data/editar/" + id,{
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({nome, modelo, marca, qtd})
        })
        .then((response)=> response.json())
        // Função que mostrará se os dados foram enviados certinho
        // obs* A Mensagem é configurada no retorno da função no Laravel no ApiController
        .then((responseJson) => {
            console.log(responseJson)
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
               
            }
        })
        // Caso não consiga fazer a conexão com a API
        .catch(
            ()=>{
                hideLoading();
                setStatus({
                    type: 'erro',
                    mensagem: 'Produto não cadastrado, tente mais tarde!'
                })
            }
        )
    }

    // Pegará os dados do id e insere nos campos
    useEffect(()=>{ 
        const getProdutos = async ()=>{
            showLoading();
            fetch("http://127.0.0.1:8000/api/data/show/"+ id, {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get("token"), 
                }
            })
            .then((response)=>response.json())
            .then((responseJson) =>{ 
                console.log(responseJson)
                hideLoading();
                setNome(responseJson.nome);
                setModelo(responseJson.modelo);
                setMarca(responseJson.marca);
                setQtd(responseJson.qtd);
            })
        }
        getProdutos();
    },[id])

    return(
        <>
            <div className="loadingApi" style={loading != true ? {display: "none"} : {display: "flex"}}>
                <span className="circle"></span>
            </div>  
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center">Editar produto</h1>
                    </div>
                </div>
            </div>
            <br/>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <fieldset>
                            {status.type === 'erro' ? <div className="alert alert-success">{status.mensagem}</div> : ''}
                            {status.type === 'sucesso' ? <div className="alert alert-success">{status.mensagem}</div> : ''}
                            <form onSubmit={editProduto}>
                                <div className="form-group">
                                    <label htmlFor="nome">Nome do produto</label>
                                    <input type="text" onChange={(e)=>setNome(e.target.value)} className="form-control" id="nome" placeholder="Nome do produto" name="nome" value={nome} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="modelo">Modelo</label>
                                    <input type="text" onChange={(e)=>setModelo(e.target.value)} className="form-control" id="modelo" placeholder="Modelo do produto" name="modelo" value={modelo} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="modelo">Marca</label>
                                    <input type="text" onChange={(e)=>setMarca(e.target.value)} className="form-control" id="marca" placeholder="Modelo do marca" name="marca" value={marca} />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="modelo">Quantidade</label>
                                            <input type="number" onChange={(e)=>setQtd(e.target.value)} className="form-control" id="modelo" placeholder="Quantidade" name="qtd" value={qtd} />
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-12" style={{display: "flex", justifyContent: "space-between"}}>
                                        <button type="submit" className="btn btn-primary">Editar</button>
                                        <a href="/visualizar" className="btn btn-success">Voltar</a>
                                    </div>
                                </div>
                            </form>
                        </fieldset>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}