import React, {memo, useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
import {
  ApiGetContactsType,
} from "src/api/apiContacts";

import store from "src/mobx/appStore";
import {observer} from "mobx-react";

export const GroupPage = observer(() => {
  const {groupId} = useParams<{ groupId: string }>();
  const [contactIds, setContactIds] = useState<ApiGetContactsType[]>([]);


  useEffect(() => {
    groupId && store.setContacts()
    groupId && store.setGroupContactsById(groupId);
  }, [groupId]);

  useEffect(() => {
    setContactIds(() => {
      if (store.groupContact) {
        return store.contacts.filter(({id}) => store.groupContact && store.groupContact.contactIds.includes(id)) || []
      }
      return [];
    });
  }, [store.contacts]);


  return (
    <Row className="g-4">
      {store.groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                {store.groupContact && <GroupContactsCard groupContact={store.groupContact} />}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className="g-4">
              {contactIds.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : <Empty />}
    </Row>
  );
});
