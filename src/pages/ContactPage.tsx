import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactCard} from 'src/components/ContactCard';
import {useGetContactQuery} from "src/api/apiContacts";
import {skipToken} from "@reduxjs/toolkit/query";



export const ContactPage = () => {
  const {contactId} = useParams<{ contactId: string }>();

  const {data: contact} = useGetContactQuery(contactId ? contactId : skipToken)

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact && <ContactCard contact={contact} />}
      </Col>
    </Row>
  );
};
