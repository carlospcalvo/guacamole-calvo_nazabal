import Skeleton from 'react-loading-skeleton'
import {Card, ListGroup, ButtonGroup} from 'react-bootstrap'


const ItemDetailSkeleton = () => {


    return (
        <>
            <Card>
                <div className="DetailsContainer">
                    <Skeleton className="ItemDetailImage" style={{margin: "1rem"}} width={550} height={600} />
                    <div className="Details">
                        <Card.Body>
                            <Card.Header>
                                <Skeleton width={600}/>
                            </Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Skeleton/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Skeleton/>    
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Skeleton/>
                                </ListGroup.Item>
                                <ListGroup.Item className="ItemDetailSizes">
                                    <div>
                                        <Skeleton width={200}/>
                                    </div>
                                    <div className="SizeBtnGroup">
                                        <Skeleton width={200} />
                                        <ButtonGroup id="SizeBtnGrp">
                                            <Skeleton/>
                                        </ButtonGroup>
                                    </div>                                    
                                </ListGroup.Item>
                                <ListGroup.Item id="ItemDetailCartBtn">
                                    <div>
                                        <Skeleton width={200} />
                                    </div>
                                    <div>
                                        <Skeleton width={200} />        
                                    </div>
                                </ListGroup.Item>    
                            </ListGroup>                                
                        </Card.Body>                            
                    </div>                        
                </div>
            </Card>
        </>
    )

}

export default ItemDetailSkeleton