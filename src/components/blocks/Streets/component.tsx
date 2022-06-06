import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
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
      id: 'per-year',
      label: 'Tab One',
      background: 'barcelona-center-bike-lane-green.jpg',
      title: 'Tab One',
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
      id: 'per-rocket',
      label: 'Tab Two',
      background: 'barcelona-center-bike-lane-trees.jpeg',
      title: 'Tab Two',
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
      id: 'per-launchpad',
      label: 'Tab Three',
      background: 'columbia-center-bike-lane.jpg',
      title: 'Tab Three',
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
      id: 'success-rate',
      label: 'Tab Four',
      background: 'columbia-center-bike-lane.jpg',
      title: 'Tab Four',
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
  ];

  return <Section title="Launch History" tabs={tabs} {...rest} />;
};

export default LauncHistory;
