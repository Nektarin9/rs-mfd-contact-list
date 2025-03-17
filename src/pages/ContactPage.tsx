import React, {useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactCard} from 'src/components/ContactCard';
import {observer} from "mobx-react";
import store from "src/mobx/appStore";



export const ContactPage = observer(() => {
  const {contactId} = useParams<{ contactId: string }>();

    useEffect(() => {
        contactId && store.setContactById(contactId);
    }, []);

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {store.contact && <ContactCard contact={store.contact} />}
      </Col>
    </Row>
  );
});
