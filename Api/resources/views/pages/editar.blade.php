@extends("layouts.layout")
@section('title', 'Editar')
@section("content")
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="text-center">Editar produto</h1>
        </div>
    </div>
</div>
<br>
<div class="container">
    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <fieldset>
                <form>
                    <div class="form-group">
                      <label for="nome">Nome do produto</label>
                      <input type="text" class="form-control" id="nome" placeholder="Nome do produto" name="nome">
                    </div>
                    <div class="form-group">
                      <label for="modelo">Modelo</label>
                      <input type="text" class="form-control" id="modelo" placeholder="Modelo do produto" name="modelo">
                    </div>
                    <div class="form-group">
                      <label for="modelo">Marca</label>
                      <input type="text" class="form-control" id="marca" placeholder="Modelo do marca" name="marca">
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="modelo">Quantidade</label>
                                <input type="number" class="form-control" id="modelo" placeholder="Quantidade" name="modelo">
                              </div>
                        </div>
                    </div>
                    <br/>
                    <div class="row">
                        <div class="col-md-12" style="display: flex; justify-content: space-between">
                            <button type="submit" class="btn btn-primary">Editar</button>
                            <a href="{{ url('/') }}" class="btn btn-success">Voltar</a>
                        </div>
                    </div>
                </form>
            </fieldset>
        </div>
        <div class="col-md-3"></div>
    </div>
</div>
@endsection