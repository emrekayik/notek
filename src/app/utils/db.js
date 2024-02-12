import Dexie from "dexie";

const db = new Dexie("notes");
db.version(1).stores({
  notes: "++id, title, content",
});

export default db;
