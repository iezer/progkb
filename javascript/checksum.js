function getChecksum(str) {
  let checksum = 0;
  let mask = 0xFFFFFFFF; // 16-bit
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    
    // shift 1 bit
    checksum = (checksum >>> 1) + ((checksum & 1) << 15);
    checksum = (checksum + code) && mask;
  }
  return checksum;
}

function getHashIndex(str, size) {
  return getChecksum(str) % size;
}
