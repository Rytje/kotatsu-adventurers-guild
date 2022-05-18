import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import charavatar from '../../character-avatar-urls.json';
import AddProfileButton from '../AddProfileButton';

type Props = {};

export default function PlayerList({ }: Props) {
  return (
    <>
      <h2>Player List</h2>
      
      <AddProfileButton />
      <PlayerCard avatarURL= {charavatar.aether.url} />
      <PlayerCard avatarURL= {charavatar.lumine.url} />
      <PlayerCard avatarURL= {charavatar.lisa.url} />
      <PlayerCard avatarURL= {charavatar.sayu.url} />
    </>
  )
}