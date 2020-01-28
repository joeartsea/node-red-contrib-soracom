node-red-contrib-soracom
========================

[**Japanese**](./README_ja.md)

A collection of <a href="http://nodered.org" target="_new">Node-RED</a> nodes for <a href="https://soracom.jp/" target="_new">SORACOM</a>.

[![NPM](https://nodei.co/npm/node-red-contrib-soracom.png?downloads=true)](https://nodei.co/npm/node-red-contrib-soracom/)

Pre-requisites
-------

The node-red-contrib-soracom requires <a href="http://nodered.org" target="_new">Node-RED</a> to be installed.

Install
-------

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-soracom

Restart your Node-RED instance, the soracom node appears in the palette and ready for use.


Overview
-------

node-red-contrib-soracom performs the following processing.

- **Group List** - Get a list of groups.

- **Group Subscribers** - Get a list of subscribers that belong to the specified group by group ID.

- **Air State** - Get Air usage report for the Subscriber specified by IMSI.

- **Beam State** - Get the Soracom Beam usage report for the subscriber specified by the IMSI.

- **Update Speed Class** - Update the speed class for the subscriber specified by the IMSI.

- **Activate** - Activates status for subscriber specified by the IMSI.

- **Deactivate** - Deactivates subscriber specified by the IMSI.


Acknowledgements
----------------

The node-red-contrib-soracom uses the following open source software:

- [soracom](https://github.com/tatsuyaoiw/soracom): SORACOM API client for Node.js.

License
-------

See [license](https://github.com/joeartsea/node-red-contrib-soracom/blob/master/LICENSE) (Apache License Version 2.0).

Contributing
-------

Both submitting issues to [GitHub issues](https://github.com/joeartsea/node-red-contrib-soracom/issues) and Pull requests are welcome to contribute.


Developers
-------

If the developer wants to modify the source of node-red-contrib-soracom, run the following code to create a clone.

```
cd ~\.node-red\node_modules
git clone https://github.com/joeartsea/node-red-contrib-soracom.git
cd node-red-contrib-soracom
npm install
```
