const express = require('express')
const app = express();
const users = require('./users.js')

const getUsersSpecialty = (specialty) => {
  return users.filter(user => user.specialty === specialty)  
}

/* FUNCION PARA NO TENER QUE COPIAR EL PARRAFO DE HTML EN CADA APP.GET(SPECIALTY) */

const template = (specialty) =>{
  const userSpecialty = getUsersSpecialty(specialty)
  const template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${specialty}</title>
  </head>
  <body>
  <h1>${specialty}</h1>
  <p>Número total: ${userSpecialty.length}</p>
  <ul>
  ${userSpecialty.map(user => `<li>${user.name} | ${user.age}</li>`).join(' ')}
  </ul>
  <a href="/">Home</a><a href="/marketing"> Marketing</a> <a href="/developers"> Developers</a> <a href="/ventas"> Ventas</a>
  </body>
  </html>`

  return template
}


app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
      <h1>Bienvenido a la home</h1><a href="/marketing">Marketing</a> <a href="/developers"> Developers</a> <a href="/ventas"> Ventas</a>
      </body>
      </html>`
    );
  });
  
app.get('/marketing', (req, res) => {
  const specialty = 'marketing'
  res.send(template(specialty))
  
});

app.get('/developers', (req, res) => {
  const specialty = 'developers'
  res.send(template(specialty))
});

app.get('/ventas', (req, res) => {
  const specialty = 'ventas'
  res.send(template(specialty))
});

app.use((req, res) => {
  res.status(404).send('<h1>Page not found</h1><a href="/">Home</a>');
});

app.listen(3000, () => {
  console.log('Node.js está escuchando en el puerto 3000');
});