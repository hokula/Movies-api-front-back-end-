var mysql = require('mysql');
var cors = require('cors');

const CON = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'sakila'
});
var app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    console.log(req.query);
    res.send('Hello from Node');
});
app.get('/movies/all', (req, res) => {
    const FILMID = req.query.id;
    const QUERY = `SELECT * FROM FILM ${FILMID ? 'WHERE film_id = ?' : ''} order by title limit 50`;
    CON.query(QUERY, [FILMID], (err, result, fields) => {
        if (err) res.status(500).send(err);
        res.status(200).json(result);
    })
});
app.get('/movies/search/:title', (req, res) => {
    const TITLE = req.params.title;
    const QUERY = `SELECT * FROM FILM WHERE upper(title) LIKE '%${TITLE.toUpperCase()}%'`;
    CON.query(QUERY, [TITLE], (err, result, fields) => {
        if (err) res.status(500).send(err);
        res.status(200).json(result);
    })
});

app.post('/movie', (req, res) => {
    console.log(req.body);
    const { title, rating, length, description } = req.body;
    const QUERY = `INSERT INTO FILM (title, language_id, rating, length, description) values (?,?, ?, ?, ?)`;
    CON.query(QUERY, [title, 1, rating, length, description], (err, result, fields) => {
        if (err) res.status(500).send(err);
        res.status(200).json({
            message: 'Uspješno spremljen film',
            id: result.insertId
        });
    })
});

app.delete('/movie/:id', (req, res) => {
    const ID = req.params.id;
    const QUERY = `DELETE from FILM where film_id = ?`;
    CON.query(QUERY, [ID], (err, result) => {
        if (err) res.status(500).send(err);
        res.status(200).json({message:'Uspješno obrisan film'});
    });
})
app.put('/movie', (req, res) => {
    const {film_id,title, rating, length, description} = req.body;
    const QUERY = `UPDATE FILM SET title=?, rating=?, length=?, description= ? where
     film_id=?`;
    CON.query(QUERY, [title, rating, length, description, film_id], (err, result, fields) => {
        if (err) res.status(500).send(err);
        res.status(200).json({
            message: 'Uspješno izmijenjen film',
        });
    })
})

CON.connect((err) => {
    if (err) throw err;
    console.log('Uspjesno konektovan');
})

app.listen(PORT, () => {
    console.log(`Movies app started on port: ${PORT}`);
});
