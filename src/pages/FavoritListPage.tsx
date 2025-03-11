import React, {memo, useCallback, useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {useDispatch, useSelector} from "react-redux";
import {selectContacts} from "src/redux/appReducer/appSelectors";
import {getContacts} from "src/redux/appReducer/appAction";
import {AppDispatch} from "src/redux/appReducer/type";

export const FavoritListPage = memo(() => {
  const [isFavoritUpdate, setIsFavoritUpdate] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(getContacts())
  }, [isFavoritUpdate])

  const updateFavorit = useCallback(() => {
    setIsFavoritUpdate(prev => !prev);
  }, [])

  return (
    <Row xxl={4} className="g-4">
      {contacts.map((contact) => {
        if (contact.isFavorit) {
          return (<Col key={contact.id}>
            <ContactCard contact={contact} updateFavorit={updateFavorit} withLink />
          </Col>)
        }
      }
      )}
    </Row>
  );
})
