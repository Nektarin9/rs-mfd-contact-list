import React, {memo, useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {ApiGetContactsType, useGetContactsQuery, useGetGroupContactsQuery} from "src/api/apiContacts";


export const ContactListPage = memo(() => {
  const { data: contacts } = useGetContactsQuery()
  const { data: groupContactsState } = useGetGroupContactsQuery()

  const [searchContacts, setSearchContacts] = useState<ApiGetContactsType[]>([]);



  useEffect(() => {
    contacts?.length && setSearchContacts(contacts);
  }, [contacts]);

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts: ApiGetContactsType[] = contacts || [];

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(({name}) => (
        name.toLowerCase().indexOf(fvName) > -1
      ))
    }

    if (fv.groupId) {
      const groupContacts = groupContactsState && groupContactsState.find(({id}) => id === fv.groupId);

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
        <FilterForm groupContactsList={groupContactsState || []} initialValues={{}} onSubmit={onSubmit} />
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
