import React from 'react';
import AddCommissionButton from '../AddCommissionButton';
import Image from 'react-bootstrap/Image';

type Props = {};

export default function CommisionBoard({ }: Props) {
  return (
    <>
      <h2>Commission Board</h2>
      <div className='text-center'>
        <h3 className='d-inline-block bg-info' >Under construction</h3>
        <Image src='https://1.bp.blogspot.com/-K1JmwXptM7Q/XdttyIIDNPI/AAAAAAABWME/ITljnZkR2h41UZaZXXdHbzN1PVniB0YAACNcBGAsYHQ/s1600/pose_yubisashi_kakunin_sagyouin_woman.png' height={150} />
      </div>
      <AddCommissionButton />
    </>
  )
}