import {Formik} from 'formik';
import {Button, Col, Form, InputGroup, Row} from 'react-bootstrap';
import React, {memo} from 'react';
import {FormikConfig} from 'formik/dist/types';
import {ApiGetGroupContactsType} from "src/api/apiContacts";

export interface FilterFormValues {
  name: string,
  groupId: string
}

interface FilterFormProps extends FormikConfig<Partial<FilterFormValues>> {
  groupContactsList: ApiGetGroupContactsType[]
}

export const FilterForm = memo<FilterFormProps>(({
  onSubmit,
  initialValues = {},
  groupContactsList
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({handleChange, handleSubmit}) => (
        <Form onSubmit={handleSubmit} onChange={handleSubmit}>
          <Row xxl={4} className="g-4">
            <Col>
              <InputGroup className="mb-3">
                <Form.Control
                  id={'name'}
                  name={'name'}
                  onChange={handleChange}
                  placeholder="name"
                  aria-label="name"
                />
              </InputGroup>
            </Col>
            <Col>
              <Form.Select
                id={'groupId'}
                name={'groupId'}
                aria-label="Поиск по группе"
                onChange={handleChange}
              >
                <option>Open this select menu</option>
                {groupContactsList.map((groupContacts) => (
                  <option value={groupContacts.id} key={groupContacts.id}>{groupContacts.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Button variant={'primary'} type={'submit'}>Применить</Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
})
