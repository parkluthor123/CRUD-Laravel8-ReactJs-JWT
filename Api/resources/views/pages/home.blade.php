    @extends('layouts.layout')
    @section('title', 'Home')
    @section('content')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <br>
    <main>
        <div class="container">
            <div class="jumbotron">
                <h1>Bem vindo!</h1>
                <p>Crud de produtos, para cadastrar, visualizar, deletar ou editar, selecione alguma das opções abaixo:</p>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <a href="{{ url('/cadastrar') }}">
                        <div class="btn-select-home">
                            <span><i class="fas fa-plus"></i> Cadastrar</span>
                        </div>
                    </a>
                </div>
               
                <div class="col-md-6 mx-auto">
                    <a href="{{ url('/visualizar') }}">
                        <div class="btn-select-home">
                            <span><i class="far fa-eye"></i>Visualizar</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </main>
    @endsection