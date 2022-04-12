// jogo da Velha
const jogoDaVelha = 
{

    // ATTRIBUTES
    tabuleiro: ['','','','','','','','',''],
    symbols: {
                jogadores: ['O','X'],
                jogadorDoTurno: 0,
                change()
                {
                    this.jogadorDoTurno = ( this.jogadorDoTurno === 0 ? 1:0 );
                }
            },
    container_element: null,
    gameOver: false,
    vitoria: 
    [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
    ],

    // FUNCTIONS
    inicializar(container) /*Inicializa o jogo*/
    {
        this.container_element = container;
    },

    jogada(position) /*Função para fazer as jogadas*/
    {
        if (this.gameOver || this.tabuleiro[position] !== '') 
        {
            return false;
        }
        const currentSymbol = this.symbols.jogadores[this.symbols.jogadorDoTurno];
        this.tabuleiro[position] = currentSymbol;
        this.desenhar();

        const jogadorVitorioso = this.check_vitoria(currentSymbol);
        if (this.is_game_over())
        {
            this.fimDeJogo();
        }
        if (jogadorVitorioso >= 0) 
        {
            this.fimDeJogo();
            this.stylize_winner_sequence(this.vitoria[jogadorVitorioso]);
        } 
        else 
        {
            this.symbols.change();
        }

        return true;
    },

    stylize_winner_sequence(winner_sequence) 
    {
        winner_sequence.forEach((position) => 
        {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
      },

    check_vitoria(symbol) 
    {

        for ( i in this.vitoria ) 
        {
            if (this.tabuleiro[ this.vitoria[i][0] ] == symbol  &&
                this.tabuleiro[ this.vitoria[i][1] ] == symbol &&
                this.tabuleiro[ this.vitoria[i][2] ] == symbol) {
                console.log('winning sequences INDEX:' + i);
                return i;
            }
        };
        return -1;
    },

    fimDeJogo() 
    {
        this.gameOver = true;
        console.log('GAME OVER');
    },

    is_game_over() 
    {
        return !this.tabuleiro.includes('');
    },

    start() /*Inicializa o tabuleiro sem nenhum símbolo desenhado*/
    {
        this.tabuleiro.fill('');
        this.desenhar();
        this.gameOver = false;       
    },

    reiniciar() 
    {
        if (this.is_game_over() || this.gameOver) {
            this.start();
            console.log('O jogo foi reiniciado!')
        } else if (confirm('Deseja Reiniciar o jogo?')) {
            this.start();
            console.log('O jogo foi reiniciado!')
        }
    },

    desenhar() 
    {
        this.container_element.innerHTML = this.tabuleiro.map((element, index) => `<div onclick="jogoDaVelha.jogada('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    },
};