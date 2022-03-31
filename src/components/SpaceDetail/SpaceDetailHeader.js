import React, { useEffect } from "react";
import AvatarGroup from "@atlaskit/avatar-group";
import {
  HeaderWrapper,
  HeaderTitleContainer,
  MemberSectionWrapper,
} from "./styles";
import { GearFill, PersonPlusFill } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

const SpaceDetailHeader = ({ space }) => {
  let members = space.members;
  let users = members.map((member) => ({
    email: member.user.email,
    key: member.user.email,
    name: member.user.name,
    href: "#",
    src: member.user.img_url,
    onClick: () => {
      console.log(member.user.name);
    },
  }));

  return (
    <>
      <HeaderWrapper>
        <HeaderTitleContainer>
          <h1>{space.name}</h1>
          <NavLink to={`/space/${space.id}/settings`}>
            <p style={{ margin: "0px 20px" }}>
              <GearFill /> Space settings
            </p>
          </NavLink>
        </HeaderTitleContainer>
        <MemberSectionWrapper>
          <AvatarGroup appearance="stack" data={users} />
          <NavLink to={`/space/${space.id}/edit_members`}>
            <PersonPlusFill className="fs-2" />
          </NavLink>
        </MemberSectionWrapper>
      </HeaderWrapper>
    </>
  );
};

export default SpaceDetailHeader;
