import React, { useState } from "react"

export default function Cadastrar()
{

     // Altera o estado do loading
    const [loading, setLoading] = useState(false);

    const [produtos, setProdutos] = useState({
        nome: '',
        modelo: '',
        marca: '',
        qtd: '',
    })

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

    const formValues = (e)=>{
        setProdutos({...produtos, [e.target.name]: e.target.value});
    }

    //função que enviará os dados via POST utilizando fetch API
    const cadProduto = async (e)=>{
        // evento que cancelará o submit do formulário
        e.preventDefault();
        showLoading();
        // Esperando a a função fetch se conectar com o BD
        await fetch("http://localhost:8000/api/data/cadastrar",{
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({produtos})
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
               
            }
        })
        // Caso não consiga fazer a conexão com a API
        .catch(
            ()=>{
                setStatus({
                    type: 'erro',
                    mensagem: 'Produto não cadastrado, tente mais tarde!'
                })
            }
        )
    }
    return(
        <>
            <div className="loadingApi" style={loading != true ? {display: "none"} : {display: "flex"}}>
                <span className="circle"></span>
            </div> 
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center">Cadastrar produto</h1>
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
                            <form onSubmit={cadProduto}>
                                <div className="form-group">
                                    <label htmlFor="nome">Nome do produto</label>
                                    <input type="text" className="form-control" id="nome" onChange={formValues} placeholder="Nome do produto" name="nome" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="modelo">Modelo</label>
                                    <input type="text" className="form-control" id="modelo" onChange={formValues} placeholder="Modelo do produto" name="modelo" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="modelo">Marca</label>
                                    <input type="text" className="form-control" id="marca" onChange={formValues} placeholder="Modelo do marca" name="marca" />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="modelo">Quantidade</label>
                                            <input type="number" className="form-control" id="modelo" onChange={formValues} placeholder="Quantidade" name="qtd"/>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-12" style={{display: "flex", justifyContent: "space-between"}}>
                                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                                        <a href="/" className="btn btn-success">Voltar</a>
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