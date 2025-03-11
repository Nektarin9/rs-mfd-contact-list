import React, {memo, useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {GroupContactsCard} from 'src/components/GroupContactsCard';
import {useDispatch, useSelector} from "react-redux";
import {getGroupContacts} from "src/redux/appReducer/appAction";
import {selectGroupContacts} from "src/redux/appReducer/appSelectors";
import {AppDispatch} from "src/redux/appReducer/type";

export const GroupListPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const groupContacts = useSelector(selectGroupContacts);

  useEffect(() => {
    dispatch(getGroupContacts())
  }, []);

  return (
    <Row xxl={4}>
      {groupContacts.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});
