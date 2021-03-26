let tableConfig = {
    border: {
        topBody: "-",
        topJoin: "",
        topLeft: "",
        topRight: "",
        bottomBody: "",
        bottomJoin: "",
        bottomLeft: "",
        bottomRight: "",
        bodyLeft: "",
        bodyRight: "",
        bodyJoin: "",
        joinBody: "",
        joinLeft: "",
        joinRight: "",
        joinJoin: ""
      },
    columnDefault: {
        paddingLeft: 0,
        paddingRight: 0
    },
    drawHorizontalLine: (index, size) => {
        return index === 0 || index === size;
    },
    columns: {
        0: {
            width: 18,
        },
        1: {
            width: 3,
            alignment: "right",
            paddingRight: 1
        },
        2: {
            width: 1,
            paddingRight: 1
        },
        3: {
            width: 6,
            alignment: "right"
        }
    }
};

const centerAlign = (len, longest) => {
    return {
        indent: Math.floor((longest - len) / 2),
    };
};


module.exports = { tableConfig, centerAlign };