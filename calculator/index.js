const MY_CALC = document.querySelector('#myCalc')

const OPS = ['C', '÷', 'x', '-', '+', ',', '()']
// alt + 0247

const NUMBERS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 'Backspace', 0, '=']
// alert(numbers)


let contOps = 0
let contNumbers = 0

for (i = 1; i <= (OPS.length + NUMBERS.length); i++) {
    let btn = document.createElement('button')
    btn.classList.add('bt')
    btn.classList.add('bt-getall')

    if (i < 4 || (i % 4) == 0) {
        btn.classList.add('bt-operation')
        btn.innerHTML = OPS[contOps]
        contOps++
    } else {
        btn.classList.add('bt-number')
        btn.innerHTML = NUMBERS[contNumbers]
        contNumbers++
    }

    // with 2 cols
    if (btn.textContent == 'Backspace') {
        btn.textContent = '←'
        btn.classList.add('bt-operation')
        btn.id = 'btBackspace'
        btn.classList.remove('bt-number')


    } else if (btn.textContent == '=') {
        btn.classList.add('btEquals2')

    }

    MY_CALC.appendChild(btn)
}



const ALL_BTS = document.querySelectorAll('.bt-getall')
let resultadoInput = document.querySelector('#myResult')

function getResultadoEval() {
    let val = resultadoInput.value.replace('÷', '/')
    return eval(val)
}

ALL_BTS.forEach(function (e) {
    e.addEventListener('click', function () {
        let text = e.textContent
        if (text == 'C') {
            resultadoInput.value = ''
            // resultadoDiv.innerHTML = eval(resultadoDiv.innerHTML)
        } else if (text == '=') {
            resultadoInput.value = getResultadoEval()
        } else if (text == '←') {
            let willBe = resultadoInput.value.slice(0, -1)
            resultadoInput.value = willBe
        } else {
            resultadoInput.value += text
        }
        resultadoInput.focus()
    })
})

const POSSIBILITIES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    '/', '*', '-', '+', '.', ',', '÷',
    '(', ')', '%', '!',
    'Backspace', '='
].map((v) => String(v))

// const map = Array.prototype.map
// let allBtsText = map.call(ALL_BTS, el => el.textContent)
// uso do prototype...

resultadoInput.onkeydown = function (e) {
    let tecla = e.key

    let keyIsPossible = POSSIBILITIES.filter((e2) => e.key == e2)
    // let test = POSSIBILITIES.filter(function (e2) {
    //     return e.key == e2
    // })

    if (tecla == '=' || tecla.toLowerCase() == 'enter') {
        resultadoInput.value = getResultadoEval()
        e.preventDefault()
    } else if (tecla == '/') {
        e.preventDefault()
        resultadoInput.value += '÷'
    }
    if (keyIsPossible == 0) {

    } else if (keyIsPossible == false) {
        e.preventDefault()
    }

}