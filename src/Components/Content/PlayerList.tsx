import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import charavatar from '../../character-avatar-urls.json';

type Props = {};

export default function PlayerList({ }: Props) {
  return (
    <>
      <h2>Player List</h2>
      
      <PlayerCard avatarURL= {charavatar.aether} />
      <PlayerCard avatarURL= {charavatar.lumine} />
      <PlayerCard avatarURL= {charavatar.lisa} />
      <PlayerCard avatarURL= {charavatar.aether} />
    </>
  )
}