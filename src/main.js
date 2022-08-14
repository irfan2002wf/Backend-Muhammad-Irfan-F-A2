import express from "express";
import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

const app = express();

app.use(express.json());

const port = 7000;

// ngegate data
app.get("/music", async (req, res) => {
    try {
        const music = await database.lagu.findMany();
        if (!music) throw new Error("music not fount ");
        res.send(music);
        } catch (err) {
                        res.send({ status: 404, message: err.message });
                        }
});

// ngegate data berdasarkan id
app.get("/music/:id", async (req, res) => {
    try {
        const music = await database.lagu.findUnique({
            where: {
                id: parseInt(req.params.id),
                },
            });
        if (!music) throw new Error("music not fount");
            res.send(music);
        } catch (err) {
            res.send({ status: 404, message: err.message });
            }
});

// ngepost data
app.post("/music/create", async (req, res) => {
    try {
        const music = await database.lagu.create({
            data: {
            judul : req.body.judul,
            artis : req.body.artis,
            album : req.body.album,
            date  : req.body.date,
            },
        });
    res.send({ message: "completed add music", data: music });
    } catch (err) {}
});

// ngedit data
app.put("/music/update", async (req, res) => {
    try {
        const music = await database.lagu.update({
        where: {
            id: req.body.id,
        },
        data: {
            judul : req.body.judul,
            artis : req.body.artis,
            album : req.body.album,
            date  : req.body.date,
            },
        });
    res.send({ message: "music Berhasil di update", data: music });
    } catch (err) {}
});

// hapus data
app.delete("/music/delete", async (req, res) => {
    await database.lagu.delete({
        where: {
            id: req.body.id,
        },
    });
    res.send({ message: "music Berhasil di hapus" });
});


app.listen(port, () => {
    console.log(`Server Berjalan di port ${port}`);
    });