import style from "./ProductCart.module.css";

const ProductCart = (props) => {
  return (
    <div className={style.container}>
      <div className={style.producto}>
        <img src={props.img} alt="" />
        <div>
          <p className={style.title}>{props.title}</p>
          <p>{props.desc}</p>
          <div>
            <button
              className={style.btnMenos}
              onClick={() => {
                props.deleteToCart(props.id);
              }}
            >
              -
            </button>
            <span>{props.cantidad}</span>
            <button
              className={style.btnMas}
              onClick={() => {
                props.addToCart(props.id);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className={style.extra}>
        <button
          onClick={() => {
            props.sacarCart(props.id);
          }}
        >
          X
        </button>
        <p>$ {props.total}</p>
      </div>
    </div>
  );
};

export default ProductCart;
