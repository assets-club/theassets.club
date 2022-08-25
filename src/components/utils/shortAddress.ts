export default function shortAddress(account: string, length = 4) {
  return account.replace(new RegExp(`^(0x.{${length}}).*(.{${length}})$`), '$1...$2');
}
