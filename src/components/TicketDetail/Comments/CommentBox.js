import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";
import { getComments } from "../../../utils/getComments";


const Avatar = styled(Image)`
  height: 25px;
  margin: 0 15px;
`;

const CommentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  text-align: left;
`;

const CommentAction = styled.span`
margin: 5px;
`

const styles = {
  author: {
    "fontSize" : "12px",
    "fontWeight" : "bold",
    "fontStyle" : "italic"
  },
  commentDetail: {
    "fontSize" : "13px"
  },
  commentAction: {
    "fontSize" : "10px"
  }
}

const CommentBox = ({comment, setComments}) => {
  const handleDelete = async () => {
    let deleteComment = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/comments/"+comment.id+"/delete_comment",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    getComments(comment.ticket.id, setComments)
  }
  return <CommentWrapper>
    <Avatar src={comment.created_by.img_url} referrerPolicy="no-referrer" roundedCircle/>
    <div>
    <p style={styles.author}>{comment.created_by.name}</p>
    <p style={styles.commentDetail}>{comment.detail}</p>
    <div>
      {comment.created_by.email === localStorage.getItem('loggedInUserEmail') ? <p style={styles.commentAction}><CommentAction>Edit</CommentAction>·<CommentAction onClick={handleDelete}>Delete</CommentAction></p> : '' }
    </div>
    </div>
  </CommentWrapper>;

  
};


export default CommentBox;
