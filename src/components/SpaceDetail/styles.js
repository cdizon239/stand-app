import styled from "styled-components";

export const Board = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 0 30px;
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
  width: 100%;
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
  font-size: 14px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 50px;
`;
export const HeaderTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
export const MemberSectionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SpaceDetailButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  border: none;
  margin-left: 10px;
  background: rgba(69, 61, 121, 1);
  min-height: 50px;
  color: white;
  font-weight: 500;
  padding: 0 2%;
  max-width: 200px
`;