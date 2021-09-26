export function generateCBU(bankId, sucursalId, accountId) {
  let B = ("000000" + bankId).slice(-3);
  let S = ("000000" + sucursalId).slice(-4);
  let C = ("10000000000000000" + accountId).slice(-13);
  let verificador1 =
    B[0] * 7 + B[1] * 1 + B[2] * 3 + S[0] * 9 + S[1] * 7 + S[2] * 1 + S[3] * 3;
  verificador1 = (10 - (verificador1 % 10)) % 10;
  let verificador2 =
    C[0] * 3 +
    C[1] * 9 +
    C[2] * 7 +
    C[3] * 1 +
    C[4] * 3 +
    C[5] * 9 +
    C[6] * 7 +
    C[7] * 1 +
    C[8] * 3 +
    C[9] * 9 +
    C[10] * 7 +
    C[11] * 1 +
    C[12] * 3;
  verificador2 = (10 - (verificador2 % 10)) % 10;
  return B + S + verificador1 + C + verificador2; //CBU
}
