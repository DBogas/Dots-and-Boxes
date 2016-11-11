CSS:
no ficheiro "single_player_game_styles" na linha 77 temos
.clicked{
    pointer-events: none;
}

isto no validador de css dá erro porque é uma função que não está aprovada no CSS3, embora funcione bem

pointer-events: none ;	faz com que uma celula nao possa ser clicada mais de uma vez

é o unico erro de validação de CSS.

Scripts:

Usamos jquery.

HTML:

os links do CSS no html nao tem o atributo "text = "text/css" para passarem no validador.
o CSS funciona normalmente.
