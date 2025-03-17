import React, { useEffect, useState} from 'react';
import { Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {ApiGetContactsType} from "src/api/apiContacts";
import store from "src/mobx/appStore";
import {observer} from "mobx-react";


export const ContactListPage = observer(() => {
  const [searchContacts, setSearchContacts] = useState<ApiGetContactsType[]>([]);

  useEffect(() => {
    store.setContacts()
    store.setGroupContacts()
  }, []);

  useEffect(() => {
      if (store.contacts) {
        setSearchContacts(store.contacts);
      }
  }, [store.contacts]);

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts: ApiGetContactsType[] = store.contacts || [];

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(({name}) => (
        name.toLowerCase().indexOf(fvName) > -1
      ))
    }

    if (fv.groupId) {
      const groupContacts = store.groupContacts && store.groupContacts.find(({id}) => id === fv.groupId);

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
        <FilterForm groupContactsList={store.groupContacts || []} initialValues={{}} onSubmit={onSubmit} />
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
