import style from './Producto.module.css'

const Producto = (props) => {
    const handleClick = () => {
        props.addToCart(props.id);
    }

    return(
        <div className={style.padre}>
            <img src={props.img} alt="" />
            <p className={style.precio}>Gs. {props.precio}</p>
            <p className={style.title}>{props.title}</p>
            <p>{props.desc}</p>
            <button onClick={handleClick}>AGREGAR AL CARRITO</button>
        </div>
    )
}

export default Producto;