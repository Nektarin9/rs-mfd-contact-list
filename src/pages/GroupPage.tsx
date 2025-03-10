import React, {memo, useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
import {
  ApiGetContactsType,
  useGetContactsQuery,
  useGetGroupContactQuery,
} from "src/api/apiContacts";
import {skipToken} from "@reduxjs/toolkit/query";

export const GroupPage = memo(() => {
  const {groupId} = useParams<{ groupId: string }>();
  const [contactIds, setContactIds] = useState<ApiGetContactsType[]>([]);

  const {data: groupContact} = useGetGroupContactQuery(groupId ? groupId : skipToken)
  const {data: contacts} = useGetContactsQuery()



  useEffect(() => {
    setContactIds(() => {
      if (groupContact) {
        return contacts?.filter(({id}) => groupContact.contactIds.includes(id)) || []
      }
      return [];
    });
  }, [contacts]);


  return (
    <Row className="g-4">
      {groupContact ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                {groupContact && <GroupContactsCard groupContacts={groupContact} />}
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
