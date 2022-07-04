function FindProxyForURL(url, host) {
    if (dnsDomainIs(host, 'key-hub.eu')) {
        if (url.startsWith('https:')) {
            return 'PROXY 127.0.0.1:9090; DIRECT';
        }
        return 'DIRECT';
    } else {
        return 'DIRECT';
    }
}
