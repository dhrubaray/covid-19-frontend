exports.unpack = (rows, key) => {
    return rows.map(function (row) { return row[key]; });
}

exports.titleCase = string => {
    let sentence = string.toLowerCase().split("_");
    for(var i = 0; i< sentence.length; i++){
       sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
}
