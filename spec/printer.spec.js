const { table } = require('table');
const { tableConfig, centerAlign } = require('../src/printFormatting');
const align = require('align-text');


const Printer = require('../src/printer');
const Calculator = require('../src/calculator');
const Basket = require('../src/basket');
const Item = require('../src/item');
const deals = require('../src/dealFunctions');

let expectedOuput, date, itemsRaw, totalRaw, itemsTable, totalTable, userBasket, printer, calculator, outputDate;

describe('Testing printer functionality: ', () => {
    beforeAll(() => {
        calculator = new Calculator();
        printer = new Printer(calculator);
    })

    beforeEach(() => {
        userBasket = new Basket(30);
        date = new Date
        outputDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, 0)}-${date.getUTCDate().toString().padStart(2, 0)} ${date.getUTCHours().toString().padStart(2, 0)}:${date.getUTCMinutes().toString().padStart(2, 0)}:${date.getUTCSeconds().toString().padStart(2, 0)}`;
    })

    it('printing receipt for just 1 item', () => {
        itemsRaw = [
            ['Onion Bagel', '1', '£', '0.39']
        ];
        totalRaw = [['Total', '', '£', '0.39']]
        itemsTable = table(itemsRaw, tableConfig);
        totalTable = table(totalRaw, tableConfig);

        expectedOuput = `\n~~~ Bob's Bagels ~~~`
        expectedOuput+= `\n\n${outputDate}`
        expectedOuput+= `\n\n` + itemsTable + totalTable;
        expectedOuput+= `Thank you\nfor your order!`

        userBasket.addItem(new Item('BGLO', 'Bagel', 'Onion', 0.39));

        expect(printer.printReceipt(userBasket, deals)).toEqual(align(expectedOuput, centerAlign));
    })

    it('printing extension example 1: ', () => {
        itemsRaw = [
            ['Onion Bagel', '2', '£', '0.98'],
            ['Plain Bagel', '12', '£', '3.99'],
            ['Everything Bagel', '6', '£', '2.49'],
            ['Coffee', '3', '£', '2.97'],
        ];
        totalRaw = [['Total', '', '£', '10.43']]
        itemsTable = table(itemsRaw, tableConfig);
        totalTable = table(totalRaw, tableConfig);

        expectedOuput = `\n~~~ Bob's Bagels ~~~`
        expectedOuput+= `\n\n${outputDate}`
        expectedOuput+= `\n\n` + itemsTable + totalTable;
        expectedOuput+= `Thank you\nfor your order!`


        for(let i = 0; i < 2; i++){
            userBasket.addItem(new Item('BGLO', 'Bagel', 'Onion', 0.49));
        }
        for(let i = 0; i < 12; i++){
            userBasket.addItem(new Item('BGLP', 'Bagel', 'Plain', 0.39));
        }
        for(let i = 0; i < 6; i++){
            userBasket.addItem(new Item('BGLE', 'Bagel', 'Everything', 0.49));
        }
        for(let i = 0; i < 3; i++){
            userBasket.addItem(new Item('COF', 'Coffee', '', 0.99));
        }

        expect(printer.printReceipt(userBasket, deals)).toEqual(align(expectedOuput, centerAlign));
    })
})
