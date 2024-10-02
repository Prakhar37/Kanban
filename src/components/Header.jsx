import "./header.css";
const Header = ({ setGrouping, setSort }) => {
  return (
    <div className="header">
      <label>
        <img src="icons/Display.svg" />
      </label>
      <select onChange={(e) => setGrouping(e.target.value)}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>

      {/* <label>Sort By:</label>
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select> */}
    </div>
  );
};

export default Header;
