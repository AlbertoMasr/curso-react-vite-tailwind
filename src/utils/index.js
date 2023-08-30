/**
 * This function calculates the total price of the products in the cart
 * @param {Array} products cartPrduct: Array of Objects
 * @returns {Integer} Total price
 */
export const totalPrice = (products) => {
    let sum = 0
    products.forEach(product => {
        sum += product.price
    })
    return sum
}