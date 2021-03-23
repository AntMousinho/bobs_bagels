```
# Part 1
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

As a member of the public,
So that I can change my order
I'd like to remove an item from my basket
```
```
# Part 2
As a member of the public,
So that I can not overfill my small bagel basket
I'd like to know when my basket is full when I try adding an item beyond my basket capacity.

As a Bob's Bagels manager,
So that I can record more sales
I’d like to create baskets with larger capacity when I need to.

As a member of the public
So that I can maintain my sanity
I'd like to know if I try to remove an item that doesn't exist in my basket. In the same way, I want to know if I try to add an item with the same ID already in my basket.
```
```
# Part 3
As a member of the public,
So that I can know how much my bagels are,
I’d like to see the price of each item before I add it to my basket.

As a member of the public,
So that I can prepare to pay
When I go to checkout I'd like to know the total sum of the bagels in my basket
```

| Object | Properties | Message | Context | Output | Done |
| - | - | - | - | - | - |
| Basket | @Array items | add(item) | not full, item is added | @Array[@item] | ✅ |
|  | @Int Capacity |  | isFull = true | @String 'Cannot add item, basket is full' | ✅ |
|  |  |  | item already in basket | @String 'Cannot add item, already in basket' | ✅ |
|  |  | remove(item) | item is in basket | @Array[@item] | ✅ |
|  |  |  | item is not in basket | @String 'Cannot remove item that is not in the basket' | ✅ |
|  |  | isFull() | the basket is full | @Boolean true | ✅ |
|  |  |  | the basket is not full | @Boolean false | ✅ |
| Item | @int id |  | get id() | @int | ✅ |
|  | @Number price |  | get Price() | @number | ✅ |
| Checkout | @basket basket | total() | sums price of items in basket | @number | ✅ |

## Extension 1
| Object | Properties | Message | Context | Output | Done |
| - | - | - | - | - | - |
| Checkout |  | countItem(@String SKU) | called in each discount function | @Int number of each bagel type | ✅ |
|  |  | onionDiscount | If you can apply the dicscount | @Float 0.45 * count/6   | ✅ |
|  |  |  | if there is no discount to be applied | @Int 0  | ✅ |
|  |  | plainDiscount | If there are enough for a discount | @float, 0.69 * count/12 | ✅ |
|  |  |  | no discount to be applied | @Int 0 | ✅ |
|  |  | everythingDiscount | enough for a discount | @float 0.45 * count / 6 | ✅ |
|  |  |  | no discount to be applied | @Int 0 | ✅ |
|  |  | coffeeDiscount | enough for discount | @Float 0.13 * smallest remaining amount between coffee and (plain bagel % 12) | ✅ |
|  |  |  | no discount to be applied | @int 0 | ✅ |
|  |  | totalDiscount() | sum all the discount functions | @Float | ✅ |
|  |  | total() | edit to subtract totalDiscount() | @Float | ✅ |


## Extension 2

| Object | Properties | Message | Context | Output | Done |
| - | - | - | - | - | - |
| Priter | @Checkout | printReceipt() |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |