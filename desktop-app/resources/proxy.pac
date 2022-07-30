const blockedUrls = ${urls};

function FindProxyForURL(url, host) {
    for (const blockedUrl of blockedUrls) {
        if (dnsDomainIs(host, blockedUrl)) {
            return `PROXY 127.0.0.1:${proxyPort}; DIRECT`;
        }
    }
    return 'DIRECT'
}
