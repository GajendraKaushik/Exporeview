import React, { useState}from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FromElement/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'

import './PlaceItem.css'


const PlaceItem = (props) => {
    const [showMap , setshowMap] = useState(false)
 const openshowMapHandler =  () => setshowMap(true)
 const closeshowMapHandler = () =>  setshowMap(false)

    return (
        <React.Fragment>
            <Modal 
            show = {showMap}
            onCancel = {closeshowMapHandler}
            header = {props.address}
            contentClass = "place-item__modal-content"
            footerClass ="place-item__modal-actions"
            footer = {<Button onClick={closeshowMapHandler}>CLOSE</Button>}
            >
                <div className='map-container'>
                    <Map canter ={props.coordinates} zoom ={16}/>
                </div>
            </Modal>
        <li className='place_item'>
            <Card className="place_item__content">
            <div className='place-item__image'>
               <img src = {props.image} alt={props.title} />
            </div>
            <div className='place_item__info'>
                <h2>{props.title}</h2>
                <h3>{props.address}</h3>
                <p>{props.description}</p>
            </div>
            <div className='place_item__actions'>
                <Button inverse onClick={openshowMapHandler}>VIEW ON MAP</Button>
                <Button to = {`/place/${props.id}`}>EDIT</Button>
                <Button danger>DELETE PLACE</Button>
            </div>
            </Card>

        </li>
        </React.Fragment>

    )

}

export default PlaceItem;