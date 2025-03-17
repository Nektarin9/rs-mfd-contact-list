import React, {useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {observer} from "mobx-react";
import store from "src/mobx/appStore";


export const FavoritListPage = observer(() => {

  useEffect(() => {
    store.setContacts();
  }, []);

  return (
    <Row xxl={4} className="g-4">
      {store.contacts?.map((contact) => {
        if (contact.isFavorit) {
          return (<Col key={contact.id}>
            <ContactCard contact={contact} withLink />
          </Col>)
        }
      }
      )}
    </Row>
  );
})
