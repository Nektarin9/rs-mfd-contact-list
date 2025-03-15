import React, {memo} from 'react';
import {Col, Row} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {useGetGroupContactsQuery} from "src/api/apiContacts";

export const GroupListPage = memo(() => {

  const {data: groupContacts} = useGetGroupContactsQuery()

  return (
    <Row xxl={4}>
      {groupContacts?.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
