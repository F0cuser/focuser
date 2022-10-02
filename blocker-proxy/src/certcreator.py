from typing import Tuple
from OpenSSL.SSL import FILETYPE_PEM
from OpenSSL.crypto import (dump_certificate, X509, PKey, TYPE_RSA,
                            dump_privatekey, load_certificate, load_privatekey, X509Extension)
import tempfile
from utils import get_filepath



def delete_temporary_pair_files(certfile: tempfile._TemporaryFileWrapper, keyfile: tempfile._TemporaryFileWrapper):
    """
    Delete the temporary certificate and key files after proxying.

    Args:
        certfile (tempfile._TemporaryFileWrapper): Cert file object.
        keyfile (tempfile._TemporaryFileWrapper): Key file object.
    """
    certfile.close()
    keyfile.close()


def write_temporary_pair_to_file(cert: X509, key: PKey) -> Tuple[tempfile._TemporaryFileWrapper]:
    """
    Write the generated cert/key pair to temporary files, to use with ssl.SSLContext.

    Args:
        cert (OpenSSL.crypto.X509): Cert data.
        key (OpenSSL.crypto.PKey): Key data.

    Returns:
        tuple(tempfile._TemporaryFileWrapper): Files that can be safely deleted later.

    """
    certfile, keyfile = open(get_filepath('temp.crt'), 'wb'), open(get_filepath('temp.key'), 'wb')
    certfile.write(dump_certificate(FILETYPE_PEM, cert))
    keyfile.write(dump_privatekey(FILETYPE_PEM, key))
    return certfile.name, keyfile.name


def load_ca_pair(certpath: str, keypath: str) -> Tuple[X509, PKey]:
    """
    Load the self-signed CA (focuser) to be used for signing later.

    Args:
        certpath (str): Path to the .crt file.
        keypath (str): Path to the .key file.

    Returns:
        X509: Loaded cert.
        PKey: Loaded key.
    """
    ca_cert = None
    ca_key = None

    with open(certpath) as ca_crt_file:
        ca_cert = load_certificate(FILETYPE_PEM, ca_crt_file.read())

    with open(keypath) as ca_key_file:
        ca_key = load_privatekey(FILETYPE_PEM, ca_key_file.read())

    return ca_cert, ca_key


def get_certpair_for_host(hostname: str) -> Tuple[tempfile._TemporaryFileWrapper, tempfile._TemporaryFileWrapper]:
    """
    Driver function for getting the certificate pair for the connected host.

    Args:
        hostname (str): Hostname that the user has requested (e.g www.google.com)

    Returns:
        tuple(tempfile._TemporaryFileWrapper): Files that can be safely deleted later.
    """
    ca_cert, ca_key = load_ca_pair(get_filepath('focuser.crt'), get_filepath('focuser.key'))

    key = PKey()
    cert = X509()
    key.generate_key(TYPE_RSA, 2048)

    subject = cert.get_subject()
    subject.CN = hostname
    subject.O = 'Focuser'
    subject.OU = 'Proxy Cert'
    subject.L = 'Milky Way'
    subject.ST = 'Solar System'
    subject.C = 'EU'
    subject.emailAddress = 'admin@focuser.you'

    cert.set_version(2)
    cert.set_issuer(ca_cert.get_subject())
    cert.set_subject(subject)
    cert.add_extensions([
        X509Extension(
            b"subjectAltName", False, f"DNS:{hostname}".encode('ascii')
        )
    ])
    cert.set_serial_number(0000000000000000)
    cert.gmtime_adj_notBefore(-3600)
    cert.gmtime_adj_notAfter(3600)
    cert.set_pubkey(key)
    cert.sign(ca_key, 'sha256')

    return write_temporary_pair_to_file(cert, key)


if __name__ == '__main__':
    test_hostname = 'www.google.com'
    print(f"Testing certificate pair generation for {test_hostname}")
    certfile, keyfile = get_certpair_for_host('google.com')
    print(f"[+] Generated certfile: {certfile.name}")
    print(f"[+] Generated keyfile: {keyfile.name}")
