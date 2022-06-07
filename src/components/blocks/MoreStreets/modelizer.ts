import { ChartOptions, ChartData } from 'chart.js';
import format from 'date-fns/format';
import getQuarter from 'date-fns/getQuarter';
import { fromUnix } from 'utils/date';
import { launchYear, getPayloads, getPayload } from 'utils/launch';
import endOfMonth from 'date-fns/endOfMonth';
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval';
import { chartColors } from 'stylesheet';

import {
  Launch,
  SpaceXData,
  LaunchDatePrecision,
  Rocket,
  Payload,
  Launchpad,
  Starlink,
} from 'types';

export interface ModelizedUpcomingLaunch {
  mission: string;
  date: string;
  vehicle: string;
  launchpad: string;
}

export interface ModelizedSectionData {
  nextLaunch: {
    mission: string;
    localDate: string;
    date: Date;
    payload: string;
    description: string;
  };
  nextLaunches: ModelizedUpcomingLaunch[];
  inSpace: {
    data: ChartData;
    options: ChartOptions;
  };
}

const FIRST_STARLINK_LAUNCH = new Date('2019-05-24');
const MONTH_FORMAT = 'MM-yyyy';
export const buildInSpaceChart = (starlinks: Starlink[]) => {
  const months = eachMonthOfInterval({
    start: FIRST_STARLINK_LAUNCH,
    end: new Date(),
  });

  const data = {
    labels: months.map((month) => format(month, MONTH_FORMAT)),
    datasets: [
      {
        label: 'In Space',
        type: 'line',
        data: months.map(
          (month) =>
            starlinks.filter(
              ({ spaceTrack: { LAUNCH_DATE } }) =>
                new Date(LAUNCH_DATE).getTime() < endOfMonth(month).getTime(),
            ).length -
            starlinks.filter(
              ({ spaceTrack: { DECAY_DATE } }) =>
                DECAY_DATE &&
                new Date(DECAY_DATE).getTime() < endOfMonth(month).getTime(),
            ).length,
        ),
        lineTension: 0,
        fill: false,
        borderColor: chartColors.blue,
        backgroundColor: chartColors.blue,
      },
      {
        label: 'US and Canada coverage',
        type: 'line',
        data: months.map(() => 720),
        lineTension: 0,
        fill: false,
        borderColor: chartColors.red,
        pointRadius: 0,
      },
      {
        label: 'Global coverage',
        type: 'line',
        data: months.map(() => 1440),
        lineTension: 0,
        fill: false,
        borderColor: chartColors.yellow,
        pointRadius: 0,
      },
      {
        label: 'Constellation complete',
        type: 'line',
        data: months.map(() => 4400),
        lineTension: 0,
        fill: false,
        borderColor: chartColors.green,
        pointRadius: 0,
      },
    ],
  };

  const customOptions: ChartOptions = {
    tooltips: {
      callbacks: {
        label: (tooltipItem) => {
          const dataset = data.datasets[tooltipItem.datasetIndex!];
          return tooltipItem.yLabel
            ? `${dataset.label}: ${tooltipItem.yLabel as number} sats`
            : '';
        },
      },
    },
  };


const displayLaunchTime = (date: Date, precision: LaunchDatePrecision) => {
  switch (precision) {
    case LaunchDatePrecision.hour:
      return format(date, 'MMM do yyyy, HH:mm');

    case LaunchDatePrecision.day:
      return format(date, 'MMM do yyyy');

    case LaunchDatePrecision.half:
    case LaunchDatePrecision.quarter:
      return `Q${getQuarter(date)} ${format(date, 'yyyy')}`;

    case LaunchDatePrecision.month:
      return format(date, 'MMM yyyy');

    case LaunchDatePrecision.year:
      return format(date, 'yyyy');

    default:
      return 'Invalid date';
  }
};

// eslint-disable-next-line
const sortLaunches = (launchA: Launch, launchB: Launch) => {
  const yearA = launchYear(launchA);
  const yearB = launchYear(launchB);

  // This is the logic: better precision always comes first in the same time scale
  // Are these launches the same year?
  if (yearA > yearB) {
    return 1;
  }
  if (yearA < yearB) {
    return -1;
  }

  // These launches are the same year, is one of them more precise?
  const precisionA = launchA.date_precision;
  const precisionB = launchB.date_precision;
  if (
    precisionA === LaunchDatePrecision.year &&
    precisionB !== LaunchDatePrecision.year
  ) {
    return 1;
  }
  if (
    precisionA !== LaunchDatePrecision.year &&
    precisionB === LaunchDatePrecision.year
  ) {
    return -1;
  }

  // Now the launches are the same year and same precision
  // Are these launches the same quarter?
  const dateA = fromUnix(launchA.date_unix);
  const dateB = fromUnix(launchB.date_unix);
  const quarterA = getQuarter(dateA);
  const quarterB = getQuarter(dateB);

  if (quarterA > quarterB) {
    return 1;
  }
  if (quarterA < quarterB) {
    return -1;
  }

  // These launches are the same quarter, is one of them more precise?
  if (
    (precisionA === LaunchDatePrecision.half &&
      precisionB !== LaunchDatePrecision.half) ||
    (precisionA === LaunchDatePrecision.quarter &&
      precisionB !== LaunchDatePrecision.quarter)
  ) {
    return 1;
  }
  if (
    (precisionA !== LaunchDatePrecision.half &&
      precisionB === LaunchDatePrecision.half) ||
    (precisionA !== LaunchDatePrecision.quarter &&
      precisionB === LaunchDatePrecision.quarter)
  ) {
    return -1;
  }

  // Are these launches the same month?
  const monthA = dateA.getMonth();
  const monthB = dateB.getMonth();
  if (monthA > monthB) {
    return 1;
  }
  if (monthA < monthB) {
    return -1;
  }

  // These launches are the same month, is one of them more precise?
  if (
    precisionA === LaunchDatePrecision.month &&
    precisionB !== LaunchDatePrecision.month
  ) {
    return 1;
  }
  if (
    precisionA !== LaunchDatePrecision.month &&
    precisionB === LaunchDatePrecision.month
  ) {
    return -1;
  }

  return launchA.date_unix - launchB.date_unix;
};

const getPayloadDescription = (
  launch: Launch,
  rocket: Rocket,
  allPayloads: Payload[],
  launchpads: Launchpad[],
): string => {
  if (launch.details) {
    return launch.details;
  }

  const payloads = getPayloads(launch, allPayloads);
  if (payloads.length === 0) {
    return 'Unknown payload given for this mission. This description may be updated later!';
  }
  const payloadMass = payloads.reduce(
    (total, current) => (total += current.mass_kg ?? 0),
    0,
  );
  const payloadNames = payloads.map((payload) => payload.name);

  const launchpad = launchpads.find((pad) => pad.id === launch.launchpad)!;

  if (payloads[0].type.indexOf('Dragon') !== -1) {
    return `A SpaceX Dragon capsule will launch into LEO atop a ${rocket.name} rocket from ${launchpad.name}, carrying ${payloadMass} kg of supplies and scientific cargo to the International Space Station.`;
  }

  return `A SpaceX ${rocket.name} rocket will launch from
  ${launchpad.name}, lofting the
  ${payloadMass > 0 ? `${payloadMass} kg ` : ''}
  satellite${payloads.length > 1 ? 's ' : ' '}
  ${payloadNames.join('/')} to a
  ${payloads[0].orbit} trajectory.`;
};

export const modelizer = ({
  upcomingLaunches,
  rockets,
  payloads,
  launchpads,
}: SpaceXData): ModelizedSectionData => {
  const nextLaunches = upcomingLaunches.map((launch) => launch);
  nextLaunches.sort(sortLaunches);

  // Find first launch with non-null launch date
  const nextLaunch =
    nextLaunches.find(
      (launch) =>
        launch.date_utc !== null && fromUnix(launch.date_unix) > new Date(),
    ) || nextLaunches[0];

  return {
    nextLaunch: {
      mission: nextLaunch.name,
      localDate: format(
        fromUnix(nextLaunch.date_unix),
        "MMM do, h:mma ('UTC'xxx)",
      ),
      date: fromUnix(nextLaunch.date_unix),
      payload: getPayload(nextLaunch, payloads)?.name ?? 'Unkown payload',
      description: getPayloadDescription(
        nextLaunch,
        rockets.find((rocket) => rocket.id === nextLaunch.rocket)!,
        payloads,
        launchpads,
      ),
    },
    nextLaunches: nextLaunches.map((launch) => ({
      mission: launch.name,
      date: displayLaunchTime(
        fromUnix(launch.date_unix),
        launch.date_precision,
      ),
      vehicle: rockets.find((rocket) => rocket.id === nextLaunch.rocket)!.name,
      launchpad: launchpads.find((pad) => pad.id === launch.launchpad)!.name,
    })),
    inSpace: buildInSpaceChart(starlink),
  };
};
