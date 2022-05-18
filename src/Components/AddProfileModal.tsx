import React from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import charactersJson from '../character-avatar-urls.json';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
};

const addProfileSchema = Yup.object().shape({
  avatar: Yup.string()
    .required("Required"),
  name: Yup.string().matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'I tried to prevent you from trolling, did it fail?')
    .min(2, "If your name really is 1 character, contact me lol.")
    .required('"I just wanna know your name" -Jay Park (2012)'),
  ign: Yup.string()
    .required("Required"),
  lvl: Yup.number()
    .required("Required")
    .min(1, "Liar")
    .max(65, "You are high huh?"),
  uid: Yup.number()
    .required("Required")
    .min(0, "Can't be negative"),
  server: Yup.string()
    .required("Required"),
  msg: Yup.string(),
  favChar: Yup.string(),
  wantedChar: Yup.string()
});

export default function AddProfileModal({ showModal, toggleModal }: Props) {

  let charactersArray = Object.entries(charactersJson);
  charactersArray.sort();
  let charactersList = Array.from(charactersArray);
  charactersList.unshift(["", { "name": "", "url": "" }]);

  return (
    <Modal show={showModal} onHide={toggleModal} >
      <Modal.Header closeButton >
        <Modal.Title>Add your profile</Modal.Title>
      </Modal.Header>
      <Formik initialValues={{
        avatar: '',
        name: '',
        ign: '',
        lvl: '',
        uid: '',
        server: '',
        msg: '',
        favChar: '',
        wantedChar: ''
      }}
        validationSchema={addProfileSchema}
        onSubmit={values => {
          console.log(values);
        }}>

        {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
          <FormikForm onSubmit={handleSubmit} noValidate>
            <Modal.Body>
              <FloatingLabel label='Avatar' controlId='avatar'>
                <Form.Select aria-label='Avatar select' placeholder='Aether' value={values.avatar} onChange={handleChange} onBlur={handleBlur} isValid={touched.avatar && !errors.avatar} isInvalid={!!errors.avatar && touched.avatar} >
                  {
                    charactersList.map((e, index) => {
                      return <option key={index} value={e[1].name} >{e[1].name}</option>
                    })
                  }
                </Form.Select>
                <Form.Control.Feedback />
                <Form.Control.Feedback type="invalid">
                  {errors.avatar}
                </Form.Control.Feedback>
              </FloatingLabel >
              <FloatingLabel label='Your name' controlId='name'>
                <Form.Control type='text' placeholder='Name' value={values.name} onChange={handleChange} onBlur={handleBlur} isValid={touched.name && !errors.name} isInvalid={!!errors.name && touched.name} ></Form.Control>
                <Form.Control.Feedback />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel label='In game name' controlId='ign'>
                <Form.Control type='text' placeholder='IGNname' value={values.ign} onChange={handleChange} onBlur={handleBlur} isValid={touched.ign && !errors.ign} isInvalid={!!errors.ign && touched.ign} ></Form.Control>
                <Form.Control.Feedback />
                <Form.Control.Feedback type="invalid">
                  {errors.ign}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel label='Adventurer level' controlId='lvl'>
                <Form.Control type='number' min={1} max={65} placeholder='55' value={values.lvl} onChange={handleChange} onBlur={handleBlur} isValid={touched.lvl && !errors.lvl} isInvalid={!!errors.lvl && touched.lvl} ></Form.Control>
                <Form.Control.Feedback />
                <Form.Control.Feedback type="invalid">
                  {errors.lvl}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel label='UID' controlId='uid'>
                <Form.Control type='number' min={0} placeholder='123456789' value={values.uid} onChange={handleChange} onBlur={handleBlur} isValid={touched.uid && !errors.uid} isInvalid={!!errors.uid && touched.uid} ></Form.Control>
                <Form.Control.Feedback />
                <Form.Control.Feedback type="invalid">
                  {errors.uid}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel label='Server' controlId='server'>
                <Form.Select aria-label='Server select' placeholder='Server' value={values.server} onChange={handleChange} onBlur={handleBlur} isValid={touched.server && !errors.server} isInvalid={!!errors.server && touched.server} >
                  <option value=""></option>
                  <option value="Europe">Europe</option>
                  <option value="America">America</option>
                  <option value="Asia">Asia</option>
                  <option value="TWHKMO">TW, HK, MO</option>
                </Form.Select>
                <Form.Control.Feedback />
                <Form.Control.Feedback type="invalid">
                  {errors.server}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel label='Profile message' controlId='msg'>
                <Form.Control type='text' placeholder='Your profile message' value={values.msg} onChange={handleChange} onBlur={handleBlur} isValid={touched.msg && !errors.msg} isInvalid={!!errors.msg && touched.msg} ></Form.Control>
                <Form.Control.Feedback />
              </FloatingLabel>
              <FloatingLabel label='Favorite character' controlId='favChar'>
                <Form.Select aria-label='Favorite character select' placeholder='Favorite character' value={values.favChar} onChange={handleChange} onBlur={handleBlur} isValid={touched.favChar && !errors.favChar} isInvalid={!!errors.favChar && touched.favChar} >
                  {
                    charactersList.map((e, index) => {
                      return <option key={index} value={e[1].name} >{e[1].name}</option>
                    })
                  }
                </Form.Select>
                <Form.Control.Feedback />
              </FloatingLabel>
              <FloatingLabel label='Wanted character' controlId='wantedChar'>
                <Form.Select aria-label='Wanted character select' placeholder='Wanted character' value={values.wantedChar} onChange={handleChange} onBlur={handleBlur} isValid={touched.wantedChar && !errors.wantedChar} isInvalid={!!errors.wantedChar && touched.wantedChar} >
                  {
                    charactersList.map((e, index) => {
                      return <option key={index} value={e[1].name} >{e[1].name}</option>
                    })
                  }
                </Form.Select>
                <Form.Control.Feedback />
              </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='danger' onClick={toggleModal} >Cancel</Button>
              <Button variant='success' type='submit' >Submit</Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>

      {/* <Form>
        <FloatingLabel label='Avatar' controlId='avatar'>
          <Form.Select aria-label='Avatar select' >
            {
              charactersArray.map((e, index) => {
                return <option key={index} value={e[1].name} >{e[1].name}</option>
              })
            }
          </Form.Select>
        </FloatingLabel >
        <FloatingLabel label='Your name' controlId='name'>
          <Form.Control type='text' placeholder='Name' ></Form.Control>
        </FloatingLabel>
        <FloatingLabel label='In game name' controlId='ign'>
          <Form.Control type='text' placeholder='IGNname'></Form.Control>
        </FloatingLabel>
        <FloatingLabel label='Adventurer level' controlId='lvl'>
          <Form.Control type='number' placeholder='55'></Form.Control>
        </FloatingLabel>
        <FloatingLabel label='UID' controlId='uid'>
          <Form.Control type='number' placeholder='123456789'></Form.Control>
        </FloatingLabel>
        <FloatingLabel label='Server' controlId='server'>
          <Form.Select aria-label='Server select'>
            <option value="Europe">Europe</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="TWHKMO">TW, HK, MO</option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel label='Profile message' controlId='randomtext'>
          <Form.Control type='text' placeholder='Random text'></Form.Control>
        </FloatingLabel>
        <FloatingLabel label='Favorite character' controlId='favchar'>
          <Form.Select aria-label='Favorite character select' >
            {
              charactersArray.map((e, index) => {
                return <option key={index} value={e[1].name} >{e[1].name}</option>
              })
            }
          </Form.Select>
        </FloatingLabel >
        <FloatingLabel label='Wanted character' controlId='wanter'>
          <Form.Select aria-label='Wanted character select' >
            {
              charactersArray.map((e, index) => {
                return <option key={index} value={e[1].name} >{e[1].name}</option>
              })
            }
          </Form.Select>
        </FloatingLabel >
      </Form> */}
    </Modal>
  )
}