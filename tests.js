// tests.js：照 rules.md 寫的測試案例

// 規則 1：分鐘數要為整數
addCase({
  name: '規則 1：分鐘數為整數時正常計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30, topic: '數學' }
  ],
  expect: { minutes: 30, count: 1 }
});

addCase({
  name: '規則 1：分鐘數包含小數（非整數）時不計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30.5, topic: '數學' }
  ],
  expect: { minutes: 0, count: 0 }
});

// 規則 2：時間不能是空值
addCase({
  name: '規則 2：分鐘數為 null（空值）時不計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: null, topic: '英文' }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 2：日期 log_date 為 null（空值）時不計入',
  today: '2026-11-23',
  records: [
    { log_date: null, minutes: 40, topic: '英文' }
  ],
  expect: { minutes: 0, count: 0 }
});

// 規則 3：名稱只能是文字中間或後面都不能有空值
addCase({
  name: '規則 3：名稱為一般文字時正常計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 50, topic: '歷史' }
  ],
  expect: { minutes: 50, count: 1 }
});

addCase({
  name: '規則 3：名稱中間有空格時不計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 50, topic: '歷 史' }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 3：名稱後面有空格時不計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 50, topic: '歷史 ' }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 3：名稱為 null（空值）時不計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 50, topic: null }
  ],
  expect: { minutes: 0, count: 0 }
});
