import eventlet
import socketio

sio = socketio.Server()
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ):
    print('connect ', sid)
    sio.emit('new-message', {'data': 'foobar'})

@sio.event
def my_message(sid, data):
    print('message ', data)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

@sio.on('new-message')
def bleh(sid, data):
    print('new-message', data)
    sio.emit('new-message', {'data': 'foobar'}, room=sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)