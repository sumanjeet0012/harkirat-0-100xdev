import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div>
        <Link to={"/"}>Medium</Link>
      </div>
      <div>
        <Avatar name="Sumanjeet" size="large" />
      </div>
    </div>
  );
};

export default Appbar;
