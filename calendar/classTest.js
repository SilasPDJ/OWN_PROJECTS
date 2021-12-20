class Modelo {
    constructor(marca) {
        this.marca = marca;
    }
}

var t = "teste ";

class Carro extends Modelo {
    constructor() {
        super("FIAT");
        console.log(this.marca);

        var dentro = "DENTRO";
        console.log(t);
    }

    test() {
        console.log(dentro);
        return t;
    }
}
// console.log(dentro);

let c = new Carro();
// c.test();
