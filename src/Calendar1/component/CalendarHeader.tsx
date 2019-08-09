import React, { useState, useEffect } from 'react';
import { Select, Form } from 'antd';
import { Moment } from 'moment';

interface Props {
  value: Moment;
  courtId: string;
  onChange: (date: Moment) => void;
}
export default function CalendarHeader({ value, onChange, courtId }: Props) {
  // 月份下拉框
  const start = 0;
  const end = 12;
  const monthOptions = [];

  const current = value.clone();
  const localeData = value.localeData();
  const months = [];
  for (let i = 0; i < 12; i++) {
    current.month(i);
    months.push(localeData.monthsShort(current));
  }

  for (let index = start; index < end; index++) {
    monthOptions.push(
      <Select.Option className="month-item" key={`${index}`}>
        {months[index]}
      </Select.Option>,
    );
  }
  const month = value.month();

  // 年份下拉框
  const year = value.year();
  const options = [];
  for (let i = year - 10; i < year + 10; i += 1) {
    options.push(
      <Select.Option key={i} value={i} className="year-item">
        {i}
      </Select.Option>,
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          display: 'flex',
          height: '32px',
          padding: 10,
          justifyContent: 'flex-end',
        }}
      >
        <Select
          dropdownMatchSelectWidth={false}
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          onChange={(newYear: number) => {
            const now = value.clone().year(newYear);
            onChange(now);
          }}
          value={year}
          style={{ marginRight: '10px' }}
        >
          {options}
        </Select>
        <Select
          dropdownMatchSelectWidth={false}
          value={String(month)}
          onChange={(selectedMonth) => {
            const newValue = value.clone();
            newValue.month(parseInt(selectedMonth, 10));
            onChange(newValue);
          }}
        >
          {monthOptions}
        </Select>
      </div>
    </div>
  );
}
