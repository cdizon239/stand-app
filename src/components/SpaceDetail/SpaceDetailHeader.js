import React, { useEffect } from "react";
import AvatarGroup from '@atlaskit/avatar-group';
import {HeaderWrapper, HeaderTitleContainer, MemberSectionWrapper} from './styles'
import { PlusCircleFill } from "react-bootstrap-icons";

const SpaceDetailHeader = ({ space }) => {
    let members = space.members
    let users = members.map(member => ({
        email: member.user.email,
        key: member.user.email,
        name: member.user.name,
        href: '#',
        src:member.user.img_url
    }))    

  return (
    <>
      <HeaderWrapper>
        <HeaderTitleContainer>
          <h1>{space.name}</h1>
          <p>Settings</p>
        </HeaderTitleContainer>
        <MemberSectionWrapper>
        <AvatarGroup appearance="stack" data={users} />
        <PlusCircleFill className="fs-2"/>
        </MemberSectionWrapper>
      </HeaderWrapper>
    </>
  );
};

export default SpaceDetailHeader;
