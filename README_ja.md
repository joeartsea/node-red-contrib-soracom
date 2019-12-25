node-red-contrib-soracom
========================

このモジュールは、 <a href="https://soracom.jp/" target="_new">SORACOM</a> の<a href="http://nodered.org" target="_new">Node-RED</a> ノードコレクションです。

[![NPM](https://nodei.co/npm/node-red-contrib-soracom.png?downloads=true)](https://nodei.co/npm/node-red-contrib-soracom/)

前提条件
-------

node-red-contrib-soracomは、<a href="http://nodered.org" target="_new">Node-RED</a>のインストールが必要です。


インストール
-------

Node-REDをインストールしたルートディレクトリで以下のコマンドを実行します。

    npm install node-red-contrib-soracom

Node-REDインスタンスを再起動すると、パレットにsoracomノードが表示されて使用可能になります。

概要
-------

node-red-contrib-soracomは、以下の処理を行います。

- **Group List** - グループの一覧を取得します。

- **Group Subscribers** - グループIDで指定したグループに属するSubscriberの一覧を取得します。

- **Air State** - IMSIで指定したSubscriberの通信量履歴を取得します。

- **Beam State** - IMSIで指定したSubscriberのSoracom Beam利用量履歴を取得します。

- **Update Speed Class** - IMSIで指定したSubscriberの速度クラスを変更します。

- **Activate** - IMSIで指定したSubscriberのステータスを有効化します。

- **Deactivate** - IMSIで指定したSubscriberのステータスを無効化します。


謝辞
-------

node-red-contrib-soracomは、次のオープンソースソフトウェアを使用しています。

- [soracom](https://github.com/tatsuyaoiw/soracom): Node.js用のSORACOM APIクライアント。

ライセンス
-------

こちらを参照してください。 [license](https://github.com/joeartsea/node-red-contrib-soracom/blob/master/LICENSE) (Apache License Version 2.0)

貢献
-------

[GitHub issues](https://github.com/joeartsea/node-red-contrib-soracom/issues)への問題提起、Pull requestsのどちらもあなたの貢献を歓迎します。


開発者
-------

開発者がnode-red-contrib-soracomのソースを改変する場合、以下のコードを実行してクローンを作成します。

```
cd ~\.node-red\node_modules
git clone https://github.com/joeartsea/node-red-contrib-soracom.git
cd node-red-contrib-soracom
npm install
```
