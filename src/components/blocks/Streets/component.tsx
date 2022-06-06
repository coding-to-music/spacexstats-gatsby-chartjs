import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import IntegerStat from 'components/ui/IntegerStat';
import Section, {
  SectionContent,
  SectionDescription,
} from 'components/ui/Section';
import { modelizer } from './modelizer';
import { BlockProps } from 'types';

const LauncHistory: React.FC<BlockProps> = ({ data, ...rest }) => {
  const {
    launchesPerYear,
    launchesPerRocket,
    launchesPerLaunchpad,
    successRates,
    totalLaunchCount,
  } = modelizer(data);

  const tabs = [
    {
      id: 'bar-chart',
      label: 'Bar Chart',
      background: 'barcelona-center-bike-lane-green.jpg',
      title: 'Bar Chart',
      render: (
        <>
          <SectionContent>
            <Bar
              data={launchesPerYear.data}
              options={launchesPerYear.options}
            />
          </SectionContent>
          <SectionDescription>
            {`With an ever-increasing launch cadence, SpaceX has surpassed other
            launch providers by annual vehicles launched and continues, nearly year-on-year,
            to set vehicle flight records.`}
          </SectionDescription>
        </>
      ),
    },
    {
      id: 'donut-chart',
      label: 'Donut Chart',
      background: 'barcelona-center-bike-lane-trees.jpeg',
      title: 'Donut Chart',
      render: (
        <>
          <SectionContent>
            <Doughnut
              data={launchesPerRocket.data}
              options={launchesPerRocket.options}
            />
          </SectionContent>
          <SectionDescription>
            {`As of today, SpaceX has launched ${totalLaunchCount} rockets, carrying
            a variety of payloads to multiple destinations;including LEO, GTO, L1, and the ISS.`}
          </SectionDescription>
        </>
      ),
    },
    {
      id: 'another-donut',
      label: 'Another Donut',
      background: 'columbia-center-bike-lane.jpg',
      title: 'Another Donut',
      render: (
        <>
          <SectionContent>
            <Doughnut
              data={launchesPerLaunchpad.data}
              options={launchesPerLaunchpad.options}
            />
          </SectionContent>
          <SectionDescription>
            {`SpaceX launches rockets from multiple launchpads to allow for a
            variety of orbits. Omelek Island in Kwajalein Atoll was SpaceX's
            first launch site, and now the company has 4 launch pads. Boca Chica
            is a privately owned launchpad and will exclusively launch Starship.`}
          </SectionDescription>
        </>
      ),
    },
    {
      id: 'line-chart',
      label: 'Line Chart',
      background: 'columbia-center-bike-lane.jpg',
      title: 'Line Chart',
      render: (
        <>
          <SectionContent>
            <Line data={successRates.data} options={successRates.options} />
          </SectionContent>
          <SectionDescription>
            {`In order to provide a reliable access to space, SpaceX will have to beat
            every other provider with its success rate.`}
          </SectionDescription>
        </>
      ),
    },
    {
      id: 'integer-stat',
      label: 'Integer Stat',
      background: 'columbia-center-bike-lane.jpg',
      title: 'Integer Stat',
      render: (
        <>
          <SectionContent>
            <IntegerStat value={0} subtitle="Flights" />
          </SectionContent>
          <SectionDescription>
            {`In March 2020, NASA has selected SpaceX to deliver supplies to the
            planned Gateway mini-space station in lunar orbit using a new
            version of the Dragon cargo vehicle launched atop Falcon Heavy
            rockets.`}
          </SectionDescription>
        </>
      ),
    },
  ];

  return <Section title="Streets" tabs={tabs} {...rest} />;
};

export default LauncHistory;
