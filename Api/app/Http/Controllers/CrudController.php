<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class CrudController extends Controller
{
    public function create()
    {
        return view('pages.cadastrar');
    }

    public function store(Request $request)
    {
        // Faz a validação no formulário
        $validated = $request->validate([
            'nome' => 'required | string',
            'modelo' => 'required | string',
            'marca' => 'required | string',
            'qtd' => 'required',
        ]);

        // Pega os dados do formulário e armazena no array

        $produtos = new Produto();
        $produtos['nome'] = $request->nome;
        $produtos['modelo'] = $request->modelo;
        $produtos['marca'] = $request->marca;
        $produtos['qtd'] = $request->qtd;
        
        // Salva os dados no Banco
        if($produtos->save())
        {
            return redirect()->back()->with("success", "Produto salvo com sucesso");
        }
        else
        {
            return redirect()->back()->with("success", "Erro ao salvar o produto");
        }
    }

    public function show()
    {
      
      return view('pages.visualizar');
    }


    public function edit($id)
    {
        $produtos = Produto::find($id);
        dd($produtos);

        return view('pages.editar');
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
