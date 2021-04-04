import {ButtonGroup, Button} from 'react-bootstrap'

const ItemStockDetail = ({onClick, stock, sizes}) => {
    return (
        <>
            <div>
                {stock !== -1 ? `Stock disponible: ${stock}` : null}
            </div>
            <div className="SizeBtnGroup">
                <span>Talle: </span>
                <ButtonGroup id="SizeBtnGrp">
                    {sizes.map((x,i) => <Button onClick={(e => onClick(e))} key={i} value={x} variant="light">{x}</Button> ) }
                </ButtonGroup>
            </div>
        </>
    )
}

export default ItemStockDetail