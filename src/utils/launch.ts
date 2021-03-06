import { Launch, Payload, Core } from 'types';
import { fromUnix } from './date';

export const launchYear = (launch: Launch) =>
  fromUnix(launch.date_unix).getFullYear();

export const getPayloads = (
  launch: Launch,
  allPayloads: Payload[],
): Payload[] =>
  allPayloads.filter((payload) => launch.payloads.includes(payload.id));

export const getPayload = (
  launch: Launch,
  allPayloads: Payload[],
): Payload | null => {
  if (allPayloads.length === 0) {
    return null;
  }

  return getPayloads(launch, allPayloads)[0];
};

export const getMissions = (core: Core, allLaunches: Launch[]) =>
  allLaunches.filter((launch) => core.launches.includes(launch.id));
