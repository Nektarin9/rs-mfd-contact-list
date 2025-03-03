import React, {memo, useState} from 'react';
import {Button, Card, ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {ApiGetContactsType} from "src/api/apiContacts";
import {useDispatch} from "react-redux";
import {updateFavoriteContact} from "src/redux/appReducer/appAction";
import {AppDispatch} from "src/redux/appReducer/type";

interface ContactCardProps {
  contact: ApiGetContactsType,
  updateFavorit?: () => void;
  withLink?: boolean
}

export const ContactCard = memo<ContactCardProps>(({
    contact,
    updateFavorit,
    withLink
  }) => {
  const dispatch = useDispatch<AppDispatch>();
  const  {photo, id, name, phone, birthday, address, isFavorit} = contact;
  const [isUpdate, setIsUpdate] = useState<boolean>(isFavorit);

  const updateFavorite = () => {
    dispatch(updateFavoriteContact(!isFavorit, id))
    setIsUpdate((prev) => !prev)
    updateFavorit &&  updateFavorit();
  }

    return (
      <Card key={id}>

        <Card.Img variant="top" src={photo} />
        <Card.Body>
          <Card.Title>
            {withLink ? <Link to={`/contact/${id}`}>{name}</Link> : name}
          </Card.Title>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item><Link to={`tel:${phone}`} target="_blank">{phone}</Link></ListGroup.Item>
              <ListGroup.Item>{birthday}</ListGroup.Item>
              <ListGroup.Item>{address}</ListGroup.Item>
              <Button onClick={updateFavorite}>
                {isUpdate ? 'Удалить из избранных' : 'Добавить в избранные'}
              </Button>
            </ListGroup>
          </Card.Body>
        </Card.Body>
      </Card>
    );
  }
)
