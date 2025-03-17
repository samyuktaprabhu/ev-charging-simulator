# ev-charging-station-simulation

<a name="readme-top"></a>
<h3 align="center" name="readme-top">EV Charging Station Simulator</h3>

  <p align="center">
    Imagine you are a shop owner managing a parking lot with 200 spaces, where more and more electric vehicles (EVs) are parking daily. To support this trend, you plan to install charging stations. However, increasing the number of charge points raises the issue of energy demand installing 20 stations with a charging power of 11kW each results in atheoretical peak load of 220kW, which could be costly and impractical due to grid limitations. To optimize the installation, you need insights into how EV chargers are actually used. This dashboard helps by simulating charging behavior and visualizing key energy consumption metrics based on different configurations. Using static data modeled on real-world demand patterns, seasonal trends, and daily usage variations, the dashboard provides a data-driven approach to charge point planning. By adjusting parameters, you can analyze actual energy consumption and optimize infrastructure investments
</p>

## Getting Started

To get a local copy up and running, follow the steps mentioned below.

### Prerequisites

* VSCode / Terminal
* Git Repo
* Node, React, & Tailwind installed on your system
  
### Installation

1. The repository should be cloned to your local computer by executing the following command:
   ```sh
   git clone git@github.com:samyuktaprabhu/ev-charging-simulator.git
   ```
2. Navigate to the root directory using the following command:
   ```sh
   ev-charging-simulator
   ```
4. Install the required node modules by running the following command:
    ```sh
    npm install
    ```
5. To run the application, use the following command in the root directory:
    ```sh
    npm run dev
    ```
6. Follow the link on your VS Code Terminal. Visit http://localhost:5173/
7. Explore the simulator! 

**Simulated Results & Data Visualizations**
-----------------------------------------------
**Charging Statistics**
* Average Charging Duration – The typical time cars spend plugged in.
* Maximum Charging Sessions per Day – The highest number of sessions handled daily.

**Monthly Stats**
* Radar Chart – Displays the weekly energy consumption pattern for each month.
* Total Energy Consumed – Aggregated energy use per month.
* Annual Forecasted Consumption – Projected energy demand for the entire year.
* Total Charging Events (Maximum Possible) – The theoretical charging sessions based on installed chargers.
* Total Charging Events (Actual) – The actual number of charging sessions, factoring in an efficiency model (higher expected demand lowers efficiency due to congestion).

**Yearly & Daily Trends**
* Energy Consumption Heatmap (2024) – Visualizes seasonal charging trends and highlights which days of the week are busiest in different months.
* Hourly Energy Distribution per Day – A line graph showing the typical energy consumption pattern for each weekday (Monday, Tuesday, etc.) in a selected month.

## Screenshots
<img width="1437" alt="image" src="https://github.com/user-attachments/assets/585d024a-3ab6-4513-83a1-b24f9bc9b58e" />
<img width="1435" alt="image" src="https://github.com/user-attachments/assets/6c6073d4-bae7-4c7b-97b1-1f3454cc365c" />
<img width="1435" alt="image" src="https://github.com/user-attachments/assets/d8eb0fb9-8a51-48e5-bf80-56f06540debd" />

THANK YOU! 
