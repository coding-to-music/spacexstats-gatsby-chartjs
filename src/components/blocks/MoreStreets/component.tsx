import React from 'react';
import Section, {
  SectionContent,
  SectionDescription,
} from 'components/ui/Section';
import Ribbon, { ribbonHeight } from 'components/ui/Ribbon';
import {
  TableContainer,
  Table,
  TableHeader,
  TableHeaderRow,
  TableBody,
  TableRow,
  TableCell,
} from 'components/ui/Table';
import TimeStat from 'components/ui/TimeStat';
import { modelizer, ModelizedUpcomingLaunch } from './modelizer';
import { BlockProps } from 'types';
// import { Line } from 'react-chartjs-2';

const MoreStreets: React.FC<BlockProps> = ({ data, ...rest }) => {
  // const { nextLaunch, nextLaunches, inSpace } = modelizer(data);
  const { nextLaunch, nextLaunches } = modelizer(data);

  const tabs = [
    {
      id: 'countdown',
      label: 'Countdown',
      background: 'barcelona-center-bike-lane-green.jpg',
      title: nextLaunch.mission,
      render: (
        <>
          <Ribbon>{nextLaunch.localDate}</Ribbon>
          <SectionContent style={{ marginTop: ribbonHeight }}>
            <TimeStat value={nextLaunch.date} type="countdown" />
          </SectionContent>
          <SectionDescription>{nextLaunch.description}</SectionDescription>
        </>
      ),
    },
    {
      id: 'table',
      label: 'Table Grid',
      background: 'barcelona-center-bike-lane-trees.jpeg',
      // background: 'columbia-center-bike-lane.jpg',
      title: 'Table Grid',
      render: (
        <SectionContent>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableHeaderRow>
                  <TableCell as="th" style={{ width: '40%' }}>
                    Mission
                  </TableCell>
                  <TableCell as="th" style={{ width: '26%' }}>
                    Date (UTC)
                  </TableCell>
                  <TableCell as="th" style={{ width: '17%' }}>
                    Vehicle
                  </TableCell>
                  <TableCell as="th" style={{ width: '17%' }}>
                    Launchpad
                  </TableCell>
                </TableHeaderRow>
              </TableHeader>
              <TableBody>
                {nextLaunches.map(
                  ({
                    mission,
                    date,
                    vehicle,
                    launchpad,
                  }: ModelizedUpcomingLaunch) => (
                    <TableRow key={mission}>
                      <TableCell>{mission}</TableCell>
                      <TableCell>{date}</TableCell>
                      <TableCell>{vehicle}</TableCell>
                      <TableCell>{launchpad}</TableCell>
                    </TableRow>
                  ),
                )}
                {nextLaunches.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4}>No launches to display</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </SectionContent>
      ),
    },
    // {
    //   id: 'in-space',
    //   label: 'In Space',
    //   background: 'starlink.jpg',
    //   title: 'In Space',
    //   render: (
    //     <>
    //       <SectionContent>
    //         <Line data={inSpace.data} options={inSpace.options} />
    //       </SectionContent>
    //       <SectionDescription>
    //         {`SpaceX is developing a low latency, broadband internet system to
    //         meet the needs of consumers across the globe. Enabled by a
    //         constellation of low Earth orbit satellites, Starlink will provide
    //         fast, reliable internet to populations with little or no
    //         connectivity, including those in rural communities and places where
    //         existing services are too expensive or unreliable.`}
    //       </SectionDescription>
    //     </>
    //   ),
    // },
  ];

  return <Section title="More Streets" tabs={tabs} {...rest} />;
};

export default MoreStreets;
