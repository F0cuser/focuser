function FindProxyForURL(url, host) {
    if (dnsDomainIs(host, 'key-hub.eu')) {
        return 'PROXY 127.0.0.1:19090; DIRECT';
    } else {
        return 'DIRECT';
    }
}
