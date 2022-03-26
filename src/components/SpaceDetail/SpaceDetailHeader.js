import React, { useEffect } from "react";
import AvatarGroup from '@atlaskit/avatar-group';
import styled from "styled-components";


const HeaderWrapper = styled.div`
display: flex;
justify-content: space-between;
padding: 5%;
`
const HeaderTitleContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`
const MemberContainer = styled.div`
display: flex;
`

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
