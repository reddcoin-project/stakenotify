# Web Notify

A simple web example to display the notification messages from reddcoin core wallet.  
The website is built on python, flask and websockets to provide a dynamic update and display of parameters.  

The following configuration parameters are used:

``` shell
-stakenotify
-blocknotify
-walletnotify
-alertnotify
```


## Stakenotify

```shell
-stakenotify=<cmd>
```

the following parameters are available to be included in the command

%s in cmd is replaced by TxID,  
%w is replaced by wallet name,  
%b is replaced by the hash of the block including the transaction (set to 'unconfirmed' if the transaction is not included),  
%h is replaced by the block height (-1 if not included).  
%w is not currently implemented on windows. On systems where %w is supported, it should NOT be quoted because this would break shell escaping used to invoke the command.

Example: Add the following line to reddcoin.conf
```shell
stakenotify=curl http://127.0.0.1:5000/stakenotify/%s/%b/%h/%w
```

## Blocknotify

```shell
-blocknotify=<cmd>
```

the following parameters are available to be included in the command

%s in cmd is replaced by blockhash,  

Example: Add the following line to reddcoin.conf
```shell
blocknotify=curl http://127.0.0.1:5000/blocknotify/%s
```

## Walletnotify

```shell
-walletnotify=<cmd>
```

the following parameters are available to be included in the command

%s in cmd is replaced by TxID,  
%w is replaced by wallet name,  
%b is replaced by the hash of the block including the transaction (set to 'unconfirmed' if the transaction is not included),  
%h is replaced by the block height (-1 if not included).  
%w is not currently implemented on windows. On systems where %w is supported, it should NOT be quoted because this would break shell escaping used to invoke the command.

Example: Add the following line to reddcoin.conf
```shell
walletnotify=curl http://127.0.0.1:5000/walletnotify/%s/%b/%h/%w
```

## Alertnotify

```shell
-alertnotify=<cmd>
```

the following parameters are available to be included in the command

%s in cmd is replaced by message,  

Example: Add the following line to reddcoin.conf
```shell
alertnotify=curl http://127.0.0.1:5000/alertnotify/%s
```

## Installation

- Clone the repository
- Create a virtual environment

```python
python3 -m venv venv
source venv/bin/activate
```

Install the project requirements.txt

```python
python3 -m pip install -r requirements.txt
```

## Run

Run the project:

```python
python3 ./app.py
```
Feel free to offer suggestions/ improvements