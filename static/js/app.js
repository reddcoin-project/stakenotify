$(document).ready(function () {

    let listElement = document.getElementById('txs');
    let txData = [];
    let blockData = [];
    let alertData = [];

    function addTx(time, height, txid, blockhash) {
        txData.push([time, height, txid, blockhash])
        updateList()
    }

    function popTx() {
        txData.splice(0, 1)
    }

    function updateList() {

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
});