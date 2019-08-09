import React, { useState } from 'react';
import { Calendar, Badge, Icon } from 'antd';
import * as Loadable from 'react-loadable';
// import CalendarHeader from './component/CalendarHeader';
import moment, { Moment } from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import Loading from '../app/Loading';
const CalendarHeader = Loadable({
  loader: () => import('./component/CalendarHeader'),
  loading: Loading,
  delay: 200,
});
const HeartSvg = () => (
  <svg width="1em" height="1em" fill="#f5222d" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
const HeartIcon = () => <Icon component={HeartSvg} />;
const morningDays = [1, 2, 3, 4, 5, 16, 17, 18, 19, 20];
const nightDays = [6, 7, 8, 9, 10, 21, 22, 23, 24, 25];
const noonDays = [11, 12, 13, 14, 15, 26, 27, 28, 29, 30, 31];

// 动态渲染日历中的每个单元格 增加停用标识
function dateCellRender(date: Moment) {
  const dateStr = parseInt(date.format('D'), 10);
  if (morningDays.indexOf(dateStr) !== -1) {
    return <Badge status="success" text="" />;
  } else if (nightDays.indexOf(dateStr) !== -1) {
    return <Badge status="error" text="" />;
  } else if (noonDays.indexOf(dateStr) !== -1) {
    return <Badge status="default" text="" />;
  }
}

function dateFullCellRender(date: Moment) {
  const dateStr = parseInt(date.format('D'), 10);
  const dateText = date.format('DD');
  if (morningDays.indexOf(dateStr) !== -1) {
    return (
      <div
        className="ant-fullcalendar-date"
        style={{
          background: `${dateStr === 5 || dateStr === 20 ? 'pink' : ''}`,
        }}
      >
        <div className="ant-fullcalendar-value">{dateText}</div>
        <div className="ant-fullcalendar-content">
          <span className="ant-badge ant-badge-status ant-badge-not-a-wrapper">
            <span className="ant-badge-status-dot ant-badge-status-success" />
            <span className="ant-badge-status-text" />
          </span>
          <p style={{ textAlign: 'center' }}>
            {(dateStr === 5 || dateStr === 20) && <HeartIcon />}
          </p>
        </div>
      </div>
    );
  } else if (nightDays.indexOf(dateStr) !== -1) {
    return (
      <div
        className="ant-fullcalendar-date"
        style={{
          background: `${dateStr === 6 || dateStr === 21 ? 'pink' : ''}`,
        }}
      >
        <div className="ant-fullcalendar-value">{dateText}</div>
        <div className="ant-fullcalendar-content">
          <span className="ant-badge ant-badge-status ant-badge-not-a-wrapper">
            <span className="ant-badge-status-dot ant-badge-status-error" />
            <span className="ant-badge-status-text" />
          </span>
          <p style={{ textAlign: 'center' }}>
            {(dateStr === 6 || dateStr === 21) && <HeartIcon />}
          </p>
        </div>
      </div>
    );
  } else if (noonDays.indexOf(dateStr) !== -1) {
    return (
      <div className="ant-fullcalendar-date">
        <div className="ant-fullcalendar-value">{dateText}</div>
        <div className="ant-fullcalendar-content">
          <span className="ant-badge ant-badge-status ant-badge-not-a-wrapper">
            <span className="ant-badge-status-dot ant-badge-status-default" />
            <span className="ant-badge-status-text" />
          </span>
        </div>
      </div>
    );
  }
}

export default function TestCalendar() {
  return (
    <Calendar
      dateCellRender={(date) => dateCellRender(date)}
      dateFullCellRender={(date) => dateFullCellRender(date)}
      headerRender={({ value, onChange }) => (
        <CalendarHeader
          value={value}
          onChange={(date: Moment) => {
            if (onChange) {
              onChange(date);
            }
          }}
        />
      )}
    />
  );
}
