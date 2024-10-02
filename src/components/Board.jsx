// import React, { useEffect, useState } from "react";
// import { fetchTickets } from "../services/api";
// import Header from "./Header";
// import Card from "./Card";
// import "./Board.css";

// const Board = () => {
//   const [tickets, setTickets] = useState([]);
//   const [grouping, setGrouping] = useState("status");
//   const [sort, setSort] = useState("priority");

//   useEffect(() => {
//     const storedGrouping = localStorage.getItem("grouping");
//     const storedSort = localStorage.getItem("sort");

//     if (storedGrouping) setGrouping(storedGrouping);
//     if (storedSort) setSort(storedSort);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("grouping", grouping);
//     localStorage.setItem("sort", sort);
//   }, [grouping, sort]);

//   useEffect(() => {
//     const getTickets = async () => {
//       const data = await fetchTickets();
//       setTickets(data);
//     };
//     getTickets();
//   }, []);

//   const groupBy = (array, key) => {
//     if (!Array.isArray(array)) {
//       return {};
//     }

//     return array.reduce((result, currentValue) => {
//       const groupKey = currentValue[key] || "Uncategorized";
//       if (!result[groupKey]) {
//         result[groupKey] = [];
//       }
//       result[groupKey].push(currentValue);
//       return result;
//     }, {});
//   };

//   const groupTickets = () => {
//     return groupBy(tickets, grouping);
//   };

//   const sortTickets = (groupedTickets) => {
//     for (const key in groupedTickets) {
//       groupedTickets[key] = groupedTickets[key].sort((a, b) => {
//         if (sort === "priority") {
//           return b.priority - a.priority;
//         } else if (sort === "title") {
//           return a.title.localeCompare(b.title);
//         }
//         return 0;
//       });
//     }
//     return groupedTickets;
//   };

//   const groupedTickets = groupTickets();
//   const sortedTickets = sortTickets(groupedTickets);

//   //     <div>
//   //       <Header setGrouping={setGrouping} setSort={setSort} />
//   //       <div className="board">
//   //         {Object.entries(sortedTickets).map(([groupKey, ticketGroup]) => (
//   //           <div key={groupKey} className="ticket-column">
//   //             <h3 className="column-title">{groupKey}</h3>
//   //             {ticketGroup.map((ticket) => (
//   //               <Card key={ticket.id} ticket={ticket} />
//   //             ))}
//   //           </div>
//   //         ))}
//   //       </div>
//   //     </div>
//   //   );
//   return (
//     <div className="board-container">
//       {" "}
//       {/* Add this wrapper for padding */}
//       <Header setGrouping={setGrouping} setSort={setSort} />
//       <div className="board">
//         {Object.entries(groupedTickets).map(([groupKey, ticketGroup]) => (
//           <div key={groupKey} className="ticket-column">
//             {" "}
//             {/* Change this to .ticket-column */}
//             <h3 className="column-title">{groupKey}</h3>
//             {ticketGroup.map((ticket) => (
//               <Card key={ticket.id} ticket={ticket} />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Board;

import React, { useEffect, useState } from "react";
import { fetchTickets } from "../services/api";
import Header from "./Header";
import Card from "./Card";
import "./Board.css";

const priority = ["No Priority", "Urgent","High","Medium","Low"];

const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sort, setSort] = useState("priority");

  useEffect(() => {
    const storedGrouping = localStorage.getItem("grouping");
    const storedSort = localStorage.getItem("sort");

    if (storedGrouping) setGrouping(storedGrouping);
    if (storedSort) setSort(storedSort);
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("sort", sort);
  }, [grouping, sort]);

  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchTickets();
      setTickets(data.tickets);
      setUsers(data.users);
    };
    getTickets();
  }, []);

  const groupBy = (array, key) => {
    if (!Array.isArray(array)) {
      return {};
    }

    return array.reduce((result, currentValue) => {
      let groupKey=currentValue[key];
      if(grouping === "priority"){
         groupKey= priority[currentValue[key]];
      }
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentValue);
      return result;
    }, {});
  };

  const groupTickets = () => {
    return groupBy(tickets, grouping);
  };

  const sortTickets = (groupedTickets) => {
    for (const key in groupedTickets) {
      groupedTickets[key] = groupedTickets[key].sort((a, b) => {
        if (sort === "priority") {
          return b.priority - a.priority;
        } else if (sort === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }
    return groupedTickets;
  };

  const groupedTickets = groupTickets();
  const sortedTickets = sortTickets(groupedTickets); // Sort the grouped tickets

  return (
    <div className="board-container">
      <Header setGrouping={setGrouping} setSort={setSort} />
      <div className="board">
        {Object.entries(sortedTickets).map(([groupKey, ticketGroup]) => (
          <div key={groupKey} className="ticket-column">
            <header className="group-header">
              <div>
                <img
                  src={`/icons/${groupKey
                    .toLowerCase()
                    .split(" ")
                    .join("-")}.svg`}
                />
                <h3 className="column-title">{groupKey}</h3>
              </div>
              <div>
                <img src="/icons/add.svg" />
                <img src="/icons/menu.svg" />
              </div>
            </header>
            {ticketGroup.map((ticket) => (
              <Card
                key={ticket.id}
                ticket={ticket}
                user={users.filter((e) => e.id === ticket.userId)[0]}
                groupBy ={grouping} 
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
