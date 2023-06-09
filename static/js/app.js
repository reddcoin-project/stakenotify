$(document).ready(function () {

    let txData = [];
    let blockData = [];
    let alertData = [];
    let walletData = [];

    function addTx(time, height, txid, blockhash) {
        txData.push([time, height, txid, blockhash])
        updateTxList()
    }

    function addAlert(time, message) {
        alertData.push([time, message])
        updateAlertList()
    }

    function addBlock(time, blockhash) {
        blockData.push([time, blockhash])
        updateBlockList()
    }

    function addWallet(time, height, txid, blockhash) {
        walletData.push([time, height, txid, blockhash])
        updateWalletList()
    }

    function popTx() {
        txData.splice(0, 1)
    }

    function popAlert() {
        alertData.splice(0, 1)
    }

    function popBlock() {
        blockData.splice(0, 1)
    }

    function popWallet() {
        walletData.splice(0, 1)
    }

    function updateTxList() {

        let listElement = document.getElementById('txs');
        listElement.innerHTML = "";
        let listItem = document.createElement('li');
        listElement.appendChild(listItem);

        let itemCount = txData.length;
        for (let i = 0; i < itemCount; i++) {

            // Use this if the array elements are text only
            listItem.textContent = "[" + txData[i][0] + "]    (" + txData[i][1] + ")    " + txData[i][2];

            // Add listItem to the listElement
            listElement.appendChild(listItem);

            // Reset the list item
            listItem = document.createElement('li');
        }
    }

    function updateAlertList() {

        let listElement = document.getElementById('alerts');
        listElement.innerHTML = "";
        let listItem = document.createElement('li');
        listElement.appendChild(listItem);

        let itemCount = alertData.length;
        for (let i = 0; i < itemCount; i++) {

            // Use this if the array elements are text only
            listItem.textContent = "[" + alertData[i][0] + "]    " + alertData[i][1];

            // Add listItem to the listElement
            listElement.appendChild(listItem);

            // Reset the list item
            listItem = document.createElement('li');
        }
    }

    function updateBlockList() {

        let listElement = document.getElementById('blocks');
        listElement.innerHTML = "";
        let listItem = document.createElement('li');
        listElement.appendChild(listItem);

        let itemCount = blockData.length;
        for (let i = 0; i < itemCount; i++) {

            // Use this if the array elements are text only
            listItem.textContent = "[" + blockData[i][0] + "]     " + blockData[i][1];

            // Add listItem to the listElement
            listElement.appendChild(listItem);

            // Reset the list item
            listItem = document.createElement('li');
        }
    }

    function updateWalletList() {

        let listElement = document.getElementById('wallet');
        listElement.innerHTML = "";
        let listItem = document.createElement('li');
        listElement.appendChild(listItem);

        let itemCount = walletData.length;
        for (let i = 0; i < itemCount; i++) {

            // Use this if the array elements are text only
            listItem.textContent = "[" + walletData[i][0] + "]    (" + walletData[i][1] + ")    " + walletData[i][2];

            // Add listItem to the listElement
            listElement.appendChild(listItem);

            // Reset the list item
            listItem = document.createElement('li');
        }
    }

    const MAX_DATA_COUNT = 10;
    //connect to the socket server.
    //   var socket = io.connect("http://" + document.domain + ":" + location.port);
    var socket = io.connect();

    //receive details from server
    socket.on("updateStake", function (msg) {
        console.log("Received Stake Data :: " + msg.date + " :: " + msg.txid);

        // Show only MAX_DATA_COUNT data
        if (txData.length >= MAX_DATA_COUNT) {
            popTx();
        }
        addTx(msg.date, msg.height, msg.txid, msg.blockhash);
    });

    socket.on("updateAlert", function (msg) {
        console.log("Received Alert Data :: " + msg.date + " :: " + msg.alertmsg);

        // Show only MAX_DATA_COUNT data
        if (alertData.length >= MAX_DATA_COUNT) {
            popAlert();
        }
        addAlert(msg.date, msg.alertmsg);
    });

    socket.on("updateBlock", function (msg) {
        console.log("Received Block Data :: " + msg.date + " :: " + msg.blockhash);

        // Show only MAX_DATA_COUNT data
        if (blockData.length >= MAX_DATA_COUNT) {
            popBlock();
        }
        addBlock(msg.date, msg.blockhash);
    });

    socket.on("updateWallet", function (msg) {
        console.log("Received Wallet Data :: " + msg.date + " :: " + msg.txid);

        // Show only MAX_DATA_COUNT data
        if (walletData.length >= MAX_DATA_COUNT) {
            popWallet();
        }
        addWallet(msg.date, msg.height, msg.txid, msg.blockhash);
    });
});