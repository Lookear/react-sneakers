import React from 'react';
function Drawer({ onClose, onRemove, items = [],sumValue,sumTax }) {
  console.log(items);

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30 ">
          Корзина <img onClick={onClose} className="removeItem cu-p" src="img/cristik.svg" alt="Remove" />
        </h2>


        {items.length > 0 ?
          <div className="cart">
            <div className="cartItem">
              {
                
                items.map((obj,index) => (

                  <div key={index} className="cartItem d-flex align-center mb-20">
                    <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                    <div className="mr-20 flex">
                      <p className="mp-5">{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img className="removeItem" onClick={() => onRemove(obj.id)} src="img/cristik.svg" alt="Remove" />
                  </div>
                ))
              }


            </div>
            <div className="cartTotalBlock">
              <ul >
                <li >
                  <span>Итого:</span>
                  <div></div>
                  <b>{sumValue} руб.</b>
                </li>
                <li >
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{sumTax} руб.</b>
                </li>
              </ul>
              <button className="greenButton">Оформить заказ <img src="img/arrow.svg" alt="Arrow" /></button>
            </div>
          </div>
          :
          <div className="d-flex align-center justify-center flex-column flex cartNull ">
            <img width={120} height={120} src="img/box.svg" alt="Cart" />
            <div >
              <b >Корзина пустая</b>
              <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>

            </div>
            <button className="greenButton" onClick={onClose}><img src="img/arrow.svg" alt="Arrow" /> Вернуться назад </button>

          </div>
        }

      </div>
    </div>
  )
}
export default Drawer;