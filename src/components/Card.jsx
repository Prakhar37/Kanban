// import React from 'react';

// const Card = ({ ticket }) => {
//   return (
//     <div className="card">
//       <h4>{ticket.title}</h4>
//       <p>Priority: {ticket.priority}</p>
//       <p>Status: {ticket.status}</p>
//       <p>Assigned to: {ticket.user}</p>
//     </div>
//   );
// };

// export default Card;

import React from "react";
import "./Card.css";
import Tags from "./Tags";
import Avatar from "./Avatar";

const priorityIcons = ["no-priority.svg","urgent.svg","high.svg","medium.svg","low.svg"];

const Card = ({ ticket, user ,groupBy}) => {
  console.log(groupBy)
  return (
    <div className="card">
      <div className="card-header">
        <span className="issue-id">{ticket.id}</span>
        <Avatar>{user.name}</Avatar>
      </div>
      <h2 className="card-title">{ticket.title}</h2>
      <div className="card-tags">
        {groupBy !=="priority" && <span className='priority'>
          <img src={`/icons/${priorityIcons[ticket.priority]}`} />
        </span>
        }
        {ticket.tag.map((e) => (
          <Tags key={e} tag={e} />
        ))}
      </div>
    </div>
  );
};

export default Card;
