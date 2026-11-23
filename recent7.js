function recent7(records, today) {
  let minutes = 0;
  let count = 0;

  if (!Array.isArray(records) || typeof today !== 'string') {
    return { minutes, count };
  }

  // 計算最近 7 天的起始日期（包含今天共 7 天）
  // 例如今天 2026-11-23，往前推 7 天是 2026-11-17
  const [y, m, d] = today.split('-').map(Number);
  const startDateObj = new Date(y, m - 1, d);
  startDateObj.setDate(startDateObj.getDate() - 6);
  const startY = startDateObj.getFullYear();
  const startM = String(startDateObj.getMonth() + 1).padStart(2, '0');
  const startD = String(startDateObj.getDate()).padStart(2, '0');
  const startDate = `${startY}-${startM}-${startD}`;

  for (const record of records) {
    if (!record) continue;

    // 規則 2：時間不能是空值（分鐘數與日期皆不能為空值）
    if (record.minutes === null || record.minutes === undefined) {
      continue;
    }
    if (record.log_date === null || record.log_date === undefined) {
      continue;
    }

    // 規則 1：分鐘數要為整數
    if (typeof record.minutes !== 'number' || !Number.isInteger(record.minutes)) {
      continue;
    }

    // 規則 3：名稱只能是文字中間或後面都不能有空值（不可為空、不可包含空白字元）
    if (typeof record.topic !== 'string' || record.topic.trim().length === 0) {
      continue;
    }
    if (/\s/.test(record.topic)) {
      continue;
    }

    // 核心規則：檢查是否在最近 7 天區間內（startDate ~ today）
    if (record.log_date < startDate || record.log_date > today) {
      continue;
    }

    minutes += record.minutes;
    count += 1;
  }

  return { minutes, count };
}
