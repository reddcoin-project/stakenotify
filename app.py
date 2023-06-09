from flask import Flask, render_template, request
from flask_socketio import SocketIO
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'reddoshi!'
socketio = SocketIO(app, cors_allowed_origins='*')

"""
Get current date time
"""


def get_current_datetime():
    now = datetime.now()
    return now.strftime("%m/%d/%Y %H:%M:%S")


@app.route('/')
def index():  # site root
    return render_template('index.html')


@app.route('/stakenotify/<txid>/<blockhash>/<int:height>/<walletname>')
def stakenotify(txid="", blockhash="", height=-1, walletname=""):  # receive stake notify
    socketio.emit('updateStake', {'date': get_current_datetime(), 'wallet': str(walletname), 'txid': str(txid), 'blockhash': str(blockhash), 'height': height})
    return str(txid)

@app.route('/walletnotify/<txid>/<blockhash>/<int:height>/<walletname>')
def walletnotify(txid="", blockhash="", height=-1, walletname=""):  # receive walletnotify notify
    socketio.emit('updateWallet', {'date': get_current_datetime(), 'wallet': str(walletname), 'txid': str(txid), 'blockhash': str(blockhash), 'height': height})
    return str(txid)


@app.route('/alertnotify/<alertmsg>')
def alertnotify(alertmsg=""):  # receive alert notify
    socketio.emit('updateAlert', {'date': get_current_datetime(), 'alertmsg': str(alertmsg)})
    return str(alertmsg)


@app.route('/blocknotify/<blockhash>')
def blocknotify(blockhash=""):  # receive block notify
    socketio.emit('updateBlock', {'date': get_current_datetime(), 'blockhash': str(blockhash)})
    return str(blockhash)

"""
Decorator for connect
"""


@socketio.on('connect')
def connect():
    print('Client connected')


"""
Decorator for disconnect
"""


@socketio.on('disconnect')
def disconnect():
    print('Client disconnected', request.sid)


if __name__ == '__main__':
    socketio.run(app)
