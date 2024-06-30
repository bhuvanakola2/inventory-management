app.get('/products', (req, res) => {
  db.all(`SELECT * FROM products`, [], (err, rows) => {
    if (err) {
      res.status(500).send('Error retrieving products');
    } else {
      const builder = new xml2js.Builder();
      const xml = builder.buildObject({ products: rows });
      res.type('application/xml').send(xml);
    }
  });
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
