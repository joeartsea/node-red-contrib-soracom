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
    this.targetId = n.targetId;
    this.operation = n.operation;
    this.speedClass = n.speedClass;
    this.recentXminutes = n.minutes;
    this.period = n.period || 'month';
    this.soracomConfig = RED.nodes.getNode(this.soracom);
    if (this.soracomConfig) {
      var node = this;
      var credentials = RED.nodes.getCredentials(this.soracom);
      this.on('input', function (msg) {
        var targetId = msg.targetId || node.targetId;
        var speedClass = msg.speedClass || node.speedClass || 's1.minimum';
        var recentXminutes = msg.recentXminutes || node.recentXminutes || 5;
        node.sendMsg = function (err, res, body) {
          if (err) {
            node.error(err.toString());
            node.status({ fill: 'red', shape: 'ring', text: 'failed' });
          } else {
            node.status({});
          }
          msg.payload = body;
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
          var recentDate = nowDate - (recentXminutes * 60);
          switch (node.operation) {
            case 'groups':
              soracom.get('/groups', node.sendMsg);
              break;
            case 'subscribers':
              soracom.get('/groups/:groupId/subscribers', {
                groupId: targetId
              }, node.sendMsg);
              break;
            case 'airStats':
              soracom.get('/stats/air/subscribers/:imsi', {
                imsi: targetId,
                from: recentDate,
                to: nowDate,
                period: node.period
              }, node.sendMsg);
              break;
            case 'beamStats':
              soracom.get('/stats/beam/subscribers/:imsi', {
                imsi: targetId,
                from: recentDate,
                to: nowDate,
                period: node.period
              }, node.sendMsg);
              break;
            case 'updateSpeedClass':
              soracom.post('/subscribers/:imsi/update_speed_class', {
                imsi: targetId,
                speedClass: speedClass
              }, node.sendMsg);
              break;
            case 'activate':
              soracom.post('/subscribers/:imsi/activate', {
                imsi: targetId
              }, node.sendMsg);
              break;
            case 'deactivate':
              soracom.post('/subscribers/:imsi/deactivate', {
                imsi: targetId
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