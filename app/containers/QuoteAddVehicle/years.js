let years = [];
function createYearsArr(x, y){
    if (x !== y) {
        years.push({ value: x, label: x });
        x += 1;
        createYearsArr(x, y)
    }
    return years;
}

years = createYearsArr(1990, 2017);

export default years;
