import React, { useState, useEffect } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import AddProfileButton from '../AddProfileButton';
import { collection, DocumentData, getDocs, query, where, orderBy } from 'firebase/firestore';
import { firestore } from '../../firebase-config';

type Props = {};

export default function PlayerList({ }: Props) {

  const [alert, setAlert] = useState({ type: '', content: '' });
  const [showAlert, setShowAlert] = useState(false);
  let profilesArray: DocumentData[] = [];
  const [profileState, setProfileState] = useState<DocumentData[]>([] as DocumentData[]);
  let docIdArray: string[] = [];
  const [docIdState, setDocIdState] = useState([] as string[]);

  async function GetAllProfiles() {

    const q = query(collection(firestore, "users"), orderBy("updatedOn", "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      profilesArray.push(doc.data());
      docIdArray.push(doc.id);
    });
    
    setProfileState(profilesArray);
    setDocIdState(docIdArray);
  }

  useEffect(() => {
    GetAllProfiles();
    return () => {

    }
  }, [])


  return (
    <>
      <h2>Player List</h2>

      {showAlert ? <Alert variant={alert.type} onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>{alert.type}</Alert.Heading>
        <p>
          {alert.content}
        </p>
      </Alert> : null}



      <AddProfileButton setAlert={setAlert} setShowAlert={setShowAlert} GetAllProfiles={GetAllProfiles} />
      {profileState.map((element, index) => {
        return <PlayerCard key={index} avatar={element.avatar} name={element.name} ign={element.ign} lvl={element.lvl} uid={element.uid} server={element.server} msg={element.msg} favChar={element.favChar} wantedChar={element.wantedChar} pinCode={element.pinCode} updOn={element.updatedOn} docId={docIdState[index]} husbando={element.husbando} waifu={element.waifu} kiddo={element.kiddo} artifact={element.artifact} setAlert={setAlert} setShowAlert={setShowAlert} GetAllProfiles={GetAllProfiles} />
      })}
    </>
  )
}