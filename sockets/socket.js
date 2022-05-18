const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('The Beatles'));
bands.addBand(new Band('Bee Gees'));
bands.addBand(new Band('kiss'));
bands.addBand(new Band('Maroon 5'));
console.log(bands);
// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands());
  client.on('disconnect', () => {
      console.log('Cliente desconectado')
  });
  client.on('vote-band', (payload) => {
    bands.voteBand(payload.id);
    io.emit('active-bands', bands.getBands());

  });
  client.on('add-band',(payload) => {
    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    io.emit('active-bands', bands.getBands());
  })
  client.on('delete-band', (payload) => {
    bands.deleteBand(payload.id);
    io.emit('active-bands', bands.getBands());

  });
});