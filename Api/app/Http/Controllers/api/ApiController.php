<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Produto;

class ApiController extends Controller
{
    public function index()
    {
        return Produto::all();
    }

    public function store(Request $request)
    {   

        $produtos = new Produto();
        $produtos->nome = $request->input('produtos.nome');
        $produtos->modelo = $request->input('produtos.modelo');
        $produtos->marca = $request->input('produtos.marca');
        $produtos->qtd = $request->input('produtos.qtd');

        if($produtos->save())
        {
            $success = array(
                "success" => "Dados salvos com sucesso",
            );
            return response()->json($success);
        }
        else
        {
            $error = array(
                "faillure" => "Erro ao salvar os dados",
            );
            return response()->json($error);
        }
    }


    public function show($id)
    {
        $produtos = Produto::find($id);
        return response()->json($produtos);
    }

    public function update(Request $request, $id)
    {
        $produtos = Produto::find($id);
        $produtos->nome = $request->input('nome');
        $produtos->modelo = $request->input('modelo');
        $produtos->marca = $request->input('marca');
        $produtos->qtd = $request->input('qtd');

        if($produtos->save())
        {
            $success = array(
                "success" => "Dados salvos com sucesso",
            );
            return response()->json($success);
        }
        else
        {
            $error = array(
                "faillure" => "Erro ao salvar os dados",
            );
            return response()->json($error);
        }
    }

    public function destroy($id)
    {
        $produtos = Produto::find($id);
        
        if($produtos->delete())
        {
            $success = array(
                "success" => "Apagado com sucesso",
            );
            return response()->json($success);
        }
        else
        {
            $error = array(
                "faillure" => "Erro ao apagar os dados",
            );
            return response()->json($error);
        }
    }
}
