import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default function Demo() {
  const getOption = () => {
    const option = {
      title: {
        text: '未来一周气温变化',
        subtext: '纯属虚构',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['最高气温', '最低气温'],
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
        iconStyle: {
          normal: {
            borderColor: '#91c7ae',
          },
        },
      },
      color: [
        '#c23531',
        '#2f4554',
        '#61a0a8',
        '#d48265',
        '#91c7ae',
        '#749f83',
        '#ca8622',
        '#bda29a',
        '#6e7074',
        '#546570',
        '#c4ccd3',
      ],
      calculable: true,
      backgroundColor: 'rgba(40,167,69,0.1)',
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C',
          },
        },
      ],
      series: [
        {
          name: '最高气温',
          type: 'line',
          lineStyle: {
            normal: {
              width: 3,
            },
          },
          itemStyle: {
            normal: {
              color: 'purple',
              position: 'bottom',
            },
          },
          data: [11, 11, 35, 13, 12, 13, 10],
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' },
            ],
          },
          markLine: {
            data: [{ type: 'average', name: '平均值' }],
          },
        },
        {
          name: '最低气温',
          type: 'line',
          lineStyle: {
            normal: {
              width: 3,
            },
          },
          itemStyle: {
            normal: {
              color: 'pink',
            },
          },
          data: [1, -2, 2, 5, 3, 2, 0],
          markPoint: {
            data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -2 }],
            label: {
              normal: {
                color: '#333',
              },
            },
          },
          markLine: {
            data: [{ type: 'average', name: '平均值' }],
          },
        },
      ],
    };
    return option;
  };

  return (
    <div
      style={{
        width: '800px',
        height: '300px',
      }}
    >
      <ReactEcharts option={getOption()} className="react_for_echarts" />
    </div>
  );
}
