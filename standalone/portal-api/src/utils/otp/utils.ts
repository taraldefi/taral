function quintetCount(buff: Buffer): number {
    const quintets = Math.floor(buff.length / 5);
    return buff.length % 5 === 0 ? quintets : quintets + 1;
}
  