import React, { useEffect } from "react";
import AvatarGroup from '@atlaskit/avatar-group';
import {HeaderWrapper, HeaderTitleContainer} from './styles'

const SpaceDetailHeader = ({ space }) => {
    let members = space.members
    let users = members.map(member => ({
        email: member.user.email,
        key: member.user.email,
        name: member.user.name,
        href: '#',
        src:member.user.name
    }))

  return (
    <>
      <HeaderWrapper>
        <HeaderTitleContainer>
          <h1>{space.name}</h1>
          <p>Settings</p>
        </HeaderTitleContainer>
        <div>
        <AvatarGroup appearance="stack" data={users} />
        </div>
      </HeaderWrapper>
    </>
  );
};

export default SpaceDetailHeader;
