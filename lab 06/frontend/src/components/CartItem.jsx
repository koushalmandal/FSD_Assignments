export default function CartItem({ item, updateQuantity, removeItem }) {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>₹{item.price.toLocaleString('en-IN')} each</p>
      </div>

      <div className="cart-controls">
        <label className="quantity-label">
          Quantity
          <input
            type="number"
            min="1"
            max={item.stock}
            value={item.quantity}
            onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
          />
        </label>

        <div className="cart-buttons">
          <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            −
          </button>
          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
          <button type="button" className="remove-button" onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      </div>

      <div className="cart-price-box">
        <span>Subtotal</span>
        <strong>₹{itemTotal.toLocaleString('en-IN')}</strong>
      </div>
    </div>
  );
}
