const { table } = require("table");
const { tableConfig, centerAlign } = require("./printFormatting");
const align = require("align-text");

class Printer {
    constructor(calculator){
        this.calculator = calculator;
    }
    
    printReceipt(basket, deals) {
        const itemTableInput = this.itemArrayForTable(basket.items, deals);
        const totalTableInput = [["Total", "", "£", this.calculator.total(basket, deals)]];
        
        let output = "\n~~~ Bob's Bagels ~~~";
        output += "\n\n" + this.getDate();
        output += "\n\n" + table(itemTableInput, tableConfig);
        output += table(totalTableInput, tableConfig);
        output += "Thank you\nfor your order!";
        return align(output, centerAlign);
    }
    
    itemArrayForTable(itemArray, deals) {
        let output = [];
        for(let [key, value] of Object.entries(this.generateItemObject(itemArray))) {
            let itemCount = this.calculator.countItem(key, itemArray);
            let itemDiscount = this.calculator.individualItemDiscount(key, itemArray, deals);
            let totalItemPrice = itemCount * value.price - itemDiscount;
            
            let outputName;
            if(value.variant) outputName = `${value.variant} ${value.name}`;
            else outputName = value.name;
            
            output.push([outputName, itemCount, "£", totalItemPrice.toFixed(2)]);
        }
        return output;
    }
    
    generateItemObject(itemArray) {
        let itemObject = {};
        itemArray.forEach(item => {
            itemObject[item.id] = {
                name: item.name,
                variant: item.variant,
                price: item.price
            };
        });
        return itemObject;
    }

    getDate() {
        const date = new Date(Date.now());
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, 0);
        const day = date.getUTCDate().toString().padStart(2, 0);
        const hour = date.getUTCHours().toString().padStart(2, 0);
        const min = date.getUTCMinutes().toString().padStart(2, 0);
        const seconds = date.getUTCSeconds().toString().padStart(2, 0);
        return `${year}-${month}-${day} ${hour}:${min}:${seconds}`;
    }
}

module.exports = Printer;
