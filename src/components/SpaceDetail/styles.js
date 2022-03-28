import styled from "styled-components";

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
`;

export const DraggableTicket = styled.div`
  user-select: none;
  padding: 5px 10px;
  margin: 0 0 8px 0;
  min-height: 50px;
  color: white;
  display: flex;
  border-radius: 3px;
  justify-content: space-between;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1% 5%;
`;
export const HeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const MemberSectionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CreateTicketButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px auto;
`;
