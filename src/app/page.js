"use client";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import db from "@/app/utils/db";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Tüm notları veritabanından al
    db.notes.toArray().then((result) => setNotes(result));
  }, []);

  const handleAddNote = async () => {
    // Yeni notu veritabanına ekle
    await db.notes.add(newNote);
    // Notları güncelle
    const updatedNotes = await db.notes.toArray();
    setNotes(updatedNotes);
    // Yeni not girişini temizle
    setNewNote({ title: "", content: "" });
  };

  const handleResetNotes = async () => {
    // Tüm notları veritabanından sil
    await db.notes.clear();
    // Notları güncelle (boş array ile)
    setNotes([]);
  };

  return (
    <main className={"min-h-screen"}>
      <Header title={"notek"} click={() => setShowModal(true)}>
        <button className="btn btn-error" onClick={handleResetNotes}>
          Notları Sıfırla
        </button>
      </Header>
      <div className="container mx-auto px-12 py-4">
        <button
          className="btn btn-primary mb-4"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Not Ekle
        </button>
        <div className="bg-base-200">
          <ul className="">
            {notes.map((note) => (
              <li key={note.id}>
                <strong>{note.title}</strong>
                <p>{note.content}</p>
              </li>
            ))}
          </ul>
        </div>

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-xl font-semibold">Not Al</h3>
                    <button className="btn" onClick={() => setShowModal(false)}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
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
                          required
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">İçerik</span>
                        </label>
                        <textarea
                          className="textarea textarea-primary"
                          placeholder="Notunuz"
                          value={newNote.content}
                          onChange={(e) =>
                            setNewNote({ ...newNote, content: e.target.value })
                          }
                        ></textarea>
                      </div>
                      <div className="form-control gap-2 mt-6">
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
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
      <footer className="fixed bottom-0 footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>StudioEK 2024</p>
        </aside>
      </footer>
    </main>
  );
}
