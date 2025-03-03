import React, {useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactCard} from 'src/components/ContactCard';
import {useDispatch, useSelector} from "react-redux";
import {getContact} from "src/redux/appReducer/appAction";
import {selectContact} from "src/redux/appReducer/appSelectors";
import {AppDispatch} from "src/redux/appReducer/type";


export const ContactPage = () => {
  const {contactId} = useParams<{ contactId: string }>();
  const contact = useSelector(selectContact);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    contactId && dispatch(getContact(contactId));
  }, [contactId]);

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact && <ContactCard contact={contact} />}
      </Col>
    </Row>
  );
};
