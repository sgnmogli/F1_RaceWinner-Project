"use client";

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardContent } from "@/components/ui/card";

export interface DriverTrace {
  name: string;
  code: string;
  teamColor?: string;
  color?: string;
  data: [number, number][];
}

export interface TelemetryProps {
  drivers: DriverTrace[];
  isPredicted?: boolean;
}

export function TelemetryVisualizer({ drivers, isPredicted = false }: TelemetryProps) {
  const options = {
    chart: {
      type: 'spline',
      backgroundColor: 'transparent',
      zoomType: 'x',
      style: { fontFamily: 'inherit' }
    },
    title: { text: null },
    xAxis: {
      labels: { style: { color: '#888', fontWeight: 'bold' } },
      gridLineColor: 'rgba(255,255,255,0.05)',
      gridLineWidth: 1
    },
    yAxis: {
      title: { text: null },
      labels: { style: { color: '#888', fontWeight: 'bold' } },
      gridLineColor: 'rgba(255,255,255,0.05)',
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      backgroundColor: '#121212',
      borderColor: 'rgba(255,255,255,0.1)',
      style: { color: '#fff', fontWeight: 'bold' },
      borderRadius: 8
    },
    legend: {
      itemStyle: { color: '#fff', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' },
      itemHoverStyle: { color: '#FF1E1E' }
    },
    plotOptions: {
      series: { marker: { enabled: false }, lineWidth: 3 }
    },
    series: drivers.map(d => ({
      name: d.code,
      data: d.data,
      color: d.teamColor || d.color || '#fff'
    })),
    credits: { enabled: false }
  };

  return (
    <Card className="w-full bg-[#121212] border border-white/10 rounded-xl shadow-inner overflow-hidden flex-1 min-h-[300px] h-full flex flex-col relative z-20">
      <CardContent className="p-4 md:p-6 w-full h-full relative flex-1 flex flex-col">
        <div className="absolute top-2 left-6 text-[10px] uppercase font-bold text-gray-400 tracking-widest z-10 drop-shadow-md">
          {isPredicted ? "Predicted Trace Model [m] / [km/h]" : "Sector Profile Trace [m] / [km/h]"}
        </div>
        <div className="mt-6 flex-1 w-full h-full">
          <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: "100%", width: "100%" } }} />
        </div>
      </CardContent>
    </Card>
  );
}
