import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router";
import api from "../lib/api.js";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon, Trophy } from "lucide-react";

const DetailPage = () => {
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNotes(res.data);
      } catch (error) {
        toast.error("Failed to fetching note!");
        console.log("Error in fetching note", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  console.log({ notes });

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note? ")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully.");
    } catch (error) {
      console.log("Error deleting note.", error);
      toast.error("Failed to delete note.");
    }
  };
  const handleSave = async () => {
    if (!notes.title.trim() || !notes.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, notes);
      toast.success("Note updated successfully.");
      navigate("/");
    } catch (error) {
      console.log("Error in updating note.", erorr);
      toast.error("Failed to update note.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 ">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-success">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              className="btn btn-error btn-outline"
              onClick={handleDelete}>
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>

                <input
                  type="text"
                  placeholder="Note title..."
                  className="input input-bordered w-full"
                  value={notes.title}
                  onChange={(e) =>
                    setNotes({ ...notes, title: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32 w-full resize-none"
                  placeholder="Write your note here..."
                  value={notes.content}
                  onChange={(e) =>
                    setNotes({ ...notes, content: e.target.value })
                  }></textarea>
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-success"
                  disabled={saving}
                  onClick={handleSave}>
                  {saving ? "saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
