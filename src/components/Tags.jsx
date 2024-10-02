import "./tags.css";

function Tags({ tag }) {
  return (
    <div className="tag">
      <span className="tag-span"/>
      {tag}
    </div>
  );
}

export default Tags;
