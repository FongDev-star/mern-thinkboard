import Note from "../model/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt:-1}); // newest to oldest
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getAllNotes controller", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note Not Found!" });

    res.status(200).json(note);
  } catch {
    console.log("Error in getNoteById controller", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createAllNotes(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const saveNote = await note.save();
    res.status(201).json(saveNote);
  } catch (error) {
    console.log("Error in createAllNotes controller", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateAllNotes(req, res) {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note Not Found!" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log("Error in updateAllNotes controller", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteAllNotes(req, res) {
  try {
    const { title, content } = req.body;

    const deletedNote = await Note.findByIdAndDelete(
      req.params.id,
      { title, content },
      { new: true },
    );
    if (!deletedNote)
      return res.status(404).json({ message: "Note Not Found!" });

    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    console.log("Error in deleteAllNotes controller", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
}
