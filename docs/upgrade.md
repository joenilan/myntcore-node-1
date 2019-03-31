# Upgrade Notes

## From Myntcore 3.0.0 to 4.0.0

`myntcore-node@2.1.1` to `myntcore-node@3.0.0`

This major upgrade includes changes to indexes, API methods and services. Please review below details before upgrading.

### Indexes

Indexes include *more information* and are now also *faster*. Because of this a **reindex will be necessary** when upgrading as the address and database indexes are now a part of myntd with three new `mynt.conf` options:
- `-addressindex`
- `-timestampindex`
- `-spentindex`

To start reindexing add `reindex=1` during the **first startup only**.

### Configuration Options

- The `mynt.conf` file in will need to be updated to include additional indexes *(see below)*.
- The `datadir` option is now a part of `myntd` spawn configuration, and there is a new option to connect to multiple myntd processes (Please see [Myntoin Service Docs](services/myntd.md) for more details). The services `db` and `address` are now a part of the `myntd` service. Here is how to update `myntcore-node.json` configuration options:

**Before**:
```json
{
  "datadir": "/home/<username>/.mynt",
  "network": "livenet",
  "port": 3001,
  "services": [
    "address",
    "myntd",
    "db",
    "web"
  ]
}
```

**After**:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "myntd",
    "web"
  ],
  "servicesConfig": {
    "myntd": {
      "spawn": {
        "datadir": "/home/<username>/.mynt",
        "exec": "/home/<username>/myntcore-node/bin/myntd"
      }
    }
  }
}
```

It will also be necessary to update `mynt.conf` settings, to include these fields:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:<port>
zmqpubhashblock=tcp://127.0.0.1:<port>
rpcallowip=127.0.0.1
rpcuser=<user>
rpcpassword=<password>
```

**Important**: Once changes have been made you'll also need to add the `reindex=1` option **only for the first startup** to regenerate the indexes. Once this is complete you should be able to remove the `myntcore-node.db` directory with the old indexes.

### API and Service Changes
- Many API methods that were a part of the `db` and `address` services are now a part of the `myntd` service. Please see [Myntoin Service Docs](services/myntd.md) for more details.
- The `db` and `address` services are deprecated, most of the functionality still exists. Any services that were extending indexes with the `db` service, will need to manage chain state itself, or build the indexes within `myntd`.
