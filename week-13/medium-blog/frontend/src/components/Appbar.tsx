import { Avatar } from "./BlogCard"

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
        <div>Medium</div>
        <div><Avatar name="Sumanjeet" size="large" /></div>
    </div>
  )
}

export default Appbar