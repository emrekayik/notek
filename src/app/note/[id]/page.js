"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import db from "@/app/utils/db";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { DeleteIcon } from "@/app/utils/icons";

export default function NotePage() {
  const { id } = useParams();
  const [note, setNote] = useState({});

  useEffect(() => {
    if (id) {
      // Notun detaylarını veritabanından al
      db.notes.get(Number(id)).then((result) => setNote(result));
    }
  }, [id]);

  if (!note) {
    return <div>Loading...</div>;
  }

  const deleteNote = async () => {
    // Notu veritabanından sil
    await db.notes.delete(Number(id));
    // Notun detaylarını güncelle (boş obje ile)
    setNote({});
    // Not sayfasına git
    window.location.href = "/";
  };

  return (
    <>
      <Header search={false} />
      <div className="container mx-auto flex h-screen flex-col items-center justify-center px-12 py-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title">{note.title}</h1>
            <p>{note.content}</p>
            <div className="card-actions">
              <strong>
                {note.createDate}
                {note.updateDate ? " - " + note.updateDate : ""}
              </strong>
            </div>
            <div className="flex justify-end">
              <button
                className="btn btn-outline btn-error text-error"
                type="button"
                onClick={() => deleteNote()}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
