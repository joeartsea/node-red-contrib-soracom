/**
 * Copyright 2015 Atsushi Kojo.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function (RED) {
  'use strict';
  var Soracom = require('soracom');

  function SoracomNode (n) {
    RED.nodes.createNode(this, n);
  }

  RED.nodes.registerType('soracom', SoracomNode, {
    credentials: {
      email: { type: 'text' },
      password: { type: 'password' }
    }
  });

  function SoracomInNode (n) {
    RED.nodes.createNode(this, n);
    this.soracom = n.soracom;
    this.imsi = n.imsi;
    this.operation = n.operation;
    this.speedClass = n.speedClass || 's1.minimum';
    this.recentXminutes = n.minutes || 5;
    this.period = n.period || 'month';
    this.soracomConfig = RED.nodes.getNode(this.soracom);
    if (this.soracomConfig) {
      var node = this;
      var credentials = RED.nodes.getCredentials(this.soracom);
      this.on('input', function (msg) {
        node.sendMsg = function (err, res) {
          if (err) {
            node.error(err.toString());
            node.status({ fill: 'red', shape: 'ring', text: 'failed' });
          } else {
            node.status({});
          }
          msg.payload = res.body;
          node.send(msg);
        };
        var soracom = new Soracom({
          email: credentials.email,
          password: credentials.password
        });
        soracom.post('/auth', function (err, res, auth) {
          if (err) {
            node.error(err.toString());
            node.status({ fill: 'red', shape: 'ring', text: 'failed' });
          }
          soracom.defaults(auth);
          var nowDate = Math.floor(new Date().getTime() / 1000);
          var recentDate = nowDate - (node.recentXminutes * 60);
          switch (node.operation) {
            case 'airStats':
              soracom.get('/stats/air/subscribers/:imsi', {
                imsi: node.imsi,
                from: recentDate,
                to: nowDate,
                period: node.period
              }, node.sendMsg);
              break;
            case 'beamStats':
              soracom.get('/stats/beam/subscribers/:imsi', {
                imsi: node.imsi,
                from: recentDate,
                to: nowDate,
                period: node.period
              }, node.sendMsg);
              break;
            case 'updateSpeedClass':
              soracom.post('/subscribers/:imsi/update_speed_class', {
                imsi: node.imsi,
                speedClass: node.speedClass
              }, node.sendMsg);
              break;
            case 'activate':
              soracom.post('/subscribers/:imsi/activate', {
                imsi: node.imsi
              }, node.sendMsg);
              break;
            case 'deactivate':
              soracom.post('/subscribers/:imsi/deactivate', {
                imsi: node.imsi
              }, node.sendMsg);
              break;
          }
        });
      });
    } else {
      this.error('missing soracom configuration');
    }
  }

  RED.nodes.registerType('soracom in', SoracomInNode);
}