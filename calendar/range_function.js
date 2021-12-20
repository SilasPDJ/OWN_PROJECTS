function range(start, stop, step) {
    // null => rolo vazio
    // undefined => sem papel higiênico

    // declara variáveis iniciais
    stop = stop === undefined ? start : stop;
    start = stop == start ? 0 : start;
    step = step == null ? 1 : step;

    let ini = stop - start;
    let rangarray = new Array(ini).fill(start).map((v, c) => v + c);
    let realRangarray = [];
    for (let i = 0; i < rangarray.length; i += step) {
        realRangarray.push(rangarray[i]);
    }
    return realRangarray;
}

export default range;
// console.log(...range(1, 10, 3));

// to copy an array without reference:
// use oldArray.slice()
// "fatiar"

// splice(removeIndex, qtd, ...replace)
