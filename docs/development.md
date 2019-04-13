# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop myntcore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/myntcore-node.git
git clone git@github.com:<yourusername>/myntcore-lib.git
```

To develop mynt or to compile from source:

```bash
git clone git@github.com:<yourusername>/mynt.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See mynt documentation for building mynt on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd myntcore-lib
npm install
cd ../myntcore-node
npm install
```
**Note**: If you get a message about not being able to download mynt distribution, you'll need to compile myntd from source, and setup your configuration to use that version.


We now will setup symlinks in `myntcore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf myntcore-lib
ln -s ~/myntcore-lib
rm -rf myntd-rpc
ln -s ~/myntd-rpc
```

And if you're compiling or developing mynt:
```bash
cd ../bin
ln -sf ~/mynt/src/myntd
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd myntcore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/myntd.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/myntd.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch myntcore-node.json
touch package.json
```

Edit `myntcore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "myntd",
    "web",
    "insight-api-mynt",
    "insight-ui-mynt",
    "<additional_service>"
  ],
  "servicesConfig": {
    "myntd": {
      "spawn": {
        "datadir": "/home/<youruser>/.myntd",
        "exec": "/home/<youruser>/mynt/src/myntd"
      }
    }
  }
}
```

**Note**: To install services [insight-api-mynt](https://github.com/silence48/insight-api-mynt) and [insight-ui-mynt](https://github.com/silence48/insight-ui-mynt) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/myntcore-lib
ln -s ~/myntcore-node
ln -s ~/insight-api-mynt
ln -s ~/insight-ui-mynt
```

Make sure that the `<datadir>/mynt.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=mynt
rpcpassword=local321
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../myntcore-node/bin/myntcore-node start
```
