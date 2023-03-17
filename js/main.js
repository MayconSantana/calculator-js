// Seleção de Elementos
const opProcessadaText = document.querySelector('#op-processada')
const opAtualText = document.querySelector('#op-atual')
const buttons = document.querySelectorAll('button')

class Calculadora {
    constructor(opProcessada, opAtual) {
        this.opProcessada = opProcessada
        this.opAtual = opAtual
    }

    adicionarDigito(value) {
        if(this.opAtual.innerText.includes(".") && value === ".") return

        this.opAtual.innerText += value
    }

    processarOperacao(op) {
        if(this.opProcessada.innerText === "" && op === "=") return

        if(op === "DEL") {
            this.DEL()
            return
        } else if(op === "C") {
            this.C()
            return
        } else if(op === "CE") {
            this.CE()
            return
        }

        if(this.opProcessada.innerText !== '') {
            let calc = this.calcular(this.opProcessada.innerText, this.opAtual.innerText)
            this.atualizarTela(op, calc)
        } else {
            this.atualizarTela(op)
        }

    }

    atualizarTela(op, calc) {
        if(this.opProcessada.innerText !== '') {
            if(this.opAtual.innerText === '') {
                if(op === "=") return
                this.opProcessada.innerText = `${this.opProcessada.innerText.slice(0, -1)} ${op}`
            } else {
                this.opAtual.innerText = calc
                this.opProcessada.innerText = ""
            }
        } else {
            this.opProcessada.innerText = `${this.opAtual.innerText} ${op}`
            opAtualText.innerText = ""
        }
    }

    calcular(opProcessada, opAtual) {
        let valor = +opProcessada.split(" ")[0]
        let op = opProcessada.split(" ")[1]
        
        switch(op) {
            case "+":
               return valor + +opAtual
            break

            case "-":
                return valor - +opAtual
            break

            case "X":
                return valor * +opAtual
            break

            case "/": 
                return valor / +opAtual
            break

            default:
                return "ERRO"
            break
        }
    }

    DEL() {
        this.opAtual.innerText = this.opAtual.innerText.slice(0, -1)
    }

    C() {
        this.opAtual.innerText = ''
        this.opProcessada.innerText = ''
    }

    CE() {
        this.opAtual.innerText = ''
    }
}

// Instancia da Classe
const calc = new Calculadora(opProcessadaText, opAtualText)

// Eventos
buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let value = e.target.innerText
        
        if(!isNaN(value) || value === ".") {
            calc.adicionarDigito(value)
        } else {
            calc.processarOperacao(value)
        }
    })
})