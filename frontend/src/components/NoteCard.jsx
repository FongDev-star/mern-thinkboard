import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/api.js";
import { toast } from "react-hot-toast";

const NoteCard = ({ note , setNotes}) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if(!window.confirm("Are you sure you want to delete this note ?")) return;

    try{
      await api.delete(`notes/${id}`);
      setNotes((pre)=> pre.filter(note => note._id !== id)); // get rid of delete one
      toast.success("Note deleted successfully.");
      
    }catch(error){
      console.log("Error in delete note.", error);
      toast.error("Fail to delete note");
    } 
  };

  return (
    <Link to={`/detail/${note._id}`}>
      <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9d]">
        <div className="card-body">
          <h3 className="card-title text-base-content">{note.title}</h3>

          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between mt-4 items-center">
            <span className="text-sm text-base-content/60">
              {note.createdAt && (
                <p className="text-xs text-base-content/40 mt-auto pt-2">
                  {formatDate(new Date(note.createdAt))}
                </p>
              )}
            </span>
            <div>
              <button className="btn btn-ghost btn-xs">
                <PenSquareIcon className="size-4" />
              </button>
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => handleDelete(e, note._id)}>
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
