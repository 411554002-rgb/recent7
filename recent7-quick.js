// recent7-quick.js：對照用。只用一句話請 AI 寫的版本放這裡。
// 函式名稱一樣叫 recent7，輸入、輸出的格式跟 recent7.js 一樣（見 README.md）。

function recent7(records, today) {
  let minutes = 0;
  let count = 0;

  if (!Array.isArray(records)) {
    return { minutes: 0, count: 0 };
  }

  // 將 YYYY-MM-DD 轉為 UTC 毫秒數，避免時區與日光節約時間影響
  function parseDate(dateStr) {
    const parts = dateStr.split('-').map(Number);
    return Date.UTC(parts[0], parts[1] - 1, parts[2]);
  }

  const todayMs = parseDate(today);
  const oneDayMs = 24 * 60 * 60 * 1000;

  for (const record of records) {
    if (!record || !record.log_date) continue;

    const recordMs = parseDate(record.log_date);
    const diffDays = (todayMs - recordMs) / oneDayMs;

    // 最近 7 天：包含今天及過去 6 天（共 7 天）
    if (diffDays >= 0 && diffDays < 7) {
      count++;
      if (typeof record.minutes === 'number') {
        minutes += record.minutes;
      }
    }
  }

  return { minutes: minutes, count: count };
}
