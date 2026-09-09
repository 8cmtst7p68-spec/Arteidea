import fs from "node:fs";

const [input, output] = process.argv.slice(2);
if (!input || !output) throw new Error("Usage: node strip-jpeg-metadata.mjs input output");
const data = fs.readFileSync(input);
if (data[0] !== 0xff || data[1] !== 0xd8) throw new Error("Not a JPEG");
const chunks = [data.subarray(0, 2)];
let offset = 2;
while (offset < data.length) {
  if (data[offset] !== 0xff) { chunks.push(data.subarray(offset)); break; }
  const marker = data[offset + 1];
  if (marker === 0xda) { chunks.push(data.subarray(offset)); break; }
  if (marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
    chunks.push(data.subarray(offset, offset + 2)); offset += 2; continue;
  }
  const length = data.readUInt16BE(offset + 2);
  const end = offset + 2 + length;
  const isMetadata = marker === 0xe1 || marker === 0xe2 || marker === 0xed || marker === 0xfe;
  if (!isMetadata) chunks.push(data.subarray(offset, end));
  offset = end;
}
fs.writeFileSync(output, Buffer.concat(chunks));
