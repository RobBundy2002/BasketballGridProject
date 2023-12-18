def get_proxies(password):
    proxies = {
    "http": f"http://patrickpw:{password}@pr.oxylabs.io:7777",
    "https": f"http://patrickpw:{password}@pr.oxylabs.io:7777"
    }
    return proxies