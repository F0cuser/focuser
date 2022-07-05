import socket
import ssl
import threading
import certcreator
import logging


logging.basicConfig(filename='focuser_webserver.log', encoding='utf-8', level=logging.DEBUG)


LISTENER_PORT = 19090
BUFFER_SIZE = 4096


def handle(conn: socket.socket):
    request = conn.recv(BUFFER_SIZE)
    print(request)
    method = request.decode('utf-8').split(' ')[0]
    host = request.decode('utf-8').split(' ')[1].split(':')[0]
    if method == 'CONNECT':
        handle_https(conn, host)
    else:
        handle_http(conn)
    logging.info("Proxied")


def handle_https(conn: socket.socket, host: str):
    conn.sendall('HTTP/1.1 200 Connection Established\r\n\r\n'.encode('utf-8'))
    certfile, keyfile = certcreator.get_certpair_for_host(host)
    conn_s = ssl.wrap_socket(conn, keyfile = keyfile, certfile = certfile, server_side = True, do_handshake_on_connect = False)
    conn_s.do_handshake()
    conn_s.recv(BUFFER_SIZE)
    conn_s.sendall('HTTP/1.1 200 OK\r\n\r\n<h1>BLOCKED</h1>'.encode('utf-8'))
    conn_s.close() 

def handle_http(conn: socket.socket):
    conn.send('HTTP/1.1 200 OK\r\n\r\n<h1>BLOCKED</h1>'.encode('utf-8'))
    conn.close()

def main():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind(('127.0.0.1', LISTENER_PORT))
    sock.listen()
    print(f"LISTENING ON {LISTENER_PORT}")
    while True:
        conn, _ = sock.accept()
        logging.info(f"Got a connection from the user")
        thread = threading.Thread(target=handle, args=(conn,))
        thread.start()
        thread.join()

main()