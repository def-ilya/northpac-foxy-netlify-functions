


/**
 * @typedef {Object} CanonicalItem
 * @property {string} name the anme of the product
 * @property {number|undefined} price the product price
 * @property {number|undefined} inventory the amount available in the inventory.
 * @property {string} code the unique code of the product (sku)
 * @property {string|undefined} parent_code the code of the parent product if
 *  it exists.
 */



class CartValidator {

  skipCodes = {
    inventory: [],
    price: [],
  }

  skipInventory(code) {
    this.skipCodes.inventory.push(code);
  }

  skipPrice(code) {
    this.skipCodes.price.push(code);
  }

  pairItems(cartItems, canonicalItems) {
    return cartItems.map(cartI => [cartI, canonicalItems.find(c => c.code === cartI.code)]);
  }

  /**
   * Validates a cartItem has the correct inventory according to a canonical
   * item.
   *
   */
  validPrice(cartItem, canonicalItem) {
    return this.skipCodes.price.includes(cartItem.code) ||
      canonicalItem.price === undefined ||
      parseFloat(cartItem.price) === parseFloat(canonicalItem.price);
  }

  /**
   * Validates a cartItem has the correct price according to a canonical item.
   *
   * @param {import('../../foxy/pre-payment-webhook.js').PrepaymentItem} cartItem the cart item to be validated.
   * @param {CanonicalItem} canonicalItem the canonical against which the cart
   * item will be validated.
   * @returns {boolean} the inventory is sufficient for this purchase.
   */
  validInventory(cartItem, canonicalItem) {
    return this.skipCodes.inventory.includes(cartItem.code) ||
      canonicalItem.inventory === undefined ||
      Number(cartItem.quantity) <= Number(canonicalItem.inventory);
  }
}

module.exports = CartValidator;
