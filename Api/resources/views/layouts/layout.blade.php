<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Crud Produtos | @yield("title")</title>
    @include('includes.bootstrap')
    <link rel="stylesheet" href="{{ URL::to('dist/css/style.css') }}">
</head>
<body>
    <header>
        <nav class="navbar navbar-inverse">
            <div class="container">
                 <div class="row">
                     <div class="col-md-3">
                         <h1 style="color: #fff; text-transform: uppercase">Crud < /></h1>
                     </div>
                 </div>
            </div>
         </nav>
    </header>
    @yield("content")
    <footer>
        <div class="row">
            <div class="col-md-12">
                <p>Desenvolvido por: &copy; Leandro G. Pena</p>        
            </div>
        </div>
    </footer>
</body>
</html>