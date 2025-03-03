import React, {memo, useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {Empty} from 'src/components/Empty';
import {ContactCard} from 'src/components/ContactCard';
import {useDispatch, useSelector} from "react-redux";
import {getContacts, getGroupContact} from "src/redux/appReducer/appAction";
import {selectContacts, selectGroupContact} from "src/redux/appReducer/appSelectors";
import {ApiGetContactsType} from "src/api/apiContacts";
import {AppDispatch} from "src/redux/appReducer/type";

export const GroupPage = memo(() => {
  const {groupId} = useParams<{ groupId: string }>();
  const [contactIds, setContactIds] = useState<ApiGetContactsType[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const groupContact = useSelector(selectGroupContact)
  const contacts = useSelector(selectContacts)

  useEffect(() => {
    groupId && dispatch(getGroupContact(groupId));
    dispatch(getContacts())

  }, [groupId]);

  useEffect(() => {
    setContactIds(() => {
      if (groupContact) {
        return contacts.filter(({id}) => groupContact.contactIds.includes(id))
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
