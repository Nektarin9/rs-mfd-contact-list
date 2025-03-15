import React, {memo} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {useGetContactsQuery} from "src/api/apiContacts";


export const FavoritListPage = memo(() => {
  const {data: contacts} = useGetContactsQuery()


  return (
    <Row xxl={4} className="g-4">
      {contacts?.map((contact) => {
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
