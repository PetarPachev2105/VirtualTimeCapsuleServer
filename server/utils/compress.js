const pako = require('pako');
const { Buffer } = require('buffer');

exports.compress = function (data) {
    const compressed = pako.gzip(JSON.stringify(data));

    // Convert the compressed data to a Base64 string (for sending as text)
    return Buffer.from(compressed).toString('base64');
}

exports.decompress = function (bufferData) {
    console.log('bufferData received:', bufferData);

    // Check if bufferData is a Buffer and has content
    if (!Buffer.isBuffer(bufferData) || bufferData.length === 0) {
        console.error('Invalid or empty bufferData');
        return; // or handle the error as needed
    }


    // Convert the data array to a Buffer
    const buffer = Buffer.from(bufferData.data);

    // If the data is Base64 encoded, decode it
    const decodedData = buffer.toString('base64');

    // Now check if it's gzipped and decompress if necessary
    try {
        const decompressedData = pako.inflate(Buffer.from(decodedData, 'base64'), { to: 'string' });
        console.log('Decompressed Data:', decompressedData);
        return JSON.parse(decompressedData);
    } catch (err) {
        console.error('Decompression failed:', err);
        // Handle non-gzip data or errors
    }
}