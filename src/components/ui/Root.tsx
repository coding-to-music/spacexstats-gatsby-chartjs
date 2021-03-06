import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ReactGA from 'react-ga';
import { useDispatch } from 'react-redux';
import {
  Dragon,
  Footer,
  LaunchHistory,
  Payloads,
  People,
  Recovery,
  Reuse,
  Starlink,
  Starship,
  Timelines,
  Upcoming,
  Streets,
  MoreStreets,
  MoreCharts,
} from 'components/blocks';
import StyleReset from 'components/ui/StyleReset';
import { getScrollPercentage, scrollTo, updateSectionUrl } from 'utils/scroll';
import { actions, sections, SectionId } from 'redux/navigation';
import { SpaceXData, BlockProps } from 'types';

const Root: React.FC<SpaceXData> = (data) => {
  const dispatch = useDispatch();

  useEffect(() => {
    NProgress.configure({ minimum: 0, trickle: false, showSpinner: false });
    NProgress.start();

    if (typeof window === 'undefined') {
      return;
    }

    ReactGA.initialize('G-QDTGQH3BTW');
    ReactGA.pageview('/');

    if (window.location.hash !== '') {
      const anchorHash = window.location.hash.replace('#', '');
      const [section, tab] = anchorHash.split(/\-(.+)/);

      if (!sections.includes(section as SectionId)) {
        return;
      }

      dispatch(
        actions.changeTab({
          section: section as SectionId,
          tab,
        }),
      );
      scrollTo(section, false);
    }

    setTimeout(() => {
      window.addEventListener('scroll', () => {
        NProgress.set(getScrollPercentage());
        updateSectionUrl();
      });
    }, 300);
  }, []);

  const sectionComponents: {
    id: SectionId;
    Component: React.FC<BlockProps>;
  }[] = [
    { id: 'upcoming', Component: Upcoming },
    { id: 'starship', Component: Starship },
    { id: 'launchhistory', Component: LaunchHistory },
    { id: 'recovery', Component: Recovery },
    { id: 'reuse', Component: Reuse },
    { id: 'payloads', Component: Payloads },
    { id: 'starlink', Component: Starlink },
    { id: 'dragon', Component: Dragon },
    { id: 'people', Component: People },
    { id: 'timelines', Component: Timelines },
    { id: 'streets', Component: Streets },
    { id: 'morestreets', Component: MoreStreets },
    { id: 'morecharts', Component: MoreCharts },
  ];

  return (
    <>
      <StyleReset />

      {sectionComponents.map(({ id, Component }, index) => (
        <Component
          key={id}
          id={id}
          data={data}
          up={index > 0 ? sectionComponents[index - 1].id : undefined}
          down={
            index + 1 < sectionComponents.length
              ? sectionComponents[index + 1].id
              : 'about'
          }
        />
      ))}

      <Footer buildDate={data.buildDate} />
    </>
  );
};

export default Root;
