import { useShoppingBag } from './ShoppingBagContext';
import "./ShoppingBag.css";


const ShoppingBag = () => {
  const {
    bagItems,
    removeFromBag,
    decreaseQuantity,
    increaseQuantity,
    calculateItemTotal,
    getTotalItems,
    getTotalPrice,
  } = useShoppingBag();

  if (bagItems.length === 0) {
    return (
      <div className="shopping-bag">
        <div className="empty-bag">
          <div className="empty-bag-content">
            <h2>Your Shopping Bag is Empty</h2>
            <p>Add some items to get started!</p>
            <button
              className="continue-shopping-btn"
              onClick={() => (window.location.href = "/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-bag">


      <div className="bag-container">
        <h1 className="bag-title">My Shopping Bag</h1>

        <div className="bag-table">
          <div className="table-header">
            <div className="col-no">No.</div>
            <div className="col-preview">Preview</div>
            <div className="col-product">Product</div>
            <div className="col-size">Size</div>
            <div className="col-price">Price</div>
            <div className="col-qty">Qty</div>
            <div className="col-discount">Discount</div>
            <div className="col-payment">Payment</div>
            <div className="col-remove">Remove</div>
          </div>

          <div className="table-body">
            {bagItems.map((item, index) => (
              <div key={item.id} className="table-row">
                <div className="col-no">{index + 1}</div>

                <div className="col-preview">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="item-image"
                  />
                </div>

                <div className="col-product">
                  <span className="product-title">{item.title}</span>
                </div>

                <div className="col-size">
                  <span className="size-badge">{item.size}</span>
                </div>

                <div className="col-price">${item.price.toFixed(2)}</div>

                <div className="col-qty">
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col-discount">
                  {item.discount > 0
                    ? `${Math.round(item.discount * 100)}%`
                    : "0%"}
                </div>

                <div className="col-payment">
                  ${calculateItemTotal(item).toFixed(2)}
                </div>

                <div className="col-remove">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromBag(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bag-footer">
          <div className="bag-summary">
            <div className="total-items">Total Items: {getTotalItems()}</div>
            <div className="total-price">
              Total: ${getTotalPrice().toFixed(2)}
            </div>
            <button className="checkout-btn">Check out 🛒</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBag;
