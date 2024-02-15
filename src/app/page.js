"use client";

import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

import Link from "next/link";
import { useEffect, useState } from "react";

import db from "@/app/utils/db";
import { DeleteIcon, NoteIcon, RedoIcon } from "@/app/utils/icons";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    createDate: "",
    updateDate: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Tarih seçenekleri day.month.year clock(14.02.2024 14:30)
  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  useEffect(() => {
    // Tüm notları veritabanından al
    db.notes.toArray().then((result) => setNotes(result));
  }, []);

  const generateRandomNote = async () => {
    const randomNote = {
      title: "Lorem Ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec ex nec odio tincidunt auctor. Nam auctor, odio nec tincidunt varius, libero libero varius nunc, nec tincidunt odio odio nec odio. Nullam",
      createDate: new Date().toLocaleDateString(undefined, dateOptions),
    };
    await db.notes.add(randomNote);

    const updatedNotes = await db.notes.toArray();
    setNotes(updatedNotes);
  };
  const handleResetNotes = async () => {
    // Tüm notları veritabanından sil
    await db.notes.clear();
    // Notları güncelle (boş array ile)
    setNotes([]);
  };

  const handleSaveNote = async (id, title, content) => {
    const updateDate = new Date().toLocaleDateString(undefined, dateOptions);
    // Notu veritabanında güncelle
    await db.notes.update(id, { title, content, updateDate });
    // Notları güncelle
    const updatedNotes = await db.notes.toArray();
    setNotes(updatedNotes);
  };

  const handleAddNote = async () => {
    if (newNote.title.trim() !== "" && newNote.content.trim() !== "") {
      const createDate = new Date().toLocaleDateString(undefined, dateOptions);

      // Yeni notu veritabanına ekle
      await db.notes.add({
        ...newNote,
        createDate,
      });
      // Notları güncelle
      const updatedNotes = await db.notes.toArray();
      setNotes(updatedNotes);
      // Yeni not girişini temizle
      setNewNote({ title: "", content: "" });
    }
  };

  const deleteNote = async (id) => {
    await db.notes.delete(id);
    const updatedNotes = await db.notes.toArray();
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter((note) => {
    const searchText = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(searchText) ||
      note.content.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className={"min-h-screen"}>
      <Header searchTerm={searchTerm} onSearchTermChange={setSearchTerm}>
        <button className="btn btn-warning" onClick={generateRandomNote}>
          Lorem Not Oluştur
        </button>
        <button className="btn btn-error" onClick={handleResetNotes}>
          Notları Sıfırla
        </button>
      </Header>
      <div className="container mx-auto mb-12 px-12 py-4">
        <button
          className="btn btn-primary mb-4"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <NoteIcon />
        </button>

        <div className="bg-base-100">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {filteredNotes.map((note) => (
              <li
                key={note.id}
                className="space-y-6 rounded-md bg-base-200 px-8 py-4"
              >
                <strong
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    handleSaveNote(note.id, e.target.innerText, note.content)
                  }
                >
                  {note.title}
                </strong>

                <p
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    handleSaveNote(note.id, note.title, e.target.innerText)
                  }
                >
                  {note.content}
                </p>
                <div className="flex items-center justify-end">
                  <strong className="flex-1">
                    {note.createDate}
                    {note.updateDate ? " - " + note.updateDate : ""}
                  </strong>
                  <div className="space-x-2">
                    <Link href={`/note/${note.id}`} className="btn btn-info">
                      <RedoIcon />
                    </Link>
                    <button
                      className="btn btn-outline btn-error text-error"
                      type="button"
                      onClick={() => deleteNote(note.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {showModal ? (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
              <div className="relative mx-auto my-6 w-auto max-w-3xl">
                {/*content*/}
                <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                  {/*header*/}
                  <div className="border-blueGray-200 flex items-center justify-between rounded-t border-b border-solid p-5">
                    <h3 className="text-xl font-semibold">Not Al</h3>
                  </div>
                  {/*body*/}
                  <div className="w-full">
                    <div className="card-body">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Başlık</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Başlık"
                          value={newNote.title}
                          onChange={(e) =>
                            setNewNote({ ...newNote, title: e.target.value })
                          }
                          className="input input-bordered w-full max-w-xs"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">İçerik</span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered"
                          placeholder="Notunuz"
                          value={newNote.content}
                          onChange={(e) =>
                            setNewNote({ ...newNote, content: e.target.value })
                          }
                        ></textarea>
                      </div>
                      <div className="form-control mt-6 gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={handleAddNote}
                        >
                          Not Ekle
                        </button>
                        <button
                          className="btn btn-outline btn-error"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Kapat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        ) : null}
      </div>
      <Footer />
    </main>
  );
}
