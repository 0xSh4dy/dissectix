from hashlib import sha256

def getSha256Hash(data):
    return sha256(data.encode()).hexdigest()
