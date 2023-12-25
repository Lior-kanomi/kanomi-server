const express = require('express');
const geoip = require('geoip-lite');

// Middleware to block requests from Israel
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);

  if (geo && geo.country === 'IL') {
    return res.status(403).send('Access denied');
  }

  next();
});

