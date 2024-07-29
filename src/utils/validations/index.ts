function isValidCPF(cpf: string): boolean {
  const cleanedCPF = cpf.replace(/\D/g, '')
  return /^[0-9]{11}$/.test(cleanedCPF)
}

function isValidRG(rg: string): boolean {
  const cleanedRG = rg.replace(/\D/g, '')
  return /^[0-9]{9}$/.test(cleanedRG)
}
