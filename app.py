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
