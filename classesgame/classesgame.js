const readline = require("readline");

class Heroi {
    constructor(nome, idade, tipo) {
        this.nome = nome;
        this.idade = idade;
        this.tipo = tipo;
    }

    atacar() {
        let ataque;

        switch (this.tipo.toLowerCase()) {
            case "mago":
                ataque = "magia";
                break;
            case "guerreiro":
                ataque = "espada";
                break;
            case "monge":
                ataque = "artes marciais";
                break;
            case "ninja":
                ataque = "shuriken";
                break;
            default:
                ataque = "um ataque desconhecido";
        }

        console.log(`\nO ${this.tipo} atacou usando ${ataque}\n`);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let herois = [];

function menu() {
    console.log("=== MENU ===");
    console.log("1 - Criar herói");
    console.log("2 - Listar heróis");
    console.log("3 - Atacar com herói");
    console.log("4 - Sair");
    rl.question("Escolha uma opção: ", opcao => {
        switch (opcao) {
            case "1":
                criarHeroi();
                break;
            case "2":
                listarHerois();
                break;
            case "3":
                atacarHeroi();
                break;
            case "4":
                console.log("Encerrando...");
                rl.close();
                break;
            default:
                console.log("\nOpção inválida!\n");
                menu();
        }
    });
}

function criarHeroi() {
    rl.question("Nome do herói: ", nome => {
        rl.question("Idade do herói: ", idade => {
            rl.question("Tipo (mago, guerreiro, monge, ninja): ", tipo => {
                const novoHeroi = new Heroi(nome, idade, tipo);
                herois.push(novoHeroi);
                console.log("\nHerói criado com sucesso!\n");
                menu();
            });
        });
    });
}

function listarHerois() {
    console.log("\n=== Heróis cadastrados ===");
    if (herois.length === 0) {
        console.log("Nenhum herói criado ainda.\n");
    } else {
        herois.forEach((h, index) => {
            console.log(`${index + 1}. ${h.nome} - ${h.tipo} (${h.idade} anos)`);
        });
        console.log("");
    }
    menu();
}

function atacarHeroi() {
    if (herois.length === 0) {
        console.log("\nNenhum herói disponível para atacar!\n");
        menu();
        return;
    }

    listarHerois();
    rl.question("Escolha o número do herói para atacar: ", numero => {
        const index = Number(numero) - 1;

        if (index >= 0 && index < herois.length) {
            herois[index].atacar();
        } else {
            console.log("\nHerói inválido!\n");
        }
        menu();
    });
}

// Inicia o menu
menu();
