"use client";

import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

import { toPng } from "html-to-image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import db from "@/app/utils/db";
import { DeleteIcon, DownloadIcon } from "@/app/utils/icons";

export default function NotePage() {
  const { id } = useParams();
  const [note, setNote] = useState({});

  const elementRef = useRef(null);

  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-note.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <div className="card bg-base-100 shadow-xl" ref={elementRef}>
          <div className="card-body">
            <h1 className="card-title">{note.title}</h1>
            <p>{note.content}</p>
            <div className="card-actions">
              <strong>
                {note.createDate}
                {note.updateDate ? " - " + note.updateDate : ""}
              </strong>
            </div>
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            className="btn btn-outline btn-error text-error"
            type="button"
            onClick={() => deleteNote()}
          >
            <DeleteIcon />
          </button>
          <button className="btn btn-primary" onClick={htmlToImageConvert}>
            <DownloadIcon />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
