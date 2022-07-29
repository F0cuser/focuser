const proxyPort = "19090";
const urls = [
    'key-hub.eu',
    'youtube.com',
    'discord.com'
];

function FindProxyForURL(url, host) {
    for (const url of urls) {
        if (dnsDomainIs(host, url)) {
            return `PROXY 127.0.0.1:${proxyPort}; DIRECT`;
        }
    }
    return 'DIRECT'
}
