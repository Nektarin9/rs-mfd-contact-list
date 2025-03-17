import React, {memo, useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import store from "src/mobx/appStore";
import {observer} from "mobx-react";

export const GroupListPage = observer(() => {


  useEffect(() => {
    store.setGroupContacts();
  }, []);

  return (
    <Row xxl={4}>
      {store.groupContacts?.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContact={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
