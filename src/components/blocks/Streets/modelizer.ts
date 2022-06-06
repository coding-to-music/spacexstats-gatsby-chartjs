import { ChartOptions, ChartData } from 'chart.js';
import { SpaceXData } from 'types';
import { buildLaunchesPerYearChart } from './charts/launchesPerYear';
import { buildLaunchesPerRocketChart } from './charts/launchesPerRocket';
import { buildLaunchesPerLaunchpadChart } from './charts/launchesPerLaunchpad';
import { buildSuccessRateChart } from './charts/successRate';

export interface ModelizedSectionData {
  launchesPerYear: {
    data: ChartData;
    options: ChartOptions;
  };
  launchesPerRocket: {
    data: ChartData;
    options: ChartOptions;
  };
  launchesPerLaunchpad: {
    data: ChartData;
    options: ChartOptions;
  };
  successRates: {
    data: ChartData;
    options: ChartOptions;
  };
  totalLaunchCount: number;
  dragonriders: number;
  employees: number;
}

export const modelizer = ({
  pastLaunches,
  upcomingLaunches,
  crew,
  company,
}: SpaceXData): ModelizedSectionData => ({
  launchesPerYear: buildLaunchesPerYearChart(pastLaunches, upcomingLaunches),
  launchesPerRocket: buildLaunchesPerRocketChart(pastLaunches),
  launchesPerLaunchpad: buildLaunchesPerLaunchpadChart(pastLaunches),
  successRates: buildSuccessRateChart(pastLaunches),
  totalLaunchCount: pastLaunches.length,
  dragonriders: crew.reduce(
    (sum, currentCrew) => sum + currentCrew.launches.length,
    0,
  ),
  employees: company.employees,
});
