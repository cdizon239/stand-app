import styled from "styled-components";
export const TicketDetailPageWrapper = styled.div`
  display: flex;
  flex-direction: column;

`;

export const TicketAndCommentsWrapper = styled.div`
  padding: 40px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

export const TicketArea = styled.div`
width: 70%;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
background: #FDFFFC;
padding: 15px;
border-radius: 10px;
`

export const CommentArea = styled.div`
width: 30%;
margin-left: 30px;
`

export const WriteCommentBox = styled.div`
  display: flex;
  min-width: 100%;
`;