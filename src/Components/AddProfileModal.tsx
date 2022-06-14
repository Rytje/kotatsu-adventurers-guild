import React from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { firestore } from '../firebase-config';
import charactersJson from '../character-avatar-urls.json';
import artifactsJson from '../artifacts-data.json';

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  setAlert: typeof alert;
  setShowAlert: (value: boolean) => void;
  GetAllProfiles: () => void;
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
  pinCode: Yup.string()
    .required("Required"),
  msg: Yup.string(),
  favChar: Yup.string(),
  wantedChar: Yup.string(),
  husbando: Yup.string(),
  waifu: Yup.string(),
  kiddo: Yup.string(),
  artifact: Yup.string()
});

export default function AddProfileModal({ showModal, toggleModal, setAlert, setShowAlert, GetAllProfiles }: Props) {

  let charactersArray = Object.entries(charactersJson);
  charactersArray.sort();
  let charactersSelect = Array.from(charactersArray);
  charactersSelect.unshift(["", { "name": "", "url": "", "sex": "", "size": "" }]);
  let submitButton = document.getElementById("formSubmitButton");
  let husbandoSelect = charactersSelect.filter(entry => entry[1].sex === "m" || entry[1].name === "");
  let waifuSelect = charactersSelect.filter(entry => entry[1].sex === "f" && entry[1].size !== "s" || entry[1].name === "")
  let kiddoSelect = charactersSelect.filter(entry => entry[1].size === "s" || entry[1].name === "");

  let artifactsArray = Object.entries(artifactsJson);
  artifactsArray.sort();
  let artifactsSelect = Array.from(artifactsArray);
  artifactsSelect.unshift(["", { "name": "", "url": ""}]);


  async function submitUserData(avatar: string, name: string, ign: string, lvl: any, uid: any, server: string, pinCode: string, msg: string, favChar: string, wantedChar: string, husbando: string, waifu: string, kiddo: string, artifact: string) {

    try {
      const docRef = await addDoc(collection(firestore, "users"), {
        avatar: avatar,
        name: name,
        ign: ign,
        lvl: Number(lvl),
        uid: Number(uid),
        server: server,
        pinCode: pinCode,
        msg: msg,
        favChar: favChar,
        wantedChar: wantedChar,
        husbando: husbando,
        waifu: waifu,
        kiddo: kiddo,
        artifact: artifact,
        createdOn: Timestamp.now().seconds,
        updatedOn: Timestamp.now().seconds
      });
      // console.log("Document written with ID: ", docRef.id);
      setAlert({ type: "success", content: "Your profile was added." })
      setShowAlert(true);
      GetAllProfiles();
      toggleModal();
    } catch (error) {
      console.error("Error adding document: ", error);
      setAlert({ type: "danger", content: "Something went wrong." })
      setShowAlert(true);
    }
  }

  return (
    <Modal show={showModal} onHide={toggleModal} className='add-profile-modal' >
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
        pinCode: '',
        msg: '',
        favChar: '',
        wantedChar: '',
        husbando: '',
        waifu: '',
        kiddo: '',
        artifact: ''
      }}
        validationSchema={addProfileSchema}
        onSubmit={values => {
          submitUserData(values.avatar, values.name, values.ign, values.lvl, values.uid, values.server, values.pinCode, values.msg, values.favChar, values.wantedChar, values.husbando, values.waifu, values.kiddo, values.artifact);
          submitButton = document.getElementById("formSubmitButton");
          submitButton?.setAttribute("disabled", "disabled");
        }}>

        {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
          <FormikForm onSubmit={handleSubmit} noValidate>
            <Modal.Body className='add-profile-form'>
              <FloatingLabel label='Avatar' controlId='avatar'>
                <Form.Select aria-label='Avatar select' placeholder='Aether' value={values.avatar} onChange={handleChange} onBlur={handleBlur} isValid={touched.avatar && !errors.avatar} isInvalid={!!errors.avatar && touched.avatar} >
                  {
                    charactersSelect.map((e, index) => {
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
                  <option value="TW/HK/MO">TW/HK/MO</option>
                </Form.Select>
                <Form.Control.Feedback />
                <Form.Control.Feedback type="invalid">
                  {errors.server}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel label='Pin code' controlId='pinCode'>
                <Form.Control type='password' placeholder='Pincode goes here' aria-describedby='pinCodeText' value={values.pinCode} onChange={handleChange} onBlur={handleBlur} isValid={touched.pinCode && !errors.pinCode} isInvalid={!!errors.pinCode && touched.pinCode} ></Form.Control>
                <Form.Control.Feedback />
                <Form.Control.Feedback type='invalid' >
                  {errors.pinCode}
                </Form.Control.Feedback>
                <Form.Text id='pinCodeText' >
                  <p>Use this code when you want to do stuff associated with your profile. You are free to use whatever, <strong>but it's saved in plain text</strong>, so use something simple and maybe <strong>not a password you use for other stuff.</strong></p>
                </Form.Text>
                <h2>Optional</h2>
                <FloatingLabel label='Profile message' controlId='msg'>
                  <Form.Control type='text' placeholder='Your profile message' value={values.msg} onChange={handleChange} onBlur={handleBlur} isValid={touched.msg && !errors.msg} isInvalid={!!errors.msg && touched.msg} ></Form.Control>
                  <Form.Control.Feedback />
                </FloatingLabel>
              </FloatingLabel>
              <FloatingLabel label='Main character' controlId='favChar'>
                <Form.Select aria-label='Favorite character select' placeholder='Main character' value={values.favChar} onChange={handleChange} onBlur={handleBlur} isValid={touched.favChar && !errors.favChar} isInvalid={!!errors.favChar && touched.favChar} >
                  {
                    charactersSelect.map((e, index) => {
                      return <option key={index} value={e[1].name} >{e[1].name}</option>
                    })
                  }
                </Form.Select>
                <Form.Control.Feedback />
              </FloatingLabel>
              <FloatingLabel label='Wanted character' controlId='wantedChar'>
                <Form.Select aria-label='Wanted character select' placeholder='Wanted character' value={values.wantedChar} onChange={handleChange} onBlur={handleBlur} isValid={touched.wantedChar && !errors.wantedChar} isInvalid={!!errors.wantedChar && touched.wantedChar} >
                  {
                    charactersSelect.map((e, index) => {
                      return <option key={index} value={e[1].name} >{e[1].name}</option>
                    })
                  }
                </Form.Select>
                <Form.Control.Feedback />
              </FloatingLabel>
              <FloatingLabel label='Best husbando' controlId='husbando'>
                <Form.Select aria-label='Husbando character select' placeholder='Best husbando' value={values.husbando} onChange={handleChange} onBlur={handleBlur} isValid={touched.husbando && !errors.husbando} isInvalid={!!errors.husbando && touched.husbando} >
                  {
                    husbandoSelect.map((e, index) => {
                      return <option key={index} value={e[1].name} >{e[1].name}</option>
                    })
                  }
                </Form.Select>
                <Form.Control.Feedback />
              </FloatingLabel>
              <FloatingLabel label='Best waifu' controlId='waifu'>
                <Form.Select aria-label='Waifu character select' placeholder='Best waifu' value={values.waifu} onChange={handleChange} onBlur={handleBlur} isValid={touched.waifu && !errors.waifu} isInvalid={!!errors.waifu && touched.waifu} >
                  {
                    waifuSelect.map((e, index) => {
                      return <option key={index} value={e[1].name} >{e[1].name}</option>
                    })
                  }
                </Form.Select>
                <Form.Control.Feedback />
              </FloatingLabel>
              <FloatingLabel label='Best kiddo' controlId='kiddo'>
                <Form.Select aria-label='Kiddo character select' placeholder='Best kiddo' value={values.kiddo} onChange={handleChange} onBlur={handleBlur} isValid={touched.kiddo && !errors.kiddo} isInvalid={!!errors.kiddo && touched.kiddo} >
                  {
                    kiddoSelect.map((e, index) => {
                      return <option key={index} value={e[1].name} >{e[1].name}</option>
                    })
                  }
                </Form.Select>
                <Form.Control.Feedback />
              </FloatingLabel>
              <FloatingLabel label='Collecting artifact' controlId='artifact'>
                <Form.Select aria-label='Artifact select' placeholder='Collecting artifact' value={values.artifact} onChange={handleChange} onBlur={handleBlur} isValid={touched.artifact && !errors.artifact} isInvalid={!!errors.artifact && touched.artifact} >
                  {
                    artifactsSelect.map((e, index) => {
                      return <option key={index} value={e[1].name} >{e[1].name}</option>
                    })
                  }
                </Form.Select>
                <Form.Control.Feedback />
              </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='outline-secondary' onClick={toggleModal} className='text-black' >Cancel</Button>
              <Button variant='primary' type='submit' id='formSubmitButton' className='text-white' >Submit</Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  )
}