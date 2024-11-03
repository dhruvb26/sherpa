// traffic_modules/fetchData.ts

import fs from 'fs/promises';
import path from 'path';
import { TrafficData, ErrorResponse } from '../../../../traffic_modules/types';
import { NextResponse } from 'next/server';

export async function GET(){
  try {
    const response = await fetch('http://localhost:5000/get_data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as TrafficData;
    const outputPath = path.join(process.cwd(), 'output.json');
    await fs.writeFile(outputPath, JSON.stringify(data, null, 2));
    console.log('Data saved to output.json');
    return  NextResponse.json({"status":200})
  } catch (error) {
    console.error('Error fetching or saving data:', error);
    return NextResponse.json({"message": "failed"})
  }
}
