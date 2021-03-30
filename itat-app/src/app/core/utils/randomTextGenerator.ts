export function getRandomText(): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const chLength = characters.length;
  const charactersLength = Math.floor(Math.random() * (100 - 10) + 10);
  for (let i = 0; i < charactersLength; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * chLength));
  }
  return result;
}
