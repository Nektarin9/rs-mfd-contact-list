import React, {memo, useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import { useDispatch, useSelector } from 'react-redux';
import {getContacts, getGroupContacts} from "src/redux/appReducer/appAction";
import {selectContacts, selectGroupContacts} from "src/redux/appReducer/appSelectors";
import {ApiGetContactsType} from "src/api/apiContacts";
import {AppDispatch} from "src/redux/appReducer/type";


export const ContactListPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(selectContacts);
  const groupContactsState = useSelector(selectGroupContacts);
  const [searchContacts, setSearchContacts] = useState<ApiGetContactsType[]>(contacts);

  useEffect(() => {
    dispatch(getContacts())
    dispatch(getGroupContacts())
  }, [])

  useEffect(() => {
    setSearchContacts(contacts);
  }, [contacts]);

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts: ApiGetContactsType[] = contacts;

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(({name}) => (
        name.toLowerCase().indexOf(fvName) > -1
      ))
    }

    if (fv.groupId) {
      const groupContacts = groupContactsState.find(({id}) => id === fv.groupId);

      if (groupContacts) {
        findContacts = findContacts.filter(({id}) => (
          groupContacts.contactIds.includes(id)
        ))
      }
    }
    setSearchContacts(findContacts)
  }


  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm groupContactsList={groupContactsState} initialValues={{}} onSubmit={onSubmit} />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {searchContacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
})
