import styles from './Card.module.scss';
import React from 'react';

console.log(styles)
function Card({onFavorite ,title,imageUrl,price,onPlus}) {
    const [isAdded, setisAdded] = React.useState(false);
    const onClickPlus = () => {
        onPlus({title,imageUrl,price});
        setisAdded(!isAdded);

    }
    React.useEffect(() => {
        console.log(1);
    }, [isAdded]);
    const onClickButton = () => {
        alert(title);
    }
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
                <img src="img/unlike.svg" alt="Unliked" />
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>

                <img className={styles.plus} src={isAdded ? "img/add.svg" : "img/plus.svg"} alt="Plus" onClick={onClickPlus} />

            </div>
        </div>)
}
export default Card;