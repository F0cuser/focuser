import socket
import ssl
import threading
import certcreator
import sys
from utils import get_filepath

if len(sys.argv) < 2:
    print("USAGE: python webserver.py <LISTENER PORT>")
    sys.exit(1)
LISTENER_PORT = int(sys.argv[1])
BUFFER_SIZE = 4096


def handle(conn: socket.socket):
    request = conn.recv(BUFFER_SIZE)
    method = request.decode('utf-8').split(' ')[0]
    if method == 'CONNECT':
        host = request.decode('utf-8').split(' ')[1].split(':')[0]
    else:
        host = request.decode('utf-8').split(' ')[1].split('://')[1]
    webpage = load_webpage(get_filepath('block.html'), host)
    if method == 'CONNECT':
        handle_https(conn, host, webpage)
    else:
        handle_http(conn, webpage)
    print("Proxied", host)


def handle_https(conn: socket.socket, host: str, webpage: str):
    conn.sendall('HTTP/1.1 200 Connection Established\r\n\r\n'.encode('utf-8'))
    certfile, keyfile = certcreator.get_certpair_for_host(host)
    conn_s = ssl.wrap_socket(conn, keyfile = keyfile, certfile = certfile, server_side = True, do_handshake_on_connect = False)
    conn_s.do_handshake()
    conn_s.recv(BUFFER_SIZE)
    conn_s.sendall(f'HTTP/1.1 200 OK\r\n\r\n{webpage}'.encode('utf-8'))
    conn_s.close() 

def handle_http(conn: socket.socket, webpage: str):
    conn.send(f'HTTP/1.1 200 OK\r\n\r\n{webpage}'.encode('utf-8'))
    conn.close()



def load_webpage(webpage_path: str, hostname: str) -> str:
    """
    Load a website template and inject the hostname into it

    Args:
        webpage_path (str): Absolute path to the webpage.
        hostname (str): Hostname to inject

    Returns:
        str: HTML of the template
    """
    with open(webpage_path, 'r') as webpage:
        webpage_data = webpage.read()
        return webpage_data.replace('{{%webpage%}}', hostname)


def main():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind(('127.0.0.1', LISTENER_PORT))
    sock.listen()
    print(f"LISTENING ON {LISTENER_PORT}")
    while True:
        conn, _ = sock.accept()
        print(f"Got a connection from the user")
        thread = threading.Thread(target=handle, args=(conn,))
        thread.start()
        thread.join()

main()