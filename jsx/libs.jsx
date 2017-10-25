/**
 * テキストダウンロード
 */
export const download = (text, filename) => {
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.target = '_blank';
  a.download = filename;
  a.click();
};

/**
 * 時間表示フォーマット
 */
export const timeFormat = time => {
  let t = time;
  const h = Math.floor(t / 3600);
  t -= h * 3600;
  const i = Math.floor(t / 60);
  t -= i * 60;
  const s = Math.floor(t);
  t -= s;
  const ss = Math.floor(t * 1000);
  return `${
    `0${h}`.slice(-2)}:${`0${i}`.slice(-2)}:${`0${s}`.slice(-2)}.${`00${ss}`.slice(-3)
  }`;
};
