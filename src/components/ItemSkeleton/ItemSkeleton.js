import Skeleton from 'react-loading-skeleton'
import {Card} from 'react-bootstrap'
import '../Item/Item.css'

const ItemSkeleton = () => {
    return (
        <>
            <Card className='ItemContainer' style={{minHeight: "15rem", maxHeight:"23.75rem"}}>
                <Skeleton className="ItemImage" style={{margin: "1rem", borderRadius: "1rem"}} width={180} height={230} />
                <Card.Body className="ItemBody" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <Card.Title>
                        <Skeleton/>
                    </Card.Title>
                    <Card.Subtitle>
                        <Skeleton count={2}/>
                    </Card.Subtitle>
                    <Skeleton width={100} height={20} style={{marginTop: "1rem", marginBottom: "2.5rem", marginLeft: "3rem"}} />
                </Card.Body>                
            </Card>
        </>
    )
}

export default ItemSkeleton