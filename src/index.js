import { app } from './app';
import { set , connect } from 'mongoose';
import {} from 'dotenv/config';

const port = process.env.PORT || 3000;
const db = process.env.DB_URL;
set('strictQuery',false);

app.listen(port, err => {
    if(err) return console.log(`Servidor no inicializado ${err}`)

    connect(db)
    console.log(`Servidor a la escucha por el puerto ${port}`);
})