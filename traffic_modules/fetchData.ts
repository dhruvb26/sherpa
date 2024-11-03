// traffic_modules/fetchData.ts

import fs from 'fs/promises';
import path from 'path';

// traffic_modules/fetchData.ts

async function fetchAndSaveData() {
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

    const data = await response.json();
    const outputPath = path.join(process.cwd(), 'output.json');
    await fs.writeFile(outputPath, JSON.stringify(data, null, 2));
    console.log('Data saved to output.json');
    return data;
  } catch (error) {
    console.error('Error fetching or saving data:', error);
    // Instead of throwing, return null or an error object
    return { error: 'Failed to fetch or save data' };
  }
}

export default fetchAndSaveData;