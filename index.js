import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

let teas = [];
let nextId = 1;

app.post('/teas', (req, res) => {
    const {name, price} = req.body;
    const newTea = {id: nextId++, name, price};
    teas.push(newTea);
    res.status(200).send(newTea);
})

app.get('/teas', (req, res) => {
    res.status(200).send(teas);
});

app.get("/teas/:id", (req, res) => {
    const tea = teas.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("404 tea not found");
    }
    return res.status(200).send(tea);
});

app.put('/teas/:id', (req, res) => {
     const tea = teas.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("404 tea not found");
    }
    const {name, price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
});

app.delete("/teas/:id", (req, res) => {
    const index = teas.findIndex(t => t.id === parseInt(req.params.id));
    if (index < 0) {
        return res.status(404).send("404 tea not found");
    }
    teas.splice(index, 1);
    res.status(200).send("Deleted");
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
    
})